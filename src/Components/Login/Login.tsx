import React, { Component } from 'react'
import imgGoogle from "../../images/pngwing.com.png"
import * as type from "../../Types"
import { postLogin } from '../../Redux/Reducer/reducer'
import { connect, ConnectedProps } from "react-redux";

interface HeaderState{
  // props: any;
  //inputSkills: string[]
}

export class Login extends Component <HeaderProps, HeaderState> { 
  state: type.FormLogin
  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      user_mail: "",
      password: "",
      errors:{
            password: "Campo requerido",
            user_mail: "Campo requerido"
        },
        disabled: true
    }
}

handleChange(e:any) {
  const value = e.target.value;
  const name = e.target.name;
  let errors:type.errorLogin;
  errors = this.state.errors;

  switch (name) {      
      case "user_mail":
        let user_mailPattern:RegExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        errors.user_mail = user_mailPattern.test(value)? "" : "El campo ingresado debe ser un email valido."
        break;
      case "password":
          let passwordPattern:RegExp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
          errors.password = passwordPattern.test(value)? "" : "Debe tener entre 8 y 16 caracteres y al menos 1 mayuscula y 1 minuscula."
          break;
      default:
          break;
  }
  this.setState({
      [name]: value,
      errors
  });
}

  handleSubmit(e:any){
    e.preventDefault();
    console.log("entre al submit")
    let { password, user_mail } = this.state;
    this.props.postLogin({password, user_mail})
}

  render() {
    return (
      <div>
        
        <div>
            <h1>Inicia sesion</h1>
            <p>Olvidaste tu contraseña? recuperala <a href="#">Aqui</a></p>
            <div>
                <input type="text" onChange={(e) => this.handleChange(e)} name="user_mail" id="" placeholder='E-mail'/>
                <input type="password" onChange={(e) => this.handleChange(e)} name="password" id="" placeholder='Constraseña'/>
                <input type="submit" onClick={(e) => this.handleSubmit(e)} name="" value="Log in" />
                <span/>
                <p>O continua con</p>
                <span/>
                <span>
                    <img src={imgGoogle} alt="googleLink" />
                    <p>Google</p>
                </span>
            </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state:any) => {
  return {

  }
};
export const mapDispatchToProps = (dispatch:any) => {
  return {
    postLogin: (newLoggedUser:type.userLogged) => dispatch(postLogin(newLoggedUser))
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps)

type HeaderProps = ConnectedProps<typeof connector>

export default connector(Login)