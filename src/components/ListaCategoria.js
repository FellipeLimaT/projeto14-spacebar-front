import styledComponents from "styled-components";

import Produto from "./Produto.js";

export default function ListaCategoria({ categoria, ListaProdutos }) {

    return (
        <Section>
            <Categoria>{categoria}</Categoria>
            <Lista>
                {ListaProdutos.map((produto, index) => {
                    return (<Produto key={index} produto={produto} />)
                })}
            </Lista>
            <Partition />
        </Section>
    );
}

const Section = styledComponents.section`
    display: flex;
    flex-direction: column;
`;

const Categoria = styledComponents.h2`
    font-size: 20px;
    font-weight: bold;
    margin: 10px auto;
`;

const Lista = styledComponents.div`
    overflow-x: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    width: 100%;
    height: 350px;
    display: flex;
    padding: 0 4%;
`;

const Partition = styledComponents.div`
    height: 1px;
    margin: 0 10% 20px 10%;
    border-bottom: 1px solid #8F9DA6;
`;