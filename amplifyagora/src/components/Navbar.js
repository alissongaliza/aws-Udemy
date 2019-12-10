import React from "react";
import { Menu as Nav, Icon, Button } from "element-react";
import { NavLink } from 'react-router-dom'

const Navbar = ({ user, handleSignout }) => (
  <Nav mode='horizontal' theme='dark' defaultActive='1'>
    <div className='nav-container'>
      <Nav.Item index='1'>
        <NavLink to='/' className='nav-link'>
          <span className='app-title'>
            <img src='https://icon.now.sh/account_balance/f90' alt='App Icon' className='app-icon' />
            Amplify Agora
          </span>

        </NavLink>
      </Nav.Item>
      <div className='nav-items'>
        <Nav.item index='2'>
          <span className='app-user'>Hello, {user.username}</span>
        </Nav.item>
        <Nav.item index='3'>
          <NavLink className='nav-link' to='/profile'>
            <Icon name='setting' />
            Profile
          </NavLink>
        </Nav.item>
        <Nav.item index='4'>
          <Button type='warning' onClick={handleSignout}>Sign Out</Button>
        </Nav.item>
      </div>
    </div>
  </Nav >
)

export default Navbar;
