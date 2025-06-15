import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// por_orientacao={metricas.por_orientacao}
//         quantidade_termicas={metricas.quantidade_termicas}
//         quantidade_retracao={metricas.quantidade_retracao}

const COLORS = ["#f57c00", "#bf360c"];

const FissureCharts = ({
  por_orientacao,
  quantidade_termicas,
  quantidade_retracao,
  id_predio,
  token
}) => {
  const pieData = [
    { name: "Retração", quantidade: quantidade_retracao },
    { name: "Térmicas", quantidade: quantidade_termicas },
  ];

  // Mapear nomes completos para siglas, se necessário
  const orientacoesSiglas = {
    norte: "N",
    nordeste: "NE",
    sul: "S",
    sudeste: "SE",
    oeste: "O",
    leste: "L",
    noroeste: "NO",
    sudoeste: "SO",
  };

  const barData = Object.entries(por_orientacao).map(
    ([orientacao, valores]) => ({
      name: orientacoesSiglas[orientacao] || orientacao,
      quantidade: valores.total,
    })
  );

  const handleExport = async () => {
    try {
      const pdf = await axios.get(`http://localhost:5000/report/${id_predio}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(
        new Blob([pdf.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `relatorio_id_predio${id_predio}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      alert("Relatório exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar relatório:", error);
      alert("Falha ao exportar relatório.");
    }
  };

  return (
    <ChartWrapper>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <PieChart width={200} height={200}>
          <Pie
            data={pieData}
            dataKey="quantidade"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>

        {/* Legenda personalizada */}
        <div style={{ marginTop: "1rem" }}>
          {pieData.map((entry, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: 8,
                  borderRadius: "2px",
                }}
              />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      <BarChart width={250} height={200} data={barData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantidade" fill="#8d6e63" />
      </BarChart>

      <ExportButton onClick={handleExport}>📄 Exportar relatório</ExportButton>
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ExportButton = styled.button`
  padding: 0.5rem 1rem;
  background: #3e2723;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default FissureCharts;
