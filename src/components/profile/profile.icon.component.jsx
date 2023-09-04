import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';
import PropTypes from 'prop-types';

const ProfileIcon = ({ onUserSignOut, toggleProfile, direction, ...args }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="pa4 tc">       
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                <DropdownToggle tag={'span'} data-toggle='dropdown'>
                    <div className="pointer" style={{ paddingBottom: 0 }}>
                        <img
                            src="https://e1.pxfuel.com/desktop-wallpaper/768/546/desktop-wallpaper-naruto-uchiha-itachi-itachi-face.jpg"
                            className="br-100 ba h3 w3 dib" alt="A"/>
                    </div>
                </DropdownToggle>
                <DropdownMenu {...args}
                    className='b--transparent shadow-5'
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                >
                    <DropdownItem 
                        className='f5 link dim black pointer' style={{ marginBottom: 0, textAlign: 'center' }}
                        onClick={toggleProfile}
                    >
                        View Profile
                    </DropdownItem>
                    <DropdownItem
                        className='f5 link dim black pointer' style={{ marginBottom: 0, textAlign: 'center' }}
                        onClick={() => onUserSignOut()}
                    >
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

ProfileIcon.propTypes = {
    direction: PropTypes.string,
};

export default ProfileIcon;
