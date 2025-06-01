import './ProgressBar.css'
import { useEffect, useState } from 'react'

export const ProgressBar = ({ items }) => {

    const [porcentaje, setPorcentaje] = useState(0)

    const calcular = () => {
        const total = items.length
        const completos = items.filter((e, i) => e.estado === true && e).length
        setPorcentaje(Math.round(completos / total * 100))
    }

    useEffect(() => {
        calcular()
    }, [items])

    return (
        <div className='progressbar-conteiner'>
            <div className="progress-bar" style={{ width: `${porcentaje}%`, transition: 'width 0.5s ease-in-out' }}>
            </div>
        </div>
    )
}