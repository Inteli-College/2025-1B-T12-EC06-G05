import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS, BREAKPOINTS } from "../constants/style.ts";
import Header from "../components/Header.tsx";

// const Container = styled.div`
//   background-color: ${COLORS.background};
// }
// `;

const Home: React.FC = () => {
  return (
      <Header />
  );
};

export default Home;
