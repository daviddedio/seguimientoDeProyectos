import './TipoProyecto.css'
import { useEffect, useState } from 'react'
import { ComponenteCarga } from '../../component/ComponenteCarga/ComponenteCarga'
import { UseForm } from '../UseForm'
import { getAllData, addTipoProyecto, deleteTipoProyecto } from '../../FireBase/conexion'

export const TipoProyecto = () => {
    const template = { tipo: '' }
    const { formState, onInputTextChange, setFormState } = UseForm(template)
    const { tipo } = formState

    const [loading, setLoding]=useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const addNewProyecto = async(e) => {
        setLoding(true)
        e.preventDefault()
        await addTipoProyecto(formState)
        getDataFromType()
        setLoding(false)
        setFormState({ ...formState, ['tioo']: ''})
    }

    const deleteProyect = async (id) => {
        setLoding(true)
        try {
            const res = await deleteTipoProyecto(id)
        } catch (error) {

        } finally {
            setLoding(false)
            getDataFromType()
        }
    }

    const getDataFromType = async()=>{
        setLoding(true)
        try {
            const res = await getAllData('TipoProyecto')
            setData(res)
        } catch (error) {
            setError(error.message)
        }finally{
            setLoding(false)
        }
    }

    useEffect(()=>{getDataFromType()},[])

    return (
        <div className='tipo-proyecto-contenedor'>
            <h2>Gestion de tipos de proyectos</h2>
            <div className="tipo-proyecto-conteiner">
                <div className='proyect-tipo-create'>
                    <form action='' onSubmit={(e) => addNewProyecto(e)} >
                        <div className="inputPack">
                            <label htmlFor="tipo">Titulo</label>
                            <input type="text" name="tipo" id="tipo" onChange={onInputTextChange} value={tipo} />
                        </div>
                        <button type="submit">{loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Agregar"}</button>
                    </form>
                </div>
                <hr />
                <div className='list-tipo-proyect'>
                    <h2>Proyectos</h2>
                    <ul>
                        {
                            loading ? <ComponenteCarga /> : data.map((e, i) =>
                                <li key={i} className='list-proyect-delete'>
                                    <div className="nombre-proyect">{e.tipo}</div>
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