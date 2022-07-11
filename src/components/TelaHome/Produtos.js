import { useContext, useState } from "react"
import BebidasContext from "../../contexts/BebidasContext"
import styled from "styled-components"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Produtos() {

    const { listaProdutos,
        setListaProdutos,
        vinho,
        setVinho,
        cerveja,
        setCerveja,
        whisky,
        setWhisky,
        gin,
        setGin,
        carrinho,
        setCarrinho,
        quantidadeCarrinho,
        setQuantidadeCarrinho } = useContext(BebidasContext)


    const navigate = useNavigate();

    const URL = "http://localhost:5000/produtos"
    let atualizacao;
    useEffect(() => {
        const promiseGet = axios.get(URL)
        promiseGet.then((res) => gerarProdutos(res))
        promiseGet.catch((res) => console.log("deu ruim"))
    }, [])

    function gerarProdutos(res) {
        const lista = res.data
        const nova = lista.map(produto => {
            return {
                ...produto,
                adicionar: false,
                quantidade: 0
            }
        })
        setListaProdutos(nova)
        gerarCategorias(nova)

    }

    function gerarCategorias(listaProdutos) {

        const gerarVinho = listaProdutos.filter(produto => produto.categoria === "vinho")
        const gerarCerveja = listaProdutos.filter(produto => produto.categoria === "cerveja")
        const gerarGin = listaProdutos.filter(produto => produto.categoria === "whisky")
        const gerarWhsiky = listaProdutos.filter(produto => produto.categoria === "gin")
        setVinho(gerarVinho)
        setCerveja(gerarCerveja)
        setWhisky(gerarWhsiky)
        setGin(gerarGin)
    }
    function aumentar(produto) {

        atualizacao = listaProdutos.map(elemento => {
            if (elemento === produto) {
                return { ...elemento, quantidade: produto.quantidade + 1 }
            } else {
                return elemento
            }
        })
        setListaProdutos(atualizacao)
        gerarCategorias(atualizacao)
    }

    function diminuir(produto) {
        if (produto.quantidade == 0) {
            return
        }
        const atualizacao = listaProdutos.map(elemento => {

            if (elemento === produto) {
                return { ...elemento, quantidade: produto.quantidade - 1 }
            } else {
                return elemento
            }
        })
        setListaProdutos(atualizacao)
        gerarCategorias(atualizacao)

    }
    function colocarNoCarrinho(produto) {

        if (produto.quantidade === 0) {
            return
        }

        const selecionados = listaProdutos.map(elemento => {

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

        setListaProdutos(selecionados)
        setCarrinho(produtosCarrinho)
        console.log(aux)
        setQuantidadeCarrinho(aux)
        gerarCategorias(selecionados)
    }

    function tirarDoCarrinho(produto) {
        if (produto.adicionar === false) {
            return
        }
        const selecionados = vinho.map(elemento => {
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
        setVinho(selecionados)
        setCarrinho(produtosCarrinho)
    }

    function irParaProduto(produto){
        navigate(`/produto/${produto._id}`)
    }

    return (
        <ContainerPrincipal>
            <h2>Vinho</h2>
            <ContainerProduto>
                {vinho.map((produto, index) => <Produto>
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
                )
                }

            </ContainerProduto>
            <h2>Cerveja</h2>
            <ContainerProduto>
                {cerveja.map((produto, index) => <Produto>
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
                )
                }

            </ContainerProduto>
            <h2>Whisky</h2>
            <ContainerProduto>
                {whisky.map((produto, index) => <Produto>
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
                )
                }

            </ContainerProduto>
            <h2>Gin</h2>
            <ContainerProduto>
                {gin.map((produto, index) => <Produto>
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
                )
                }

            </ContainerProduto>
        </ContainerPrincipal>

    )
}

const ContainerPrincipal = styled.div`
width: 90vw;
height: 100%;
display:flex;
align-items: center;
justify-content: center;
flex-direction:column;


    h2{
        font-size: 30px;
        margin-bottom: 20px;
    }
`

const ContainerProduto = styled.div`
max-width: 90vw;
display:flex;
flex-direction:row;
margin-bottom: 20px;
overflow-x: scroll;
background-color: #C7C7C7;
border: solid 1px #000000;`

const Produto = styled.div`
height: 450px;
display:flex;
flex-direction:column;
margin-right:20px;
background-color: #FFFFFF;
border: solid 1px #000000;

img{
    width: 140px;
    height: 30vh;
}

h4{
    font-size: 15px;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 10px;
    padding: 5px;
}

h5{
    font-size: 17px;
    font-weight: 400;
    margin: 5px 10px 10px 10px;
    padding: 5px;
}

button{ 
    
}
`

const NomeProduto = styled.div`

width: auto;
height: 160px;

h3{
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top:7px;
    padding: 5px;
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