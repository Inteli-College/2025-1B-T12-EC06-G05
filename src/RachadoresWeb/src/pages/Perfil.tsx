import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header.tsx";
import { COLORS, FONTS, BREAKPOINTS } from "../constants/style";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  height: 100vh;
  padding: 2rem 0;
  box-sizing: border-box;
  background-color: #fff;
  font-family: ${FONTS.primary};
`;


const SectionLeft = styled.section`
  flex: 1;
  padding-right: 2rem;
  border-right: 2px solid #ccc;
`;

const SectionRight = styled.section`
  flex: 1;
  padding-left: 2rem;
  overflow-y: auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${COLORS.secondary};
  margin-bottom: 1rem;
`;

const FieldGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
  text-align: left;
  color: #333;
`;

const Input = styled.input`
  padding: 0.8rem 1.25rem;
  border: none;
  border-radius: 15px;
  background-color: #e5e5e5;
  font-family: ${FONTS.primary};
  font-size: 1rem;
  color: #333;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: #d0d0d0;
  }

  &::placeholder {
    color: #888;
  }
`;

const Button = styled.button`
  background-color: ${COLORS.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  margin: 0 auto;

  &:hover {
    background-color: #1a0f08;
  }
`;

const ExpeditionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  cursor: default;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const ExpeditionLogo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  color: white;
  font-size: 24px;
  flex-shrink: 0;

  &.inteli {
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  }

  &.ipt {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
  }

  &.custom {
    background: linear-gradient(135deg, #f97316, #f59e0b);
  }
`;

const ExpeditionInfo = styled.div`
  flex: 1;
`;

const ExpeditionName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px 0;
`;

const ExpeditionDate = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const Perfil = () => {
  const [formData, setFormData] = useState({
    nome: "Pedro Silva",
    email: "pedro.silva@fissurai.org",
    senha: "********",
    cargo: "Pesquisador sênior",
  });

  const [expedicoes, setExpedicoes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Dados salvos:", formData);
  };

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/expedition/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpedicoes(response.data.expeditions || []);
      } catch (error) {
        console.error("Erro ao buscar expedições:", error);
      }
    };
    fetchExpeditions();
  }, []);

  return (
    <Container>
      <Header />
      <SectionLeft>
        <Title>Informações básicas</Title>
        {Object.entries(formData).map(([key, value]) => (
          <FieldGroup key={key}>
            <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
            <Input
              type={key === "senha" ? "password" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
            />
          </FieldGroup>
        ))}
        <Button onClick={handleSave}>Salvar alterações</Button>
      </SectionLeft>

      <SectionRight>
        <Title>Expedições lideradas</Title>
        {expedicoes.length > 0 ? (
          expedicoes.map((expedicao) => (
            <ExpeditionItem key={expedicao.id}>
              <ExpeditionLogo className={expedicao.logoClass || "custom"}>
                {expedicao.icon || "📍"}
              </ExpeditionLogo>
              <ExpeditionInfo>
                <ExpeditionName>{expedicao.nome}</ExpeditionName>
                <ExpeditionDate>{expedicao.data_criacao}</ExpeditionDate>
              </ExpeditionInfo>
            </ExpeditionItem>
          ))
        ) : (
          <p style={{ color: "#888" }}>Nenhuma expedição liderada encontrada.</p>
        )}
      </SectionRight>
    </Container>
  );
};

export default Perfil;
