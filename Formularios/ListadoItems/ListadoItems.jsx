import './ListadoItems.css'
import { useState } from 'react'
import { getAllData, editItemState, addItem, deleteItem } from '../../FireBase/conexion'
import { useGlobalContext } from '../../context/Context'

import { ComponenteCarga } from '../../component/ComponenteCarga/ComponenteCarga'

export const ListadoItems = ({ id, items, funcionItems }) => {
    const {login } = useGlobalContext()

    const [loadingItems, setloadingItems] = useState(false)
    const [datosItems, setDatosItems] = useState(items)
    const [errorItems, setErrorItems] = useState('')

    const [actualizacion, setActualizacion] = useState(false)

    const [nuevoItem, setNuevoItem] = useState('')

    const actualizarNuevoItem = (e) => {
        setNuevoItem(e.target.value)
    }

    const agregarItem = async () => {
        setloadingItems(true)
        const obj = { idItemAction: id, descripcion: nuevoItem, estado: false }
        const res = await addItem(obj)
        console.log(res.id)
        if (res.id) {
            const newObj = { ...obj, id: res.id }
            console.log(newObj)
            setDatosItems([...datosItems, newObj])
            funcionItems([...datosItems, newObj])
        } else {
            setErrorItems(res)
        }
        setloadingItems(false)
        setNuevoItem('')
    }

    const editarEstadoItem = async ({ value, checked }) => {
        const invertir = checked ? true : false
        const revisionItems = datosItems.map(e => e.id === value ? { ...e, estado: invertir } : e)
        setDatosItems(revisionItems)
        funcionItems(revisionItems)
        const res = await editItemState(value, invertir)
        if (res != 'ok') {
            setDatosItems(datosItems.map(e => e.id === value ? { ...e, estado: checked } : e))
            funcionItems(datosItems.map(e => e.id === value ? { ...e, estado: checked } : e))
            setActualizacion(!actualizacion)
            setErrorItems(res)
        }
    }

    const eliminarItem = async (id) => {
        const datosFijos = datosItems
        const datosFiltrados = datosItems.filter(e => e.id != id)
        setDatosItems(datosFiltrados)
        funcionItems(datosFiltrados)

        const res = await deleteItem(id)
        if (res != 'ok') {
            setDatosItems(datosFijos)
            funcionItems(datosFijos)
            setErrorItems(res)
        }
    }

    return (
        <>
            <h2 className='titulo-items-personalizados'>Items de accion</h2>
            <div className="list-data-conteiner">
                {login && <div className="form-items">
                    <label htmlFor="items">Cargar item: </label>
                    <div className="input-text">
                        <input type="text" name="items" id="items" value={nuevoItem}
                            onChange={actualizarNuevoItem} />
                        <a onClick={agregarItem}><i className="fa-solid fa-plus"></i></a>
                    </div>
                </div>}
                <ul className='listado-items'>
                    {loadingItems ? <ComponenteCarga /> : datosItems.map((e, i) =>
                        <li key={i}>
                            <input type="checkbox" name="item" id={i} checked={e.estado} value={e.id}
                                onChange={(e) => editarEstadoItem(e.target)} disabled={login ? false : true} />
                                <i className="fa-solid fa-arrow-right"></i>
                            <p>{e.descripcion}</p>
                            {login && <div className="opciones-items-delete">
                                <p>"Eliminar tarea: " {e.id}</p>
                                <i className="fa-solid fa-trash" onClick={() => eliminarItem(e.id)}></i>
                            </div>}
                        </li>)}
                </ul>
            </div>
        </>
    )
}