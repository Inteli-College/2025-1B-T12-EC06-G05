import React, { useState } from "react";
import { COLORS } from "../constants/style";
import uploadIcon from "../constants/assets/iconUpload.svg";

interface ModalAddPredioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (predioData: PredioData) => void;
}

interface PredioData {
  nome: string;
  dataColeta: string;
  horaInicio: string;
  horaFim: string;
  fotoPrincipal: File | null; 
  fotosZonas: {
    norte: File[];
    sul: File[];
    leste: File[];
    oeste: File[];
    sudeste: File[];
    sudoeste: File[];
    noroeste: File[];
    nordeste: File[];
  };
}

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const popupStyle = {
  backgroundColor: COLORS.white,
  borderRadius: "32px",
  padding: "2rem",
  width: "90%",
  maxWidth: "800px",
  maxHeight: "90vh",
  overflowY: "auto" as const,
  position: "relative" as const,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
};

const titleStyle = {
  fontSize: "1.5rem",
  fontWeight: 600,
  color: COLORS.black,
  margin: 0,
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
  color: COLORS.black,
  padding: "0.5rem",
};

const contentStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2rem",
};

const leftColumnStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "1.5rem",
};

const rightColumnStyle = {
  display: "flex",
  flexDirection: "column" as const,
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "0.5rem",
};

const labelStyle = {
  fontSize: "1rem",
  fontWeight: 500,
  color: COLORS.black,
  textAlign: "left" as const,
  alignSelf: "flex-start",
  width: "100%",
};

const inputStyle = {
  padding: "0.75rem",
  border: "1px solid #D1D5DB",
  borderRadius: "20px",
  fontSize: "1rem",
  backgroundColor: COLORS.inputBg,
};

const timeContainerStyle = {
  display: "flex",
  gap: "0.1rem",
  alignItems: "center",
};

const timeFieldStyle = {
  flex: 1,
};

const uploadSectionStyle = {
  border: "2px solid #E5E7EB",
  borderRadius: "20px",
  padding: "1.5rem",
};

const uploadTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: 600,
  color: COLORS.black,
  marginBottom: "0.5rem",
};

const uploadSubtitleStyle = {
  fontSize: "0.875rem",
  color: "#6B7280",
  marginBottom: "1.5rem",
};

const zonesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "1rem",
  marginBottom: "1.5rem",
};

const zoneButtonStyle = {
  width: "100px",
  height: "100px",
  border: "2px solid #D1D5DB",
  borderRadius: "12px",
  backgroundColor: "#F3F4F6",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  position: "relative" as const,
};

const photoCountStyle = {
  position: "absolute" as const,
  top: "4px",
  right: "4px",
  backgroundColor: "#10B981",
  color: "white",
  borderRadius: "10px",
  fontSize: "0.7rem",
  fontWeight: "bold",
  padding: "2px 6px",
  minWidth: "16px",
  textAlign: "center" as const,
};

const zoneIconStyle = {
  fontSize: "2rem",
  color: "#9CA3AF",
  marginBottom: "0.25rem",
};

const saveButtonStyle = {
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
};

const hiddenInputStyle = {
  display: "none",
};

const ModalAddPredio: React.FC<ModalAddPredioProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<PredioData>({
    nome: "",
    dataColeta: "",
    horaInicio: "",
    horaFim: "",
    fotoPrincipal: null,
    fotosZonas: {
      norte: [],
      sul: [],
      leste: [],
      oeste: [],
      sudeste: [],
      sudoeste: [],
      noroeste: [],
      nordeste: [],
    },
  });

  if (!isOpen) return null;

  const handleInputChange = (field: keyof Omit<PredioData, 'fotosZonas' | 'fotoPrincipal'>, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (zona: keyof PredioData['fotosZonas'], files: FileList) => {
    const newFiles = Array.from(files);
    setFormData(prev => ({
      ...prev,
      fotosZonas: { ...prev.fotosZonas, [zona]: [...prev.fotosZonas[zona], ...newFiles] }
    }));
  };

  const handleMainPhotoUpload = (file: File) => {
    setFormData(prev => ({ ...prev, fotoPrincipal: file }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getZoneIcon = (zona: string) => {
    switch (zona) {
      case 'norte': return 'N';
      case 'sul': return 'S';
      case 'leste': return 'L';
      case 'oeste': return 'O';
      case 'nordeste': return 'NE';
      case 'noroeste': return 'NO';
      case 'sudeste': return 'SE';
      case 'sudoeste': return 'SO';
      default: return '';
    }
  };

  const renderZoneUpload = (zona: keyof PredioData['fotosZonas']) => {
    const isMainDirection = ['norte', 'sul', 'leste', 'oeste'].includes(zona);
    const iconSize = isMainDirection ? '2rem' : '1.5rem';
    const photoCount = formData.fotosZonas[zona].length;
    const hasPhotos = photoCount > 0;
    
    return (
      <div key={zona}>
        <input
          type="file"
          id={`file-${zona}`}
          accept="image/*"
          multiple
          style={hiddenInputStyle}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) handleFileUpload(zona, files);
          }}
        />
        <label
          htmlFor={`file-${zona}`}
          style={{
            ...zoneButtonStyle,
            borderColor: hasPhotos ? COLORS.primary : '#D1D5DB',
            backgroundColor: hasPhotos ? '#FEF3E2' : '#F3F4F6',
          }}
        >
          {hasPhotos && (
            <div style={photoCountStyle}>
              {photoCount}
            </div>
          )}
          <div style={{
            ...zoneIconStyle,
            fontSize: iconSize,
            fontWeight: 'bold'
          }}>
            {hasPhotos ? '✔️' : getZoneIcon(zona)}
          </div>
        </label>
      </div>
    );
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={popupStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Cadastrar um prédio</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={contentStyle}>
          <div style={leftColumnStyle}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Nome</label>
              <input
                type="text"
                placeholder="Insira o nome do prédio aqui"
                style={inputStyle}
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Data da coleta</label>
              <input
                type="date"
                style={inputStyle}
                value={formData.dataColeta}
                onChange={(e) => handleInputChange('dataColeta', e.target.value)}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Hora da coleta</label>
              <div style={timeContainerStyle}>
                <div style={timeFieldStyle}>
                  <input
                    type="time"
                    placeholder="HH:mm"
                    style={inputStyle}
                    value={formData.horaInicio}
                    onChange={(e) => handleInputChange('horaInicio', e.target.value)}
                  />
                  <small style={{ color: '#6B7280', fontSize: '0.75rem' }}>Início</small>
                </div>
                <div style={timeFieldStyle}>
                  <input
                    type="time"
                    placeholder="HH:mm"
                    style={inputStyle}
                    value={formData.horaFim}
                    onChange={(e) => handleInputChange('horaFim', e.target.value)}
                  />
                  <small style={{ color: '#6B7280', fontSize: '0.75rem' }}>Fim</small>
                </div>
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Foto do prédio</label>
              <input
                type="file"
                id="main-photo-upload"
                accept="image/*"
                style={hiddenInputStyle}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleMainPhotoUpload(file);
                }}
              />
              <label
                htmlFor="main-photo-upload"
                style={{
                  borderRadius: "16px",
                  backgroundColor: formData.fotoPrincipal ? "#FEF3E2" : "#D9D9D9",
                  border: formData.fotoPrincipal ? `2px solid ${COLORS.primary}` : "2px solid #D9D9D9",
                  padding: "0",
                  textAlign: "center" as const,
                  color: "#6B7280",
                  cursor: "pointer",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                {formData.fotoPrincipal ? (
                  <div style={{
                    fontSize: "1.5rem",
                    color: COLORS.primary,
                    fontWeight: "bold",
                  }}>
                    ✓
                  </div>
                ) : (
                  <img 
                    src={uploadIcon} 
                    alt="Upload" 
                    style={{ 
                      width: "1.3rem", 
                      height: "1.3rem",
                      opacity: 0.6 
                    }}
                  />
                )}
              </label>
            </div>
          </div>

          <div style={rightColumnStyle}>
            <div style={uploadSectionStyle}>
              <h3 style={uploadTitleStyle}>Upload de imagens</h3>
              <p style={uploadSubtitleStyle}>
                Selecione a direção da fachada em que quer fazer o upload da foto ou imagens
              </p>

              <div style={zonesGridStyle}>
                {/* Primeira linha: N, S, L, O */}
                {renderZoneUpload('norte')}
                {renderZoneUpload('sul')}
                {renderZoneUpload('leste')}
                {renderZoneUpload('oeste')}
                
                {/* Segunda linha: NE, NO, SE, SO */}
                {renderZoneUpload('nordeste')}
                {renderZoneUpload('noroeste')}
                {renderZoneUpload('sudeste')}
                {renderZoneUpload('sudoeste')}
              </div>

              <button style={saveButtonStyle} onClick={handleSave}>
                🏢 Criar prédio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddPredio;