import { useState } from 'react';

export default function Player({ name , symbol }) {

const [isEditing, setIsEditing] = useState(false)

const handleEditClick = (status) => {
    setIsEditing(status)
}

    return (
        <li>
        <span className="player">
            {!isEditing ? 
                <span className="player-name">{name}</span> 
                :
                <input type="text" />
            }
            <span className="player-symbol">{symbol}</span>
          </span>
          {!isEditing ? 
            <button onClick={() => handleEditClick(true)}>Edit</button> 
            : 
            <button onClick={() => handleEditClick(false)}>Save</button>
          }
        </li>
    )
}
