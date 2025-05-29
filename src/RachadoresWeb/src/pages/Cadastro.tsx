import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { COLORS, FONTS, BREAKPOINTS } from "../constants/style";
import lupa from "../constants/assets/lupa.svg";
import cadastroBG from "../constants/assets/cadastro_bkg.svg";
import axios from "axios";
import Lottie from "lottie-react";
import correto from "../constants/assets/animations/certo.json";

type Props = {
  options?: string[];
};

// Modal de Cadastro concluído com sucesso
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  font-family: ${FONTS.primary};
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h3 {
    color: ${COLORS.secondary};
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.6rem 1.2rem;
    background-color: ${COLORS.secondary};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background-color: #1a0f08;
    }
  }
`;

const wiggle = keyframes`
  0% { transform: rotate(0deg); }
  15% { transform: rotate(-5deg); }
  30% { transform: rotate(5deg); }
  45% { transform: rotate(-3deg); }
  60% { transform: rotate(3deg); }
  75% { transform: rotate(-1deg); }
  100% { transform: rotate(0deg); }
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`;

const SectionComFundo = styled.section`
  background-color: ${COLORS.cadastroBG};
  background-image: url(${cadastroBG});
  background-repeat: no-repeat;
  background-position: left center;
  background-size: cover;
  width: 40%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }
`;

const Lupa = styled.img`
  height: 58%;
  margin-right: 5%;
  animation: ${wiggle} 4s infinite ease-in-out;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }
`;

const SectionBranca = styled.section`
  width: 60%;
  height: 100vh;
  background-color: white;
  border-top-left-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 100%;
    border-radius: 0;
    padding: 1.5rem;
  }

  h2 {
    font-family: ${FONTS.primary};
    font-size: 1.8rem;
    color: ${COLORS.secondary};
    text-align: center;
    margin: 0 0 3rem 0;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const Label = styled.label`
  font-family: ${FONTS.primary};
  font-size: 1rem;
  color: #333;
  font-weight: 600;
  align-self: flex-start;
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

const BotaoCadastro = styled.button`
  background-color: #2c1810;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  font-family: ${FONTS.primary};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 2rem auto 0 auto;
  display: block;
  width: fit-content;

  &:hover {
    background-color: #1a0f08;
  }
`;

const LoginSection = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const Select = styled.select`
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
`;

const TextoLogin = styled.p`
  font-family: ${FONTS.primary};
  color: #656;
  font-size: 1rem;

  span {
    color: #333;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #000;
    }
  }
`;

const Cadastro: React.FC<Props> = ({ options }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(true);

  const navigate = useNavigate();

  const defaultOptions = ["estudante", "professor", "coordenador", "outro"];
  const cargoOptions = options ?? defaultOptions;

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cargo: "",
  });

  const [erro, setErro] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        nome_completo: formData.nome,
        email: formData.email,
        senha: formData.senha,
        cargo: formData.cargo,
      });

      if (response.status === 201) {
        setShowSuccessModal(true); // mostra o modal
      }

      console.log("Cadastro realizado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setErro("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  return (
    <>
      {showSuccessModal && (
        <ModalOverlay>
          <ModalContent>
            <Lottie
              animationData={correto}
              style={{ width: 150, height: 150 }}
            />
            <h3>Cadastro realizado com sucesso!</h3>
            <p>Você já pode fazer login com seu email e senha.</p>
            <button onClick={() => navigate("/")}>Ir para login</button>
          </ModalContent>
        </ModalOverlay>
      )}

      <Container>
        <SectionComFundo>
          <Lupa src={lupa} alt="Lupa" />
        </SectionComFundo>

        <SectionBranca>
          <h2>Faça o seu cadastro</h2>

          <FormContainer onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="nome">Nome completo</Label>
              <Input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Insira seu nome completo aqui"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="email">Email institucional</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Insira seu email aqui"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="senha">Senha</Label>
              <Input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                placeholder="Insira sua senha aqui"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="senha">Cargo</Label>
              <Select
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, cargo: e.target.value }))
                }
                required
              >
                <option value="" disabled>
                  Selecione seu cargo
                </option>
                {cargoOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </InputGroup>

            <BotaoCadastro type="submit">Fazer cadastro</BotaoCadastro>
          </FormContainer>

          {erro && <p style={{ color: "red", marginTop: "1rem" }}>{erro}</p>}

          <LoginSection>
            <TextoLogin>
              Já possui uma conta? Entre na plataforma{" "}
              <span onClick={handleLoginRedirect}>aqui</span>
            </TextoLogin>
          </LoginSection>
        </SectionBranca>
      </Container>
    </>
  );
};

export default Cadastro;
