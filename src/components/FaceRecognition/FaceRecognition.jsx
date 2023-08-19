import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageURL, boxes}) => {
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
                    height={'auto'} 
                />
                {
                    (boxes.length > 0) ?
                    (
                        boxes.map((box, i) => (
                            <div
                                key={i}
                                className="bounding-box"
                                style={{
                                    top: box.topRow, 
                                    right: box.rightCol, 
                                    left: box.leftCol, 
                                    bottom: box.bottomRow
                                }}
                            >
                            </div>
                        ))
                    ):
                    (
                        null
                    )
                }
            </div>
            
        </div>
    )
}

export default FaceRecognition;