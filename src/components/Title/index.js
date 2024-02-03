"use client";

import React, { Component } from "react";

import style from "./style.module.css";

export default class Title extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      subtitle: false,
    };
  }

  componentDidMount() {
    let { data, subtitle } = this.state;

    data = this.props.children || this.props.data || "";
    subtitle = this.props.subtitle || false;

    this.setState({ ...this.state, data, subtitle });
  }

  componentDidUpdate() {
    let { data, subtitle } = this.state;

    if (data !== this.props.children || this.props.data)
      this.setState({
        ...this.state,
        data: this.props.children || this.props.data,
      });

    if (subtitle !== this.props.subtitle)
      this.setState({ ...this.state, subtitle: this.props.subtitle });
  }

  render() {
    return (
      <div className={this.state.subtitle ? style.subtitle : style.title}>
        {this.state.data}
      </div>
    );
  }
}
