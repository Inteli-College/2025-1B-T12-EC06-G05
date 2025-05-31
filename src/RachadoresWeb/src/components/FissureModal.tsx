import React from "react";
import styled from "styled-components";

interface FissureData {
  id: string;
  imageUrl: string;
  // expedition: string;
  building: string;
  facade: string;
  classification: string;
  probableCause: string;
  uploadDate: string;
}

interface FissureModalProps {
  fissure: FissureData | null;
  onClose: () => void;
}

const FissureModal: React.FC<FissureModalProps> = ({ fissure, onClose }) => {
  if (!fissure) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalImage src={fissure.imageUrl} alt={`Fissura ${fissure.id}`} />
        <ModalInfo>
          <h2>Fissura {fissure.id}</h2>
          {/* <p><strong>Expedição:</strong> {fissure.expedition}</p> */}
          <p><strong>Prédio:</strong> {fissure.building}</p>
          <p><strong>Fachada:</strong> {fissure.facade}</p>
          <p><strong>Classificação:</strong> {fissure.classification}</p>
          <p><strong>Provável causa:</strong></p>
          <p>{fissure.probableCause}</p>
          <p><strong>Data de upload:</strong> {fissure.uploadDate}</p>
        </ModalInfo>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FissureModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  display: flex;
  border-radius: 16px;
  padding: 1rem;
  max-width: 700px;
  width: 100%;
  gap: 2rem;
  align-items: center;
`;

const ModalImage = styled.img`
  width: 50%;
  object-fit: contain;
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    margin: 0;
  }

  p {
    margin: 0.25rem 0;
  }
`;
