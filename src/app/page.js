"use client";

import React, { Component } from "react";

import { Button, Box, Center, VStack } from "@chakra-ui/react";

import Label from "@/components/Label";
import Title from "@/components/Title";

import FileModal from "@/components/FileModal";
import UploadCard from "@/components/UploadCard";
import AboutDrawer from "@/components/AboutDrawer";

// import style from "./page.module.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      aboutDrawer: false,
      file: null,
    };

    this.setFile = this.setFile.bind(this);
  }

  toggleFileModal = (modal) => this.setState({ ...this.state, modal });

  toggleAboutDrawer = (aboutDrawer) =>
    this.setState({ ...this.state, aboutDrawer });

  setFile(uploadedFile) {
    console.log("here", uploadedFile);

    this.setState({ ...this.state, file: uploadedFile });
  }

  render() {
    return (
      <React.Fragment>
        <div className="center h-100">
          <VStack spacing={45} align="stretch">
            <Box>
              <Center>
                <Title>Make It Secret</Title>
              </Center>
              <br />
              <Center>
                <Title subtitle={true}>Encrypt or Decrypt files</Title>
              </Center>
            </Box>
            <Box>
              <Center>
                <UploadCard setFile={this.setFile} />
              </Center>
            </Box>
            <Box>
              <Center>
                <Label>Made by Satshree Shrestha</Label>
              </Center>
              <br />
              <Center>
                <Button
                  size="sm"
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => this.toggleAboutDrawer(true)}
                >
                  About Make it Secret
                </Button>
              </Center>
            </Box>
          </VStack>
        </div>

        <FileModal
          open={this.state.modal}
          closeModal={() => this.toggleFileModal(false)}
        />
        <AboutDrawer
          open={this.state.aboutDrawer}
          closeDrawer={() => this.toggleAboutDrawer(false)}
        />
      </React.Fragment>
    );
  }
}
