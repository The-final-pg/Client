import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOffers, getUserById } from '../../Redux/Reducer/reducer';
import Header from '../Header/Header';
import CardsReview from '../Reviews/CardsReview/CardsReview';
import decode from "jwt-decode"
import './Profile.css'

function Profile() {

  const dispatch = useDispatch();
  const token:any = localStorage.getItem("token")
  const tokenDecode:any = decode(token)

  useEffect(() => {
    dispatch(getUserById(tokenDecode))
    dispatch(getOffers());
  },[])

  const users = useSelector((state: any) => state.workService.offers)
  const userLogged = useSelector((state: any) => state.workService.userLogged)


  console.log("USERS :",userLogged)

  return (
    <div className='Profile_Component'>
      <Header/>
      <div className='Profile'>
        <div className='Profile_topPerfil'>
          <div className='Profile_divPortada'>
            <img className='Profile_portada' src="https://th.bing.com/th/id/R.99068920ab82a672b048b73e1b1d5374?rik=pvNRgNW6hzVcKw&pid=ImgRaw&r=0" alt="Portada" />
          </div>
          
          <div>

            <div className='Profile_DivCont'>
              <div className='Profile_divDivProfile'>
                <div className='Profile_divFotoPerfil'>
                  <img className='Profile_foto' src="https://th.bing.com/th/id/R.3fe29c6b3058f48e53e86c9cb687c27f?rik=6eP5XRKYF2C2%2bw&pid=ImgRaw&r=0" alt="profile" />
                </div>
                <div className='Profile_divNameAndRating'>
                  <span className='Profile_UserName'>{userLogged.name}</span>
                  <span className='Profile_UserRating'>Rating: {userLogged.rating?userLogged.rating:0}</span>
                </div>
              </div>

              <div>
                <button className='Profile_editProfile'>Editar perfil</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3>Descripción:</h3>
        </div>

        <div className='Profile_divTags'>
          <button className='Profile_tag'>Porfolio</button>
          <button className='Profile_tag'>Informacion</button>
          <button className='Profile_tag'>Reviews</button>
        </div>

        <div className='Profile_divPortfolio'>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
        </div>

      </div>
      <CardsReview/>
    </div>
  )
}

export default Profile

function state(state: any, arg1: (any: unknown) => any) {
  throw new Error('Function not implemented.')
}
