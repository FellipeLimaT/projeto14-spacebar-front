import { useContext } from "react"
import BebidasContext from "../contexts/BebidasContext"
import Vinho from "./Categoria"
import Cerveja from "./Cerveja.js"
import Gin from "./Gin.js"
import Whisky from "./Whisky.js"
import { useParams } from "react-router-dom"

export default function TelaSessaoProduto(){

    const {idSessaoProduto} = useParams();

    const { 
        vinho, 
        setVinho,
        cerveja, 
        setCerveja,
        whisky, 
        setWhisky,
        gin, 
        setGin,
        carrinho,
         setCarrinho,
         quantidadeCarrinho, 
         setQuantidadeCarrinho,
         categoriaEscolhida, setCategoria} = useContext(BebidasContext)


    return(
        <div>
      <Categoria idSessaoProduto={idSessaoProduto}/>
        </div>
       
        
    )
}