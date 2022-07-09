import { useContext } from "react"
import BebidasContext from "../contexts/BebidasContext"
import Vinho from "./Vinho"
import Cerveja from "./Cerveja.js"
import Gin from "./Gin.js"
import Whisky from "./Whisky.js"

export default function TelaSessaoProduto(){

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
             {categoriaEscolhida==="vinho"? < Vinho/>:""
        }
         {categoriaEscolhida==="cerveja"? <Cerveja/>:""
        }
         {categoriaEscolhida==="whisky"? <Whisky/>:""
        }
         {categoriaEscolhida==="gin"? <Gin/>:""
        }
        </div>
       
        
    )
}