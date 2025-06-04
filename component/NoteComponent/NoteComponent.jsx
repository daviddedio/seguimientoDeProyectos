import './NoteComponent.css'

export const NoteComponent = ({ proyecto, nota, adjunto }) => {
    return (
        <div className="note-card">
            <div className="note-card-title">
                <h2 className="title-note-card">Nota del proyecto - {proyecto}</h2>
            </div>
            <p className="body-note-card">{nota}</p>
            <a href={adjunto} target='_blank'>Ver Adjunto</a>
        </div>
    )
}