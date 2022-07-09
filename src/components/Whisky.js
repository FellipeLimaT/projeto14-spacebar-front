import { useContext, useState } from "react"
import BebidasContext from "../contexts/BebidasContext"
import styledComponents from "styled-components"
import { useEffect } from "react"
import axios from "axios"


export default function Whisky() {
const { whisky, setWhisky} = useContext(BebidasContext)
const URL = "http://localhost:5000/whisky"

useEffect(()=>{
    const promiseGet = axios.get(URL)
    promiseGet.then((res)=>setWhisky(res.data))
    promiseGet.catch((res)=>console.log("deu ruim"))
},[])

    return (
        <ContainerProduto>
            {whisky.map((produto) => <Produto>
                <button>
                <img src={produto.imagem}/>
                <h5>Preço: R${produto.valor}</h5>
                </button>
            
</Produto>
            )}

        </ContainerProduto>

    )
}

const Produto = styledComponents.div`
display:flex;
flex-direction:column;
img{
    width: 50vw;
    height: 40vh;
}`


const ContainerProduto = styledComponents.div`
display:flex;
flex-direction:row;`