import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS, FONTS, BREAKPOINTS } from "../constants/style";
import logo from "../constants/assets/logo.svg";
import home from "../constants/assets/icon_home.svg";
import logs from "../constants/assets/logs.svg";
import perfil from "../constants/assets/Perfil.svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import hoverSoundFile from '../constants/assets/sounds/galho.mp3';

const HeaderContentAdmin = styled.div`
  width: 95%;
  max-width: 1240px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContainerAdmin = styled.header<{
  backgroundColor: string;
  top?: string;
  left?: string;
}>`
  background-color: ${COLORS.white};
  padding: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: ${(props) => props.top || "0"};
  left: ${(props) => props.left || "0"};
  width: 90%;
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 10%;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    height: 5vh;
  }
`;

const Home = styled.img`
  height: 35px;
  cursor: pointer;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const LogsIcon = styled.img`
  height: 30px;
  margin-left: 80%;
  margin-right: 16px;
  cursor: pointer;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const PerfilAdmin = styled.img`
  height: 30px;
  
  cursor: pointer;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  a {
    color: ${COLORS.white};
    font-family: ${FONTS.primary};
    text-decoration: none;
    font-weight: 600;
    &:hover {
      color: ${COLORS.primary};
      font-weight: bold;
    }
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none; 
  }
`;

const MobileMenu = styled.nav<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 0;
    background-color: ${COLORS.primary};
    width: 100%;
    padding: 20px;
    gap: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 100;
  }

  a {
    color: ${COLORS.white};
    font-family: ${FONTS.primary};
    text-decoration: none;
    text-align: center;
    font-weight: 600;
    &:hover {
      color: ${COLORS.primary};
      font-weight: bold;
    }
  }
`;

const HamburgerIcon = styled.div`
  display: none; 
  cursor: pointer;
  position: absolute; 
  top: 20px; 
  right: 20px; 
  z-index: 1000;
  color: white;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: block;
    margin-right: 0 auto;
  }
`;

const HeaderContent = styled.div`
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContainer = styled.header<{
  backgroundColor: string;
  top?: string;
  left?: string;
}>`
  background-color: ${COLORS.white};
  padding: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: ${(props) => props.top || "0"};
  left: ${(props) => props.left || "0"};
  width: 100%;
  box-sizing: border-box;
`;

const Perfil = styled.img`
  height: 30px;
  margin-left: 75%;
  cursor: pointer;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Header: React.FC<{ backgroundColor?: string }> = ({
  backgroundColor = COLORS.header,
}) => {
  const navigate = useNavigate();

  const hoverSound = new Audio(hoverSoundFile);

  const playSound = () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  };

  

  // Consts para navegação (Só pra organizar)
  const handleHomeClick = () => {
    navigate("/home");
  };

  const handlePerfilClick = () => {
    navigate("/perfil");
  };

  const handleLogsClick = () => {
  navigate("/logs");
};

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const cargo_user = localStorage.getItem("cargo_user");

  if(cargo_user == "admin"){
    return (
    
      <HeaderContainerAdmin backgroundColor={backgroundColor}>
        <HeaderContentAdmin>
          <Home src={home} alt="Ícone de Casa" onClick={handleHomeClick} />
          <Logo src={logo} alt="Logo dos Rachadores" onClick={playSound}/>
          <LogsIcon src={logs} alt="Ícone de Logs" onClick={handleLogsClick} />
          <PerfilAdmin src={perfil} alt="Ícone de Perfil" onClick={handlePerfilClick} />
          <Nav></Nav>
          <HamburgerIcon onClick={toggleMenu}>
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </HamburgerIcon>
          <MobileMenu isOpen={isOpen}></MobileMenu>
        </HeaderContentAdmin>
      </HeaderContainerAdmin>
  );
  }
  
  return (
    <HeaderContainer backgroundColor={backgroundColor}>
    <HeaderContent>
      <Home src={home} alt="Ícone de Casa" onClick={handleHomeClick} />
      <Logo src={logo} alt="Logo dos Rachadores" onClick={playSound}/>
      <Perfil src={perfil} alt="Ícone de Perfil" onClick={handlePerfilClick} />
      <Nav></Nav>
      <HamburgerIcon onClick={toggleMenu}>
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </HamburgerIcon>
      <MobileMenu isOpen={isOpen}></MobileMenu>
    </HeaderContent>
  </HeaderContainer>
  );
};

export default Header;
