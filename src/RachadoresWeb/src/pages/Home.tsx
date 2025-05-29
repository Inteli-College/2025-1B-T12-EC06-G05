import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { COLORS, BREAKPOINTS } from "../constants/style.ts";
import Header from "../components/Header.tsx";
import ExpeditionModal from "../components/ExpeditionModal.tsx";
import axios from "axios";

const Container = styled.div`
  background-color: ${COLORS.background};
  min-height: 100vh;
  padding-top: 110px;
`;

const MainContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 24px 100px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px 16px 100px;
  }
`;

const ExpeditionsCard = styled.div`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 40px;
`;

const ExpeditionsHeader = styled.div`
  background-color: #6b5b73;
  color: white;
  padding: 20px 32px;
  font-size: 18px;
  font-weight: 500;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 16px 20px;
    font-size: 16px;
  }
`;

const SearchSection = styled.div`
  padding: 32px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px;
    gap: 16px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  background-color: #e5e7eb;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  color: #374151;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    background-color: #f3f4f6;
    box-shadow: 0 0 0 2px #f97316;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 14px 16px;
    font-size: 14px;
  }
`;

const ExpeditionsList = styled.div`
  padding: 32px;
  background-color: white;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px;
  }
`;

const ExpeditionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  transition: all 0.15s ease;
  border-bottom: 1px solid #f3f4f6;
  border-radius: 8px;
  margin: 0 -8px;
  padding-left: 8px;
  padding-right: 8px;

  &:hover {
    background-color: #f9fafb;
    transform: translateX(4px);
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 16px 8px;
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

  @media (max-width: ${BREAKPOINTS.mobile}) {
    width: 48px;
    height: 48px;
    margin-right: 16px;
    font-size: 20px;
  }
`;

const ExpeditionInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ExpeditionName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px 0;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 16px;
  }
`;

const ExpeditionDate = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 13px;
  }
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 64px;
  height: 64px;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 28px;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.15s ease;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #4b5563;
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    font-size: 24px;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
  font-size: 16px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 32px 16px;
    font-size: 14px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #9ca3af;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 32px 16px;
  }
`;

const EmptyStateIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 40px;
  }
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 14px;
  }
`;

interface Expedition {
  id: number;
  descricao: string;
  data_criacao: string;
  logoClass?: string;
  icon?: string;
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/expedition/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API response:", response.data.expeditions);
        setExpeditions(response.data.expeditions);
      } catch (error) {
        console.error("Erro ao buscar expedições:", error);
      }
    };

    fetchExpeditions();
  }, []);

  const filteredExpeditions = expeditions.filter((expedition) => {
    const matchesName = expedition.descricao
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate =
      searchDate === "" || expedition.data_criacao.includes(searchDate);
    return matchesName && matchesDate;
  });

  const handleAddExpedition = (expeditionData: any) => {
    const newExpedition: Expedition = {
      id: Date.now(),
      descricao:
        expeditionData.name || expeditionData.descricao || "Nova expedição",
      data_criacao:
        expeditionData.date || new Date().toISOString().split("T")[0],
      logoClass: "custom",
      icon: "🏗️",
    };
    setExpeditions((prev) => [...prev, newExpedition]);
    setIsModalOpen(false);
  };

  const handleExpeditionClick = (expedition: Expedition) => {
    console.log("Expedição clicada:", expedition);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchDate("");
  };

  return (
    <Container>
      <Header />
      <MainContent>
        <ExpeditionsCard>
          <ExpeditionsHeader>Expedições</ExpeditionsHeader>

          <SearchSection>
            <SearchInput
              type="text"
              placeholder="Insira o nome do prédio aqui"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchInput
              type="text"
              placeholder="Insira a data aqui (DD/MM/AAAA)"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </SearchSection>

          <ExpeditionsList>
            {expeditions.length === 0 ? (
              <EmptyState>
                <EmptyStateIcon>📋</EmptyStateIcon>
                <EmptyStateText>
                  Nenhuma expedição cadastrada ainda.
                  <br />
                  Clique no botão + para adicionar uma nova!
                </EmptyStateText>
              </EmptyState>
            ) : filteredExpeditions.length > 0 ? (
              filteredExpeditions.map((expedition) => (
                <ExpeditionItem
                  key={expedition.id}
                  onClick={() => handleExpeditionClick(expedition)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleExpeditionClick(expedition);
                    }
                  }}
                >
                  <ExpeditionLogo className={expedition.logoClass}>
                    {expedition.foto_capa ? (
                      <img
                        src={expedition.foto_capa}
                        alt={`Logo da expedição ${expedition.descricao}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      expedition.icon
                    )}
                  </ExpeditionLogo>
                  <ExpeditionInfo>
                    <ExpeditionName>{expedition.descricao}</ExpeditionName>
                    <ExpeditionDate>{expedition.data_criacao}</ExpeditionDate>
                  </ExpeditionInfo>
                </ExpeditionItem>
              ))
            ) : (
              <NoResults>
                <div style={{ marginBottom: "16px" }}>🔍</div>
                Nenhuma expedição encontrada com os filtros aplicados.
                <br />
                <button
                  onClick={clearSearch}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#f97316",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginTop: "8px",
                  }}
                >
                  Limpar filtros
                </button>
              </NoResults>
            )}
          </ExpeditionsList>
        </ExpeditionsCard>
      </MainContent>

      <AddButton
        onClick={() => setIsModalOpen(true)}
        title="Adicionar nova expedição"
        aria-label="Adicionar nova expedição"
      >
        +
      </AddButton>

      <ExpeditionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExpedition}
        responsavelId={"123456"} // Tem que mudar isso aqui! Tô mokando por enquanto
      />
    </Container>
  );
};

export default Home;
