import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const Header = withRouter(props => <HeaderComp {...props} />)
class HeaderComp extends Component {

  render() {
    const path = this.props.location.pathname;
    //change <Link> to map based object creation
    return (
      <div className="header">
        <Link className={path === "/" ? "header__link header__link--active" : "header__link"} to="/" >Home</Link>
        <Link className={path === "/albums" ? "header__link header__link--active" : "header__link"} to="/albums" >Albums</Link>
        <Link className={path === "/songs" ? "header__link header__link--active" : "header__link"} to="/songs" >Songs</Link>
      </div>
    );
  }

}

export default Header;
