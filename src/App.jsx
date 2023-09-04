import React from 'react';
import './App.css';
// Custom components
import ParticleEffect from './components/ParticleEffect';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Modal from './components/Modal/Modal.component';
import Profile from './components/profile/profile.modal.component';

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

    componentDidMount() {
        // check to see if there is a signed in session before rendering any logic
        const token = window.localStorage.getItem('token');
        if(token) {
            fetch('/signin', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data && data.id) {
                    this.getProfile(data);
                }
            })
            .catch(console.log);
        }
    }

    saveAuthTokenInSession = (token) => {
        window.localStorage.setItem('token', token);
    }

    // get the user profile
    getProfile = (data) => {
        console.log("Getting profile for data: ", data);
        fetch(`/profile/${data.id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            }
            })
            .then(response => response.json())
            .then(user => {
                if(user && user.email) {
                    this.loadUser(user);
                    this.onRouteChange('home');
                }
            })
            .catch(err => console.log(err));
    }

    // handle userSignOut
    onUserSignOut = () => {
        // first sign out on the server
        fetch('/signout', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')
            }
        })
        .then(resp => {
            if(resp.status === 200 || resp.status === 304) {
                // clear the token from local storage
                window.localStorage.removeItem('token');
                // reset the state
                this.setState(initialiseState);
                // navigate to the signin page
                this.onRouteChange('signin');
            }
        })
        .catch(err => console.log(err));

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
        }});
    }

    calculateFaceLocation = (data) => {
        if(data && data.outputs) {
            // the regions have multiple items so we can loop through each returning the bounding box
            const faceRegions = data.outputs[0].data.regions;
            // loop through the face regions

            // const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;

            return faceRegions.map((faceRegion) => {
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
        } else {
            return;
        }
    }

    displayFaceBox = (boxes) => {
        if(boxes) {
            this.setState({boxes: boxes});
        } else {
            this.setState({boxes: []});
        }
    }

    onInputChange = (event) => {
        // the way to get values from events is on target on value
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageURL: this.state.input});
            // call the clarifai api
            fetch('/imageurl', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem('token')
                },
                body: JSON.stringify({
                    input: this.state.input
                })
            })
            .then(response => response.json())
            .then((data) => {
                if(data) {
                    fetch('/image', {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': window.localStorage.getItem('token')
                        },
                        body: JSON.stringify({id: this.state.user.id})
                    })
                    .then(response => response.json())
                    .then(entry => {
                        this.setState(Object.assign(this.state.user, {entries: entry}))
                    })
                    .catch(err => console.log(err));
                }
                this.displayFaceBox(this.calculateFaceLocation(data));
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
                    onUserSignOut={this.onUserSignOut}
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
                            getProfile={this.getProfile}
                            onRouteChange={this.onRouteChange}
                            saveAuthTokenInSession={this.saveAuthTokenInSession}
                        />
                        : <Register 
                            getProfile={this.getProfile}
                            onRouteChange={this.onRouteChange}
                            saveAuthTokenInSession={this.saveAuthTokenInSession}
                        />
                    )
                    
                }
                 
                
            </div>
          );
    }
}

export default App;
