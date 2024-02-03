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
  FormControl,
  Input,
} from "@chakra-ui/react";

import Image from "next/image";

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
      },
    };

    this.getFileMetaData = this.getFileMetaData.bind(this);
  }

  componentDidUpdate() {
    let { open, encryptMode, file } = this.state;

    if (open !== this.props.open) {
      this.setState({ ...this.state, open: this.props.open });
    }

    // if (encryptMode !== this.props.encryptMode) {
    //   this.setState({ ...this.state, encryptMode: this.props.encryptMode });
    // }

    if (file.file !== this.props.file) {
      file = this.getFileMetaData(this.props.file);

      this.setState({ ...this.state, file });
    }
  }

  getTitle = () => (this.state.encryptMode ? "Encrypt" : "Decrypt");

  getButtonScheme = () => (this.state.encryptMode ? "red" : "green");

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
      },
    });

  getFileMetaData(file) {
    return { file };
  }

  render() {
    return (
      <Modal
        isCentered={true}
        isOpen={this.state.open}
        onClose={this.props.closeModal}
        onCloseComplete={this.resetModalData}
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
              File Details
              <br />
              <div className={style.wrap}>
                <div>
                  <Flex alignContent="space-between" alignItems="center">
                    <Image
                      src="/image.png"
                      alt="file"
                      width={140}
                      height={140}
                    />
                    <div className={style.contents}>
                      <VStack spacing={4} align="flex-start">
                        <Box>Name: lorem</Box>
                        <Box>Size: lorem</Box>
                        <Box>Type: lorem</Box>
                      </VStack>
                    </div>
                  </Flex>
                  <br />
                  <FormControl>
                    <Input placeholder="Key" />
                  </FormControl>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={this.props.closeModal}>
              Close
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              isLoading={this.state.progress}
            >
              {this.getTitle()}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
