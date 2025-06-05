import { useEffect, useState } from 'react'
import './NoteComponent.css'

export const NoteComponent = ({ proyecto, nota, adjunto, titulo }) => {

    const [visible, setVisible] = useState('')

    useEffect(()=>{setTimeout(() => {
        setVisible('visible-coment')
    }, 100);},[])

    return (
        <div className={`note-card ${visible}`}>
            <div className="note-card-title">
                <h2 className="title-note-card">{titulo}</h2>
                <span>Proyecto: {proyecto}</span>
            </div>
            <p className="body-note-card">{nota}</p>
            <a href={adjunto} target='_blank'>Ver Adjunto</a>
        </div>
    )
}