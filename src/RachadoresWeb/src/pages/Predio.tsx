import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import QuadroPredios from "../components/QuadroPredios";
import ExpeditionInfo from "../components/ExpeditionInfo";
import ModalAddPredio from "../components/ModalAddPredio";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Interface para os dados do prédio
interface PredioData {
  nome: string;
  dataColeta: string;
  horaInicio: string;
  horaFim: string;
  fotoPrincipal: File | null;
  fotosZonas: {
    norte: File[];
    sul: File[];
    leste: File[];
    oeste: File[];
    sudeste: File[];
    sudoeste: File[];
    noroeste: File[];
    nordeste: File[];
  };
}

interface PredioAPI {
  id: number;
  id_expedicao: number;
  nome: string;
  complemento?: string;
  descricao?: string;
  foto_fachada: string;
}

// Interface para prédio exibido
interface PredioExibido {
  id: string;
  numero: string;
  nome: string;
  imagem: string;
  alt: string;
}

interface ExpeditionInfoProps {
  id: number;
  nome: string;
  localizacao: string;
  data_criacao: string;
  ultima_att: string;
  id_responsavel: number;
  descricao: string;
  foto_capa: string;
  nome_responsavel: string;
}

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
  margin: "3rem auto 2rem auto",
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
  background:
    "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)",
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
  nome?: string;
  imagem: string;
  alt: string;
  onClick?: (numero: string) => void;
}

const PredioCard: React.FC<PredioCardProps> = ({
  numero,
  nome,
  imagem,
  alt,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(numero);
    }
    console.log(`Navegando para análise do Prédio ${numero}`);
  };

  const { id } = useParams();

  const handleHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isHover: boolean
  ) => {
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
        <h3
          style={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: 600,
          }}
        >
          {nome ? nome : `Prédio ${numero}`}
        </h3>
      </div>
      <div style={linkIconStyle}>🔗</div>
    </button>
  );
};

const Predio: React.FC = () => {
  const navigate = useNavigate();
  const { expeditionId } = useParams<{ expeditionId: string }>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Estado para armazenar os prédios
  const [predios, setPredios] = useState<PredioExibido[]>([]);
  const [expedition, setExpedition] = useState<ExpeditionInfoProps | null>(
    null
  );

  const fetchPredios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/building/expedition/${expeditionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.buildings);

      // Mapear os dados da API para o formato do componente
      const prediosFormatados = response.data.buildings.map(
        (predio: PredioAPI, index: number) => ({
          id: predio.id.toString(),
          nome: predio.nome,
          complemento: predio.complemento,
          imagem:
            predio.foto_fachada ||
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=faces",
          alt: `${predio.nome} - Prédio ${index + 1}`,
        })
      );

      setPredios(prediosFormatados);
    } catch (error) {
      console.error("Erro ao buscar prédios:", error);
    }
  };

  const fetchExpedition = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/expedition/${expeditionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Mapear os dados da API para o formato do componente
      const expedition = response.data.expedition;

      setExpedition(expedition);
    } catch (error) {
      console.error("Erro ao atualizar a expedição:", error);
    }
  };

const handlePredioClick = (idPredio: string) => {
  navigate(`/analise-de-fissuras/${idPredio}`);
};


  const handleAddPredio = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    if (expeditionId) {
      const fetchData = async () => {
        await fetchExpedition();
        fetchPredios();
      };

      fetchData();
    }
  }, [expeditionId]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSavePredio = (predioData: PredioData) => {
    console.log("Dados do novo prédio:", predioData);

    const novoNumero = (predios.length + 1).toString();

    let imagemUrl =
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=faces"; // Imagem padrão

    if (predioData.fotoPrincipal) {
      imagemUrl = URL.createObjectURL(predioData.fotoPrincipal);
    }

    // Criar novo prédio
    const novoPredio: PredioExibido = {
      id: `novo-${Date.now()}`,
      numero: novoNumero,
      nome: predioData.nome,
      imagem: imagemUrl,
      alt: `${predioData.nome} - Prédio ${novoNumero}`,
    };

    setPredios((prev) => [...prev, novoPredio]);

    setIsPopupOpen(false);
  };

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Header />

      <div
        style={{
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "0.875rem",
          color: "#1F2937",
          width: "100%",
          maxWidth: "1200px",
          margin: "5rem auto 1rem auto",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            fontSize: "0.875rem",
            color: "#1F2937",
            marginBottom: "1rem",
          }}
        >
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
            Home
          </span>
        </div>
      </div>

      <div style={containerStyle}>
        {!expedition ? (
          <p>Carregando informações da expedição...</p>
        ) : (
          <ExpeditionInfo
            nome={expedition.nome}
            data_criacao={expedition.data_criacao}
            nome_responsavel={expedition.nome_responsavel}
          />
        )}

        <QuadroPredios onAddClick={handleAddPredio}>
          <div
            style={{
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              padding: "40px",
              paddingBottom: "100px",
            }}
          >
            {predios.map((predio) => (
              <PredioCard
                key={predio.id}
                numero={predio.numero}
                nome={predio.nome}
                imagem={predio.imagem}
                alt={predio.alt}
                onClick={() => handlePredioClick(predio.id)}
              />
            ))}
          </div>
        </QuadroPredios>
      </div>

      <ModalAddPredio
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSave={handleSavePredio}
        idExpedicaoAtual={Number(expeditionId)}
      />
    </div>
  );
};

export default Predio;
