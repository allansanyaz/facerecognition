import React from "react";
import Tilt from "react-tilt";
import './Logo.css';
import brain from './brain.png'

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }

    componentDidMount = () => {
        this.wrapper = React.createRef();
    }

    render() {
        return (
            <div ref={this.wrapper}>
                <div className="ma4 mt0">
                    <Tilt className="Tilt br shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                        <div className="Tilt-inner br">
                            <img src={brain} alt="brain" width="150px" height={"150px"} />
                        </div>
                    </Tilt>
                </div>
            </div>
        );
    }
}

export default Logo