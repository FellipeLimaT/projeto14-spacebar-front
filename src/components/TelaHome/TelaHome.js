
import styledComponents from "styled-components";
import GerarProdutos from "./GerarProdutos";
import Header from "../Header.js";

export default function TelaHome() {
  
    console.log("tudo bem por aqui")
    return (
        <Section>
            <Header />
            <Main></Main>
            <GerarProdutos />
        </Section>
    );
}

const Section = styledComponents.section`
    overflow-x: hidden;
`;

const Main = styledComponents.main`
    margin: calc(50px + 18%) 10px 0 10px;
`;