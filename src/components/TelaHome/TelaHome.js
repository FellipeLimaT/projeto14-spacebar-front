
import styled from "styled-components";
import Produtos from "./Produtos.js";
import Header from "../Header.js";
import GerarProdutos from "./GerarProdutos.js";

export default function TelaHome() {
  
    console.log("tudo bem por aqui")
    return (
        <Section>
            <Header />
            <Main>
            <GerarProdutos>
                <Produtos />
            </GerarProdutos>
            </Main>
            
        </Section>
    );
}

const Section = styled.section`
    overflow-x: hidden;
    
    
`;

const Main = styled.main`
    margin: calc(50px + 18%) 0 0 0;
    display:flex;
    justify-content: center;    
    background-color: purple;
`;