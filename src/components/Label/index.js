import React, { Component } from "react";

export default class Label extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    let { data } = this.state;

    data = this.props.children || this.props.data || "";

    this.setState({ ...this.state, data });
  }

  componentDidUpdate() {
    let { data } = this.state;

    if (this.props.children) {
      if (data !== this.props.children)
        this.setState({ ...this.state, data: this.props.children });
    } else if (this.props.data) {
      if (data !== this.props.data)
        this.setState({ ...this.state, data: this.props.data });
    }
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}
