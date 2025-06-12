import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants/style.ts";
import Header from "../components/Header.tsx";
import FissurePanel from "../components/FissurePanel";
import FissureCharts from "../components/FissureCharts";
import SelectWithTitle from "../components/SelectWithTitle.tsx";
import axios from "axios";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8%;
`;

const MainContent = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ImageCard = styled.div`
  border: 1px solid ${COLORS.gray300 || "#ccc"};
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Caption = styled.div`
  padding: 0.5rem;
  background-color: #f9f9f9;
  font-size: 0.875rem;
`;

interface ExpeditionInfoProps {
  nome: string;
  data_criacao: string;
  nome_responsavel: string;
}

interface ImageInfo {
  id: number;
  url: string;
  nome: string;
  orientacao: string;
}

const VisaoGeral = () => {
  const { numeroPredio } = useParams<{ numeroPredio: string }>();
  const [expeditionData, setExpeditionData] = useState<ExpeditionInfoProps | null>(null);
  const [imagens, setImagens] = useState<ImageInfo[]>([]);
  const [metricas, setMetricas] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const predioRes = await axios.get(`http://localhost:5000/building/${numeroPredio}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(predioRes)

        const predio = predioRes.data.building;
        const idExpedicao = predio.id_expedicao;

        // Busca da expedição
        const expedicaoRes = await axios.get(`http://localhost:5000/expedition/${idExpedicao}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setExpeditionData({
          nome: expedicaoRes.data.exepedition.nome,
          data_criacao: expedicaoRes.data.exepedition.data_criacao,
          nome_responsavel: expedicaoRes.data.exepedition.nome_responsavel,
        });

        // Busca das imagens por prédio
        const imagensRes = await axios.get(`http://localhost:5000/image/by_predio/${predio.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setImagens(imagensRes.data.images || []);

         // Busca das as métricas por prédio
         const metricasRes = await axios.get(`http://localhost:5000/fissure/predio/${predio.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMetricas(metricasRes.data.metricas || {});
      } catch (error) {
        console.error("Erro ao buscar dados da visão geral:", error);
      }
    };

    fetchData();
  }, [numeroPredio]);

  return (
    <div>
      <Header />
      <Wrapper>
        <TopRow>
          {expeditionData ? (
            <SelectWithTitle
              nome={expeditionData.nome}
              data_criacao={expeditionData.data_criacao}
              nome_responsavel={expeditionData.nome_responsavel}
              total_fissuras = {metricas.total_fissuras}
            />
          ) : (
            <p>Carregando dados da expedição...</p>
          )}
        </TopRow>

        <MainContent>
          <FissurePanel />
          <FissureCharts />
        </MainContent>
      </Wrapper>
    </div>
  );
};

export default VisaoGeral;
