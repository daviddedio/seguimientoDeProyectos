import './ProyectSelector.css'
import { useGlobalContext } from '../../context/Context'
import { useEffect, useState } from 'react'
import { getAllData } from '../../FireBase/conexion'
import { ComponenteCarga } from '../../component/ComponenteCarga/ComponenteCarga'

export const ProyectSelector = ({ proyectos, funcion, closeModal }) => {

    const { setOpenModal, setComponente, login } = useGlobalContext()

    const [tipo, setTipo] = useState(null)

    const selectAndClose = (e) => {
        funcion(e)
        closeModal()
    }

    const getTiposProyecto = async () => {
        const tipos = await getAllData('TipoProyecto')
        setTipo(tipos)
    }

    useEffect(() => { getTiposProyecto() }, [])

    return (
        <div className="accordion-general-conteiner">
            <h2> {tipo
                ? 'Seleccionar categoria y proyecto'
                : <ComponenteCarga />}
            </h2>
            <div className='accordion-proyect'>
                {
                    tipo &&
                    tipo.map((e, i) =>
                        <div className='accordion'  key={i}>
                            <input type="radio" name="accordion" id={`accordion${i}`} />
                            <label htmlFor={`accordion${i}`} className="label-proyect">{e.tipo}</label>
                            <div className="accordion-content">
                                <ul>
                                    {proyectos.map((f, g) =>
                                        f.tipo === e.tipo &&
                                        <li key={g}
                                            onClick={() => selectAndClose(f)}>
                                            {f.nombre}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )

                }
            </div>
        </div>

    )
}