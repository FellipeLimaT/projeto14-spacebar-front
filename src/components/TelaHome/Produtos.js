import { useContext, useState } from "react"
import BebidasContext from "../../contexts/BebidasContext"
import styledComponents from "styled-components"
import { useEffect } from "react"
import axios from "axios"


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

    const [novaLista, setNovaLista] = useState([])

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
        setNovaLista(nova)
        gerarCategorias(nova)

    }

    function gerarCategorias(novaLista) {

        const gerarVinho = novaLista.filter(produto => produto.categoria === "vinho")
        const gerarCerveja = novaLista.filter(produto => produto.categoria === "cerveja")
        const gerarGin = novaLista.filter(produto => produto.categoria === "whisky")
        const gerarWhsiky = novaLista.filter(produto => produto.categoria === "gin")
        setVinho(gerarVinho)
        setCerveja(gerarCerveja)
        setWhisky(gerarWhsiky)
        setGin(gerarGin)
    }
    function aumentar(produto) {

        atualizacao = novaLista.map(elemento => {
            if (elemento === produto) {
                return { ...elemento, quantidade: produto.quantidade + 1 }
            } else {
                return elemento
            }
        })
        setNovaLista(atualizacao)
        gerarCategorias(atualizacao)
    }

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
        <ContainerPrincipal>
            <ContainerProduto>
                {vinho.map((produto, index) => <Produto>
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
                )
                }

            </ContainerProduto>

            <ContainerProduto>
                {cerveja.map((produto, index) => <Produto>
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
                )
                }

            </ContainerProduto>

            <ContainerProduto>
                {whisky.map((produto, index) => <Produto>
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
                )
                }

            </ContainerProduto>

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
                )
                }

            </ContainerProduto>
        </ContainerPrincipal>

    )
}

const ContainerPrincipal = styledComponents.div`
display:flex;
flex-direction:column;`

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