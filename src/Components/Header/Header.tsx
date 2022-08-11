import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import {resetSearch} from "../../Redux/Reducer/reducer"
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';
import User from './User/User';
import Login from '../Login/Login';
/* import jwtDecode from 'jwt-decode'; */

  const Header = () => {
/*     const [currentToken, setCurrentToken] = useState({
      id: '',
      isWorker: false,
      isAdmin: false
  })  */
  const dispatch = useDispatch();

  const reset = () =>{
    dispatch(resetSearch());
  }

  const currentUser = useSelector((state: any) => state.workService.currentUser)

 /*  const token: any = localStorage.getItem("token")
  let tokenData: any = {}
  if (token !== null){ 
    console.log("entre")
    tokenData = jwtDecode(token)
  } else {
    console.log("no entre")
  }
   */
  
  /* useEffect(() => {
    if (token?.length > 0) setCurrentToken({
      id: tokenData.id,
      isWorker: tokenData.isWorker,
      isAdmin: tokenData.isAdmin
  }) 
  }, [])

  const [otroState, setOtroState] = useState(false)
  useEffect(() => {
    setOtroState(true)
  }, [tokenData]) */






 

  window.onscroll = function () {
    if (document.documentElement.scrollTop > 25) {
      document.querySelector("#Header")?.classList.add("scroll")
    } else {
      document.querySelector("#Header")?.classList.remove("scroll")
    }
  }

  const [openModal, setOpenModal] = useState(false);

  function handleOpen() {
    setOpenModal(true)
  }

  function handleClose(value:any) {
    setOpenModal(value)
  }

  console.log(currentUser)

  return (
    <header className='Header_component' id="Header">
      <div className='Header_divContent'>
        <Link to="/home" className='logo'>RE<span onClick={()=>reset()} className='work'>work</span></Link>      
        <nav className='nav'>
          <SearchBar/>
          <div>

          { currentUser?.id !== '' ? 
          <User/>
          :


          <div className='div_buttons'>
            <div>
              <button onClick={handleOpen} className='button_login'>Inicia sesión</button>
            </div>
            <div>
              <Link to='/register'><button className='button_register'>Registrate</button></Link>
            </div>
          </div>
          }
          </div>
        </nav>
      </div>
      {openModal && 
        <div className='Header_ModalAbiertoBackground'>
          
        </div>
      }
      {openModal && 
        <div className='Header_ModalLogin'>
          <Login close={handleClose} />
        </div>
      }
    </header>
  )
}

export default Header