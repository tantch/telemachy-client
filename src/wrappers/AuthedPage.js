import React, { Component } from 'react';
import { Redirect } from 'react-router'


class AuthedPage extends Component {

  
  render() {
    if(this.props.auth === ""){
      return <Redirect to="/login" />;
    }
    
    return this.props.children;
  }
  
}

export default AuthedPage;
