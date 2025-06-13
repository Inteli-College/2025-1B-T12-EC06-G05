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
  const [showDirectionModal, setShowDirectionModal] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<FileList | null>(null);

  const cardinalDirections = [
    { value: "Norte", label: "Norte (N)", icon: "↑" },
    { value: "Nordeste", label: "Nordeste (NE)", icon: "↗" },
    { value: "Leste", label: "Leste (L)", icon: "→" },
    { value: "Sudeste", label: "Sudeste (SE)", icon: "↘" },
    { value: "Sul", label: "Sul (S)", icon: "↓" },
    { value: "Sudoeste", label: "Sudoeste (SO)", icon: "↙" },
    { value: "Oeste", label: "Oeste (O)", icon: "←" },
    { value: "Noroeste", label: "Noroeste (NO)", icon: "↖" }
  ];

  const handleImageUpload = async (selectedDirection: string) => {
    if (!pendingFiles) return;

    const token = localStorage.getItem("token");
    const imagensCriadas = [];

    for (let i = 0; i < pendingFiles.length; i++) {
      const file = pendingFiles[i];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const uploadRes = await axios.post("http://localhost:5000/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        });

        const imageUrl = uploadRes.data.url;

        const addRes = await axios.post("http://localhost:5000/image/add", {
          nome: file.name,
          hora_coleta: new Date().toISOString().split("T")[0],
          orientacao: selectedDirection,
          id_predio: numeroPredio,
          url: imageUrl
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const imageId = addRes.data?.id;
        if (!imageId) {
          console.warn("⚠️ ID da imagem não retornado. Ignorando.");
          continue;
        }

        imagensCriadas.push({
          id: imageId,
          url: imageUrl
        });

        console.log(`✅ Imagem ${file.name} enviada e registrada com sucesso.`);

      } catch (err) {
        console.error(`❌ Erro ao enviar ${file.name}:`, err);
      }
    }

    if (imagensCriadas.length > 0) {
      try {
        const detectRes = await axios.post("http://localhost:5000/model/run", {
          imagens: imagensCriadas
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        console.log("🤖 Modelo executado com sucesso:", detectRes.data);
      } catch (err) {
        console.error("❌ Erro ao rodar modelo:", err);
      }
    }

    setPendingFiles(null);
    setShowDirectionModal(false);
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files.length) return;

    setPendingFiles(files);
    setShowDirectionModal(true);
  };

  const triggerFileInput = () => {
    document.getElementById("image-input")?.click();
  };

  const handleDirectionSelect = (direction: string) => {
    handleImageUpload(direction);
  };

  const handleCloseDirectionModal = () => {
    setShowDirectionModal(false);
    setPendingFiles(null);
  };

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
          src={fissure.image.url_fissura}
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
        <UploadButton onClick={triggerFileInput}>
          <Upload src={upload} alt="Botão de upload" />
        </UploadButton>

        <input
          type="file"
          id="image-input"
          multiple
          accept="image/*"
          onChange={handleFileSelection}
          style={{ display: "none" }}
        />
        {showDirectionModal && (
          <ModalOverlay onClick={handleCloseDirectionModal}>
            <DirectionModal onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Selecione a direção que a foto foi tirada</ModalTitle>
              </ModalHeader>

              <DirectionGrid>
                {cardinalDirections.map((direction) => (
                  <DirectionButton
                    key={direction.value}
                    onClick={() => handleDirectionSelect(direction.value)}
                  >
                    <DirectionIcon>{direction.icon}</DirectionIcon>
                    <DirectionLabel>{direction.label}</DirectionLabel>
                  </DirectionButton>
                ))}
              </DirectionGrid>

              <ModalFooter>
                <CancelButton onClick={handleCloseDirectionModal}>
                  Cancelar
                </CancelButton>
              </ModalFooter>
            </DirectionModal>
          </ModalOverlay>
        )}

        <DragOverlay>
          {activeId && draggedFissure ? (
            <DragPreview
              src={draggedFissure.image.url_fissura}
              alt={draggedFissure.image.nome}
            />
          ) : null}
        </DragOverlay>

        {modalFissure && (
          <FissureModal
            fissure={{
              id: String(modalFissure.fissure.id),
              imageUrl: modalFissure.image.url_fissura,
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
`;

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DirectionModal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-family: ${FONTS.primary};
  color: #58453d;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
`;

const DirectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DirectionButton = styled.button`
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-family: ${FONTS.primary};
  
  &:hover {
    border-color: #58453d;
    background: #f8f6f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(88, 69, 61, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const DirectionIcon = styled.div`
  font-size: 2rem;
  color: #58453d;
`;

const DirectionLabel = styled.span`
  color: #58453d;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid #e0e0e0;
  padding-top: 1.5rem;
`;

const CancelButton = styled.button`
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  cursor: pointer;
  font-family: ${FONTS.primary};
  font-size: 1rem;
  color: #666;
  transition: background-color 0.2s;
  
  &:hover {
    background: #e0e0e0;
  }
`;