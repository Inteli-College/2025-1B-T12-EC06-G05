import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 
import { COLORS, FONTS, BREAKPOINTS } from "../constants/style"; 
import lupa from "../constants/assets/lupa.svg";
import cadastroBG from "../constants/assets/cadastro_bkg.svg";

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
  height: 50%;
  margin-right: 15%; 

animation: flutuar 3s ease-in-out infinite;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    display: none;
  }

  transition: transform 0.3s ease-in-out;

  @keyframes flutuar {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-9px);
    }
    100% {
      transform: translateY(0);
    }
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
    font-size: 2rem;
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
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: ${FONTS.primary};
  font-size: 1rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.6rem;
  text-align: left;
  display: block;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.8rem 1.25rem;
  border: none;
  border-radius: 15px;
  background-color: #E5E5E5;
  font-family: ${FONTS.primary};
  font-size: 1rem;
  color: #333;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: #D0D0D0;
  }

  &::placeholder {
    color: #888;
  }
`;

const BotaoCadastro = styled.button`
  background-color: #2C1810;
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

const TextoLogin = styled.p`
  font-family: ${FONTS.primary};
  color: #666;
  margin: 0;
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

const Cadastro: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação
  
  const [formData, setFormData] = React.useState({
    nome: '',
    email: '',
    senha: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do cadastro:', formData);
  };

  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
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
              placeholder="Insira o seu email aqui"
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
              placeholder="Insira o seu email aqui"
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
              placeholder="Insira a sua senha aqui"
              required
            />
          </InputGroup>

          <BotaoCadastro type="submit">
            Fazer cadastro
          </BotaoCadastro>
        </FormContainer>

        <LoginSection>
          <TextoLogin>
            Já possui uma conta? Entre na plataforma <span onClick={handleLoginRedirect}>aqui</span>.
          </TextoLogin>
        </LoginSection>
      </SectionBranca>
    </Container>
  );
};

export default Cadastro;