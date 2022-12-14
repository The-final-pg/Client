import React from 'react'
import CardOffer from '../CardOffer/CardOffer'

const CardsOffer = ({props}:any) => {
  return (
    <div>
      {props && props?.map((o:any, i:any) =>{
        return(
          <CardOffer key={i} props={o} />
        )
      })}
    </div>
  )
}

export default CardsOffer