import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import BebidasContext from "../contexts/BebidasContext";
import { Adicionar } from "./Adicionar";
import styledComponents from "styled-components";
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

    const URL_PRODUTO = `http://localhost:5000/produtos/${idProduto}`

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



    return (
        <div>
            <Header />
            <ContainerProduto>
                <Produto>
                    <h5>Preço: R${produto.nome}</h5>
                    <button><img src={produto.imagem} /></button>
                    <h5>Preço: R${produto.valor}</h5>
                    <Botoes>
                        <button onClick={() => aumentar(produto)}>+</button>
                        <h3>{produto.quantidade}</h3>
                        <p>Descrição:{produto.descricao}</p>
                        <button onClick={() => diminuir(produto)}>-</button>
                    </Botoes>
                    <button onClick={() => colocarNoCarrinho(produto)}>Adicionar</button>
                    <button onClick={() => tirarDoCarrinho(produto)}>Remover</button>

                </Produto>

            </ContainerProduto>
        </div>
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