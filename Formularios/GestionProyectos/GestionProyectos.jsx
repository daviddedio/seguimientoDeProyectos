import './GestionProyectos.css'
import { useEffect, useState } from 'react'
import { getAllData, deleteProyecto, addProyecto } from '../../FireBase/conexion'
import { ComponenteCarga } from '../../component/ComponenteCarga/ComponenteCarga'
import { UseForm } from '../UseForm'


export const GestionProyectos = ({ funcion }) => {
    const template = { nombre: '', descripcion: '' }
    const { formState, onInputTextChange, setFormState } = UseForm(template)
    const { nombre, descripcion } = formState

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const getProyects = async () => {
        setLoading(true)
        try {
            const res = await getAllData('Proyectos')
            setData(res)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const deleteProyect = async (id) => {
        setLoading(true)
        try {
            const res = await deleteProyecto(id)
        } catch (error) {

        } finally {
            setLoading(false)
            getProyects()
            funcion[0](!funcion[1])
        }
    }

    const addNewProyecto = async (e) => {
        setLoading(true)
        e.preventDefault()
        await addProyecto(formState)
        getProyects()
        setLoading(false)
        setFormState({ ...formState, ['nombre']: '', ['descripcion']: '' })
        funcion[0](!funcion[1])
    }

    useEffect(() => { getProyects() }, [])


    return (
        <div className='all-conteiner'>
            <h2>Gestion de proyectos</h2>
            <div className='proyect-conteiner'>
                <div className='proyect-create'>
                    <form action='' onSubmit={(e) => addNewProyecto(e)} >
                        <div className="inputPack">
                            <label htmlFor="nombre">Titulo</label>
                            <input type="text" name="nombre" id="nombre" onChange={onInputTextChange} value={nombre} />
                        </div>
                        <div className="inputPack">
                            <label htmlFor="descripcion">Descripcion</label>
                            <textarea rows={3} name="descripcion" id="descripcion" onChange={onInputTextChange} value={descripcion} />
                        </div>
                        <button type="submit">{loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Agregar"}</button>
                    </form>
                </div>
                <div className='list-proyect'>
                    <h4>Proyectos</h4>
                    <ul>
                        {
                            loading ? <ComponenteCarga /> : data.map((e, i) =>
                                <li key={i} className='list-proyect-delete'>
                                    <div className="nombre-proyect">{e.nombre}</div>
                                    <div className="delete-proyect"><i className="fa-solid fa-trash toolTipConteiner" onClick={() => deleteProyect(e.id)} id={e.id} /></div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}