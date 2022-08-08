import React from 'react'
import { useState } from 'react';
import more from '../../images/more.svg';
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
import {GoLocation} from "react-icons/go"
import save from "../../images/bookmarks_FILL0_wght400_GRAD0_opsz48.png"
import report from '../../images/icon_report.svg';
import {Link} from 'react-router-dom';
import './CardWorker.css';


const CardWorker = ({props}:any) => {

    const [open, setOpen] = useState(false)

    function handleClick() {
      setOpen(!open);
    }

    const ratingStars = (r:number) => {
        switch (true) {
            case r === 0:
                return [<ImStarEmpty />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r > 0 && r < 0.5:
                return [<ImStarEmpty />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r >= 0.5 && r < 1:
                return [<ImStarHalf />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r === 1:
                return [<ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r > 1 && r < 1.5:
                return [<ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r >= 1.5 && r < 2:
                return [<ImStarFull />, <ImStarHalf />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r === 2:
                return [<ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r > 2 && r < 2.5:
                return [<ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r >= 2.5 && r < 3:
                return [<ImStarFull />, <ImStarFull />, <ImStarHalf />, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r === 3:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r > 3 && r < 3.5:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r >= 3.5 && r < 4:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarHalf />, <ImStarEmpty/>]
                
            case r === 4:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>]
                
            case r > 4 && r < 4.5:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>]
                
            case r >= 4.5 && r < 5:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarHalf />]
                
            case r ===5:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />]
                
            default:
                break;
        }
    }


  return (
    <div className='CardWorker_component'>
        <div className='div_infoUser'>
            <div className='div_imageProfile'>
            <img className='card_profileImage' src={props.photo} alt="El culeao que vas a contratar" />
            </div>
            <div className='div_userDatos'>
            <h1 className='Card_userName'>{props.name}</h1>
            <h4 className='Card_userHabilities'>{props.profession?.join(", ")}</h4>
            </div>
            <div className='Card_options'>
            <button /*onClick={handleClick}*/ className='cardButton_options'>
                <img className='more' src={save} alt="save" />
            </button>
            <div className='div_cardButton'>
                <button onClick={handleClick} className='cardButton_options'>
                    <img className='more' src={more} alt="more" />
                </button>
                {open &&
                <div className='Card_option'>
                  <div className='CardOption_divReport'>
                    <span className='report_cardButton'>Reportar</span>
                    <img className='report_icon' src={report} alt="report" />
                  </div>
                </div>
                }
            </div>
            </div>
        </div>
        <hr />
        <div>
            {ratingStars(props.rating)}
            <div>
                {<GoLocation/>}
                <h3>Argentina</h3>
                <div>
                    <p>Habilidades: {props.skills?.join(", ")}</p>
                    <p>Valor hora: AR$ </p>
                </div>
                <h2>Descripción</h2>
            </div>
        </div>
        <button>Contratar</button>
    </div>
  )
}

export default CardWorker