import React, { useRef, useState } from "react";
import styled from "styled-components";
import upload from "../constants/assets/Upload.svg";
import { COLORS, FONTS, BREAKPOINTS } from "../constants/style";
import FissureModal from "./FissureModal"; // ajuste o path conforme seu projeto

// Tipagem da fissura
interface FissureData {
  id: string;
  imageUrl: string;
  expedition: string;
  building: string;
  facade: string;
  classification: string;
  probableCause: string;
  uploadDate: string;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const FissurePanel = () => {
  const [thermalCracks, setThermalCracks] = useState<string[]>([]);
  const [retractionCracks, setRetractionCracks] = useState<string[]>([]);
  const [selectedFissure, setSelectedFissure] = useState<FissureData | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Formato não suportado. Por favor, envie uma imagem PNG, JPG ou WEBP.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;

      if (thermalCracks.length <= retractionCracks.length) {
        setThermalCracks((prev) => [...prev, imageUrl]);
      } else {
        setRetractionCracks((prev) => [...prev, imageUrl]);
      }
    };
    reader.onerror = () => {
      setError("Erro ao carregar o arquivo. Tente novamente.");
    };
    reader.readAsDataURL(file);
  };

  const closeError = () => setError("");

  return (
    <Container>
      <InnerPanel>
        <Column>
          <TitleContainer>
            <Title>Fissuras térmicas</Title>
          </TitleContainer>
          <ImageGrid>
            {thermalCracks.length === 0 && <Placeholder>Nenhuma imagem enviada ainda.</Placeholder>}
            {thermalCracks.map((src, i) => (
              <img
                src={src}
                key={i}
                alt={`Fissura térmica ${i}`}
                onClick={() =>
                  setSelectedFissure({
                    id: `T08310${i}`,
                    imageUrl: src,
                    expedition: "Inteli",
                    building: "6",
                    facade: "Norte",
                    classification: "Térmica",
                    probableCause:
                      "Fissuras térmicas são normalmente causadas por tensões térmicas em um material devido a variações bruscas de temperatura.",
                    uploadDate: new Date().toLocaleDateString("pt-BR"),
                  })
                }
              />
            ))}
          </ImageGrid>
        </Column>

        <VerticalDivider />

        <Column>
          <TitleContainer>
            <Title>Fissuras de retração</Title>
          </TitleContainer>
          <ImageGrid>
            {retractionCracks.length === 0 && <Placeholder>Nenhuma imagem enviada ainda.</Placeholder>}
            {retractionCracks.map((src, i) => (
              <img
                src={src}
                key={i}
                alt={`Fissura de retração ${i}`}
                onClick={() =>
                  setSelectedFissure({
                    id: `R08310${i}`,
                    imageUrl: src,
                    expedition: "Inteli",
                    building: "6",
                    facade: "Norte",
                    classification: "Retração",
                    probableCause:
                      "Fissuras de retração ocorrem devido à perda de umidade no concreto durante a cura, resultando em contrações e trincas.",
                    uploadDate: new Date().toLocaleDateString("pt-BR"),
                  })
                }
              />
            ))}
          </ImageGrid>
        </Column>
      </InnerPanel>

      <BottomBar onClick={handleUploadClick}>
        <UploadIcon src={upload} alt="Ícone de Upload" />
        <HiddenInput
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </BottomBar>

      {error && (
        <Toast>
          <span>⚠️</span> {error}
          <CloseButton onClick={closeError}>×</CloseButton>
        </Toast>
      )}

      <FissureModal fissure={selectedFissure} onClose={() => setSelectedFissure(null)} />
    </Container>
  );
};

export default FissurePanel;

const Container = styled.div`
  background: #58453d;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
`;

const InnerPanel = styled.div`
  display: flex;
  background: white;
  width: 100%;
  min-height: 50vh;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  background: #58453d;
  padding: 0.75rem;
  text-align: center;
`;

const Title = styled.h3`
  color: white;
  margin: 0;
  font-family: ${FONTS.primary};
  font-size: 1rem;
  font-weight: 200;
`;

const VerticalDivider = styled.div`
  width: 0.5px;
  background: rgb(0, 0, 0);
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  justify-items: center;
  align-items: start;
  min-height: 20vh;

  img {
    width: 100%;
    border-radius: 4px;
    object-fit: cover;
  }
`;

const Placeholder = styled.p`
  color: #aaa;
  font-style: italic;
  font-size: 0.9rem;
  grid-column: 1 / -1;
  text-align: center;
`;

const BottomBar = styled.div`
  background: #58453d;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: rgb(60, 50, 45);
    cursor: pointer;
  }
`;

const UploadIcon = styled.img`
  height: 24px;
  width: 24px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Toast = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  background: #fff;
  color: #1d120c;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${FONTS.primary};
  font-size: 1rem;
  z-index: 999;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  margin-left: auto;
  cursor: pointer;
`;

