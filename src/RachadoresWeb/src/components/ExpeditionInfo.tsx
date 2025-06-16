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
  nome: string;
  data_criacao: string;
  nome_responsavel: string;
}
const ExpeditionInfo: React.FC<ExpeditionInfoProps> = ({
  nome = "Expedição Inteli",
  data_criacao = "12/05/2025",
  nome_responsavel = "Pedro Silva"
}) => {
  return (
    <div style={expeditionInfoStyle}>
      <span style={expeditionTitleStyle}><strong>{nome}</strong></span>
      <span style={expeditionDetailStyle}>
        <strong>Data da expedição:</strong> {data_criacao}
      </span>
      <span style={expeditionDetailStyle}>
        <strong>Responsável:</strong> {nome_responsavel}
      </span>
    </div>
  );
};

export default ExpeditionInfo;