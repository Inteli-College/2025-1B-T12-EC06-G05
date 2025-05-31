import streamlit as st

def render_login():
    st.image("static/logo.png", width=200)
    st.title("Computador de Bordo para captura de fissuras")

    user_id = st.text_input("Insira seu id de usuário para começar", placeholder="ID usuário")
    if st.button("Entrar") and user_id.strip():
        st.session_state.user_id = user_id.strip()
        st.rerun()
