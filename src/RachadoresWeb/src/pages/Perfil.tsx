import React, { useState, useEffect, use } from "react";
import styled from "styled-components";
import Header from "../components/Header.tsx";
import { COLORS, FONTS, BREAKPOINTS } from "../constants/style";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
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

const GridExpedicoes = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: white;
  border: 2px solid #4a362c;
  border-radius: 24px;
  overflow: hidden;
  margin-top: 85px;
`;

const GridHeader = styled.div`
  background-color: #4a362c;
  color: white;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;

  &:first-of-type {
    border-top: none;
  }
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
  const [userData, setUserData] = useState({
    nome_completo: "",
    email: "",
    senha_atual: "",
    senha_nova: "",
    cargo: "",
    id: 0,
  });

  const [expedicoes, setExpedicoes] = useState([]);

  const updateProfile = async () => {
    const payload = {
      nome_completo: userData.nome_completo,
      email: userData.email,
      cargo: userData.cargo,
      id: userData.id,
    };
  
    if (userData.senha_atual !== "" && userData.senha_nova !== "") {
      payload.senha_antiga = userData.senha_atual;
      payload.senha_nova = userData.senha_nova;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await await axios.patch(
        "http://127.0.0.1:5000/user/update",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Usuário alterado");
    } catch (error) {
      console.error("Erro ao buscar expedições:", error);
    }
  };

  useEffect(() => {
    const mockExpeditions = [
      {
        id: 1,
        nome: "Inteli Smart Infra",
        data_criacao: "2024-05-18",
        logoClass: "inteli",
        icon: "🏙️",
      },
      {
        id: 2,
        nome: "IPT – Fissuras",
        data_criacao: "2024-06-02",
        logoClass: "ipt",
        icon: "🧱",
      },
      {
        id: 3,
        nome: "Rota SP Sustentável",
        data_criacao: "2024-04-10",
        logoClass: "custom",
        icon: "🌱",
      },
    ];

    setExpedicoes(mockExpeditions);
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:5000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Info Profile:", response.data.user);
      setUserData({
        nome_completo: response.data.user.nome_completo || "",
        email: response.data.user.email || "",
        cargo: response.data.user.cargo || "",
        senha_atual: "",
        senha_nova: "",
        id: response.data.user.id || 0
      });
    } catch (error) {
      console.error("Erro ao buscar expedições:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Header />
      <SectionLeft>
        <Title>Informações básicas</Title>

        <FieldGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            name="nome_completo"
            value={userData.nome_completo}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Cargo</Label>
          <Input
            type="text"
            name="cargo"
            value={userData.cargo}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Senha Atual</Label>
          <Input
            type="password"
            name="senha_atual"
            value={userData.senha_atual}
            onChange={handleChange}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>Nova Senha</Label>
          <Input
            type="password"
            name="senha_nova"
            value={userData.senha_nova}
            onChange={handleChange}
          />
        </FieldGroup>

        <Button onClick={updateProfile}>Salvar alterações</Button>
      </SectionLeft>

      <SectionRight>
        <GridExpedicoes>
          <GridHeader>Expedições lideradas:</GridHeader>
          {expedicoes.length > 0 ? (
            expedicoes.map((expedicao) => (
              <GridItem key={expedicao.id}>
                <ExpeditionLogo className={expedicao.logoClass || "custom"}>
                  {expedicao.icon || "📍"}
                </ExpeditionLogo>
                <ExpeditionInfo>
                  <ExpeditionName>{expedicao.nome}</ExpeditionName>
                  <ExpeditionDate>{expedicao.data_criacao}</ExpeditionDate>
                </ExpeditionInfo>
              </GridItem>
            ))
          ) : (
            <p style={{ padding: "20px", color: "#888" }}>
              Nenhuma expedição liderada encontrada.
            </p>
          )}
        </GridExpedicoes>
      </SectionRight>
    </Container>
  );
};

export default Perfil;
