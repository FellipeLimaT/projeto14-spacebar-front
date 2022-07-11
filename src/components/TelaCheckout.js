import { useContext, useState } from "react"
import BebidasContext from "../contexts/BebidasContext"
import styledComponents from "styled-components"
import axios from 'axios'
import { useEffect } from "react"
import Header from "./Header"
import { useNavigate } from "react-router-dom"

export default function TelaCheckout() {

    const { valorTotal, carrinho } = useContext(BebidasContext)

    const navigate= useNavigate();

    const dataLocalSerializada = localStorage.getItem('user')
    const dataDesSerelizada = JSON.parse(dataLocalSerializada)
    const infoLocal = dataDesSerelizada

    const config = {
        headers: {
            "Authorization": `Bearer ${infoLocal.token}`
        }
    }

    console.log(infoLocal)

    const [nomeCartao, setNomeCartao] = useState()
    const [numeroCartao, setNumeroCartao] = useState()
    const [codigoCartao, setCodigoCartao] = useState()
    const [validadeCartao, setValidadeCartao] = useState()
    const [entrega, setEntrega] = useState()
    const [cep, setCep] = useState()
    const [numero, setNumero] = useState()
    const [complemento, setComplemento] = useState()

    const URLPedido = "https://spacebardriven.herokuapp.com/pedidos"

function editarCep(e){
    if (e.target.value.length === 5) {
        e.target.value = e.target.value + "-"
    }
    if (e.target.value.length > 9) {
        alert("Numero de CEP inválido")
        setCep("")

    }
    setCep(e.target.value)
}

    function editarNumeroCartao(e) {

        if (e.target.value.length === 4) {
            e.target.value = e.target.value + " "
        }

        if (e.target.value.length === 9) {
            e.target.value = e.target.value + " "
        }

        if (e.target.value.length === 14) {
            e.target.value = e.target.value + " "
        }
        if (e.target.value.length > 20) {
            alert("Numero de cartão inválido")
        }
        setNumeroCartao(e.target.value)
    }

    function editarCodigoCartao(e) {

        if (e.target.value.length> 3) {
            alert("Codigo do cartao invalido")
        }
        setCodigoCartao(e.target.value)
    }

    function editarValidadeCartao(e) {

        if (e.target.value.length === 2) {
            e.target.value = e.target.value + "/"
        }
        setValidadeCartao(e.target.value)
    }

    function  MandarPedido(event){
        event.preventDefault()
        const body = {
        endereco:{
            entrega, 
            cep,
            numero,
            complemento
        },
        pagamento:{
            nomeCartao,
            numeroCartao,
            codigoCartao, 
            validadeCartao
        },
        pedido:{
            carrinho
        }
    }

    console.log(body, config)

        const promisePedidos = axios.post(URLPedido, body, config )
        promisePedidos.then(()=> alert("tudo vcerto"))
        promisePedidos.then(()=> alert("deu ruin"))
    }

    function voltarHome(){
        navigate('/')
    }

    return (
        <>
        <Header onClick={()=>voltarHome()} />
        <ContainerPrincipal>
            <ContainerEntrega>
                <h2> Informações de Entrega</h2>
                <form>
                    <input placeholder="Endereço de entrega" value={entrega} onChange={(e) => setEntrega(e.target.value)} required={true} />
                    <input placeholder="CEP" value={cep} onChange={(e) => editarCep(e)} required />
                    <EnderecoSecundario>
                        <input placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
                        <input placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                    </EnderecoSecundario>
                </form>
            </ContainerEntrega>
            <ContainerPagamento>
            <h2> Informações de Pagamento</h2>
                <form>
                    <input placeholder="Nome impresso no cartão" value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value)} required={true} />
                    <input placeholder="Digitos do cartão" value={numeroCartao} onChange={(e) => editarNumeroCartao(e)} />
                    <PagamentoSecundario>
                        <input placeholder="Código de segurança" value={codigoCartao} onChange={(e) => editarCodigoCartao(e)} />
                        <input placeholder="Validade" value={validadeCartao} onChange={(e) => editarValidadeCartao(e)} />
                    </PagamentoSecundario>
                    <button onClick={(event) => MandarPedido(event)}>Finalizar</button>
                </form>
            </ContainerPagamento>
            </ContainerPrincipal>
        </>
    )
}

const ContainerPrincipal = styledComponents.div`
position: fixed;
top: 120px;
width: 90vw;
display: flex;
flex-direction: column;`

const ContainerPagamento = styledComponents.div`
margin-top: 36px;
input{
    width: 100%;
    height: 50px;
    margin-bottom: 8px;
    background: #FFFFFF;
    border-radius: 8px;
}
`
const PagamentoSecundario = styledComponents.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 82vw;
input{
    width: 47%;
    height: 50px;
    margin-bottom: 8px;
    background: #FFFFFF;
    border-radius: 8px;
}
`
const ContainerEntrega = styledComponents.div`
margin-top: 36px;
input{
    width: 100%;
    height: 50px;
    margin-bottom: 8px;
    background: #FFFFFF;
    border-radius: 8px;
}
`
const EnderecoSecundario = styledComponents.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 82vw;
input{
    width: 47%;
    height: 50px;
    margin-bottom: 8px;
    background: #FFFFFF;
    border-radius: 8px;
}
`
