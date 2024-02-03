"use client";

import React, { Component } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  //
  Box,
  Link,
  Center,
  Button,
} from "@chakra-ui/react";

import Label from "../Label";

import style from "./style.module.css";

export default class AboutDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidUpdate() {
    let { open } = this.state;

    if (open !== this.props.open)
      this.setState({ ...this.state, open: this.props.open });
  }

  render() {
    return (
      <Drawer
        isOpen={this.state.open}
        placement="bottom"
        onClose={this.props.closeDrawer}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>About Make it Secret</DrawerHeader>

          <DrawerBody className={style.drawerBody}>
            <Box>
              <Center>
                <div className={style.aboutText}>
                  <Label>
                    Make It Secret is a simple app that Encrypts or Decrypts a
                    file with a strong AES (American Encryption Standard)
                    Encryption Algorithm. With Make It Secret, you can make any
                    files inaccessible and of course, only you can decrypt them
                    with your key!
                  </Label>
                  <br />
                  <Label>
                    Ever wanted to hide some files from others? This is the app
                    for you.
                  </Label>
                </div>
              </Center>
            </Box>
            <br />
            <br />
            <Box>
              <Center>
                <Link
                  href="https://github.com/satshree/make-it-secret-frontend"
                  isExternal={true}
                >
                  <Button variant="solid" colorScheme="teal">
                    GitHub
                  </Button>
                </Link>
              </Center>
              <Center>
                <small style={{ marginTop: "0.5rem" }}>
                  <Label>
                    The Backend API is not public for security reasons.
                  </Label>
                </small>
              </Center>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }
}
