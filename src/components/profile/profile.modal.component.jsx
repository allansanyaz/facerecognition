import './profile.css';

const Profile = ({ toggleProfile }) => {
    return (
        <div className="profile-modal">
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center bg-white flex justify-center" style={{ position: 'relative' }}>
                <main className="pa4 black-80 w-80">
                    <div className="pointer" style={{ paddingBottom: 0 }}>
                        <img
                            src="https://e1.pxfuel.com/desktop-wallpaper/768/546/desktop-wallpaper-naruto-uchiha-itachi-itachi-face.jpg"
                            className="h3 w3 dib" alt="A"/>
                    </div>
                    <h2>John Doe</h2>
                    <h4>Images Submitted: 5</h4>
                    <p>Member Since: January</p>
                    <hr />

                    
                    <label className="mt2 db fw6 lh-copy f6" htmlFor="user-name">Name:</label>
                    <input 
                        onChange={() => console.log("Name changed")}
                        className="pa2 ba bg-transparent hover-bg-black w-100" 
                        type="text" 
                        name="user-name"  
                        id="name"
                        placeholder='John Doe'
                    />

                    <label className="mt2 db fw6 lh-copy f6" htmlFor="user-age">Age:</label>
                    <input 
                        onChange={() => console.log("Age changed")}
                        className="pa2 ba bg-transparent hover-bg-black w-100" 
                        type="text" 
                        name="user-age"  
                        id="age"
                        placeholder='56'
                    />

                    <label className="mt2 db fw6 lh-copy f6" htmlFor="user-pet">Pet:</label>
                    <input 
                        onChange={() => console.log("Pet changed")}
                        className="pa2 ba bg-transparent hover-bg-black w-100" 
                        type="text" 
                        name="user-pet"  
                        id="pet"
                        placeholder='dragon'
                    />

                    <div className="mt4" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <button 
                            className="b ph3 pv2 ba b--black grow pointer f6 dib bg-light-blue" 
                            onClick={() => console.log("Save clicked")}
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
