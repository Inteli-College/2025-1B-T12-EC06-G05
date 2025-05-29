import React, { useState } from "react";
import styled from "styled-components";
import { COLORS, BREAKPOINTS } from "../constants/style.ts";
import axios from "axios";

interface ExpeditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expeditionData: any) => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 720px; /* Aumentado de 520px para 720px */
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: ${BREAKPOINTS.tablet || "768px"}) {
    max-width: 600px;
  }

  @media (max-width: ${BREAKPOINTS.mobile || "480px"}) {
    max-width: 95%;
    margin: 10px;
  }
`;

const ModalHeader = styled.div`
  padding: 32px 32px 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${BREAKPOINTS.mobile || "480px"}) {
    padding: 24px 24px 0 24px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;

  @media (max-width: ${BREAKPOINTS.mobile || "480px"}) {
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6b7280;
    background-color: #f3f4f6;
    border-radius: 6px;
  }
`;

const ModalBody = styled.div`
  padding: 32px;

  @media (max-width: ${BREAKPOINTS.mobile || "480px"}) {
    padding: 24px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px; /* Aumentado de 20px para 24px */
  margin-bottom: 24px;

  @media (max-width: ${BREAKPOINTS.tablet || "768px"}) {
    gap: 20px;
  }

  @media (max-width: ${BREAKPOINTS.mobile || "480px"}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  color: #111827;
  background-color: #f9fafb;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border-color: #f97316;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  color: #111827;
  background-color: #f9fafb;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border-color: #f97316;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
  }
`;

const FileUploadContainer = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background-color: #f9fafb;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #f97316;
    background-color: #fef3e2;
  }

  @media (max-width: ${BREAKPOINTS.mobile || "480px"}) {
    padding: 30px 15px;
  }
`;

const FileUploadIcon = styled.div`
  font-size: 32px;
  color: #9ca3af;
  margin-bottom: 12px;
`;

const FileUploadText = styled.p`
  color: #6b7280;
  font-size: 16px;
  margin: 0;
  font-weight: 500;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  justify-content: flex-end;

  @media (max-width: ${BREAKPOINTS.mobile || "480px"}) {
    flex-direction: column-reverse;
    gap: 12px;
  }
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  min-width: 120px;

  @media (max-width: ${BREAKPOINTS.mobile || "480px"}) {
    min-width: auto;
    width: 100%;
  }

  ${(props) =>
    props.variant === "primary"
      ? `
    background-color: #6b5b73;
    color: white;
    
    &:hover {
      background-color: #5a4a63;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(107, 91, 115, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `
      : `
    background-color: #f3f4f6;
    color: #6b7280;
    border: 1px solid #e5e7eb;
    
    &:hover {
      background-color: #e5e7eb;
      color: #374151;
    }
  `}
`;

const ExpeditionModal: React.FC<ExpeditionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  responsavelId,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    data_criacao: "",
    localizacao: "",
    foto_capa: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      foto_capa: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const jsonToSend = {
      nome: formData.nome,
      descricao: formData.descricao,
      data_criacao: formData.data_criacao,
      localizacao: formData.localizacao,
      id_responsavel: responsavelId
    };

    const response = await axios.post(
      "http://localhost:5000/expedition/register",
      jsonToSend,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    );

    onSubmit(response.data);
    onClose();
    setFormData({
      nome: "",
      descricao: "",
      data_criacao: "",
      localizacao: "",
      foto_capa: null,
    });

  } catch (error) {
    console.error("Erro ao enviar expedição:", error);
  }
};

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isFormValid =
    formData.nome.trim() &&
    formData.descricao.trim() &&
    formData.data_criacao.trim() &&
    formData.localizacao.trim();

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Cadastrar uma expedição</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Insira o nome da expedição aqui"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="descricao">Descrição</Label>
                <TextArea
                  id="descricao"
                  name="descricao"
                  placeholder="Insira a descrição aqui"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="data_criacao">Data da expedição</Label>
                <Input
                  id="data_criacao"
                  name="data_criacao"
                  type="date"
                  value={formData.data_criacao}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="localizacao">Localização</Label>
                <Input
                  id="localizacao"
                  name="localizacao"
                  type="text"
                  placeholder="Insira a localização aqui"
                  value={formData.localizacao}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Foto da expedição</Label>
              <FileUploadContainer
                onClick={() => document.getElementById("foto_capa")?.click()}
              >
                <FileUploadIcon>📷</FileUploadIcon>
                <FileUploadText>
                  {formData.foto_capa
                    ? formData.foto_capa.name
                    : "Clique para adicionar uma foto"}
                </FileUploadText>
              </FileUploadContainer>
              <HiddenFileInput
                id="foto_capa"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </FormGroup>

            <ButtonContainer>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={!isFormValid}>
                Criar expedição
              </Button>
            </ButtonContainer>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ExpeditionModal;
