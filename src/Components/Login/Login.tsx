import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgGoogle from "../../images/pngwing.com.png";
import {googleLog, postLogin} from "../../Redux/Reducer/reducer";
import HeaderRegister from "../Register/HeaderRegister/HeaderRegister";
import { Link, useNavigate } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import login_hero from "../../images/login_hero.jpg";
import './Login.css'
import firebase from '../../firebase'


const Login = (props:any) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [user, setUser] = useState({user_mail: "", password: ""})
  const dispatch = useDispatch()

  const handleChange = (e:any) => {
    setUser({
      ...user,
        [e.target.name]: e.target.value
    });
  } 

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    
    let password  = user.password
    let user_mail = user.user_mail.toLowerCase();
    let newLoggedUser = {
      user_mail:user_mail, password:password
    }
    dispatch(postLogin(newLoggedUser));
    //hay que buscar la manera de que re-renderice la informacion (logeado y con toquen no actualiza el header, con f5 se arregla)
    //posible solucion: renderizar navbar/header a lo ultimo en home
    navigate('/home')
    props.close(false)
    // toast.success("Logueado correctamente.", {position:"top-right"})
  }

  function handleClose() {
    props.close(false)}

  const googleLogin = async () => {
    //ejecutamos la auth de firebase y guardamos la respuesta
    let provider = new firebase.auth.GoogleAuthProvider()
    //se ejecuta la verificacion con el usuario recibido
      firebase.auth().signInWithPopup(provider)
      .then((result:any) =>{
        //guardamos en user la respuesta de google
         let user = result.user
         console.log("el user", user)
         //dispatch de la action para hacer la verificacion
         dispatch(googleLog(user))
      })
  }

      //Ejemplo de useSelector con Toolkit.
      // para hacer un console.log y ver si estaba andando la action.
  /* const global = useSelector((state: any) => state.workService.currentUser) */
   
  const handleResetPassword = () => {
    window.open("https://re-work-ten.vercel.app/forgotPassword", "_self")

} 

  return (
    <div className="Login_component">
      {/* <HeaderRegister/> */}
      <div className="Login_divContent">
          <button className="Login_ModalClose" onClick={handleClose}>x</button>
          <span className="Login_inicia">Inicia sesión</span>
          <div>
            <form className="Login_form">
              <input className="Login_input" type="text" name="user_mail" onChange={(e) => handleChange(e)} placeholder='e-mail'/>
              <input className="Login_input" type="password" name="password" onChange={(e) => handleChange(e)} placeholder='contraseña'/>
              <input className="Login_inputSubmit" type="submit" name="" value="Iniciar sesión" onClick={(e) => handleSubmit(e)}/>
            </form>
            <p className="Login_recuperarCon">¿Olvidaste tu contraseña? Recupérala <a onClick={handleResetPassword}>aquí</a></p>
            <hr className="Login_hr" />
            <div className="Login_divContinuaCon">
              <p className="Login_continuaCon">O continúa con</p>
            </div>
            <div className="Login_divTercero">
              <button className="Login_ButtonGoogle" onClick={googleLogin}>
               <img className="Login_googleImg" src={imgGoogle} alt="googleLink" />
              </button>
            </div>
            <span className="Login_Register">¿No tienes una cuenta? <a href="" onClick={()=>navigate("/register")}>Regístrate</a></span>
          </div>
      </div>
      <div className="Login_divCover">
        <img className="Login_Cover" src={login_hero} alt="login cover" />
      </div>
      <Toaster/>
    </div>
  )
}

export default Login
