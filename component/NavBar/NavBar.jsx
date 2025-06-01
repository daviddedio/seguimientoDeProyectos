import './NavBar.css'
import { useState } from 'react'
import { useGlobalContext } from '../../context/Context'
import { LoginForm } from '../../Formularios/LoginForm/LoginForm'
export const NavBar = ({ children, funcionAddItem, functionReviewProyect}) => {

    const { setOpenModal, setComponente, login } = useGlobalContext()

    const addItem = ()=>{
        funcionAddItem()
    }

    const proyectManager = ()=>{
        functionReviewProyect()
    }

    const loginUser = ()=>{
        setComponente(<LoginForm/>)
        setOpenModal(true)
    }

    return (
        <div className='navbar'>
            { login && <div className="options-items">
                <ul>
                    <li onClick={()=>addItem()}>Item de accion</li>
                    <li onClick={()=>proyectManager()}>Proyecto</li>
                </ul>
            </div>}
            <div className="select-proyect">
                <span>Seleccionar proyecto: </span>
                {children}
            </div>
            <div className="login-button">
                <button onClick={loginUser}>login</button>
            </div>
        </div>
    )
}