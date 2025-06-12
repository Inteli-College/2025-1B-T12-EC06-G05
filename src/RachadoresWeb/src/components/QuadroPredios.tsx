  import React from "react";
  import { COLORS } from "../constants/style";

  const quadroStyle = {
    borderRadius: "32px",
    border: "0.6px solid #000000", 
    width: "100%",
    minHeight: "650px",
    overflow: "hidden",
    backgroundColor: COLORS.tablePredio,
    position: "relative" as const,
  };

  const headerStyle = {
    backgroundColor: COLORS.tablePredioTop,
    color: "#fff",
    padding: "1rem 1.5rem",
    borderTopLeftRadius: "32px",
    borderTopRightRadius: "32px",
  };

  const contentStyle = {
    padding: "0",
    position: "relative" as const,
    flex: 1,
    overflowY: "auto" as const, 
    overflowX: "hidden" as const, 
    height: "calc(650px - 60px)", 
  };

  const addButtonStyle = {
    position: "absolute" as const,
    bottom: "20px",
    right: "20px",
    zIndex: 100,
  };

  const addButtonIconStyle = {
    width: "53px",
    height: "60px",
    borderRadius: "50%", 
    border: "2px solid #E5E7EB",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold" as const,
    color: "#000",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  };

  interface QuadroPrediosProps {
    children: React.ReactNode;
    onAddClick?: () => void;
  }

  const QuadroPredios: React.FC<QuadroPrediosProps> = ({ children, onAddClick }) => {
    const handleAddHover = (e: React.MouseEvent<HTMLButtonElement>, isHover: boolean) => {
      if (isHover) {
        e.currentTarget.style.borderColor = COLORS.tablePredioTop;
        e.currentTarget.style.color = COLORS.tablePredioTop;
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
      } else {
        e.currentTarget.style.borderColor = "#E5E7EB";
        e.currentTarget.style.color = "#000";
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      }
    };

    return (
      <div style={quadroStyle}>
        <div style={headerStyle}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, margin: 0 }}>Prédios</h2>
        </div>
        <div style={contentStyle}>
          {children}
        </div>
        <div style={addButtonStyle}
          <button
            style={addButtonIconStyle}
            onClick={onAddClick}
            onMouseEnter={(e) => handleAddHover(e, true)}
            onMouseLeave={(e) => handleAddHover(e, false)}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  export default QuadroPredios;