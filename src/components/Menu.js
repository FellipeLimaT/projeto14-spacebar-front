import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { CategoriaBebidas } from "../contexts/BebidasContext.js";

export default function Menu({ menu, setMenu }) {
    
    const nav = useNavigate();
    const {categorias} = useContext(CategoriaBebidas)
    categorias.sort();

    function categoriaClick(categoriaURL){
        setMenu(false);
        nav(`/${categoriaURL}`);
    }

    return (
        <div>
            <Aside menu={menu}>
                <Head>
                    <ion-icon onClick={() => setMenu(false)} name="close-outline"></ion-icon>
                </Head>
                {categorias.map( (categoria, index) => {
                    const categoriaURL = categoria.toLowerCase();
                    return <Categoria onClick={() => categoriaClick(categoriaURL)} key={index}>{categoria}</Categoria>
                })}
            </Aside>
            <TelaMenuAberta menu={menu} onClick={() => setMenu(false)}></TelaMenuAberta>
        </div>
    );
}

const Aside = styled.aside`
    position: fixed;
    z-index: 3;
    top: 0;
    left: ${({ menu }) => menu ? "0" : "-70%"};
    width: 70%;
    height: 100vh;
    background-color: #FFFFFF;
`;

const Categoria = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 15px;
    border-bottom: 1px solid #064973;
    color: #064973;
    cursor: pointer;
`

const TelaMenuAberta = styled.div`
    display: ${({ menu }) => menu ? "block" : "none"};
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
`;

const Head = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    padding-left: 20px;
    background-color: #064973;
    
    ion-icon{
        font-size: 20px;
        width: 20px;
        color: #F2D5C4;
        cursor: pointer;
    };
`;