import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderRegister from '../../Register/HeaderRegister/HeaderRegister';
import * as type from "../../../Types";
import Axios, {AxiosResponse}  from "axios";
import Swal from 'sweetalert2'
import { createGoogleWorker, getAllProfession, getAllSkills, getOffers } from '../../../Redux/Reducer/reducer';
import './GoogleWorker.css'

const GoogleWorker = () => {
    const dispatch = useDispatch()
    const localData: any = localStorage.getItem("googleToken")
    const googleData: any = JSON.parse(localData)
    let name: string = ''
    let lastname: string = ''
    const splitedName: any = googleData.name.split(' ')
    if (splitedName.length === 3) {
        name = splitedName[0] + " " + splitedName[1]
        lastname = splitedName[2]
    } else if (splitedName.length === 2) {
        name = splitedName[0]
        lastname = splitedName[1]
    } else if (splitedName.length === 4) {
        name = splitedName[0] + " " +splitedName[1]
        lastname = splitedName[2] + " " +splitedName[3]
    }

    const [user, setUser] = useState({
        name: name,
        lastName: lastname,
        password: googleData.password,
        user_mail: googleData.user_mail,
        birthdate: "",
        image: googleData.photo,
        errors: {
            birthdate: " ",
        },
        disabled: false
    })

    function validarForm(errors: any) {
      let valid = true;
      Object.values(errors).forEach(
        (val: any) => val.length > 0 && (valid = false)
      );
      if (valid) {
        setUser({
          ...user,
          disabled: false,
        });
      } else {
        setUser({
          ...user,
          disabled: true,
        });
      }
    }

    function handleChange(e: any) {
        const value = e.target.value;
        const name = e.target.name;
        let errors: any;
        errors = user.errors;    
        switch (name){
            case "birthdate":
                let fechas = value;
                let year = fechas.split("-");
                let date = new Date();
                let dateNow =
                date.getFullYear() +
                "-" +
                0 +
                (date.getMonth() + 1) +
                "-" +
                0 +
                date.getDate();
                console.log(dateNow);
                console.log(fechas);
                errors.birthdate =
                dateNow < fechas
                  ? "La fecha ingresada es inválida."
                  : year[0] > date.getFullYear()
                  ? "La fecha ingresada es inválida."
                  : year[0] < 1940
                  ? "El año debe ser mayor a 1940"
                  : parseInt(year[0]) + 18> date.getFullYear() 
                  ? "Debes ser mayor de edad"
                  : parseInt(year[0]) + 18 === date.getFullYear() && parseInt(year[1]) > (date.getMonth() + 1)
                  ? "Debes ser mayor de edad"
                  : parseInt(year[0]) + 18=== date.getFullYear() && parseInt(year[1]) === (date.getMonth() + 1) && parseInt(year[2]) > date.getDate()
                  ? "Debes ser mayor de edad"
                  : "";
                break
            default:
                break;
              }
        validarForm(user.errors);
        setUser({
            ...user,
            [name]: value,
            errors,
        });
    }

    async function postImageOnCloudinary(e: any) {
        const formData = new FormData();
        formData.append("file", e);
        formData.append("upload_preset", "re-work");
    
        try {
          console.log(formData)
          const response: AxiosResponse = await Axios.post("https://api.cloudinary.com/v1_1/luis-tourn/image/upload", formData);
          const data: any = response.data;
          return data.url;
        } catch (error) {
          return (error);
        }
      }
    async function handleSubmit(e: any) {
        e.preventDefault();
        console.log("el estado", user)
        let image = await postImageOnCloudinary(user?.image);
        console.log("imagen ya cargada", image)
        let { name, lastName, password, user_mail, birthdate } = user;
    
        const newClient = {
          name: name,
          lastName: lastName,
          password: password,
          user_mail: user_mail,
          born_date: birthdate,
          photo: image,
        }

        dispatch(createGoogleWorker(newClient));
        let form = document.getElementById("form") as HTMLFormElement | null;
        form?.reset();
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta creada!',
          html: 'Ahora puedes ir a tu perfil y personalizarlo. Tambien, te llegará un correo con tu contraseña provisoria, cámbiala cuando quieras.',
          confirmButtonText: 'Comienza',
      }).then((result) => {
        localStorage.removeItem("googleToken")
        window.open("https://re-work-ten.vercel.app/home", "_self")
    })
      }


    return (
        <div className='GoogleWorker_component'>
            <HeaderRegister/>
            <div className='GoogleWorker_titleContainer'>
                <h2 className='GoogleWorker_title'>¡Un último paso!</h2>
                <h4 className='GoogleWorker_subtitle'>Necesitamos confirmar que eres <span className="GoogleWorker_age">mayor de edad</span>, </h4>
                <h4 className='GoogleWorker_subtitle'>por favor indícanos tu fecha de nacimiento</h4>
            </div>
            <div className="GoogleWorker_divForm">
              <form className="GoogleWorker_form">
                <input
                  className="GoogleWorker_inputDate"
                  type="date"
                  name="birthdate"
                  placeholder="Fecha de Nacimiento"
                  onChange={(e) => handleChange(e)}
                />
                {!user.errors.birthdate ? <br/> : (
                  <div className="GoogleWorker_error">
                    {user.errors.birthdate}
                  </div>
                )}
                <input
                className="GoogleWorker_inputSubmit"
                disabled={user.disabled}
                name="button"
                type="submit"
                value="Verificar"
                onClick={(e) => handleSubmit(e)}
                />
              </form>
            </div>
        </div>
    )
}

export default GoogleWorker