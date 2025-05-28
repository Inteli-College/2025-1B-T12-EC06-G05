import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS, BREAKPOINTS } from "../constants/style.ts";
import Header from "../components/Header.tsx";
import FissurePanel from '../components/FissurePanel';
import FissureCharts from '../components/FissureCharts';
import SelectWithTitle from '../components/SelectWithTitle.tsx';


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


const VisaoGeral = () => {
  return (
    <div>
    <Header />
    <Wrapper>
      <TopRow>
        <SelectWithTitle />
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
