import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, box}) => {
    console.log(box);
    // return blank if no image has been loaded
    return (!(imageURL)) ? <p>No image loaded</p>
    :
     (
        <div className="brain-input ma">
            <div className="absolute mt2">
                 <img 
                    id="inputimage"
                    src={imageURL} 
                    alt="loaded-face" 
                    width={'500px'} 
                    height={'auto'} />
                    <div 
                    className="bounding-box"
                    style={{
                        top: box.topRow, 
                        right: box.rightCol, 
                        left: box.leftCol, 
                        bottom: box.bottomRow
                    }}>
                    </div>
            </div>
            
        </div>
    )
}

export default FaceRecognition;