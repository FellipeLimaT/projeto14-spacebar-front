import { useContext } from "react"
import BebidasContext from "../contexts/BebidasContext"
import { useParams } from "react-router-dom"
import Categoria from './Categoria.js'
import Header from "./Header"
import { useState } from "react"


export default function TelaSessaoProduto() {

    const { setCategoriaEscolhida, categoriaEscolhida } = useContext(BebidasContext)

    const { idCategoria } = useParams();
    setCategoriaEscolhida(idCategoria)

    function voltarHome(){
        navigate('/')
    }

    return (
        <div>
            <Header onclick={()=>voltarHome()}/>
            <Categoria />
        </div>


    )
}