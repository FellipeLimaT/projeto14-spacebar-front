
import styledComponents from "styled-components"
import Produtos from "./Produtos"
import { useState } from "react"
import axios from "axios"

export default function GerarProdutos() {
    console.log("chegou no gerar produtos")

    return (
        <div>

            
              <Produtos />
            

        </div>


    )
}

const Produto = styledComponents.div`
display:flex;
flex-direction:column;`


const ContainerProduto = styledComponents.div`
display:flex;
flex-direction:row;`