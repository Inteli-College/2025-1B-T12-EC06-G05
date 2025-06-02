    import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
    import React, { useEffect, useState } from "react";
    import styled from "styled-components";

    const pieData = [
    { name: 'Fissuras térmicas', value: 33 },
    { name: 'Fissuras de retração', value: 67 },
    ];

    const barData = [
    { name: 'N', value: 40 },
    { name: 'S', value: 30 },
    { name: 'L', value: 25 },
    { name: 'O', value: 20 },
    ];

    const COLORS = ['#f57c00', '#bf360c'];

    const FissureCharts = () => (
    <ChartWrapper>
        <PieChart width={200} height={200}>
        <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} label>
            {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
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