import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as type from "../../Types"

const initialState = {
    allClients: [],
    clientById: {},
    offers: [],
    offerById: {},
    professions: [],
}

export const workServiceSlice = createSlice({
    name: "workService",
    initialState,
    reducers:{
        setAllClients: function (state:any, action:any){
            state.allClients = action.payload;
        },
        setClientById: function (state:any, action:any){
            state.clientById = action.payload;
        },
        setAllOffers: function (state:any, action:any){
            state.offers = action.payload;
        },
        setOfferById: function (state:any, action:any){
          state.offerById = action.payload;
      },
    }
})

export const { setAllClients, setClientById, setAllOffers, setOfferById } = workServiceSlice.actions;

export default workServiceSlice.reducer;

//aca van las actions

export const getClients = (clients:any) => (dispatch:any) =>{
    dispatch(setAllClients(clients))
}

 export const getOffers = () => (dispatch:any) => {
     //{remuneration: number[], description: string, work_duration_time: string, photo: string, tags: string[], title: string}
     const offer:object[] = [{
         id: "asd123",
         remuneration: [100, 150],
         description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
         work_duration_time: "1 semana",
         photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
         tags: ["front end developer", "design", "full stack", "css", "javaScript"],
         title: "Página de paisajes (solo front)",
         name: "Esteban Longo",
         photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
         rating: 3.7
       },
       {
        id: "acd124",
        remuneration: [100, 150],
        description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
        work_duration_time: "1 semana",
        photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
        tags: ["front end developer", "design", "full stack", "css", "javaScript"],
        title: "Página de paisajes (solo front)",
        name: "Esteban Longo",
        photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
        rating: 3.7
      },
      {
        id: "abd132",
        remuneration: [100, 150],
        description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
        work_duration_time: "1 semana",
        photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
        tags: ["front end developer", "design", "full stack", "css", "javaScript"],
        title: "Página de paisajes (solo front)",
        name: "Esteban Longo",
        photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
        rating: 3.7
      },
      {
        id: "apd175",
        remuneration: [100, 150],
        description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
        work_duration_time: "1 semana",
        photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
        tags: ["front end developer", "design", "full stack", "css", "javaScript"],
        title: "Página de paisajes (solo front)",
        name: "Esteban Longo",
        photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
        rating: 3.7
      },
      {
        id: "abc321",
        remuneration: [100, 150],
        description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
        work_duration_time: "1 semana",
        photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
        tags: ["front end developer", "design", "full stack", "css", "javaScript"],
        title: "Página de paisajes (solo front)",
        name: "Esteban Longo",
        photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
        rating: 3.7
      },
    ]
     dispatch(setAllOffers(offer));
 }

export const getOfferId = () => (dispatch: any) => {
  const offerId: object = {
    remuneration: [100, 150],
    description: "Tengo una herramienta desarrollada en Java que permite ver videos de manera remota. Adjunto un video en el cual se muestra el funcionamiento de la mismo para y por que si",
    work_duration_time: "1 semana",
    photo: "https://www.xtrafondos.com/wallpapers/resized/paisaje-digital-en-atardecer-5846.jpg?s=large",
    tags: ["front end developer", "design", "full stack", "css", "javaScript"],
    title: "Página de paisajes (solo front)",
    name: "Esteban Longo",
    photoClient: "https://i.pinimg.com/originals/bf/6b/40/bf6b4041f341a91a030abc0b7abd5ef4.jpg",
    rating: 3.7,
    proposals: [{
      name: "Juan Carlos",
      remunerationProposal: 125,
      proposal_description: "experto en la materia",
      worked_time: "5 dias",
      idWorker: "159abc"
    },
    {
      name: "Jose Perez",
      remunerationProposal: 118,
      proposal_description: "tengo un portfolio repleto de lo que necesitas",
      worked_time: "4 dias",
      idWorker: "164dse"
    },
    {
      name: "Carlos Juan",
      remunerationProposal: 114,
      proposal_description: "puedo realizar ese trabajo",
      worked_time: "6 dias",
      idWorker: "147ase"
    }],   
  }
    dispatch(setOfferById(offerId));
 }

export const postNewClient = (newClient:type.newClientType) => {
  try{
    return axios({
      method:"post",
      url: "http://localhost:3001/register/client",
      data:newClient
    })
  }catch(error){
    return error
  }
}