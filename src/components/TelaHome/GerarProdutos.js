
import styled from "styled-components"
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