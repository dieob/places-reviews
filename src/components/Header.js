import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';

import './Header.scss';


class Header extends Component {

  render() {
    return (
      <div className="header">
        <ErrorNotification></ErrorNotification>
        <div className="navigation">
          <Link to='/' className="navigation-item">
            <p className="nav-text">
              <svg className="nav-icon">
                <use xlinkHref="images/sprite.svg#icon-home"></use>
              </svg>
            Home</p></Link>
          <Link to='/best' className="navigation-item">
            <p className="nav-text">
              <svg className="nav-icon">
                <use xlinkHref="images/sprite.svg#icon-heart-outlined"></use>
              </svg>
            Top 10</p></Link>
          <Link to='/contact' className="navigation-item"> <p className="nav-text">
            <svg className="nav-icon">
              <use xlinkHref="images/sprite.svg#icon-mail"></use>
            </svg>
            Contact</p></Link>
        </div>
      </div>
    );
  }
}


export default Header;