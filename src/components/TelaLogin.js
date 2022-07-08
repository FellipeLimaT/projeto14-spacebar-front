import { useState } from "react"
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.jpg'

export default function TelaLogin() {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const navigate = useNavigate();

    const userInfo = { email, senha }
    const POST_URL = 'http://localhost:5000/login'

    function enviarDadosUser(e) {
        e.preventDefault();


        const promiseLogin = axios.post(POST_URL, userInfo);
        promiseLogin.then(response => gerarHeaders(response));
        promiseLogin.catch(() => alert("senha ou usuario invalido"));
    }

    
    function gerarHeaders(response) {

        const Info = response.data

        const serelizaçãoInfo = JSON.stringify(Info)
        localStorage.setItem("user", serelizaçãoInfo)

        IrParaHome()

    }


    function IrParaHome() {

        navigate("/")

    }


    function IrParaCadastro() {

        navigate('/cadastro')

    }


    return (
        <ContainerPrincipal>
            <img src={logo} />
            <ContainerInput>
                <form>
                    <input placeholder=" E-mail" onChange={(e) => setEmail(e.target.value)} value={email} type="email" required></input>
                    <input placeholder=" Senha" onChange={(e) => setSenha(e.target.value)} value={senha} type="password" required></input>
                    <button type="submit" onClick={enviarDadosUser}>Entrar</button>
                </form>
            </ContainerInput>
            <Cadastrar onClick={IrParaCadastro}>Primeira vez? Cadastre-se!</Cadastrar>

        </ContainerPrincipal>
    )
}

const ContainerPrincipal = styled.div`
        width:100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(0,0,0);
    
    img{
        height:35vh;
    }
    `

const ContainerInput = styled.div`
        width:80vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    
    input{
        width:100%;
        height:46px;
        background: #FFFFFF;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom:13px;
    }
    
    button{
        width:100%;
        height:46px;
        text-align: center;
        margin-bottom:36px;
        background: #A328D6;
        border-radius: 5px;
        font-family: 'Raleway', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        background-color:#b13731;
        border:0px;
        border-color:rgba(0,0,0,0);
    }
    `

const Cadastrar = styled.button`
    width:80vw;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    background-color: rgba(0,0,0,0);
    border:0px;
    `