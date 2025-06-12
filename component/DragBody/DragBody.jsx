import './DragBody.css'
import { Column } from '../Column/Column'
import { ActionCard } from '../ActionCard/ActionCard'
import { getAllData, getFilterDatas } from '../../FireBase/conexion'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/Context'
import { CreateUpdateForm } from '../../Formularios/CreateUpdateForm/CreateUpdateForm'
import { GestionProyectos } from '../../Formularios/GestionProyectos/GestionProyectos'
import { NavBar } from '../NavBar/NavBar'
import { ComponenteCarga } from '../ComponenteCarga/ComponenteCarga'
import { NoteComponent } from '../NoteComponent/NoteComponent'

/*Estados > To do - En curso - Finalizado */

export const DragBody = () => {
    const { setOpenModal, setComponente, setUpdateCards } = useGlobalContext()

    const mostrarModal = (reactComponente) => {
        setComponente(reactComponente)
        setOpenModal(true)
    }

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [reload, setReload] = useState(false)
    const [opcionProyecto, setOptionProyecto] = useState([])
    const [opcionDato, setOpcionDato] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [title, setTitle] = useState('')
    const [btnActive, setBtnActive] = useState(true)
    const [note, setNote] = useState([])
    const [tipo, setTipo] = useState([])

    const getData = async (tb, param, filtros) => {
        setLoading(true)
        try {
            const datos = await getFilterDatas(tb, param, filtros)
            //'itemAction', 'proyecto', filtros
            setData(datos)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const getNote = async (tb, param, filtros) => {
        setLoading(true)
        try {
            const datos = await getFilterDatas(tb, param, filtros)
            //'itemAction', 'proyecto', filtros
            setNote(datos)
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const setProyect = async () => {
        try {
            const datos = await getAllData('Proyectos')
            setOptionProyecto(datos)
            //esto va al membrete
            await getData('itemAction', 'proyecto', datos[0].nombre)
            await getNote('Notes', 'proyecto', datos[0].nombre)
            setDescripcion(datos[0].descripcion)
            setOpcionDato(datos[0].nombre)
            //efectos
            efectoTitulo()
        } catch (error) {
            setError(error.message)
        }
    }

    const actualizarItemsActions = async (e) => {
        setTitle('')
        // const { value } = e.target
        // const jsonParse = JSON.parse(value)
        efectoTitulo()
        setDescripcion(e.descripcion)
        setOpcionDato(e.nombre)
        await getData('itemAction', 'proyecto', e.nombre)
        await getNote('Notes', 'proyecto', e.nombre)
    }

    const efectoTitulo = () => {
        setTimeout(() => {
            setTitle('visible-title')
        }, 500);
    }

    const setActiveBtn = (arg1) => {
        setBtnActive(arg1)
    }

    useEffect(() => {
        setProyect()
        setUpdateCards(() => getData)
    }, [reload])

    return (
        <div className='general-conteiner'>
            <NavBar
                funcionAddItem={() => { mostrarModal(<CreateUpdateForm accion={"Nuevo"} Titulo={""} Descripcion={""} Plazo={""} Proyecto={""} Estado={""} Items={""} Id={""} />) }}

                functionReviewProyect={() => { mostrarModal(<GestionProyectos funcion={[setReload, reload]} />) }}
                
                actualizarItems={actualizarItemsActions}

                optionsProyects={opcionProyecto} 
                >
                {/* <select name="proyectos" id="proyectos" onChange={actualizarItemsActions}>
                    {
                        opcionProyecto && opcionProyecto.map((e, i) => <option key={i} value={JSON.stringify({ nombre: e.nombre, descr: e.descripcion })}>{e.nombre}</option>)
                    }
                </select> */}
            </NavBar>
            <div className={`descripcion-proyecto ${title}`}>
                <h2>{opcionDato}</h2>
                <h3>
                    {descripcion && descripcion}
                </h3>
            </div>
            <div className="option-note-conteiner">
                <ul>
                    <li onClick={() => setActiveBtn(true)} className={btnActive ? 'btn-active' : ''}>Estado</li>
                    <li onClick={() => setActiveBtn(false)} className={!btnActive ? 'btn-active' : ''}>Notas <span>{note && note.length}</span></li>
                </ul>
            </div>

            {
                btnActive
                    ?
                    <div className="drag-n-drop">
                        <Column nombreColumn={"Para hacer"} id={1} datos={data} funcion={setData}>
                            {loading ? <ComponenteCarga /> : data.map((e, i) => e.estado == "Para hacer" && <ActionCard key={i} id={e.id} titulo={e.titulo} descripcion={e.descripcion} plazo={e.plazo} proyecto={e.proyecto} estado={e.estado} items={e.items} funcion={[setReload, reload]} />)}
                        </Column>

                        <Column nombreColumn={"En proceso"} id={2} datos={data} funcion={setData}>
                            {loading ? <ComponenteCarga /> : data.map((e, i) => e.estado == "En proceso" && <ActionCard key={i} id={e.id} titulo={e.titulo} descripcion={e.descripcion} plazo={e.plazo} proyecto={e.proyecto} estado={e.estado} items={e.items} funcion={[setReload, reload]} />)}
                        </Column>

                        <Column nombreColumn={"Finalizados"} id={3} datos={data} funcion={setData}>
                            {loading ? <ComponenteCarga /> : data.map((e, i) => e.estado == "Finalizados" && <ActionCard key={i} id={e.id} titulo={e.titulo} descripcion={e.descripcion} plazo={e.plazo} proyecto={e.proyecto} estado={e.estado} items={e.items} funcion={[setReload, reload]} />)}
                        </Column>
                    </div>
                    :
                    <div className="note-conteiner">
                        {loading ? <ComponenteCarga /> : note.map((e, i) => <NoteComponent key={i} proyecto={e.proyecto} nota={e.nota} adjunto={e.adjunto} titulo={e.titulo} />)}
                    </div>
            }

        </div>
    )
}