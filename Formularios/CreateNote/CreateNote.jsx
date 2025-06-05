import './CreateNote.css'
import { getFilterDatas, addNote, deleteNote } from '../../FireBase/conexion'
import { useState } from 'react'

export const CreateNote = ({ opciones }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const buscarNotas = async (e, bus) => {
        setLoading(true)
        const buscar = e ? e.target.value : bus
        try {
            const datos = await getFilterDatas('Notes', 'proyecto', buscar)
            setData(datos)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const addNewNote = async (e) => {
        e.preventDefault()
        const titulo = e.target.elements.titulo.value
        const nota = e.target.elements.nota.value
        const adjunto = e.target.elements.adjunto.value
        const proyecto = e.target.elements.proyecto.value
        const obj = { "titulo":titulo, "nota": nota, "adjunto": adjunto, "proyecto": proyecto }

        const res = await addNote(obj)
        if (res) { buscarNotas('', proyecto) }
    }


    return (
        <div>
            <h1>Gestionar notas</h1>
            <form action='' onSubmit={(e) => addNewNote(e)} className='form-create-note'>
                <div className="inputPack">
                    <label htmlFor="titulo">Titulo</label>
                    <input type="text" name="titulo" id="titulo" />
                </div>
                <div className="inputPack">
                    <label htmlFor="nota">Nota</label>
                    <input type="text" name="nota" id="nota" />
                </div>
                <div className="inputPack">
                    <label htmlFor="adjunto">Adjunto</label>
                    <input type="text" name="adjunto" id="adjunto" placeholder='subir los archivos manualmente' />
                </div>
                <div className="inputPack">
                    <label htmlFor="proyecto">Proyecto</label>
                    <select name="proyecto" id="proyecto" onChange={(e) => { buscarNotas(e, '') }}>
                        {opciones.map((e, i) => <option key={i} value={e.nombre}>{e.nombre}</option>)}
                    </select>
                </div>
                <button type="submit">Agregar</button>
            </form>
            <hr />
            <div className="notas-creadas-conteiner">
                <ul>
                    {data && data.map((e, i) => <li key={i}>{e.titulo}</li>)}
                </ul>
            </div>

        </div>
    )
}

//value={proyecto} onChange={onInputTextChange}