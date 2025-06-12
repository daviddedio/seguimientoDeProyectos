import './Modal.css'
import { useGlobalContext } from '../context/Context'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { cloneElement } from 'react'

export const Modal = () => {
    const modalRoot = document.getElementById("modal")
    const modalRef = useRef(null)
    const { openModal, setOpenModal, componente } = useGlobalContext()
    const [vis, setVis] = useState('vis-modal')

    const closeModal = () => {
        setVis('no-vis-modal')
        setTimeout(() => { 
            setVis('vis-modal')
            setOpenModal(false) }, 500);
    }

    if (!openModal) return null

    return createPortal(
        <div className="overlay">
            <div className={`modalx ${vis}`} ref={modalRef}>
                <div className="upline" onClick={closeModal}> click aqui para cerrar</div>
                <div className="modalComponent">
                    {cloneElement(componente, {closeModal})}
                </div>
            </div>
        </div>
        , modalRoot
    )
}