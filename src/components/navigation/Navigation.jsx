import React from "react";
import ProfileIcon from "../profile/profile.icon.component";

const Navigation = ({ onRouteChange, isSignedIn, toggleProfile, onUserSignOut }) => {
    if(isSignedIn) {
        return (
            <nav style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <ProfileIcon onUserSignOut={onUserSignOut} toggleProfile={toggleProfile} />
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <p 
                    onClick={() => onRouteChange('signin')}
                    className='f5 link dim black underline pa3 pointer'
                >Sign In</p>
                <p 
                    onClick={() => onRouteChange('register')}
                    className='f5 link dim black underline pa3 pointer'
                >Register</p>
            </nav>
        )
    }
    
}

export default Navigation;