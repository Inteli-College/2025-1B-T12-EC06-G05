import React, { useState, useEffect } from "react";
import { COLORS, FONTS, BREAKPOINTS } from "../constants/style";
import uploadIcon from "../constants/assets/iconUpload.svg";
import styled from "styled-components"
import axios from "axios";
import Lottie from "lottie-react";
import certo from "../constants/assets/animations/certo2.json";

interface ModalAddPredioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (predioData: PredioData) => void;
  idExpedicaoAtual: number;
}

// Modal de Cadastro concluído com sucesso
const ModalOverlayM = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
`;

const ModalContentM = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  font-family: ${FONTS.primary};
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    color: ${COLORS.secondary};
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.6rem 1.2rem;
    background-color: ${COLORS.secondary};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background-color: #1a0f08;
    }
  }
`;

interface PredioData {
  nome: string;
  complemento: string;
  idExpedicao: number;
  dataColeta: string;
  horaInicio: string;
  descricao: string;
  horaFim: string;
  fotoPrincipal: File | null;
  fotosZonas: Record<string, File[]>;
}

const zonas = [
  "norte",
  "sul",
  "leste",
  "oeste",
  "sudeste",
  "sudoeste",
  "noroeste",
  "nordeste",
];

const ModalAddPredio: React.FC<ModalAddPredioProps> = ({
  isOpen,
  onClose,
  onSave,
  idExpedicaoAtual,
}) => {
  const [formData, setFormData] = useState<PredioData>({
    nome: "",
    complemento: "",
    idExpedicao: idExpedicaoAtual,
    dataColeta: "",
    horaInicio: "",
    horaFim: "",
    descricao: "",
    fotoPrincipal: null,
    fotosZonas: zonas.reduce((acc, zona) => {
      acc[zona] = [];
      return acc;
    }, {} as Record<string, File[]>),
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOkClick = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "http://localhost:5000/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data.url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      return null;
    }
  };

  const handleInputChange = (field: keyof PredioData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nome: "",
        complemento: "",
        idExpedicao: idExpedicaoAtual,
        dataColeta: "",
        horaInicio: "",
        horaFim: "",
        fotoPrincipal: null,
        fotosZonas: zonas.reduce((acc, zona) => {
          acc[zona] = [];
          return acc;
        }, {} as Record<string, File[]>),
      });
    }
  }, [idExpedicaoAtual, isOpen]);

  const handleFileUpload = (zona: string, files: FileList) => {
    const newFiles = Array.from(files);
    setFormData((prev) => ({
      ...prev,
      fotosZonas: {
        ...prev.fotosZonas,
        [zona]: [...prev.fotosZonas[zona], ...newFiles],
      },
    }));
  };

  const handleMainPhotoUpload = (file: File) => {
    setFormData((prev) => ({ ...prev, fotoPrincipal: file }));
  };

  const handleSave = async () => {
    try {
      let fachadaUrl = "";
      if (formData.fotoPrincipal) {
        const uploaded = await uploadImage(formData.fotoPrincipal);
        if (!uploaded) {
          alert("Erro ao enviar imagem de fachada.");
          return;
        }
        fachadaUrl = uploaded;
      }

      const payload = {
        nome: formData.nome,
        complemento: formData.complemento,
        id_expedicao: idExpedicaoAtual,
        descricao: formData.descricao,
        foto_fachada: fachadaUrl,
      };

      const response = await axios.post(
        "http://localhost:5000/building/register",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const idPredio = response.data?.predioInformation?.id;
      if (!idPredio) throw new Error("ID do prédio não retornado.");
      console.log("🆔 Novo prédio criado com ID:", idPredio);
      console.log("🔁 Response do backend:", response.data);

      if (formData.fotoPrincipal) {
        const fachadaUrl = await uploadImage(formData.fotoPrincipal);
        if (fachadaUrl) {
          await axios.patch(
            "http://localhost:5000/building/update",
            {
              id: idPredio,
              foto_fachada: fachadaUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
        }
      }

      // 3. Faz o upload das imagens por zona
      for (const zona of zonas) {
        const arquivos = formData.fotosZonas[zona];
        for (const file of arquivos) {
          const imgUrl = await uploadImage(file);
          if (!imgUrl) continue;

          const dataFormatada = new Date(formData.dataColeta).toISOString().split("T")[0];

          await axios.post(
            "http://localhost:5000/image/add",
            {
              url: imgUrl,
              nome: file.name,
              hora_coleta: dataFormatada,
              orientacao: zona,
              id_predio: idPredio,
              id_modelo: null,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
        }
      }


      const res = await axios.post(
        `http://localhost:5000/model/run/building/${idPredio}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        setShowSuccessModal(true);
        return;
      }

      // 4. Finaliza
      if (onSave) onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar prédio e imagens:", error);
      alert("Erro ao salvar prédio e imagens.");
    }
  };

  const getZoneIcon = (zona: string) => {
    switch (zona) {
      case "norte":
        return "N";
      case "sul":
        return "S";
      case "leste":
        return "L";
      case "oeste":
        return "O";
      case "nordeste":
        return "NE";
      case "noroeste":
        return "NO";
      case "sudeste":
        return "SE";
      case "sudoeste":
        return "SO";
      default:
        return "";
    }
  };

  const renderZoneUpload = (zona: keyof PredioData["fotosZonas"]) => {
    const isMainDirection = ["norte", "sul", "leste", "oeste"].includes(zona);
    const iconSize = isMainDirection ? "2rem" : "1.5rem";
    const photoCount = formData.fotosZonas[zona].length;
    const hasPhotos = photoCount > 0;

    return (
      <div key={zona}>
        <input
          type="file"
          id={`file-${zona}`}
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) handleFileUpload(zona, files);
          }}
        />
        <label
          htmlFor={`file-${zona}`}
          style={{
            width: "100px",
            height: "100px",
            border: hasPhotos
              ? `2px solid ${COLORS.primary}`
              : "2px solid #D1D5DB",
            borderRadius: "12px",
            backgroundColor: hasPhotos ? "#FEF3E2" : "#F3F4F6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          {hasPhotos && (
            <div
              style={{
                position: "absolute",
                top: "4px",
                right: "4px",
                backgroundColor: "#10B981",
                color: "white",
                borderRadius: "10px",
                fontSize: "0.7rem",
                fontWeight: "bold",
                padding: "2px 6px",
              }}
            >
              {photoCount}
            </div>
          )}
          <div
            style={{ fontSize: iconSize, color: "#9CA3AF", fontWeight: "bold" }}
          >
            {hasPhotos ? "✔️" : getZoneIcon(zona)}
          </div>
        </label>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {showSuccessModal && (
        <ModalOverlayM>
          <ModalContentM>
            <Lottie
              animationData={certo}
              style={{ width: 150, height: 150 }}
            />
            <h3>Cadastro realizado com sucesso!</h3>
            <p>Você já pode fazer login com seu email e senha.</p>
            <button onClick={handleOkClick}>Ok!</button>
          </ModalContentM>
        </ModalOverlayM>
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.white,
            borderRadius: "32px",
            padding: "2rem",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: COLORS.black,
                margin: 0,
              }}
            >
              Cadastrar um prédio
            </h2>
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: COLORS.black,
                padding: "0.5rem",
              }}
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
              {["nome", "complemento"].map((field) => (
                <div
                  key={field}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: COLORS.black,
                    }}
                  >
                    {field === "nome" ? "Nome" : "Complemento"}
                  </label>
                  <input
                    type="text"
                    value={formData[field] as string}
                    onChange={(e) =>
                      handleInputChange(field as keyof PredioData, e.target.value)
                    }
                    placeholder={
                      field === "nome"
                        ? "Insira o nome do prédio aqui"
                        : "Ex: bloco A"
                    }
                    style={{
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "20px",
                      fontSize: "1rem",
                      backgroundColor: COLORS.inputBg,
                    }}
                  />
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: COLORS.black,
                  }}
                >
                  Descrição
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => handleInputChange("descricao", e.target.value)}
                  placeholder="Ex: Prédio antigo, necessita de inspeção completa"
                  style={{
                    padding: "0.75rem",
                    border: "1px solid #D1D5DB",
                    borderRadius: "20px",
                    fontSize: "1rem",
                    backgroundColor: COLORS.inputBg,
                    minHeight: "80px",
                    resize: "vertical",
                  }}
                />
              </div>

              {["dataColeta", "horaInicio", "horaFim"].map((field) => (
                <div
                  key={field}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: COLORS.black,
                    }}
                  >
                    {field === "dataColeta"
                      ? "Data da coleta"
                      : field === "horaInicio"
                        ? "Hora de início"
                        : "Hora de fim"}
                  </label>
                  <input
                    type={field === "dataColeta" ? "date" : "time"}
                    value={formData[field] as string}
                    onChange={(e) =>
                      handleInputChange(field as keyof PredioData, e.target.value)
                    }
                    style={{
                      padding: "0.75rem",
                      border: "1px solid #D1D5DB",
                      borderRadius: "20px",
                      fontSize: "1rem",
                      backgroundColor: COLORS.inputBg,
                    }}
                  />
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <label
                  style={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: COLORS.black,
                  }}
                >
                  Foto do prédio
                </label>
                <input
                  type="file"
                  id="main-photo-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    handleMainPhotoUpload(e.target.files[0])
                  }
                />
                <label
                  htmlFor="main-photo-upload"
                  style={{
                    borderRadius: "16px",
                    backgroundColor: formData.fotoPrincipal
                      ? "#FEF3E2"
                      : "#D9D9D9",
                    border: formData.fotoPrincipal
                      ? `2px solid ${COLORS.primary}`
                      : "2px solid #D9D9D9",
                    padding: "0",
                    textAlign: "center",
                    color: "#6B7280",
                    cursor: "pointer",
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {formData.fotoPrincipal ? (
                    <div
                      style={{
                        fontSize: "1.5rem",
                        color: COLORS.primary,
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </div>
                  ) : (
                    <img
                      src={uploadIcon}
                      alt="Upload"
                      style={{ width: "1.3rem", height: "1.3rem", opacity: 0.6 }}
                    />
                  )}
                </label>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  border: "2px solid #E5E7EB",
                  borderRadius: "20px",
                  padding: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: COLORS.black,
                    marginBottom: "0.5rem",
                  }}
                >
                  Upload de imagens
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6B7280",
                    marginBottom: "1.5rem",
                  }}
                >
                  Selecione a direção da fachada em que quer fazer o upload da
                  foto ou imagens
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {zonas.map(renderZoneUpload)}
                </div>
                <button
                  style={{
                    backgroundColor: COLORS.tablePredioTop,
                    color: COLORS.white,
                    border: "none",
                    borderRadius: "8px",
                    padding: "0.75rem 2rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    alignSelf: "flex-end",
                    marginTop: "1rem",
                  }}
                  onClick={handleSave}
                >
                  🏢 Criar prédio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddPredio;
