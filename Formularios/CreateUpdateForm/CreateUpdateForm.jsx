import './CreateUpdateForm.css'
import { UseForm } from '../UseForm'
import { useEffect, useState } from 'react'
import { getAllData, updateItemAction, addItemAction } from '../../FireBase/conexion'
import { useGlobalContext } from '../../context/Context'

export const CreateUpdateForm = ({ accion, Id, Titulo, Descripcion, Plazo, Proyecto, Estado }) => {
    const { setOpenModal, updateCards } = useGlobalContext()

    const template = {
        titulo: Titulo,
        descripcion: Descripcion,
        plazo: Plazo,
        proyecto: Proyecto,
        estado: Estado,
    }

    const { formState, onInputTextChange, setFormState } = UseForm(template)
    const { titulo, descripcion, plazo, proyecto, estado } = formState
    const [loader, setLoader] = useState('')
    const [loadingProyecto, setloadingProyecto] = useState(false)
    const [datosProyecto, setDatosProyecto] = useState([])
    const [errorProyecto, setErrorProyecto] = useState('')

    const getProyect = async () => {
        setloadingProyecto(true)
        try {
            const datos = await getAllData('Proyectos')
            setDatosProyecto(datos)
        } catch (error) {
            setErrorProyecto(errorProyecto)
        } finally {
            setloadingProyecto(false)
        }
    }

    useEffect(() => { 
        getProyect()
    }, [])

    const cargarDatos = async (e, Id) => {
        e.preventDefault()
        if (formState.proyecto == ''){
            setFormState({...formState, proyecto:"undefined"})
        }
        
        if (accion === "Editar"){
            const res = await updateItemAction(Id, formState)
            if (res != 'ok') {
                alert(res)
            }
        }else{
            const form = {...formState,estado:"Para hacer"}
            console.log(form)
            addItemAction(form)
        }
        updateCards(proyecto)
        setOpenModal(false)
    }

    return (
        <>
            <div className='create-update-form'>
                <h2 className='CreateUpdateFormTitle'>{accion} item de accion</h2>
                <form action="" onSubmit={(e) => cargarDatos(e, Id)}>
                    <div className="inputPack">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" name="titulo" id="titulo" onChange={onInputTextChange} value={titulo} />
                    </div>

                    <div className="inputPack">
                        <label htmlFor="descripcion">Descripcion</label>
                        <input type="text" name="descripcion" id="descripcion" onChange={onInputTextChange} value={descripcion} />
                    </div>

                    <div className="inputPack">
                        <label htmlFor="plazo">Fecha de finalizacion</label>
                        <input type="date" name="plazo" id="plazo" value={plazo} onChange={onInputTextChange} />
                    </div>

                    <div className="inputPack">
                        <label htmlFor="proyecto">Proyecto</label>
                        <select name="proyecto" id="proyecto" disabled={loadingProyecto} value={proyecto} onChange={onInputTextChange}>
                            {loadingProyecto ? <option>Cargando</option> : datosProyecto.map((e, i) =>
                                <option key={i} value={e.nombre}>{e.nombre}</option>)}
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div className={`loader ${loader}`}></div>
            </div>
        </>

    )
}