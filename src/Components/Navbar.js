import React from 'react';
import { Link } from 'react-router-dom';
import {ButtonContainer} from './Button';
import logo from '../logo.svg';
import styled from 'styled-components';

function Navbar() {
  return (
    <NavWrapper className="navbar nav-bar-expand-sm navbar-dark px-sm-5">
        <Link to= '/'>
            <img src={logo} alt="store" className="navbar-brand"/>
        </Link>
        <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5">
                <Link to='/' className='nav-link'>
                    Products
                </Link>
            </li>
        </ul>
        <Link to='/cart' className='nav-link'>
            <ButtonContainer>
            <i className="fas fa-cart-plus">my cart</i>
            </ButtonContainer>
        </Link>
    </NavWrapper>
  )
}

export default Navbar;

const NavWrapper = styled.nav`
background:var(--mainBlue);
.nav-link{
    color:var(--mainWhite) !important;
    font-size:1.3 rem;
    text-transform:capitalize;
}
`;