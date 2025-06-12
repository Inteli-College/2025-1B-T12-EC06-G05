    import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
    import React, { useEffect, useState } from "react";
    import styled from "styled-components";

    // por_orientacao={metricas.por_orientacao}
    //         quantidade_termicas={metricas.quantidade_termicas}
    //         quantidade_retracao={metricas.quantidade_retracao}

    const COLORS = ['#f57c00', '#bf360c'];

    const FissureCharts = ({ por_orientacao, quantidade_termicas, quantidade_retracao }) => {
        const pieData = [
          { name: 'Retração', value: quantidade_retracao },
          { name: 'Térmicas', value: quantidade_termicas }
        ];
      
        // Mapear nomes completos para siglas, se necessário
        const orientacoesSiglas = {
          norte: 'N',
          nordeste: 'NE',
          sul: 'S',
          sudeste: 'SE',
          oeste: 'O',
          leste: 'L',
          noroeste: 'NO',
          sudoeste: 'SO'
        };
      
        const barData = Object.entries(por_orientacao).map(
          ([orientacao, valores]) => ({
            name: orientacoesSiglas[orientacao] || orientacao,
            value: valores.total
          })
        );
      
        return (
          <ChartWrapper>
            <PieChart width={200} height={200}>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} label>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
      
            <BarChart width={250} height={200} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8d6e63" />
            </BarChart>
      
            <ExportButton>📄 Exportar relatório</ExportButton>
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