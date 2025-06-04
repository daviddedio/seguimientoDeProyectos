import './NavBar.css'
import { useGlobalContext } from '../../context/Context'
import { LoginForm } from '../../Formularios/LoginForm/LoginForm'
import { LogOutComponent } from '../../Formularios/LogOutComponent/LogOutComponent'
import { CreateNote } from '../../Formularios/CreateNote/CreateNote'

export const NavBar = ({ children, funcionAddItem, functionReviewProyect, optionsProyects}) => {

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

    const addNote =()=>{
        setComponente(<CreateNote opciones={optionsProyects}  />)
        setOpenModal(true)
    }

    return (
        <div className='navbar'>
            { login && <div className="options-items">
                <ul>
                    <li onClick={()=>proyectManager()}>Crear Proyecto</li>
                    <li onClick={()=>addItem()}>Crear Item de accion</li>
                    <li onClick={()=>addNote()}>Crear Nota</li>
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