import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import FissureModal from "./FissureModal";
import upload from "../constants/assets/Upload.svg";
import { FONTS } from "../constants/style";

import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";

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
}

const FissurePanel = () => {
  const { numeroPredio } = useParams<{ numeroPredio: string }>();
  const [termicas, setTermicas] = useState<FissureWithImage[]>([]);
  const [retracoes, setRetracoes] = useState<FissureWithImage[]>([]);
  const [modalFissure, setModalFissure] = useState<FissureWithImage | null>(
    null
  );
  const [activeId, setActiveId] = useState<number | null>(null);
  const [draggedFissure, setDraggedFissure] = useState<FissureWithImage | null>(null);
  const [draggedFromCategory, setDraggedFromCategory] = useState<string | null>(null);

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
              image: imageMap[f.id_image],
            }))
            .filter((f) => f.image);

        setTermicas(group("termica"));
        setRetracoes(group("retracao"));
      } catch (error) {
        console.error("Erro ao buscar fissuras:", error);
      }
    };

    fetchFissures();
  }, [numeroPredio]);

const handleDragStart = (event: any) => {
  const draggedId = Number(event.active.id);
  setActiveId(draggedId);
  
  const dragged = termicas.find((f) => f.fissure.id === draggedId) || 
                  retracoes.find((f) => f.fissure.id === draggedId);
  
  // Determinar de qual categoria a imagem está sendo arrastada
  const fromCategory = termicas.find((f) => f.fissure.id === draggedId) 
    ? "termica" 
    : "retracao";
  
  setDraggedFissure(dragged || null);
  setDraggedFromCategory(fromCategory);
};

const handleDragEnd = async (event: any) => {
  const { active, over } = event;
  setActiveId(null);
  setDraggedFissure(null);
  setDraggedFromCategory(null);
  
  if (!over || active.id === over.id) return;

  const draggedId = Number(active.id);

  const draggedFrom = termicas.find((f) => f.fissure.id === draggedId)
    ? "termica"
    : "retracao";

  const draggedFiss =
    draggedFrom === "termica"
      ? termicas.find((f) => f.fissure.id === draggedId)
      : retracoes.find((f) => f.fissure.id === draggedId);

  const newCategory = over.id;

  if (!draggedFiss || draggedFiss.fissure.categoria === newCategory) return;

  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:5000/fissure/update`,
      {
        id: draggedFiss.fissure.id,
        categoria: newCategory,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (newCategory === "termica") {
      setTermicas([
        ...termicas,
        {
          ...draggedFiss,
          fissure: { ...draggedFiss.fissure, categoria: "termica" },
        },
      ]);
      setRetracoes(retracoes.filter((f) => f.fissure.id !== draggedId));
    } else {
      setRetracoes([
        ...retracoes,
        {
          ...draggedFiss,
          fissure: { ...draggedFiss.fissure, categoria: "retracao" },
        },
      ]);
      setTermicas(termicas.filter((f) => f.fissure.id !== draggedId));
    }

  } catch (error) {
    alert("Erro ao atualizar categoria. Tente novamente.");
  }
};

  const DraggableImage = ({ fissure }: { fissure: FissureWithImage }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: fissure.fissure.id,
    });

    const handleImageClick = (e: React.MouseEvent) => {
      if (!isDragging) {
        setModalFissure(fissure);
      }
    };

    return (
      <ImageContainer ref={setNodeRef}>
        <DragHandle {...listeners} {...attributes}>
          ⋮⋮
        </DragHandle>
        
        <StyledImage
          src={fissure.image.url}
          alt={fissure.image.nome}
          onClick={handleImageClick}
          isDragging={isDragging}
        />
      </ImageContainer>
    );
  };

  const DroppableColumn = ({
    id,
    title,
    fissures,
  }: {
    id: string;
    title: string;
    fissures: FissureWithImage[];
  }) => {
    const { setNodeRef, isOver } = useDroppable({
      id,
    });

    const isDragging = activeId !== null;
    const canDrop = isDragging && 
      (!draggedFissure || draggedFissure.fissure.categoria !== id);

    const shouldBlur = isDragging && draggedFromCategory === id;

    return (
      <Column 
        ref={setNodeRef} 
        isDragging={isDragging} 
        isOver={isOver && canDrop}
        shouldBlur={shouldBlur}
      >
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <ImageGrid>
          {isDragging && canDrop && (
            <DropIndicator isOver={isOver}>
              <DropIcon>📁</DropIcon>
              <DropText>Solte aqui para mover para {id === 'termica' ? 'térmicas' : 'retração'}</DropText>
            </DropIndicator>
          )}
          
          {fissures.length === 0 && !isDragging ? (
            <Placeholder>Nenhuma imagem</Placeholder>
          ) : (
            fissures.map((fiss) => (
              <DraggableImage key={fiss.fissure.id} fissure={fiss} />
            ))
          )}
        </ImageGrid>
      </Column>
    );
  };

  return (
    <DndContext 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <Container>
        <InnerPanel>
          <DroppableColumn
            id="termica"
            title="Fissuras térmicas"
            fissures={termicas}
          />
          <VerticalDivider />
          <DroppableColumn
            id="retracao"
            title="Fissuras de retração"
            fissures={retracoes}
            />
            
        </InnerPanel> 
        <UploadButton>
            <Upload src={upload} alt="Botão de upload"/>
        </UploadButton>

        <DragOverlay>
          {activeId && draggedFissure ? (
            <DragPreview
              src={draggedFissure.image.url}
              alt={draggedFissure.image.nome}
            />
          ) : null}
        </DragOverlay>

        {modalFissure && (
          <FissureModal
            fissure={{
              id: String(modalFissure.fissure.id),
              imageUrl: modalFissure.image.url,
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
    </DndContext>
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

const Column = styled.div<{ isDragging?: boolean; isOver?: boolean; shouldBlur?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  ${props => props.shouldBlur && `
    filter: blur(2px);
    opacity: 0.7;
  `}
  
  ${props => props.isOver && `
    background: rgba(88, 69, 61, 0.1);
    border: 2px dashed #58453d;
    border-radius: 8px;
  `}
`;

const UploadButton = styled.div`
  background: #58453d;
  padding: 1rem;
  display: flex;
  justify-content: center;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #7d5e54;
  }
  
  &:active {
    background: #59443b;
  }

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
  position: relative;
`;

const DropIndicator = styled.div<{ isOver?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.isOver ? 'rgba(88, 69, 61, 0.9)' : 'rgba(88, 69, 61, 0.7)'};
  color: white;
  padding: 1rem;
  border-radius: 12px;
  border: 2px dashed white;
  z-index: 100;
  animation: ${props => props.isOver ? 'pulse 0.5s ease-in-out infinite alternate' : 'none'};
  
  @keyframes pulse {
    from { transform: translate(-50%, -50%) scale(1); }
    to { transform: translate(-50%, -50%) scale(1.05); }
  }
`;

const DropIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const DropText = styled.div`
  font-family: ${FONTS.primary};
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

const DragPreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
  transform: rotate(5deg);
`;

const Upload = styled.img`
  height: 20px;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  
  &:hover {
    .drag-handle {
      opacity: 1;
    }
  }
`;

const DragHandle = styled.div.attrs({ className: 'drag-handle' })`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: grab;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
  
  &:active {
    cursor: grabbing;
  }
`;

const StyledImage = styled.img<{ isDragging?: boolean }>`
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  
  &:hover {
    transform: scale(1.02);
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