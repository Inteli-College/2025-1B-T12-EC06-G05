import React from "react";
import styled from "styled-components";

interface ExpeditionInfoProps {
  nome: string;
  data_criacao: string;
  nome_responsavel: number;
}


const SelectWithTitle: React.FC<ExpeditionInfoProps> = ({
    nome = "Expedição Inteli",
    data_criacao = "12/05/2025",
    nome_responsavel = "Pedro Silva"
  }) => {
  return (
    <Container>
      <LeftSide>
        <Select>
          <option>Visão geral do prédio</option>
          <option>Fachada norte</option>
          <option>Fachada sul</option>
          <option>Fachada leste</option>
          <option>Fachada oeste</option>
        </Select>
        <Responsavel>
          <strong>Responsável:</strong> {nome_responsavel}
        </Responsavel>
      </LeftSide>

      <RightSide>
        <Metric>
          <BigNumber>9</BigNumber>
          <Label>Imagens<br />Processadas</Label>
        </Metric>
        <Metric>
          <BigNumber>0%</BigNumber>
          <Label>Taxa de Imagens<br />com Erro</Label>
        </Metric>
        <Metric>
          <BigNumber>1%</BigNumber>
          <Label>Taxa de Revisão<br />Manual</Label>
        </Metric>
        <Metric>
          <BigNumber>99%</BigNumber>
          <Label>Taxa de Detecção<br />Automática</Label>
        </Metric>
      </RightSide>
    </Container>
  );
};

export default SelectWithTitle;

// === styled-components ===

const Container = styled.div`
  border: 1px solid #3f2b1d;
  border-radius: 2rem;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: sans-serif;
  width: 100%; 
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 1px solid #3f2b1d;
  font-size: 1rem;
`;

const Responsavel = styled.span`
  font-size: 1rem;
  color: #3f2b1d;
`;

const RightSide = styled.div`
  display: flex;
  gap: 2.5rem;
`;

const Metric = styled.div`
  text-align: center;
`;

const BigNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3f2b1d;
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: #3f2b1d;
  line-height: 1.2;
`;
