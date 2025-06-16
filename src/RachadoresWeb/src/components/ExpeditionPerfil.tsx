import React from "react";
import styled from "styled-components";
import { COLORS, FONTS } from "../constants/style";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  font-family: ${FONTS.primary};
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  background: ${COLORS.secondary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

const ExpeditionPerfil = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContent>
        <h2>{data.nome}</h2>
        <p><strong>Data:</strong> {data.data_criacao}</p>
        <p><strong>Descrição:</strong> {data.descricao || "Sem descrição disponível."}</p>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContent>
    </Overlay>
  );
};

export default ExpeditionPerfil;
