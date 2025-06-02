import * as React from 'react'

type ModalProps = {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal = ({ open, onClose, children }: ModalProps) => {
    if (!open) return null
    return (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
                {children}
                <button onClick={onClose} className="cursor-pointer mt-4 text-gray-500">Fermer</button>
            </div>
        </div>
    )
}

export default Modal
