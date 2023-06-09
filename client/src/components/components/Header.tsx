import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';


const LowerMenu = (props: {setShowMenu: any}) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  const {setShowMenu} = props;
  return (
    <div className="lower-menu">
      <Link to="/" className="menu-link" onClick={()=>setShowMenu(false)}><div className="menu-link-contents ion-color-primary">home</div></Link>
      <Link to="/about" className="menu-link" onClick={()=>setShowMenu(false)}><div className="menu-link-contents">about</div></Link>
      <Link to="/search" className="menu-link" onClick={()=>setShowMenu(false)}><div className="menu-link-contents">search</div></Link>
      <Link to="/articles" className="menu-link" onClick={()=>setShowMenu(false)}><div className="menu-link-contents">articles</div></Link>
      <div className="menu-link"><div className="menu-link-contents">{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div></div>
    </div>
    )
}


const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
    <div className="header-container">
      {(!showMenu ?
        <div className="header">
          <div className="header-contents-container">
            <div className="title" onClick={() => navigate(`/`)}>Chinese <br/>Dance</div>
            <div onClick={() => setShowMenu(true)}><FiMenu className="hamburger-menu"/></div>
          </div>
        </div>
        : 
        <div className="header-long">
          <div className="header">
            <div className="header-contents-container">
              <div className="title">Chinese <br/>Dance</div>
              <div onClick={() => setShowMenu(false)}><MdClose className="hamburger-menu"/></div>
            </div>
          </div>
          <div className="lower-menu-wrapper">
            <LowerMenu setShowMenu={setShowMenu}></LowerMenu>
          </div>
        </div>
        
      )}
    </div>
    <div className="under-header"/>
    </>
  );
};

export default Header;