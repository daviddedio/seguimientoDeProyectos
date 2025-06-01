import './DeleteAction.css'
import { deleteItemAction } from '../../FireBase/conexion'
import { useGlobalContext } from '../../context/Context'
import { useState } from 'react'

export const DeleteAction = ({ nro, funcion, titulo, Proyecto }) => {
    const { setOpenModal, setComponente, updateCards } = useGlobalContext()
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const deleteItem = async () => {
        setLoading(true)
        const res = await deleteItemAction(nro)
        if (res === 'ok') {
            setOpenModal(false)
            updateCards(Proyecto)
        } else {
            setMsg(res)
        }
        setLoading(false)
    }

    return (
        <div className="delete-conteiner">
            <h2>Esta seguro de querer eliminar el item de accion: "{titulo}"</h2>
            <div className="opciones-conteiner">
                <button type="button" onClick={() => { deleteItem() }}>{loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Eliminar"}</button>
            </div>
            <span>{msg}</span>
        </div>
    )
}