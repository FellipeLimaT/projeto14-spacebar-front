
import styledComponents from "styled-components"
import Produtos from "./Produtos"
import { useState } from "react"
import axios from "axios"

export default function GerarProdutos() {
    console.log("chegou no gerar produtos")

    return (
        <ContainerProduto>

            <Produto>
              <Produtos />
            </Produto>

        </ContainerProduto>


    )
}

const Produto = styledComponents.div`
postion: fixed;
top: 50px;
display:flex;
flex-direction:column;`


const ContainerProduto = styledComponents.div`
display:flex;
flex-direction:row;`