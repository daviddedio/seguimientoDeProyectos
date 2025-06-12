import './ActionCard.css'
import { useGlobalContext } from '../../context/Context'
import { CreateUpdateForm } from '../../Formularios/CreateUpdateForm/CreateUpdateForm'
import { useEffect, useState } from 'react'
import { DeleteAction } from '../../Formularios/DeleteAction/DeleteAction'
import { ListadoItems } from '../../Formularios/ListadoItems/ListadoItems'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { getAllData } from '../../FireBase/conexion'

export const ActionCard = ({ id, titulo, descripcion, plazo, proyecto, estado, items, funcion }) => {

    const { setOpenModal, setComponente, login } = useGlobalContext()
    const [datosItems, setDatosItems] = useState([])

    const mostrarModal = (reactComponente) => {
        setComponente(reactComponente)
        setOpenModal(true)
    }

    const calculosVigencia = () => {
        if(estado === 'Finalizados'){return ''}
        const fechaActual = new Date().getTime()
        const fechaVencimiento = new Date(plazo).getTime()
        const diasVencimiento = fechaVencimiento - 2592000000
        if (fechaActual > fechaVencimiento) { return 'late' }
        if (fechaActual > diasVencimiento) { return 'closeLate' }
        if (fechaActual < fechaVencimiento) { return 'inTime' }
    }

    const [vigencia, setVigencia] = useState(calculosVigencia())
    const [opac, setOpac] = useState(0)

    const getItemsForActions = async () => {
        try {
            const datos = await getAllData('Items')
            setDatosItems(datos.filter(e => e.idItemAction == id))
        } catch (error) {
            console.log(error.message)
        }
    }

    const startDrag = (e, id, origen) => {
        const datos = { origen, id }
        e.dataTransfer.setData('dataTransf', JSON.stringify(datos))
    }

    useEffect(() => {
        getItemsForActions()
        setTimeout(() => {setOpac(1)}, 100);   
    }, [])

    //card-header inTime Late
    return (
        <div className={`card`} draggable onDragStart={e => startDrag(e, id, estado)}
        style={{ opacity: `${opac}`, transition: 'opacity 0.2s ease-in-out' }}>
            <div className={`card-header ${vigencia}`}>
                { login && <i className="fa-solid fa-pen-to-square toolTipConteiner"
                    onClick={() => mostrarModal(<CreateUpdateForm accion={"Editar"} Titulo={titulo} Descripcion={descripcion} Plazo={plazo} Proyecto={proyecto} Estado={estado} Items={items} Id={id} funcion={funcion} />)}>
                    <span className='toolTip'>Editar accion</span>
                </i>}
                <i className="fa-solid fa-list toolTipConteiner"
                    onClick={() => mostrarModal(<ListadoItems id={id} items={datosItems} funcionItems={setDatosItems} />)}>
                    <span className='toolTip'>Editar Items</span>
                </i>
                {login && <i className="fa-solid fa-trash toolTipConteiner"
                    onClick={() => mostrarModal(<DeleteAction nro={id} funcion={funcion} titulo={titulo} Proyecto={proyecto} />)}>
                    <span className='toolTip'>Eliminar accion</span>
                </i>}
                <i className="fa-solid fa-arrows-up-down-left-right toolTipConteiner">
                    <span className='toolTip'>Mover</span>
                </i>
            </div>
            <div className="card-body">
                <h3>{titulo}</h3>
            </div>
            <div className="progress-bar-conteiner">
                <ProgressBar items={datosItems} />
            </div>
        </div>
    )
}