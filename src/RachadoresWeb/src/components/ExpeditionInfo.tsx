import React from "react";
import { COLORS } from "../constants/style"; 

const expeditionInfoStyle = {
  backgroundColor: "#fff",
  border: "0.6px solid #000000", // Borda mais grossa e visível
  borderRadius: "32px",
  padding: "1.5rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "1rem",
  marginBottom: "1.5rem",
};

const expeditionTitleStyle = {
  fontWeight: 600,
  fontSize: "1.3rem",
  color: "#1F2937",
};

const expeditionDetailStyle = {
  color: COLORS.black,
  fontSize: "1rem",
};

interface ExpeditionInfoProps {
  nomeExpedicao?: string;
  dataExpedicao?: string;
  responsavel?: string;
}

const ExpeditionInfo: React.FC<ExpeditionInfoProps> = ({
  nomeExpedicao = "Expedição Inteli",
  dataExpedicao = "12/05/2025",
  responsavel = "Pedro Silva"
}) => {
  return (
    <div style={expeditionInfoStyle}>
      <span style={expeditionTitleStyle}><strong>{nomeExpedicao}</strong></span>
      <span style={expeditionDetailStyle}>
        <strong>Data da expedição:</strong> {dataExpedicao}
      </span>
      <span style={expeditionDetailStyle}>
        <strong>Responsável:</strong> {responsavel}
      </span>
    </div>
  );
};

export default ExpeditionInfo;