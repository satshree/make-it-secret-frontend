"use client";

import React, { Component } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  //
  Box,
  Flex,
  Button,
  VStack,
} from "@chakra-ui/react";

import Image from "next/image";

import Label from "../Label";
import KeyInput from "../KeyInput";

import style from "./style.module.css";

export default class FileModal extends Component {
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

    // if (open !== this.props.open)
    //   this.setState({ ...this.state, open: this.props.open });

    if (file.file !== this.props.file) this.getFileMetaData(this.props.file);
  }

  closeModal = () => this.setState({ ...this.state, open: false });

  getTitle = () =>
    this.state.encryptMode ? (
      <Label data="Encrypt" />
    ) : (
      <Label data="Decrypt" />
    );

  getButtonScheme = () => (this.state.encryptMode ? "red" : "green");

  getHelpText = () =>
    this.state.encryptMode ? (
      <Label>
        Enter a strong key to encrypt this file. Only this key can decrypt this
        file.
      </Label>
    ) : (
      <Label>
        Enter the key used to encrypt this file. Only that key can decrypt this
        file.
      </Label>
    );

  setProgress = (progress) => this.setState({ ...this.state, progress });

  setEncryptMode = (encryptMode) =>
    this.setState({ ...this.state, encryptMode });

  resetModalData = () =>
    this.setState({
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
  }

  validateKey() {
    let { data } = this.state;

    if (data.key === "") {
      data.errorMessage = "Key is required!";
    } else {
      data.errorMessage = "";
    }

    this.setState({ ...this.state, data });
  }

  submitEncryption() {
    this.validateKey();
  }

  render() {
    return (
      <Modal
        isCentered={true}
        isOpen={this.state.open}
        onClose={this.closeModal}
        // onCloseComplete={this.resetModalData}
      >
        <ModalOverlay />
        <ModalContent
          className={style.modal}
          minWidth="fit-content"
          height="fit-content"
        >
          <ModalHeader>{this.getTitle()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <Label>File Details</Label>
              <br />
              <div className={style.wrap}>
                <Flex alignContent="space-between" alignItems="center">
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
                </Flex>
                <br />
                <KeyInput
                  data={this.state.data.key}
                  updateData={this.updateKey}
                  helpText={this.getHelpText()}
                  errorText={this.state.data.errorMessage}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={this.closeModal}>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
