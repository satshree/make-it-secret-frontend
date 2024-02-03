"use client";

import React, { Component } from "react";

import {
  Input,
  IconButton,
  InputGroup,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Label from "../Label";

export default class KeyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "password",
      helpText: "",
      errorText: "",
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, helpText: this.props.helpText });
  }

  componentDidUpdate() {
    let { helpText, errorText } = this.state;

    if (helpText !== this.props.helpText)
      this.setState({ ...this.state, helpText: this.props.helpText });

    if (errorText !== this.props.errorText)
      this.setState({ ...this.state, errorText: this.props.errorText });
  }

  toggleMode = () =>
    this.setState({
      ...this.state,
      mode: this.state.mode === "password" ? "text" : "password",
    });

  render() {
    return (
      <FormControl isInvalid={this.state.errorText !== ""}>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="Key"
            type={this.state.mode}
            value={this.props.data}
            onChange={this.props.updateData}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              variant="ghost"
              colorScheme="gray"
              onClick={this.toggleMode}
              icon={
                this.state.mode === "password" ? <ViewIcon /> : <ViewOffIcon />
              }
            />
          </InputRightElement>
        </InputGroup>
        {this.state.errorText ? (
          <FormErrorMessage>
            <Label data={this.state.errorText} />
          </FormErrorMessage>
        ) : (
          <FormHelperText>
            <Label data={this.state.helpText} />
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
