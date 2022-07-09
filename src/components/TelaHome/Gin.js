import { useContext, useState } from "react"
import BebidasContext from "../../contexts/BebidasContext.js"
import styledComponents from "styled-components"
import { useEffect } from "react"
import axios from "axios"


export default function Gin() {
const [gin, setGin] = useState([])
const URL = "http://localhost:5000/gin"


const { setCarrinho, carrinho, quantidadeCarrinho, setQuantidadeCarrinho } = useContext(BebidasContext)

useEffect(()=>{
    const promiseGet = axios.get(URL)
    promiseGet.then((res)=>gerarGin(res))
    promiseGet.catch((res)=>console.log("deu ruim"))
},[])


function gerarGin(res) {
    const lista = res.data
    const novaLista = lista.map(produto => {
        return {
            ...produto,
            adicionar: false,
            quantidade: 0
        }
    })
    setGin(novaLista)
}
function aumentar(produto) {

   const atualizacao = gin.map(elemento => {
        if (elemento === produto) {
            return { ...elemento, quantidade: produto.quantidade + 1 }
        } else {
            return elemento
        }
    })
    setGin(atualizacao)
}

function diminuir(produto) {
    if (produto.quantidade == 0) {
        return
    }
    atualizacao = gin.map(elemento => {

        if (elemento === produto) {
            return { ...elemento, quantidade: produto.quantidade - 1 }
        } else {
            return elemento
        }
    })
    setGin(atualizacao)
}
function colocarNoCarrinho(produto) {

    if (produto.quantidade === 0) {
        return
    }

    const selecionados = gin.map(elemento => {

        if (elemento === produto) {
            return { ...elemento, adicionar: true }
        } else {
            return elemento
        }
    });

    const produtosCarrinho = selecionados.filter(produto => produto.quantidade !== 0 && produto.adicionar === true)

    let aux = 0

    for (let i = 0; i < produtosCarrinho.length; i++) {
        aux = aux + produtosCarrinho[i].quantidade
    }
    setGin(selecionados)
    setCarrinho(produtosCarrinho)
    console.log(aux)
    setQuantidadeCarrinho(aux)
}

function tirarDoCarrinho(produto) {
    if (produto.adicionar === false) {
        return
    }
    const selecionados = gin.map(elemento => {
        if (elemento === produto) {
            return { ...elemento, adicionar: false, quantidade: 0 }
        } else {
            return elemento
        }
    });

    const produtosCarrinho = selecionados.filter(produto => produto.quantidade !== 0 && produto.adicionar === true)

    let aux = 0

    for (let i = 0; i < produtosCarrinho.length; i++) {
        aux = aux + produtosCarrinho[i].quantidade
    }
    setGin(selecionados)
    setCarrinho(produtosCarrinho)
}
    return (
        <ContainerProduto>
            {gin.map((produto, index) => <Produto>
                <button><img src={produto.imagem} /></button>
                <h5>Preço: R${produto.valor}</h5>
                <Botoes>
                    <button onClick={() => aumentar(produto)}>+</button>
                    <h3>{produto.quantidade}</h3>
                    <button onClick={() => diminuir(produto)}>-</button>
                </Botoes>
                <button onClick={() => colocarNoCarrinho(produto)}>Adicionar</button>
                <button onClick={() => tirarDoCarrinho(produto)}>Remover</button>

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


const Botoes = styledComponents.div`
display:flex;
flex-direction:column;`