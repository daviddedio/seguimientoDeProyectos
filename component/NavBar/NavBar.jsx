import './NavBar.css'
import { useGlobalContext } from '../../context/Context'
import { LoginForm } from '../../Formularios/LoginForm/LoginForm'
import { LogOutComponent } from '../../Formularios/LogOutComponent/LogOutComponent'
import { CreateNote } from '../../Formularios/CreateNote/CreateNote'
import { ProyectSelector } from '../../Formularios/ProyectSelector/ProyectSelector'
import { TipoProyecto } from '../../Formularios/TipoProyecto/TipoProyecto'

export const NavBar = ({ funcionAddItem, functionReviewProyect, optionsProyects, actualizarItems}) => {

    const { setOpenModal, setComponente, login } = useGlobalContext()

    const addItem = () => {
        funcionAddItem()
    }

    const proyectType = () => {
        setComponente(<TipoProyecto/>)
        setOpenModal(true)
    }

    const getProyectsToShow = () => {
        setComponente(<ProyectSelector proyectos={optionsProyects} funcion={actualizarItems} />)
        setOpenModal(true)
    }


    const proyectManager = () => {
        functionReviewProyect()
    }

    const loginUser = () => {
        setComponente(<LoginForm />)
        setOpenModal(true)
    }

    const logOutUser = () => {
        setComponente(<LogOutComponent />)
        setOpenModal(true)
    }

    const addNote = () => {
        setComponente(<CreateNote opciones={optionsProyects} />)
        setOpenModal(true)
    }

    return (
        <div className='navbar'>
            <div className="options-items">
                <ul>
                    {login &&
                        <>
                            <li onClick={() => proyectType()}><i className="fa-solid fa-quote-left icons"></i>Tipos Proyectos</li>
                            <li onClick={() => proyectManager()}><i className="fa-solid fa-plus icons"></i>Crear Proyecto</li>
                            <li onClick={() => addItem()}><i className="fa-solid fa-list-ul icons"></i>Crear Item de accion</li>
                            <li onClick={() => addNote()}><i className="fa-solid fa-notes-medical icons"></i>Crear Nota</li>
                        </>
                    }
                    <li onClick={() => getProyectsToShow()}> <i className="fa-solid fa-briefcase icons" />Proyectos</li>
                </ul>
            </div>
            {/* <div className="select-proyect">
                <span>Seleccionar proyecto: </span>
                {children}
            </div> */}
            <div className="login-button">
                <button onClick={login ? logOutUser : loginUser}>{login ? "LogOut" : "LogIn"}</button>
            </div>
        </div>
    )
}