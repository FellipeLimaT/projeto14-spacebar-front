import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaHome from "./TelaHome.js";
import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro.js";
import TelaProduto from "./TelaProduto.js";
import TelaSessaoProduto from "./TelaSessaoProduto";
import TelaCarrinho from "./TelaCarrinho";
import TelaCheckout from "./TelaCheckout";
import TelaConfirmacao from "./TelaConfirmacao";


function App(){
return(
    <BrowserRouter>

    <Routes>
    <Route path='/'  element={<TelaHome />}/>
    <Route path='/login' element={<TelaLogin />} />
    <Route path='/cadastro' element={<TelaCadastro/>}/>
    <Route path='/produto/:idProduto' elememt={<TelaProduto/>}/>
    <Route path='/:idSessaoProduto' elememt={<TelaSessaoProduto/>}/>
    <Route path='/carrinho' elememt={<TelaCarrinho/>}/>
    <Route path='/checkout' element={<TelaCheckout/>}/>
    <Route path='/confirmacao' element={<TelaConfirmacao/>}/>

    </Routes>
    </BrowserRouter>
)
}

export default App;