import { useContext, useState } from "react"
import BebidasContext from "../contexts/BebidasContext.js"
import styled from "styled-components"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Categoria() {



    const { listaProdutos, setListaProdutos, setCarrinho, carrinho, quantidadeCarrinho, setQuantidadeCarrinho, categoriaEscolhida } = useContext(BebidasContext)

    const navigate = useNavigate();

    const URL = `http://localhost:5000/categoria/${categoriaEscolhida}`

    const [categoria, setCategoria] = useState([])

    useEffect(() => {
        const promiseGet = axios.get(URL)
        promiseGet.then((res) => gerarCategoria(res))
        promiseGet.catch((res) => console.log("deu ruim"))
    }, [categoriaEscolhida])


    function gerarCategoria(res) {
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
    
        const atualizacao = categoria.map(elemento => {
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
        console.log(listaProdutos)
        const selecionados = listaProdutos.map(elemento => {

            if (elemento._id === produto._id) {
                return { ...elemento, adicionar: true, quantidade: produto.quantidade }
            } else {
                return elemento
            }
        });
        console.log("depois do map", selecionados)
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

        console.log(listaProdutos)
        produto.quantidade = 0

        const selecionados = listaProdutos.map(elemento => {
            if (elemento._id === produto._id) {
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
        setQuantidadeCarrinho(aux)
    }

    function irParaProduto(produto) {
        navigate(`/produto/${produto._id}`)
    }
    return (
        <Main>
        <ContainerProduto>
            {categoria.map((produto, index) => <Produto>
                <button onClick={()=>irParaProduto(produto)}><img src={produto.imagem} /></button>
                    <NomeProduto>
                    <h3>{produto.nome}</h3>
                    </NomeProduto>
                    <h4>Preço: R${produto.valor}</h4>
                    <Botoes>
                        <button onClick={() => diminuir(produto)}>-</button>
                        <h5>{produto.quantidade}</h5>
                        <button onClick={() => aumentar(produto)}>+</button>
                    </Botoes>
                    <button onClick={() => colocarNoCarrinho(produto)}>Adicionar</button>
                    <button onClick={() => tirarDoCarrinho(produto)}>Remover</button>

            </Produto>
            )}

        </ContainerProduto>
        </Main>
    )
}

const Main = styled.div`
    margin: calc(50px + 18%) 0 0 0;
    display:flex;
    justify-content: center;    
    background-color: purple;
`;

const Produto = styled.div`
height: 360px;
display:flex;
flex-direction:column;
margin-bottom:20px;
background-color: green;

img{
    width: 140px;
    height: 30vh;
}

h4{
    font-size: 15px;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 10px;
}

h5{
    font-size: 17px;
    font-weight: 400;
    margin: 5px 10px 10px 10px;
}
`

const ContainerProduto = styled.div`
max-width: 90vw;
display:flex;

flex-direction:column;
margin-bottom: 20px;
overflow-x: scroll;
background-color: brown;`

const NomeProduto = styled.div`

width: auto;
height: 160px;

h3{
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top:7px;
}
`

const Botoes = styled.div`
display:flex;
flex-direction:row;
align-items: center;
justify-content: center;

button{
    font-size: 15px;
    font-weight: 700;
}
`