
import styledComponents from "styled-components";
import Produtos from "./Produtos.js";
import Header from "../Header.js";
import GerarProdutos from "./GerarProdutos.js";

export default function TelaHome() {
  
    console.log("tudo bem por aqui")
    return (
        <Section>
            <Header />
            <Main></Main>
            <GerarProdutos></GerarProdutos>
        </Section>
    );
}

const Section = styledComponents.section`
    overflow-x: hidden;
    background-color: red;
`;

const Main = styledComponents.main`
    margin: calc(50px + 18%) 10px 0 10px;
    
`;