import React from "react";
import Header from "../components/Header";
import QuadroPredios from "../components/QuadroPredios";
import ExpeditionInfo from "../components/ExpeditionInfo";
import { useNavigate } from "react-router-dom";

// Estilos para os componentes da expedição
const breadcrumbStyle = {
  padding: "0.5rem 2rem",
  fontSize: "0.875rem",
  color: "#1F2937",
  backgroundColor: "#fff",
  borderBottom: "1px solid #E5E7EB",
  width: "100%",
};

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "12rem auto 2rem auto", 
  padding: "0 2rem",
};

const predioCardStyle = {
  position: "relative" as const,
  width: "280px",
  height: "180px",
  borderRadius: "12px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  border: "none",
  padding: 0,
  backgroundColor: "transparent",
};

const predioOverlayStyle = {
  position: "absolute" as const,
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)",
  padding: "1.5rem 1rem 1rem 1rem",
  color: "white",
};

const linkIconStyle = {
  position: "absolute" as const,
  top: "1rem",
  right: "1rem",
  width: "24px",
  height: "24px",
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
};

interface PredioCardProps {
  numero: string;
  imagem: string;
  alt: string;
  onClick?: (numero: string) => void;
}

const PredioCard: React.FC<PredioCardProps> = ({ numero, imagem, alt, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(numero);
    }
    console.log(`Navegando para análise do Prédio ${numero}`);
  };

  const handleHover = (e: React.MouseEvent<HTMLButtonElement>, isHover: boolean) => {
    if (isHover) {
      e.currentTarget.style.transform = "scale(1.02)";
    } else {
      e.currentTarget.style.transform = "scale(1)";
     
    }
  };

  return (
    <button
      onClick={handleClick}
      style={predioCardStyle}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      <img
        src={imagem}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div style={predioOverlayStyle}>
        <h3 style={{
          margin: 0,
          fontSize: "1.25rem",
          fontWeight: 600,
        }}>
          Prédio {numero}
        </h3>
      </div>
      <div style={linkIconStyle}>
        🔗
      </div>
    </button>
  );
};

const Predio: React.FC = () => {
  const navigate = useNavigate();

  const handlePredioClick = (numeroPredio: string) => {
    navigate(`/analise-de-fissuras/${numeroPredio}`);
  };

  const handleAddPredio = () => {
    console.log("Adicionar novo prédio");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#ffffff",
    }}>
      <Header />

      <div style={{
        position: "absolute",
        top: "7.5rem", 
        left: "26%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "1200px",
        padding: "0 2rem",
        zIndex: 10, 
      }}>
        <div style={{
          fontSize: "1.15rem",
          color: "#1F2937",
          marginBottom: "1rem",
        }}>
          <span
            onClick={goToHome}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "#1F2937",
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.color = "#4B5563"; 
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.color = "#1F2937"; 
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Home / <strong>Expedição Inteli</strong>
          </span>
        </div>
      </div>

      <div style={containerStyle}>
        <ExpeditionInfo />
        <QuadroPredios onAddClick={handleAddPredio}>
          <div style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            padding: "40px",
            paddingBottom: "100px",
          }}>
            <PredioCard
              numero="5"
              imagem="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=faces"
              alt="Prédio 5 - Espaço de coworking moderno"
              onClick={handlePredioClick}
            />
            <PredioCard
              numero="6"
              imagem="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop&crop=faces"
              alt="Prédio 6 - Área externa com pessoas"
              onClick={handlePredioClick}
            />
          </div>
        </QuadroPredios>
      </div>
    </div>
  );
};

export default Predio;