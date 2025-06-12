// Página de Logs - FissurAI
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS, FONTS } from "../constants/style";
import Header from "../components/Header";
import axios from "axios";

interface Log {
  id: number;
  descricao: string;
  tipo: string;
  status: string;
  data: string;
}

const Container = styled.div`
  background-color: ${COLORS.background};
  min-height: 100vh;
  padding-top: 110px;
  font-family: ${FONTS.primary};
`;

const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: ${COLORS.secondary};
  margin-bottom: 24px;
  text-align: left;
`;

const TableWrapper = styled.div`
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid #4a362c;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
`;

const TableHead = styled.thead`
  background-color: #4a362c;
  color: white;
  height: 48px;
`;

const Th = styled.th`
  padding: 24px 20px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  position: relative;

  &::after {
    content: "\25BE";
    font-size: 12px;
    position: absolute;
    right: 16px;
  }
`;

const TableBody = styled.tbody`
  background-color: white;
`;

const Td = styled.td`
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const EmptyRow = styled.tr`
  td {
    padding: 32px;
    text-align: center;
    color: #888;
    font-style: italic;
  }
`;

const Logs = () => {
  const [logs, setLogs] = useState<Log[]>([ // mockado
    {
      id: 1,
      descricao: "Pedro fez login na plataforma FissurAI",
      tipo: "Login",
      status: "Efetivado",
      data: "12/05/2025"
    },
    {
      id: 2,
      descricao: "Pedro fez login na plataforma FissurAI",
      tipo: "Login",
      status: "Efetivado",
      data: "12/05/2025"
    },
    {
      id: 3,
      descricao: "Pedro fez login na plataforma FissurAI",
      tipo: "Login",
      status: "Efetivado",
      data: "12/05/2025"
    }
  ]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/logs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.logs.length > 0) {
          setLogs(response.data.logs);
        }
      } catch (error) {
        console.error("Erro ao buscar logs:", error);
      }
    };

    // fetchLogs(); // desabilitado enquanto mock
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Title>Logs</Title>
        <TableWrapper>
          <Table>
            <TableHead>
              <tr>
                <Th>Descrição</Th>
                <Th>Tipo</Th>
                <Th>Status</Th>
                <Th>Data</Th>
              </tr>
            </TableHead>
            <TableBody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id}>
                    <Td>{log.descricao}</Td>
                    <Td>{log.tipo}</Td>
                    <Td>{log.status}</Td>
                    <Td>{log.data}</Td>
                  </tr>
                ))
              ) : (
                <EmptyRow>
                  <td colSpan={4}>Nenhum dado encontrado.</td>
                </EmptyRow>
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </Content>
    </Container>
  );
};

export default Logs;
