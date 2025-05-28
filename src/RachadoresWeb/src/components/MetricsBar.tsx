import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS, BREAKPOINTS } from "../constants/style.ts";

const metrics = [
  { label: 'Imagens Processadas', value: 9 },
  { label: 'Taxa de Imagens com Erro', value: '0%' },
  { label: 'Taxa de Revisão Manual', value: '1%' },
  { label: 'Taxa de Detecção Automática', value: '99%' },
];

const MetricsBar = () => (
  <Bar>
    {metrics.map((m, i) => (
      <Metric key={i}>
        <strong>{m.value}</strong>
        <span>{m.label}</span>
      </Metric>
    ))}
  </Bar>
);

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.75rem;
  border-radius: 30px;
  border: 1px solid #ccc;
`;

const Metric = styled.div`
  text-align: center;
`;

export default MetricsBar;