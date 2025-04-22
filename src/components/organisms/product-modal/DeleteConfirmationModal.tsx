interface DeleteConfirmationModalProps {
    productName: string
    onClose: () => void
    onConfirm: () => void
}

const DeleteConfirmationModal = ({ productName, onClose, onConfirm }: DeleteConfirmationModalProps) => {
    return (
        <div className="admin-modal-overlay">
            <div className="admin-modal admin-modal-sm">
                <div className="admin-modal-header">
                    <h2>Delete Product</h2>
                    <button onClick={onClose} className="admin-modal-close" aria-label="Close">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div className="admin-modal-content">
                    <div className="admin-delete-warning">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <p>
                            Are you sure you want to delete <strong>"{productName}"</strong>? This action cannot be undone.
                        </p>
                    </div>
                </div>
                <div className="admin-modal-footer">
                    <button onClick={onClose} className="admin-button admin-button-outline">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="admin-button admin-button-danger">
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationModal
