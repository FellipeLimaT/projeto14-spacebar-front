import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from 'styled-components';
import logo from './assets/logo.jpg'
export default function TelaCadastro() {

    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [senhacorreta, setSenhacorreta] = useState();

    let infoCadastro;

    const navigate = useNavigate()

    function verificarDados(e) {
        e.preventDefault();
        if (!nome || !email || !senha || !senhacorreta) {
            alert("É necessário que todos os campos sejam preenchidos!")
            return
        }
        if (senhacorreta !== senha) {
            alert("Por favor, verifique a sua senha")
            return
        }
        else {
            infoCadastro = {
                "nome": nome,
                "email": email,
                "senha": senha,
                "confirmacaoSenha": senhacorreta
            }

            CadastrarDadosUser()
        }
    }

    function CadastrarDadosUser() {

        const POST_URL = 'https://git.heroku.com/projeto14-spacebar-back.git//cadastro'
        const promiseCadastrar = axios.post(POST_URL, infoCadastro)

        promiseCadastrar.then(() => IrParaLogin())
        promiseCadastrar.catch((e) => alert(`Erro ao cadastrar o usário.`))

    }

    function IrParaLogin() {
        navigate('/login')
    }
    return (
        <ContainerPrincipal>
            <img src={logo}/>
            <ContainerInput>
                <form>
                    <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} value={nome} type="name" required></input>
                    <input placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email} type="email" required></input>
                    <input placeholder="Senha" onChange={(e) => setSenha(e.target.value)} value={senha} type="password" required></input>
                    <input placeholder="Confirme a senha" onChange={(e) => setSenhacorreta(e.target.value)} type="password" required></input>
                    <button type="submit" onClick={verificarDados}>Cadastrar</button>
                </form>
            </ContainerInput>
            <Login onClick={IrParaLogin}> Já tem uma conta? Entre agora!</Login>

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
const Confirmacao = styled.input`
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
    border-color: ${(props) => props.senhacorreta === true ? `rgba(0,0,0,0)` : `red`}
    `
const Login = styled.button`
    
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    background-color: rgba(0,0,0,0);
    border:0px;
    `