import './NavBar.css'
import { useGlobalContext } from '../../context/Context'
import { LoginForm } from '../../Formularios/LoginForm/LoginForm'
import { LogOutComponent } from '../../Formularios/LogOutComponent/LogOutComponent'

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

    const logOutUser = ()=>{
        setComponente(<LogOutComponent/>)
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
                <button onClick={login ? logOutUser : loginUser}>{login ? "LogOut" : "LogIn"}</button>
            </div>
        </div>
    )
}