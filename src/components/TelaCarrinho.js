import { useContext } from "react"
import BebidasContext from "../contexts/BebidasContext"
import styledComponents from "styled-components"
import Header from './Header.js'
import ResumoDaCompra from "./ResumoDaCompra"
import { useNavigate } from "react-router-dom"

export default function TelaCarrinho() {

    const { carrinho, setCarrinho, listaProdutos, setListaProdutos } = useContext(BebidasContext)

    const navigate = useNavigate();

    function aumentar(produto) {

        const atualizacao = listaProdutos.map(elemento => {

            if (elemento._id === produto._id) {
                return { ...elemento, quantidade: produto.quantidade + 1 }
            } else {
                return elemento
            }
        })

        const produtosCarrinho = atualizacao.filter(produto => produto.quantidade !== 0 && produto.adicionar === true)

        let aux = 0

        for (let i = 0; i < produtosCarrinho.length; i++) {
            aux = aux + produtosCarrinho[i].quantidade
        }
        setListaProdutos(atualizacao)
        setCarrinho(produtosCarrinho)
        setQuantidadeCarrinho(aux)
    }

    function diminuir(produto) {
        if (produto.quantidade == 0) {
            return
        }


        const atualizacao = listaProdutos.map(elemento => {

            if (elemento._id === produto._id) {
                return { ...elemento, quantidade: produto.quantidade - 1 }
            } else {
                return elemento
            }
        })

        const produtosCarrinho = atualizacao.filter(produto => produto.quantidade !== 0 && produto.adicionar === true)

        let aux = 0

        for (let i = 0; i < produtosCarrinho.length; i++) {
            aux = aux + produtosCarrinho[i].quantidade
        }
        setListaProdutos(atualizacao)
        setCarrinho(produtosCarrinho)
        setQuantidadeCarrinho(aux)
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
function irParaCheckout(){
    navigate('/checkout' )
}
const ValorTotal = 1000
    
    console.log(ValorTotal)
    return (
        <div>
            <Header />
            <h1>Seu Space-Bar</h1>
            <div>
                {carrinho.map((produto) =>  <ContainerItem>
                        <Info>
                            <h3>{produto.nome}</h3>
                            <button onClick={() => irParaProduto(produto)}><img src={produto.imagem} /></button>
                            <h2>Preço do item: R$ {produto.valor}</h2>
                        </Info>
                        <ContainerVerificacao>
                            <h2>R$ {produto.quantidade * produto.valor}</h2>
                            <ContainerBotoes>
                                <button onClick={() => aumentar(produto)}>+</button>
                                <h3>{produto.quantidade}</h3>
                                <button onClick={() => diminuir(produto)}>-</button>
                                </ContainerBotoes>
                                <button onClick={() => tirarDoCarrinho(produto)}>Remover do Carrinho</button>
                 
                        </ContainerVerificacao>
                    </ContainerItem>
                )}
               <ResumoDaCompra/>
               <Finalizar onClick={()=>irParaCheckout()}>Confirmar Compra</Finalizar>
            </div>
        </div>
    )
}

const ContainerItem = styledComponents.div`
display:flex;
flex-direction:row;`
const Info = styledComponents.div`
display:flex;
flex-direction:column;`
const ContainerVerificacao = styledComponents.div`
display:flex;
flex-direction:column;`
const ContainerBotoes = styledComponents.div`
display:flex;
flex-direction:row;`
const ContainerResumo = styledComponents.div`
display:flex;
flex-direction:row;`

const Finalizar = styledComponents.button`
border: 0px;
width: 100vw;`