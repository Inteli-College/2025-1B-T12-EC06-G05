import streamlit as st

def render_login():
    st.image("static/logo.png", width=200)
    st.title("Computador de Bordo para captura de fissuras")

    user_email = st.text_input("Email", placeholder="email")
    user_senha = st.text_input("Senha", placeholder="senha", type="password")


    # Simples validação: checar se email foi preenchido
    if st.button("Entrar") and user_email:
        st.session_state.user_email = user_email
        st.session_state.user_senha = user_senha
        st.query_params = {}
        st.rerun()

