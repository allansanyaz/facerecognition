import React from "react";

const Rank = ({username, userentries}) => {
    return (
        <div>
            <div className="white f3">
                Hello {(username) ?` ${username.charAt(0).toUpperCase() + username.slice(1)} ` : ''}your current rank is..
            </div>
            <div className="white f2">
                {`${userentries}`}
            </div>
        </div>
    )
}

export default Rank