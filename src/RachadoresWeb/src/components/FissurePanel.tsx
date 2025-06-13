import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import FissureModal from "./FissureModal";
import upload from "../constants/assets/Upload.svg";
import { FONTS } from "../constants/style";

interface Fissure {
  id: number;
  categoria: string;
  confiabilidade: number;
  id_image: number;
}

interface ImageInfo {
  id: number;
  url: string;
  nome: string;
  orientacao: string;
  img_resultado?: string;
}

interface FissureWithImage {
  fissure: Fissure;
  image: ImageInfo;
  url_fissura: string;
}

const FissurePanel = () => {
  const { numeroPredio } = useParams<{ numeroPredio: string }>();
  const [termicas, setTermicas] = useState<FissureWithImage[]>([]);
  const [retracoes, setRetracoes] = useState<FissureWithImage[]>([]);
  const [modalFissure, setModalFissure] = useState<FissureWithImage | null>(
    null
  );

  useEffect(() => {
    const fetchFissures = async () => {
      try {
        const token = localStorage.getItem("token");

        const fissRes = await axios.get(
          `http://localhost:5000/fissure/predio/${numeroPredio}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const allFissures = [
          ...fissRes.data.fissures.termica,
          ...fissRes.data.fissures.retracao,
        ];

        const imageRes = await axios.get(
          `http://localhost:5000/image/by_predio/${numeroPredio}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const imageMap: Record<number, ImageInfo> = {};
        for (const img of imageRes.data.images) {
          imageMap[img.id] = img;
        }

        const group = (cat: string) =>
          allFissures
            .filter((f: Fissure) => f.categoria === cat)
            .map((f: Fissure) => ({
              fissure: f,
              image: f,
            }))
            .filter((f) => f.image); // ignora se imagem não foi encontrada

        setTermicas(group("termica"));
        setRetracoes(group("retracao"));
      } catch (error) {
        console.error("Erro ao buscar fissuras:", error);
      }
    };

    fetchFissures();
  }, [numeroPredio]);

  return (
    <Container>
      <InnerPanel>
        <Column>
          <TitleContainer>
            <Title>Fissuras térmicas</Title>
          </TitleContainer>
          <ImageGrid>
            {termicas.length === 0 ? (
              <Placeholder>Nenhuma imagem encontrada</Placeholder>
            ) : (
              termicas.map((fiss, i) => (
                <img
                  src={fiss.image.url_fissura}
                  alt={fiss.image.nome}
                  onClick={() => setModalFissure(fiss)}
                />
              ))
            )}
          </ImageGrid>
        </Column>

        <VerticalDivider />

        <Column>
          <TitleContainer>
            <Title>Fissuras de retração</Title>
          </TitleContainer>
          <ImageGrid>
            {retracoes.length === 0 ? (
              <Placeholder>Nenhuma imagem encontrada</Placeholder>
            ) : (
              retracoes.map((fiss, i) => (
                <img
                  src={fiss.image.url_fissura}
                  alt={fiss.image.nome}
                  onClick={() => setModalFissure(fiss)}
                />
              ))
            )}
          </ImageGrid>
        </Column>
      </InnerPanel>

      {modalFissure && (
        <FissureModal
          fissure={{
            id: String(modalFissure.fissure.id),
            imageUrl: modalFissure.image.url_fissura,
            // expedition: "Desconhecida",
            building: numeroPredio ?? "",
            facade: modalFissure.image.orientacao,
            classification: modalFissure.fissure.categoria,
            probableCause:
              modalFissure.fissure.categoria === "termica"
                ? "Variações térmicas"
                : "Retração por secagem",
            uploadDate: new Date().toLocaleDateString("pt-BR"),
          }}
          onClose={() => setModalFissure(null)}
        />
      )}
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
