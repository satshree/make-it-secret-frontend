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

export default class KeyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      mode: "password",
      helpText: "",
      errorText: "",
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, helpText: this.props.helpText });
  }

  componentDidUpdate() {
    let { helpText } = this.state;

    if (helpText !== this.props.helpText)
      this.setState({ ...this.state, helpText });
  }

  updateData = (data) =>
    this.setState({ ...this.state, data: data.target.value });

  toggleMode = () =>
    this.setState({
      ...this.state,
      mode: this.state.mode === "password" ? "text" : "password",
    });

  render() {
    return (
      <FormControl>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={this.state.mode}
            placeholder="Key"
            value={this.state.data}
            onChange={this.updateData}
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
          <FormErrorMessage>{this.state.errorText}</FormErrorMessage>
        ) : (
          <FormHelperText>{this.state.helpText}</FormHelperText>
        )}
      </FormControl>
    );
  }
}
