import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './User.css'

function User() {

  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <div className='User_Component'>
      <div className='User_DivProfile'>
        <button onClick={handleClick} className='User_divImageProfile'>
          <img className='User_ImageProfile' src="https://th.bing.com/th/id/R.3fe29c6b3058f48e53e86c9cb687c27f?rik=6eP5XRKYF2C2%2bw&pid=ImgRaw&r=0" alt="profile" />
        </button>
      </div>
      {open &&
      
        <div className='User_Dropdown'>
          <div className='User_DropdownOptions'>
            <Link className='UserDropdownItem' to='/home/profile/:452h2'>Perfil</Link>
            <Link className='UserDropdownItem' to='/post'>Nueva oferta</Link>
            <div className='UserDropdownItem'>
              <button>Logout</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default User