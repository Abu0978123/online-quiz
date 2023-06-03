import React from 'react'
import { useHistory } from 'react-router';
import { Navbar, Container, Nav, Button, } from 'react-bootstrap';
import NavbarHome from './NavbarHome';

import Slider from './Slider';
import MainDiv from './MainDiv';
import '../styles/MainDiv.css'
import Footer from './Footer';


export const Home = (props) => {

  const history = useHistory();

  return (
    <div>
      <NavbarHome />
      <MainDiv/>

    </div>

  )
}

export default Home;