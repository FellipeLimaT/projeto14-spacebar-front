export function Adicionar({produto, setNovaLista}){

function aumentar(){
    const  atualizacao = {...produto, quantidade: quantidade+1}
    setProduto(atualizacao)

}
    return(
        <button onClick={() => aumentar(produto)}>+</button>
    )
}