import { createContext } from "react";

export const CategoriaBebidas = createContext();

export default function Provider({ children }){
    const categorias = ["Vinho", "Gin", "Vodka", "Cerveja"];

    return(
        <CategoriaBebidas.Provider value={{categorias}}>
            {children}
        </CategoriaBebidas.Provider>
    )
}