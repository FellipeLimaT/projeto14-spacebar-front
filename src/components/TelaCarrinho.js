import { useContext } from "react"
import BebidasContext from "../contexts/BebidasContext"
import styled from "styled-components"
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
    function irParaCheckout() {
        navigate('/checkout')
    }
    const ValorTotal = 1000

    console.log(ValorTotal)
    return (
        <div>
            <Header />
            <Main>
                <div>
                    <h1>CARRINHO - Seu SpaceBar</h1>
                </div>

                <ContainerProduto>
                    <div>
                        {carrinho.map((produto) => <ContainerItem>

                            <button onClick={() => irParaProduto(produto)}><img src={produto.imagem} /></button>
                            <Info>

                                <h2>{produto.nome}</h2>
                                <h3>R$ {produto.quantidade * produto.valor}</h3>

                                <ContadorQtd>
                                    <button onClick={() => diminuir(produto)}>-</button>
                                    <h4>{produto.quantidade}</h4>
                                    <button onClick={() => aumentar(produto)}>+</button>
                                </ContadorQtd>

                            </Info>

                            <RemoverCarrinho>
                                <button onClick={() => tirarDoCarrinho(produto)}>X</button>
                            </RemoverCarrinho>

                        </ContainerItem>

                        )}

                        <ContainerConfirmacao>
                            <ResumoDaCompra />
                            <Finalizar onClick={() => irParaCheckout()}>Confirmar Compra</Finalizar>
                        </ContainerConfirmacao>
                    </div>
                </ContainerProduto>




            </Main>
        </div>
    )
}

const Main = styled.div`
    margin: calc(50px + 18%) 0 0 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    
    h1{
        font-size: 22px;
        margin-bottom: 40px;
    }

    button{
    width: 30vw;
    height: 20vh;
    margin-right: 5px;
}
`;

const RemoverCarrinho = styled.div`

button{
    width: 20px;
    height: 20px;
}
`

const ContadorQtd = styled.div`

display: flex;

button{
    width: 20px;
    height: 20px;
}
`


const ContainerProduto = styled.div`

width: 90vw;
height: 150px;
margin-bottom: 15px;
display: flex;

img{
    width: 20vw;
    height: 18vh;
}
`

const ContainerItem = styled.div`
display:flex;
margin-bottom: 20px;
background-color: orange;
`


const Info = styled.div`
display:flex;
flex-direction:column;

h3{
        font-size: 15px;
        font-weight: 400;
        font-style: italic;
        margin: 10px 0;
}

h4{
        font-size: 15px;
        font-weight: 700;
        margin: 0 10px;
}
`

const ContainerConfirmacao = styled.div`
display:flex;
flex-direction:column;
align-items: center;

button{
    width: 150px;
    height: 40px;
    margin: 15px 0;
}
`

const Finalizar = styled.button`
border: 0px;
width: 100vw;`