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
import Modal from './components/Modal/Modal.component';
import Profile from './components/profile/profile.modal.component';

const app = new Clarifai.App({
    apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
})

const initialiseState = {
    input: '',
    imageURL: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    showProfile: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        pet: '',
        age: '',
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
            pet: user.pet,
            age: user.age,
        }})
    }

    calculateFaceLocation = (data) => {
        // the regions have multiple items so we can loop through each returning the bounding box
        const faceRegions = data.outputs[0].data.regions;
        // loop through the face regions

        // const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;

        const clarifyFaces = faceRegions.map((faceRegion) => {
            const clarifyFace = faceRegion.region_info.bounding_box;
    
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
        });

        return clarifyFaces;
    }

    displayFaceBox = (boxes) => {
        this.setState({boxes: boxes});
    }

    onInputChange = (event) => {
        // the way to get values from events is on target on value
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageURL: this.state.input});
        // other model is is: a403429f2ddf4b49b307e318f00e528b/face-detection
        app.models.predict(
            {
                id: "a403429f2ddf4b49b307e318f00e528b",
                version: "34ce21a40cc24b6b96ffee54aabff139",
            }, 
            this.state.input)
            .then((response) => {
                if(response) {
                    fetch('/image', {
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

    toggleProfile = () => {
        this.setState(state => ({
            ...state,
            showProfile: !state.showProfile,
        }));
    }

    render () {
        // Each component including the particle has been separated into different components
        return (
            <div className="App">
                <ParticleEffect />
                <Navigation 
                    onRouteChange={this.onRouteChange} 
                    isSignedIn={this.state.isSignedIn}
                    toggleProfile={this.toggleProfile}
                />
                { this.state.route === 'home' 
                ?   <>
                        <Logo />
                        <Modal 
                            showProfile={this.state.showProfile}
                        >
                            <Profile 
                                toggleProfile={this.toggleProfile}
                                user={this.state.user}
                                state={this.state}
                            />   
                        </Modal>

                        <Rank 
                            username={this.state.user.name}
                            userentries={this.state.user.entries}
                        />
                        <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onButtonSubmit={this.onButtonSubmit} />
                        <FaceRecognition 
                            imageURL={this.state.imageURL}
                            boxes={this.state.boxes}
                        />
                    </>
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
