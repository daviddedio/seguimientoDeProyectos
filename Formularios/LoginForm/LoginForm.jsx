import './LoginForm.css'
import { useState } from 'react'
import { UseForm } from '../UseForm'
import { getAllData } from '../../FireBase/conexion'
import { ComponenteCarga } from '../../component/ComponenteCarga/ComponenteCarga'
import { useGlobalContext } from '../../context/Context'

export const LoginForm = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('not-visible')
    const [bloqueado, setBloqueado] = useState('bloqueado')
    const [estadoLog, setEstadoLog] = useState('')

    const { setOpenModal, setLogin } = useGlobalContext()

    const template = {
        user: '',
        pass: '',
    }

    const { formState, onInputTextChange } = UseForm(template)
    const { user, pass } = formState

    const checkData = async (e) => {
        e.preventDefault()
        setError('not-visible')
        setLoading(true)
        const datos = await getAllData('Login')
        console.log(datos[0])
        console.log(formState)
        if (datos[0].user === user && datos[0].Password === pass) {
            setLogin(true)
            setBloqueado('no-bloqueado')
            setError('visible-error')
            setEstadoLog('Ingresando...')
            closeModal()
        } else {
            setError('visible-error')
            setEstadoLog('Datos incorrectos')
            setLoading(false)
        }
    }

    const closeModal = () => {
        setTimeout(() => {
            setOpenModal(false)
        }, 2000);
    }

    return (
        <>
            <div className="form-conteiner-login">
                <h2>Login</h2>
                <form onSubmit={checkData}>
                    <div className="inputPack">
                        <label htmlFor="user">User</label>
                        <input type="text" name="user" id="user" onChange={onInputTextChange} value={user} />
                    </div>
                    <div className="inputPack">
                        <label htmlFor="pass">Password</label>
                        <input type="password" name="pass" id="pass" onChange={onInputTextChange} value={pass} />
                    </div>
                    <div className="inputPack">
                        {loading ? <ComponenteCarga /> : <button>Login</button>}
                    </div>
                    <span className={`${error} ${bloqueado}`}>{estadoLog}</span>
                </form>
            </div>
        </>
    )
}