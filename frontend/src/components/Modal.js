import React from "react";

function Modal({ show, onClose, children }) {
    if (!show) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.close} onClick={onClose}>✖</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },

    modal: {
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        width: "400px",
        position: "relative",
        color: "#fff",
    },

    close: {
        position: "absolute",
        right: "10px",
        top: "10px",
        background: "transparent",
        border: "none",
        color: "#fff",
        cursor: "pointer",
    },
};