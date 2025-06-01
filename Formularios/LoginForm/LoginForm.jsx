import './LoginForm.css'
import { useState } from 'react'
import { UseForm } from '../UseForm'
import { logInUser } from '../../FireBase/conexion'
import { ComponenteCarga } from '../../component/ComponenteCarga/ComponenteCarga'
import { useGlobalContext } from '../../context/Context'

export const LoginForm = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('not-visible')
    const [bloqueado, setBloqueado] = useState('bloqueado')
    const [estadoLog, setEstadoLog] = useState('')

    const { setOpenModal, setLogin, login } = useGlobalContext()

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

        const res = await logInUser(user, pass)
        if (res === 'ok') {
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
        setOpenModal(false);
    }

    return (
        <>
            {login ?
                <h2>Login Out</h2>
                :
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
                            {loading ? <ComponenteCarga /> : <button>LogIn</button>}
                        </div>
                        <span className={`${error} ${bloqueado}`}>{estadoLog}</span>
                    </form>
                </div>
            }
        </>
    )
}