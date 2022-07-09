
import styledComponents from "styled-components"
import Vinho from './Vinho.js'
import Cerveja from "./Cerveja.js"
import Whisky from "./Whisky.js"
import Gin from "./Gin.js"
import { useState } from "react"
import axios from "axios"

export default function GerarProdutos() {
    console.log("chegou no gerar produtos")

    return (
        <ContainerProduto>

            <Produto>
              < Vinho/>
              <Cerveja/>
              <Whisky/>
              <Gin/>
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