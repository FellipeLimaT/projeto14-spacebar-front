import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaLogin from "./TelaLogin.js";
import TelaCadastro from "./TelaCadastro.js";
import TelaCarrinho from "./TelaCarrinho.js";
import TelaCheckout from "./TelaCheckout.js";
import TelaHome from "./TelaHome/TelaHome.js"
import TelaProduto from "./TelaProduto.js";
import TelaSessaoProduto from "./TelaSessaoProduto";
import TelaConfirmacao from "./TelaConfirmacao";
import BebidasContext from "../contexts/BebidasContext.js";
import { useState } from "react";



function App() {


   const [vinho, setVinho] = useState([])
   const [cerveja, setCerveja] = useState([])
   const [whisky, setWhisky] = useState([])
   const [gin, setGin] = useState([])
   const [listaProdutos, setListaProdutos] = useState()
   const [carrinho, setCarrinho] = useState([])
   const [quantidadeCarrinho, setQuantidadeCarrinho] = useState([])
   const [categoriaEscolhida, setCategoriaEscolhida] = useState("")
   const [valorTotal, setValorTotal ] = useState()

    return (
    
            <BrowserRouter>
            <BebidasContext.Provider value={{
            listaProdutos, setListaProdutos,
            vinho, setVinho,
            cerveja, setCerveja,
            whisky, setWhisky,
            gin, setGin,
            carrinho, setCarrinho,
             quantidadeCarrinho, setQuantidadeCarrinho,
             categoriaEscolhida, setCategoriaEscolhida,
             valorTotal, setValorTotal}}>

                <Routes>
                    <Route path='/' element={<TelaHome />} />
                    <Route path='/login' element={<TelaLogin />} />
                    <Route path='/cadastro' element={<TelaCadastro />} />
                    <Route path="/produto/:idProduto" element={<TelaProduto />} />
                    <Route path='/categoria/:idCategoria' element={<TelaSessaoProduto />} />
                    <Route path='/carrinho' element={<TelaCarrinho />} />
                    <Route path='/checkout' element={<TelaCheckout />} />
                    <Route path='/confirmacao' element={<TelaConfirmacao />} />

                </Routes>
                </BebidasContext.Provider>
            </BrowserRouter>
        
    )
}

export default App;