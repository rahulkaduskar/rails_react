import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter , Button } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';

export default class TermsOfUse extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: props.show,
      body: props.body
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.show} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle} >Terms of Use</ModalHeader>
          <ModalBody>
            { ReactHtmlParser(this.state.body) }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}