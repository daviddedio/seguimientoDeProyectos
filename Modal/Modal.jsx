import './Modal.css'
import { useGlobalContext } from '../context/Context'
import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'

export const Modal = () => {
    const modalRoot = document.getElementById("modal")
    const modalRef = useRef(null)
    const { openModal, setOpenModal, componente } = useGlobalContext()
    const closeModal = () => { setOpenModal(false) }
    if (!openModal) return null

    return createPortal(
        <div className="overlay">
            <div className='modalx' ref={modalRef}>
                <div className="upline" onClick={closeModal}> click aqui para cerrar</div>
                <div className="modalComponent">
                    {componente}
                </div>
            </div>
        </div>
        , modalRoot
    )
}