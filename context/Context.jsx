import { useContext, createContext, useState } from "react";

export const GlobalContext = createContext({
    openModal:false, 
    setOpenModal: ()=>null,
    updateCards:null,
    setUpdateCards: ()=>null
})

export const GlobalProvider = ({children}) => {
    /*varible locales*/
    const[openModal, setOpenModal] = useState(false)
    const [componente, setComponente] = useState('')
    const [updateCards, setUpdateCards] = useState(null)
    const [login, setLogin] = useState('')

    return( 
        <GlobalContext.Provider value={{openModal, setOpenModal, componente, setComponente, updateCards, setUpdateCards, login, setLogin}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    const context = useContext(GlobalContext)
    return context
}