import { useContext } from "react"
import { useEffect } from "react"
import BebidasContext from "../contexts/BebidasContext"
import styledComponents from "styled-components"

export default function ResumoDaCompra(){

    const{ carrinho, valorTotal, setValorTotal } = useContext(BebidasContext)
    let aux =0
    console.log("passou as constantes")
    console.log(carrinho)
    const calculoPorItem =  carrinho.map((produto) =>produto.quantidade * produto.valor)
    console.log(calculoPorItem)

       for(let i=0; i<calculoPorItem.length;i++){
           aux = aux+calculoPorItem[i]
       }
        setValorTotal(aux)
    return(    
    <ContainerResumo>
        <h2>Total da compra:</h2>
        <h2>{valorTotal}</h2>
        </ContainerResumo>)

}

const ContainerResumo = styledComponents.div`
display:flex;
flex-direction:row;`