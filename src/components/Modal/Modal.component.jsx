import { createPortal } from "react-dom";
import Proptypes from 'prop-types';
import './Modal.css';

const Modal = ({ children, showProfile }) => {

    return (
        <>
            { 
                showProfile && createPortal(children, document.body)
            }
        </>
    )
}

Modal.propTypes = {
    children: Proptypes.node.isRequired,
    showProfile: Proptypes.bool.isRequired,
};

export default Modal;
