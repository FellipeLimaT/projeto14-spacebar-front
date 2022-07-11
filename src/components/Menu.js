import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Menu({ menu, setMenu }) {
    
    const navigate = useNavigate();
    

    function categoriaClick(categoriaURL){
        setMenu(false);
        navigate(`/categoria/${categoriaURL}`);
    }

    return (
        <div>
            <Aside menu={menu}>
                <Head>
                    <ion-icon onClick={() => setMenu(false)} name="close-outline"></ion-icon>
                </Head>
            <Categoria onClick={()=>categoriaClick("vinho")}>Vinho</Categoria>
            <Categoria onClick={()=>categoriaClick("cerveja")}>Cerveja</Categoria>
            <Categoria onClick={()=>categoriaClick("whisky")}>Whisky</Categoria>
            <Categoria onClick={()=>categoriaClick("gin")}>Gin</Categoria>
            </Aside>
            <TelaEscura menu={menu} onClick={() => setMenu(false)}></TelaEscura>
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
    justify-content: center;
    align-items: center;
    height: 60px;
    padding-left: 15px;
    border-bottom: 1px solid #000000;
    color: #000000;
    cursor: pointer;
`

const TelaEscura = styled.div`
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
    background-color: #000000;
    
    ion-icon{
        font-size: 20px;
        width: 20px;
        color: #C7C7C7;
        cursor: pointer;
    };
`;