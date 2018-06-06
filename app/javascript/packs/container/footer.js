import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
  render() {
    return (
      <footer className="page-footer mt-5">
        <div className="full-width">
          <p className="mb-0 text-center">
              © Copyright 2018 <a href="/" className="m-1">My Site</a> - All Rights Reserved
          </p>
        </div>
      </footer>
    );
  }
}


