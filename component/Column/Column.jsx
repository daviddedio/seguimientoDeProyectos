import './Column.css'
import { editItemActionState } from '../../FireBase/conexion'
import { useGlobalContext } from '../../context/Context'
import { AlertMessage } from '../AlertMessage/AlertMessage'
import { Autorization } from '../../Formularios/Autorization/Autorization'

export const Column = ({ children, id, funcion, datos, nombreColumn }) => {

    const drop = async (e) => {
        const data = JSON.parse(e.dataTransfer.getData('dataTransf'))
        const nuevosDatos = datos.map(item =>
            item.id === data.id ? { ...item, estado: nombreColumn } : item)
        funcion(nuevosDatos)
        const res = await editItemActionState(data.id, nombreColumn)
        if (res != 'ok') {
            //tequemos que revertir el estado
            const nuevosDatos = datos.map(item =>
                item.id === data.id ? { ...item, estado: data.origen } : item)
            funcion(nuevosDatos)
            mostrarModal(<AlertMessage msg={"Ha ocurrido un error al cambiar de estado en esta accion"} typeMsg={3}/>)
        }
    }

    const { setOpenModal, setComponente, login } = useGlobalContext()

    const mostrarModal = (reactComponente) => {
        setComponente(reactComponente)
        setOpenModal(true)
    }


    return (
        <div className={`column column${id}`}
            onDragOver={e => e.preventDefault()}
            onDrop={e => login ? drop(e) : mostrarModal(<Autorization/>)}>
            <h2 className='title-column'>{nombreColumn}</h2>
            {children}
        </div>
    )
}