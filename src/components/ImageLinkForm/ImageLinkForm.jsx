import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div className="brain-input">
            <div>
                <p className="f3">
                    {'This Magic Brain will detect faces in your pictures give it a try'}
                </p>
                <div className="pa4 br3 shadow-5 form">
                    <input 
                        className="f4 pa2 w-70 center br3" 
                        type="text" onChange={onInputChange} 
                        style={{fontFamily: 'Arial'}} 
                        placeholder="Load jpg image to detect face"
                    />
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple br3"
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm