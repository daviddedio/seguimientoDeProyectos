import './DragBody.css'
import { Column } from '../Column/Column'
import { ActionCard } from '../ActionCard/ActionCard'
import { getAllData } from '../../FireBase/conexion'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/Context'
import { CreateUpdateForm } from '../../Formularios/CreateUpdateForm/CreateUpdateForm'
import { GestionProyectos } from '../../Formularios/GestionProyectos/GestionProyectos'
import { NavBar } from '../NavBar/NavBar'
import { ComponenteCarga } from '../ComponenteCarga/ComponenteCarga'

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

    const getData = async (filtros) => {
        setLoading(true)
        try {
            const datos = await getAllData('itemAction')
            setData(datos.filter(e => e.proyecto === filtros))
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const setProyect = async () => {
        try {
            const datos = await getAllData('Proyectos')
            console.log(datos)
            setOptionProyecto(datos)
            getData(datos[0].nombre)
            setDescripcion(datos[0].descripcion)
            setOpcionDato(datos[0].nombre)
            efectoTitulo()
        } catch (error) {
            setError(error.message)
        }
    }

    const actualizarItemsActions = async (e) => {
        setTitle('')
        const { value } = e.target
        const jsonParse = JSON.parse(value)
        efectoTitulo()
        setDescripcion(jsonParse.descr)
        setOpcionDato(jsonParse.nombre)
        await getData(jsonParse.nombre)
    }

    const efectoTitulo = () => {
        setTimeout(() => {
            setTitle('visible-title')
        }, 500);
    }

    useEffect(() => {
        setProyect()
        setUpdateCards(() => getData)
    }, [reload])

    return (
        <div className='general-conteiner'>
            <NavBar funcionAddItem={() => { mostrarModal(<CreateUpdateForm accion={"Nuevo"} Titulo={""} Descripcion={""} Plazo={""} Proyecto={""} Estado={""} Items={""} Id={""} funcion={[setReload, reload]} />) }} functionReviewProyect={() => { mostrarModal(<GestionProyectos funcion={[setReload, reload]} />) }} >
                <select name="proyectos" id="proyectos" onChange={actualizarItemsActions}>
                    {
                        opcionProyecto && opcionProyecto.map((e, i) => <option key={i} value={JSON.stringify({ nombre: e.nombre, descr: e.descripcion })}>{e.nombre}</option>)
                    }
                </select>
            </NavBar>
            <div className={`descripcion-proyecto ${title}`}>
                <h2>{opcionDato}</h2>
                <h3>
                    {descripcion && descripcion}
                </h3>
            </div>
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
        </div>
    )
}