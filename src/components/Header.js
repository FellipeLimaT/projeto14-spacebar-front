
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";
import BebidasContext from "../contexts/BebidasContext";
import logoheader from "./assets/logoSmall.png";
import Menu from "./Menu.js";


export default function Header() {
    const {  quantidadeCarrinho } = useContext(BebidasContext)
    const [menu, setMenu] = useState(false);
    const nav = useNavigate();


    const dataLocalSerializada = localStorage.getItem('user')
    const dataDesSerelizada = JSON.parse(dataLocalSerializada)
    const infoLocal = dataDesSerelizada


    function perfilClick(){
        if(infoLocal.token === ""){
            nav("/login");
        }
        else{
            alert(`Logado como ${infoLocal.nome}`);
        }
    }
console.log(menu)
    return (
        <Head>
            <Topo>

               {menu?
              <Menu setMenu={setMenu} menu={menu} />:
                <Topo_Esquerda>
                    <ion-icon onClick={() => setMenu(true)} name="menu-outline"></ion-icon>
                    <Logo src={logoheader} onClick={() => { nav("/") }}></Logo>                  
                </Topo_Esquerda>}

                <SearchBar placeholder="Pesquisar..."></SearchBar>

                <Topo_Direita>
                    <ion-icon name="person-circle-outline" onClick={perfilClick}></ion-icon>
                    <Carrinho>
                        <ion-icon name="cart-outline" onClick={() => {nav("/carrinho")}}></ion-icon>
                        <p>{quantidadeCarrinho}</p>
                    </Carrinho>
                </Topo_Direita>

            </Topo>
        </Head>
    )
}

const Head = styled.header`
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 50px;
`
const Topo = styled.div`
    width: 100%;
    height: 50px;
    background-color: #000000;
    
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 9% 5%;
    box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.4);

    ion-icon{
        font-size: 35px;
        color: #E5E5E5;
        margin-right: 20px;
        cursor: pointer;
    }
`

const Topo_Esquerda = styled.div`
    width:auto;
    height: auto;
    display: flex;
`

const Logo = styled.img`
    width: 60px;
    height: auto;
`
const Topo_Direita = styled.div`
    width:auto;
    height: auto;
    display: flex;
`
const Carrinho = styled.div`
    position: relative;
    p{
        width: 15px;
        height: 15px;

        position: absolute;
        top: 0;
        right: 17px;

        font-size: 10px;
        
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #E5E5E5;
        color: #064973;

        border-radius: 50%;
    }
`
const SearchBar = styled.input`
    width: 100%;
    height: 28px;
    margin: 0 20px;
    border-radius: 5px;
    padding-left: 8px;
    
`

// <Menu menu={menu} setMenu={setMenu} />