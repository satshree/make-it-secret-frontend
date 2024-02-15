"use client";

import React, { Component } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  //
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import { toast, Bounce } from "react-toastify";

import Image from "next/image";

import Label from "../Label";
import KeyInput from "../KeyInput";

import style from "./style.module.css";

export default class FileDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      encryptMode: true,
      progress: false,
      file: {
        file: null,
        name: "",
        size: "",
        type: "",
      },
      data: {
        key: "",
        errorMessage: "",
      },
    };

    this.updateKey = this.updateKey.bind(this);
    this.validateKey = this.validateKey.bind(this);
    this.getFileMetaData = this.getFileMetaData.bind(this);
    this.submitEncryption = this.submitEncryption.bind(this);
  }

  componentDidUpdate() {
    let { file } = this.state;

    if (window.innerWidth < 601 && file.file !== this.props.file)
      this.getFileMetaData(this.props.file);

    if (this.props.success) this.closeDrawer();
  }

  closeDrawer = () => this.setState({ ...this.state, open: false });

  getTitle = () =>
    this.state.encryptMode ? (
      <Label data="Encrypt" />
    ) : (
      <Label data="Decrypt" />
    );

  getButtonScheme = () => (this.state.encryptMode ? "red" : "green");

  getHelpText = () =>
    this.state.encryptMode ? (
      <Label>Enter a strong key to encrypt this file.</Label>
    ) : (
      <Label>Enter the key used to encrypt this file.</Label>
    );

  setProgress = (progress) => this.setState({ ...this.state, progress });

  setEncryptMode = (encryptMode) =>
    this.setState({ ...this.state, encryptMode });

  resetDrawerData = () =>
    this.setState({
      ...this.state,
      data: {
        key: "",
        errorMessage: "",
      },
    });

  updateKey(key) {
    let { data } = this.state;
    data.key = key.target.value;
    if (data.errorMessage !== "") data.errorMessage = "";
    this.setState({ ...this.state, data });
  }

  getFileMetaData(file) {
    let encryptMode = true;
    let fileType = file.type;

    if (
      file.type === "" &&
      file.name.split(".")[file.name.split(".").length - 1] === "mis"
    ) {
      encryptMode = false;
      fileType = "makeitsecret file";
    }

    this.setState({
      ...this.state,
      open: true,
      encryptMode,
      file: {
        file,
        name: file.name,
        size: Math.round(file.size / 1024) / 100,
        type: fileType,
      },
    });
    // this.props.setEncrypt(encryptMode);
  }

  validateKey() {
    let { data } = this.state;
    let validation = false;

    if (data.key === "") {
      data.errorMessage = "Key is required!";
    } else {
      data.errorMessage = "";
      validation = true;
    }

    this.setState({ ...this.state, data });
    return validation;
  }

  submitEncryption() {
    if (this.validateKey()) {
      this.setState({ ...this.state, progress: true });

      let { file, data, encryptMode, open } = this.state;
      let formData = new FormData();
      let apiURL = API_ROOT;

      formData.append("key", data.key);
      formData.append("file", file.file);

      if (encryptMode) {
        apiURL += "/api/encrypt/";
      } else {
        apiURL += "/api/decrypt/";
      }

      let xhr = new XMLHttpRequest();

      xhr.open("POST", apiURL);
      xhr.setRequestHeader("app", API_HEADER);
      xhr.responseType = "blob";
      xhr.send(formData);

      xhr.onload = (e) => {
        let status = e.target.status;

        if (status == 200) {
          let file = e.target.response;
          let fileName = JSON.parse(
            xhr.getResponseHeader("content-disposition").split("filename=")[1]
          );

          if (typeof window !== "undefined") {
            const url = window.URL.createObjectURL(file);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            toast.success(
              `File ${encryptMode ? "encryption" : "decryption"} successful`,
              {
                position: "top-center",
                autoClose: 9000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "colored",
                transition: Bounce,
              }
            );

            open = false;
          } else {
            toast.warning("Something went wrong. Please try again", {
              position: "top-center",
              autoClose: 9000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "colored",
              transition: Bounce,
            });
          }
        } else {
          console.log("ERROR", e);

          toast.error(
            e.target.status === 555
              ? "Invalid encryption key!"
              : "Something went wrong. Please try again",
            {
              position: "top-center",
              autoClose: 9000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "colored",
              transition: Bounce,
            }
          );
        }
        this.setState({ ...this.state, progress: false, open });
      };
    }
  }

  render() {
    return (
      <Drawer
        placement="bottom"
        closeOnEsc={false}
        isOpen={this.state.open}
        closeOnOverlayClick={false}
        onClose={this.closeDrawer}
        onCloseComplete={this.resetDrawerData}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>{this.getTitle()}</DrawerHeader>
          <DrawerCloseButton disabled={this.state.progress} />
          <DrawerBody>
            <div>
              <Label>File Details</Label>
              <br />
              <div className={style.wrap}>
                <VStack spacing="50px" align="flex-start">
                  <Image
                    src={
                      this.state.encryptMode ? "/file.png" : "/file-lock.png"
                    }
                    alt="file"
                    width={150}
                    height={150}
                  />
                  <div className={style.contents}>
                    <VStack spacing={4} align="flex-start">
                      <Box>
                        <Label>Name: {this.state.file.name}</Label>
                      </Box>
                      <Box>
                        <Label>Size: {this.state.file.size} MB</Label>
                      </Box>
                      <Box>
                        <Label>Type: {this.state.file.type}</Label>
                      </Box>
                    </VStack>
                  </div>
                  <KeyInput
                    data={this.state.data.key}
                    updateData={this.updateKey}
                    helpText={this.getHelpText()}
                    errorText={this.state.data.errorMessage}
                  />
                </VStack>
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="gray"
              mr={3}
              disabled={this.state.progress}
              onClick={this.closeDrawer}
            >
              Close
            </Button>
            <Button
              variant="solid"
              colorScheme={this.getButtonScheme()}
              isLoading={this.state.progress}
              onClick={this.submitEncryption}
            >
              {this.getTitle()}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}
