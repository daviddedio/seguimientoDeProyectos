import './AlertMessage.css'

export const AlertMessage = ({msg, typeMsg}) => {

    const tipoMensaje = () => {
        switch (typeMsg) {
            case 1:
                return (<i className="fa-solid fa-circle-exclamation"></i>)
                break;
            case 2:
                return (<i className="fa-solid fa-triangle-exclamation"></i>)
                break;
            case 3:
                return  (<i className="fa-solid fa-message"></i>)
                break;
            default: ""
                break;
        }
    }

    return (
        <div className='msg-conteiner'>
            <div className="msg-icon">
            {tipoMensaje()}
            </div>
            <div className="msg-description">{msg}</div>
        </div>
    )
}