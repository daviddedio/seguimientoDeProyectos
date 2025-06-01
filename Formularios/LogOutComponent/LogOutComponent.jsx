import './LogOutComponent.css'
import { useGlobalContext } from '../../context/Context'
import { useEffect } from 'react'
import { logOutUser } from '../../FireBase/conexion'

export const LogOutComponent = () => {

    const { setOpenModal, setLogin, login } = useGlobalContext()

    const  LogOutUserState = async() => {       
        if (login) {
            const res = await logOutUser()
            console.log(res)
            if (res === 'out') {
                setLogin(false)
                setTimeout(() => {
                    setOpenModal(false)
                }, 2000);
            }
        }
    }

    useEffect(()=>{LogOutUserState()},[])

    return (
        <div className='log-out-conteiner'>
            <h1>Saliendo de la app...</h1>
        </div>
    )
}