"use client";

import React, { Component } from "react";

import {
  Input,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

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

  componentDidUpdate() {
    let { helpText } = this.state;

    if (helpText !== this.props.helpText)
      this.setState({ ...this.state, helpText });
  }

  updateData = (data) => this.setState({ ...this.state, data });

  render() {
    return (
      <FormControl>
        <Input
          type={this.state.mode}
          placeholder="Key"
          value={this.state.data}
          onChange={this.updateData}
        />
        {this.state.errorText ? (
          <FormErrorMessage>{this.state.errorText}</FormErrorMessage>
        ) : (
          <FormHelperText>{this.state.helpText}</FormHelperText>
        )}
      </FormControl>
    );
  }
}
