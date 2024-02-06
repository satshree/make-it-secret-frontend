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
  HStack,
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
        // size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>From Satshree,</DrawerHeader>

          <DrawerBody className={style.drawerBody}>
            <Box>
              <Center>
                <div className={style.aboutText}>
                  <Label>
                    Thank you for using Make It Secret =). Make It Secret is a
                    simple app that Encrypts or Decrypts a file with a strong
                    AES (American Encryption Standard) Encryption Algorithm.
                    With Make It Secret, you can make any files inaccessible and
                    of course, only you can decrypt them with your key. Make
                    sure to store the key used for encryption in a safe way.
                    Without the key, the encrypted file cannot be decrypted and
                    there is no way to recover the lost key!
                  </Label>
                  <br />
                  <Label>
                    No files or any data is stored in any servers. The process
                    is completely safe.
                  </Label>
                  {/* <br />
                  <Label>
                    Make It Secret was also available as a Windows application.
                    I recommend you to not use that app for
                    encryption/decryption as it has some major flaws. This
                    version is safer and it is not compatible with the files
                    encrypted by Windows app.
                  </Label> */}
                  <br />
                  <Label>
                    The backend API is built with Django (Python) and the
                    frontend UI is built with Next.js. The code is open-source,
                    you can go through them in GitHub ~ if you ever need some
                    inspo.
                  </Label>
                </div>
              </Center>
            </Box>
            <br />
            <Box>
              <Center>
                <HStack spacing="1rem">
                  <Link
                    href="https://github.com/satshree/make-it-secret-frontend"
                    isExternal={true}
                  >
                    <Button variant="solid" colorScheme="blue">
                      Frontend GitHub
                    </Button>
                  </Link>
                  <Link
                    href="https://github.com/satshree/make-it-secret-api"
                    isExternal={true}
                  >
                    <Button variant="solid" colorScheme="blue">
                      Backend GitHub
                    </Button>
                  </Link>
                </HStack>
              </Center>
              <br />
              <Center>
                <Button
                  type="solid"
                  size="sm"
                  colorScheme="gray"
                  onClick={this.props.closeDrawer}
                >
                  Close
                </Button>
              </Center>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }
}
