import { BrowserRouter, Routes, Route } from "react-router-dom";

import TelaLogin from "./TelaLogin.js";
import TelaCadastro from "./TelaCadastro.js";
import TelaCarrinho from "./TelaCarrinho.js";
import TelaCheckout from "./TelaCheckout.js";

import TelaHome from "./TelaHome.js";
import TelaProduto from "./TelaProduto.js";
import TelaSessaoProduto from "./TelaSessaoProduto";

import TelaConfirmacao from "./TelaConfirmacao";

import { CategoriaBebidas } from "../contexts/BebidasContext.js";


function App() {
    const categorias = ["Vinho", "Gin", "Vodka", "Cerveja"];

    return (
    
            <BrowserRouter>

                <Routes>
                    <Route path='/' element={<TelaHome />} />
                    <Route path='/login' element={<TelaLogin />} />
                    <Route path='/cadastro' element={<TelaCadastro />} />
                    <Route path='/produto/:idProduto' elememt={<TelaProduto />} />
                    <Route path='/:idSessaoProduto' elememt={<TelaSessaoProduto />} />
                    <Route path='/carrinho' elememt={<TelaCarrinho />} />
                    <Route path='/checkout' element={<TelaCheckout />} />
                    <Route path='/confirmacao' element={<TelaConfirmacao />} />

                </Routes>
            </BrowserRouter>
        
    )
}

export default App;