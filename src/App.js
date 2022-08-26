import React from 'react';
import './App.css';
// Custom componets
import ParticleEffect from './components/ParticleEffect';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const app = new Clarifai.App({
    apiKey: '7c00339e1db04c39a13c05393b2d5204'
})

const initialiseState = {
    input: '',
    imageURL: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    }
}

class App extends React.Component {
    // define constructor
    constructor() {
        super();
        // route will keep track of what page I am on
        this.state = initialiseState;
    }

    loadUser = (user) => {
        this.setState({user: {
            id: user.id,
            name: user.name,
            email: user.email,
            entries: user.entries,
            joined: user.joined,
        }})
    }

    calculateFaceLocation = (data) => {
        const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        // dom manipulation
        const image = document.getElementById("inputimage");
        // bounding box is a percentage of the image
        const width = image.width;
        const height = image.height;
        
        return {
            leftCol: width * clarifyFace.left_col,
            topRow: height * clarifyFace.top_row,
            rightCol: width - (width * clarifyFace.right_col),
            bottomRow: height - (height * clarifyFace.bottom_row), 
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        // the way to get values from events is on target on value
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageURL: this.state.input});
        // other model is is: a403429f2ddf4b49b307e318f00e528b/face-detection
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL, 
            this.state.input)
            .then((response) => {
                if(response) {
                    fetch('http://localhost:3001/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({id: this.state.user.id})
                    })
                    .then(response => response.json())
                    .then(entry => {
                        this.setState(Object.assign(this.state.user, {entries: entry}))
                    })
                    .catch(err => console.log(err));
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if(route === 'signin') {
            this.setState(initialiseState);
        } else if(route === 'home' ) {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render () {
        // Each component including the particle has been separated into different components
        return (
            <div className="App">
                <ParticleEffect />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
                { this.state.route === 'home' 
                ?   <React.Fragment>
                        <Logo />
                        <Rank 
                            username={this.state.user.name}
                            userentries={this.state.user.entries}
                        />
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit} />
                        <FaceRecognition 
                            imageURL={this.state.imageURL}
                            box={this.state.box}
                        />
                    </React.Fragment>
                :   (
                        this.state.route === 'signin' 
                        ? <SignIn 
                            loadUser={this.loadUser}
                            onRouteChange={this.onRouteChange} 
                        />
                        : <Register 
                            loadUser={this.loadUser}
                            onRouteChange={this.onRouteChange} 
                        />
                    )
                    
                }
                 
                
            </div>
          );
    }
}

export default App;
