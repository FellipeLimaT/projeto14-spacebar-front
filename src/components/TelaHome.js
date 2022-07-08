
import styledComponents from "styled-components";

import Header from "./Header";

export default function TelaHome() {

    return (
        <Section>
            <Header />
            <Main></Main>
            
        </Section>
    );
}

const Section = styledComponents.section`
    overflow-x: hidden;
`;

const Main = styledComponents.main`
    margin: calc(50px + 18%) 10px 0 10px;
`;