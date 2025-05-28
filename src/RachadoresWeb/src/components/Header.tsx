import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS, FONTS, BREAKPOINTS } from "../constants/style";
import logo from "../constants/assets/logo.svg";
import home from "../constants/assets/icon_home.svg";
import perfil from "../constants/assets/Perfil.svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import hoverSoundFile from '../constants/assets/sounds/galho.mp3';

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
    navigate("/");
  };

  const handlePerfilClick = () => {
    navigate("/perfil");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderContainer backgroundColor={backgroundColor}>
      <Home src={home} alt="Ícone de Casa" onClick={handleHomeClick} />
      <Logo src={logo} alt="Logo dos Rachadores" onClick={playSound}/>
      <Perfil src={perfil} alt="Ícone de Perfil" onClick={handlePerfilClick} />
      <Nav></Nav>
      <HamburgerIcon onClick={toggleMenu}>
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </HamburgerIcon>
      <MobileMenu isOpen={isOpen}></MobileMenu>
    </HeaderContainer>
  );
};

export default Header;
