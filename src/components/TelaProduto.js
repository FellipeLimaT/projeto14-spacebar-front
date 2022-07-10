import { useContext } from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import BebidasContext from "../contexts/BebidasContext";
import { Adicionar } from "./Adicionar";
import styledComponents from "styled-components";

export default function TelaProduto() {
console.log("1")
    const { idProduto} = useParams(); 

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
        promiseProduto.then(() => gerarProduto(res))
        promiseProduto.catch(() => alert("opsss"))
    }, [])
    console.log("3")
    function gerarProduto(res){
        const produto = res.data
        const produtoCompleto={
            ...produto,
            adicionar: false,
            quantidade: 0
        }
        console.log(produtoCompleto)
        setProduto(produtoCompleto)
    }



    // function aumentar(produto) {

    //     atualizacao = novaLista.map(elemento => {
    //         if (elemento === produto) {
    //             return { ...elemento, quantidade: produto.quantidade + 1 }
    //         } else {
    //             return elemento
    //         }
    //     })
    //     setNovaLista(atualizacao)
    //     gerarCategorias(atualizacao)
    // }

    function diminuir(produto) {
        if (produto.quantidade == 0) {
            return
        }
        const atualizacao = novaLista.map(elemento => {

            if (elemento === produto) {
                return { ...elemento, quantidade: produto.quantidade - 1 }
            } else {
                return elemento
            }
        })
        setNovaLista(atualizacao)
        gerarCategorias(atualizacao)

    }
    function colocarNoCarrinho(produto) {

        if (produto.quantidade === 0) {
            return
        }

        const selecionados = novaLista.map(elemento => {

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

        setNovaLista(selecionados)
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



    return (
        <ContainerProduto>
           <Produto>
                <button><img src={produto.imagem} /></button>
                <h5>Preço: R${produto.valor}</h5>
                <Botoes>
                    <Adicionar produto={produto} setNovaLista={setNovaLista}/>
                    {/* <button onClick={() => aumentar(produto)}>+</button> */}
                    <h3>{produto.quantidade}</h3>
                    <button onClick={() => diminuir(produto)}>-</button>
                </Botoes>
                <button onClick={() => colocarNoCarrinho(produto)}>Adicionar</button>
                <button onClick={() => tirarDoCarrinho(produto)}>Remover</button>

            </Produto>
            )

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