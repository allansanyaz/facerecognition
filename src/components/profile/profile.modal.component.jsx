import { useState } from 'react';
import './profile.css';

const Profile = ({ toggleProfile, user, state }) => {

    const [name, setName] = useState(user.name);
    const [entries] = useState(user.entries);
    const [joined] = useState(user.joined);
    const [age, setAge] = useState(user.age);
    const [pet, setPet] = useState(user.pet);
    // states for the profile modal

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onAgeChange = (event) => {
        setAge(event.target.value);
    }

    const onPetChange = (event) => {
        setPet(event.target.value);
    }

    const onUpdateProfile = () => {
        fetch(`/profile/${user.id}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ formInput: { name, age, pet } })
        }).then(resp => {
            // if the response is ok, then update the state
            if(resp.status === 200 || resp.status === 304) {
                state.user.name = name;
                state.user.age = age;
                state.user.pet = pet;
                // close the profile
                toggleProfile();
            }
        }).catch(console.log)
    }

    return (
        <div className="profile-modal">
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center bg-white flex justify-center" style={{ position: 'relative' }}>
                <main className="pa4 black-80 w-80">
                    <div className="pointer" style={{ paddingBottom: 0 }}>
                        <img
                            src="https://e1.pxfuel.com/desktop-wallpaper/768/546/desktop-wallpaper-naruto-uchiha-itachi-itachi-face.jpg"
                            className="h3 w3 dib" alt="A"/>
                    </div>
                    <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                    <h4>Images Submitted: {entries}</h4>
                    <p>Member Since: { new Date(joined).toLocaleDateString()}</p>
                    <hr />

                    
                    <label className="mt2 db fw6 lh-copy f6" htmlFor="user-name">Name:</label>
                    <input 
                        onChange={(e) => onNameChange(e)}
                        className="pa2 ba bg-transparent hover-bg-black w-100" 
                        type="text" 
                        name="user-name"  
                        id="name"
                        placeholder={name}
                    />

                    <label className="mt2 db fw6 lh-copy f6" htmlFor="user-age">Age:</label>
                    <input 
                        onChange={(e) => onAgeChange(e)}
                        className="pa2 ba bg-transparent hover-bg-black w-100" 
                        type="text" 
                        name="user-age"  
                        id="age"
                        placeholder={age}
                    />

                    <label className="mt2 db fw6 lh-copy f6" htmlFor="user-pet">Pet:</label>
                    <input 
                        onChange={(e) => onPetChange(e)}
                        className="pa2 ba bg-transparent hover-bg-black w-100" 
                        type="text" 
                        name="user-pet"  
                        id="pet"
                        placeholder={pet}
                    />

                    <div className="mt4" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <button 
                            className="b ph3 pv2 ba b--black grow pointer f6 dib bg-light-blue" 
                            onClick={onUpdateProfile}
                        >
                            Save
                        </button>

                        <button 
                            className="b ph3 pv2 ba b--black grow pointer f6 dib bg-light-red" 
                            onClick={toggleProfile}
                        >
                            Cancel
                        </button>
                    </div>
                </main>
                <div className='modal-close' onClick={toggleProfile}>&times;</div>
            </article>
        </div>
    )
}

export default Profile;
