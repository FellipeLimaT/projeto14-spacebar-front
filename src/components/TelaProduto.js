import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import BebidasContext from "../contexts/BebidasContext";
import { Adicionar } from "./Adicionar";
import styled from "styled-components";
import axios from "axios";
import Header from "./Header";

export default function TelaProduto() {
    console.log("1")
    const { idProduto } = useParams();

    const { listaProdutos,
        setListaProdutos, carrinho,
        setCarrinho,
        quantidadeCarrinho,
        setQuantidadeCarrinho } = useContext(BebidasContext)
    console.log("2")
    const [produto, setProduto] = useState({})

    const URL_PRODUTO = `https://git.heroku.com/projeto14-spacebar-back.git/${idProduto}`

    useEffect(() => {
        const promiseProduto = axios.get(URL_PRODUTO)
        promiseProduto.then((res) => gerarProduto(res))
        promiseProduto.catch(() => alert("opsss"))
    }, [])
    console.log("3")
    function gerarProduto(res) {
        const produto = res.data
        console.log(produto)
        const produtoCompleto = {
            ...produto[0],
            adicionar: false,
            quantidade: 0
        }
        console.log(produtoCompleto)
        setProduto(produtoCompleto)
    }



    function aumentar(produto) {

        const atualizacao = { ...produto, quantidade: produto.quantidade + 1 }
        setProduto(atualizacao)
    }

    function diminuir(produto) {
        if (produto.quantidade === 0) {
            return
        }

        const atualizacao = { ...produto, quantidade: produto.quantidade - 1 }
        setProduto(atualizacao)
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
        if (produto.quantidade === 0) {
            return
        }

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
    function voltarHome(){
        navigate('/')
    }


    return (
        <div>
            <Header onClick={()=>voltarHome()} />
            <Main>
                <ContainerProduto>
                    <Produto>

                        <button><img src={produto.imagem} /></button>
                        <NomeProduto>
                            <h3>{produto.nome}</h3>
                        </NomeProduto>
                        <h4>Preço: R${produto.valor}</h4>
                        <Botoes>
                            <button onClick={() => diminuir(produto)}>-</button>
                            <h5>{produto.quantidade}</h5>
                            <button onClick={() => aumentar(produto)}>+</button>
                        </Botoes>
                        <p>Descrição: {produto.descricao}</p>
                        <button onClick={() => colocarNoCarrinho(produto)}>Adicionar</button>
                        <button onClick={() => tirarDoCarrinho(produto)}>Remover</button>

                    </Produto>

                </ContainerProduto>
            </Main>
        </div>
    )
}

const Main = styled.div`
    position: relative;
    top: 200px;
    display:flex;
    justify-content: center;    
`;

const Produto = styled.div`
height: 550px;
display:flex;
flex-direction:column;

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
    
}

p{
    font-size: 17px;
    font-weight: 400;
    padding: 5px;
}

button{ 
    background-color: #FFFFFF;
    border: solid 1px ;
}
`


const ContainerProduto = styled.div`
max-width: 90vw;
display:flex;
flex-direction:row;
margin-bottom: 20px;
overflow-x: scroll;
background-color: #C7C7C7;
border: solid 1px #000000;
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