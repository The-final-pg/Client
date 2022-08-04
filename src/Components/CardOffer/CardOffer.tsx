import React, {useState} from 'react'
import './CardOffer.css';
import {Link} from 'react-router-dom';
import more from '../../images/more.svg'

const CardOffer = ({props}:any) => {

  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className='CardOffer_component'>
      <div className='div_profileSection'>
        <div className='div_infoUser'>
          <div className='div_imageProfile'>
            <img className='card_profileImage' src={props.photoClient} alt="Client Photo" />
          </div>
          <div className='div_userDatos'>
            <Link to="#" className='Card_userName'>{props.name}</Link>
            <span className='Card_userRating'>Rating: {props.rating}</span>
          </div>
        </div>
        <div className='div_cardButton'>
          <button onClick={handleClick} className='cardButton_options'>
            <img className='more' src={more} alt="more" />
          </button>
          {open &&
            <div className='Card_option'>
              <span className='report_cardButton'>Reportar</span>
            </div>
          }
        </div>
      </div>
      <hr />
      <div className='div_infoWorkSection'>
        <span className='card_title'>{props.title}</span>
        <div className='div_remuneration'>
          <span>ARS </span>
          <span>{props.remuneration.join(' - ')}</span>
        </div>
        <div className='div_cardDescription'>
          <p>{props.description}</p>
        </div>
        <div className='card_divTags'>
          <span className='card_tags'>{props.tags.join(', ')}</span>
        </div>
        <div>
          <Link className='button_details' to={`/detailOffer/${props.id}`}>Ver mas</Link>
        </div>
      </div>
    </div>
  )
}

export default CardOffer