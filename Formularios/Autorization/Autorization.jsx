import './Autorization.css'

export const Autorization = () => {
    return (
        <div className='contenedor-autorizacion'>
            <div className='imagen-error'>
                <img src="/src/assets/error.jpeg" alt="" />
            </div>
            <div className="mensaje-error">
                <h1>Ud no esta autorizado para realizar esta accion</h1>
            </div>
        </div>
    )
}