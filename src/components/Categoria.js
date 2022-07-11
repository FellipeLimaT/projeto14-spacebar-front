import { useContext, useState } from "react"
import BebidasContext from "../contexts/BebidasContext.js"
import styledComponents from "styled-components"
import { useEffect } from "react"
import axios from "axios"


export default function Categotaria() {

    const URL = `http://localhost:5000/categoria/${idCategoria}`

    const { listaProdutos, setListaProdutos, setCarrinho, carrinho, quantidadeCarrinho, setQuantidadeCarrinho } = useContext(BebidasContext)

    const [categoria, setCategoria] = useState([])

    useEffect(() => {
        const promiseGet = axios.get(URL)
        promiseGet.then((res) => gerarCategoria(res))
        promiseGet.catch((res) => console.log("deu ruim"))
    }, [])


    function gerarCategotia(res) {
        const lista = res.data
        const novaLista = lista.map(produto => {
            return {
                ...produto,
                quantidade: 0
            }
        })
        setCategoria(novaLista)
    }
    function aumentar(produto) {

        const atualizacao = categoria.map(elemento => {
            if (elemento === produto) {
                return { ...elemento, quantidade: produto.quantidade + 1 }
            } else {
                return elemento
            }
        })
        setCategoria(atualizacao)
    }

    function diminuir(produto) {
        if (produto.quantidade == 0) {
            return
        }
        atualizacao = categoria.map(elemento => {

            if (elemento === produto) {
                return { ...elemento, quantidade: produto.quantidade - 1 }
            } else {
                return elemento
            }
        })
        setCategoria(atualizacao)
    }
    function colocarNoCarrinho(produto) {

        if (produto.quantidade === 0) {
            return
        }

        const selecionados = listaProdutos.map(elemento => {

            if (elemento === produto) {
                return { ...elemento, adicionar: true, quantidade: produto.quantidade }
            } else {
                return elemento
            }
        });

        const produtosCarrinho = selecionados.filter(produto => produto.quantidade !== 0 && produto.adicionar === true)

        let aux = 0

        for (let i = 0; i < produtosCarrinho.length; i++) {
            aux = aux + produtosCarrinho[i].quantidade
        }
        setListaProdutos(selecionados)
        setCarrinho(produtosCarrinho)
        console.log(aux)
        setQuantidadeCarrinho(aux)

        console.log(carrinho)
    }

    function tirarDoCarrinho(produto) {
        if (produto.adicionar === false) {
            return
        }
        const selecionados = listaProdutos.map(elemento => {
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
        setListaProdutos(selecionados)
        setCarrinho(produtosCarrinho)
    }

    function irParaProduto(produto) {
        navigate(`/produto/${produto._id}`)
    }
    return (
        <ContainerProduto>
            {categoria.map((produto, index) => <Produto>
                <h5>{produto.nome}</h5>
                <button onClick={() => irParaProduto(produto)}><img src={produto.imagem} /></button>
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
flex-direction:column;`


const Botoes = styledComponents.div`
display:flex;
flex-direction:column;`