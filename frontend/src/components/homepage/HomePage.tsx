import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import './HomePage.css'; // Import your custom CSS file for animations
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import { BsFillPersonFill } from 'react-icons/bs'; // Import Bootstrap icon
import AppAppBar from './AppAppBar';

import Hero from './Hero';



const HomePage: React.FC = () => {




  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);

  useEffect(() => {
   
    const authDetail = Cookies.get('authCookie');
    if (authDetail) {
      const authJson = JSON.parse(authDetail);
      setIsAuthenticated(true); 
      setUsername(authJson.user.username);
      setFirstname(authJson.user.firstname);
      setLastname(authJson.user.lastname);
    }
  }, []);

  const handleSignOut = () => {
 
    Cookies.remove('authCookie');
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <>
    <AppAppBar  
     isauthenticated={isAuthenticated}
     username={username}
     handleSignOut={handleSignOut}
    />
    <Hero 
    isauthenticated={isAuthenticated}
    firstname={firstname}
    lastname={lastname}
    />
   
    </>
  );
};

export default HomePage;

