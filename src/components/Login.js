import React, { Component } from 'react';
import { Redirect } from 'react-router'


class Login extends Component {


  state = {
    email: "",
    password: "",
  }

  handleSubmit= (e) => {

    this.props.login(this.state.email,this.state.password)
    e.preventDefault();
  }

  
  render() {
    if(this.props.auth !== ""){
      return <Redirect to="/" />;
    }

    return (
      <div className="login page">
        <form className="login__form" onSubmit={this.handleSubmit}>
          <input className="input" type="text" value={this.state.email} placeholder="email" onChange={e => this.setState({email:e.target.value})}/>
          <input className="input" type="password" value={this.state.password} placeholder="password" onChange={e => this.setState({password:e.target.value})}/>
          <input className="button" type="submit" value="Login" />
        </form>
      </div>
    );
  }
  
}

export default Login;
