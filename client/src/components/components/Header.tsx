import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from './../../constants'
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';


const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
    <div className="header-container">
      {(!showMenu ?
        <div className="header">
          <div className="header-contents-container">
            <img className="logo" src={require("./chinese-dance-demo-logo.png")} alt="chinese dance logo"></img>
            <div className="title">Chinese <br/>Dance</div>
            <div onClick={() => setShowMenu(true)}><FiMenu className="hamburger-menu"/></div>
          </div>
        </div>
        : 
        <div className="header-long">
          <div className="header">
            <div className="header-contents-container">
              <img className="logo" src={require("./chinese-dance-demo-logo.png")} alt="chinese dance logo"></img>
              <div className="title">Chinese <br/>Dance</div>
              <div onClick={() => setShowMenu(false)}><MdClose className="hamburger-menu"/></div>
            </div>
          </div>
          <div className="lower-menu-wrapper">
            <div className="lower-menu">
              <Link to="/" className="menu-link" onClick={()=>setShowMenu(false)}><div className="menu-link-contents ion-color-primary">home</div></Link>
              <Link to="/about" className="menu-link" onClick={()=>setShowMenu(false)}><div className="menu-link-contents">about</div></Link>
              <Link to="/search" className="menu-link" onClick={()=>setShowMenu(false)}><div className="menu-link-contents">search</div></Link>
              <Link to="/articles" className="menu-link" onClick={()=>setShowMenu(false)}><div className="menu-link-contents">articles</div></Link>
            </div>
          </div>
        </div>
        
      )}
    </div>
    <div className="under-header"/>
    </>
  );
};

export default Header;