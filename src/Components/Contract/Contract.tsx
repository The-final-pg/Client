import React, { useEffect, useState } from 'react'
import "./Contract.css"
import firma from "../../images/04ed6259fb04a225285c9201d3e38521.png"
import Header from '../Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { acceptProposal, checkSession, getOfferForHistory, modifyOfferState } from '../../Redux/Reducer/reducer'
import aprobado from "../../images/aprobado.png"
import rechazado from "../../images/rechazado.png"
import { useDispatch, useSelector } from 'react-redux'
import Swal from "sweetalert2";



const Contract = () => {
    const dateNow = new Date();
    const params:any = useParams();
    const [currentOffer, setCurrentOffer] = useState<any>({});
    const [result, setResult] = useState<any>("");
    const userLogged = useSelector((state: any) => state.workService.userLogged);
    const currentUser = useSelector((state: any) => state.workService.currentUser)
    const navigate = useNavigate();
    const  dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(checkSession())
        getOfferForHistory(params.id)
        .then((response)=>{
          setCurrentOffer(response)
        })
    }, [])

    useEffect(() => {
        if(currentOffer.hasOwnProperty("idOffer")&&userLogged.hasOwnProperty("id"))notAdmited()
    }, [currentOffer])

    const getWorker = (array:any) => {
        const proposal = array?.find((p:any) => p.state === "accepted"||p.state === "contract accepted")
        if(proposal){
            return `${proposal?.userWorker.name} ${proposal?.userWorker.lastName}`
        }else{
            return "N/D"
        }
    }

    const getActualyDay = (day:number) =>{
        switch (day) {
            case 1:
                return "Lunes"
            break;
            case 2:
                return "Martes"
            break;
            case 3:
                return "Miercoles"
            break;
            case 4:
                return "Jueves"
            break;
            case 5:
                return "Viernes"
            break;
            case 6:
                return "Sabado"
            break;
            case 7:
                return "Domingo"
            break;

        
            default:
                break;
        }
    }

    const rejectContract = () => {
        setResult("rejected")
        if(userLogged.isWorker){
            let state = "contract cancelled";
            let proposal = currentOffer.proposals?.find((p:any) => p.state === "accepted")
            if(proposal){
            let id = proposal.idProposal;
            let proposalState: { state: string; id: string } = {
              state,
              id,
            };
            acceptProposal(proposalState);
        }
        }else{
            let state = "contract rejected";
            let proposal = currentOffer.proposals?.find((p:any) => p.state === "accepted"||p.state === "contract accepted")
            if(proposal){
            let id = proposal.idProposal;
            let proposalState: { state: string; id: string } = {
              state,
              id,
            };
            acceptProposal(proposalState);
        }
        }
        setTimeout(()=>{
            navigate("/home")
        },2000)
    }
    const acceptContract = () => {
        setResult("aproved")
        let proposal = currentOffer.proposals?.find((p:any) => p.state === "accepted"||p.state === "contract accepted")
        if(proposal){
            if(userLogged.isWorker){
                let state = "contract accepted";
                let id = proposal.idProposal;
                let proposalState: { state: string; id: string } = {
                    state,
                    id,
                    };
                acceptProposal(proposalState);
                setTimeout(()=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'GENIAL!',
                        text: 'Estamos a punto de comenzar el trabajo! Enviaremos el contrato al cliente para que lo firme, te avisaremos cuando todo est?? listo para comenzar',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/home")
                        }
                    })
                }, 2000)
            }else{
                let proposal = currentOffer.proposals?.find((p:any) => p.state === "contract accepted")
                currentOffer.proposals?.forEach((e: any) => {
                    if (e.idProposal !== proposal.idProposal) {
                        let state = "rejected";
                        let id = e.idProposal;
                        let proposalState: { state: string; id: string } = {
                                state,
                                id,
                            };
                        acceptProposal(proposalState);
                    }
                })
                
                setTimeout(()=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'GENIAL!',
                        text: 'Todo esta listo para comenzar el trabajo! solo falta que realices el pago correspondiente, te guiaremos hacia all??',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate(`/pago/${currentOffer.idOffer}`)
                        }
                    })
                }, 2000)
            }
    }
}
    const workerResult = () => {
        if(userLogged.isWorker===true){
            if(result!==""){
                if(result === "rejected"){
                    return rechazado;
                }else if(result === "aproved"){
                    return aprobado
                }
            }
        }else{
            return aprobado
        }
    }
 
    const clientResult = () => {
        if(userLogged.isWorker===false){
            if(result!==""){
                if(result === "rejected"){
                    return rechazado;
                }else if(result === "aproved"){
                    return aprobado
                }
            }
        }
    }

    const modalFunction = () => {
        if(userLogged.isWorker){
            Swal.fire({
                icon: 'question',
                title: '??Estas seguro?',
                text: 'Estas a punto de rechazar el contrato, tu propuesta sera eliminada.',
                showDenyButton: true,
                confirmButtonText: 'No rechazar',
                confirmButtonColor: '#f1730c',
                denyButtonColor: '#264653',
                denyButtonText: `Rechazar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    setResult("")
                }else{
                    rejectContract();
                }
            })
        }else{
            Swal.fire({
                icon: 'question',
                title: '??Estas seguro?',
                text: 'Estas a punto de rechazar el contrato, la propuesta del freelancer ser?? rechazada.',
                showDenyButton: true,
                confirmButtonText: 'No rechazar',
                confirmButtonColor: '#f1730c',
                denyButtonColor: '#264653',
                denyButtonText: `Rechazar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    setResult("")
                }else{
                    rejectContract();
                }
            })
        }
    }

    const notAdmited = () => {
        let proposal = currentOffer.proposals?.find((p:any) => p.state === "contract accepted" || p.state === "accepted")
        // console.log("user",userLogged)
        // console.log("offer",currentOffer)
        // console.log("proposal",proposal)

        //if(userLogged==={}) notAdmited();
        //if(currentOffer==={}) notAdmited();
        //if(proposal===undefined) notAdmited();

        setTimeout(()=>{
            if(proposal){
                if(userLogged.id===proposal?.userWorker?.id){
                    return false
                }
            else if(userLogged.id===currentOffer?.userClient?.id){
                return false
            }
            else if(currentUser.id===""){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'Parece que no tienes permiso de estar aqui, te dirigiremos a la pagina principal.',
                }).then((result) => {
                    navigate("/home")
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'Parece que no tienes permiso de estar aqui, te dirigiremos a la pagina principal.',
                }).then((result) => {
                    navigate("/home")
                })
            }
        }else{
            if(userLogged.id!==proposal?.userWorker?.id){
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'Parece que no tienes permiso de estar aqui, te dirigiremos a la pagina principal.',
                }).then((result) => {
                    navigate("/home")
                })
            }
        }
            return false
        },0)
        return false
    }

  return (
    <div className='contenedor'>
        <Header/>
            <h2 className='title'>CONTRATO DE TRABAJO INDIVIDUAL</h2>
            
        <div className='contract_cont'>
            <div>
                <p className='marcaRegistrada'><b>RE</b>work???</p>
                <p><b>NOMBRE DEL EMPLEADOR:</b> {currentOffer?.userClient?.name} {currentOffer?.userClient?.lastName}</p>
                <p><b>NOMBRE DEL TRABAJADOR:</b> {getWorker(currentOffer.proposals)}</p>
                <p><b>OFICIO A DESEMPE??AR:</b> {currentOffer?.title}</p>
                <p><b>FECHA DE INICIACION DE LABORES:</b> A partir de aceptado este contrato.</p>
                <p><b>LUGAR DE DESEMPE??O DE LA LABOR:</b> Argentina</p>
                <p><b>CIUDAD DONDE SE CONTRATO AL TRABAJADOR:</b> Buenos Aires</p>
            </div>
            <br />
            <div>
                <p>Entre EL EMPLEADOR y EL TRABAJADOR, de las condiciones ya dichas, identificados como
aparece al pie de sus firmas, se ha celebrado el presente contrato individual de trabajo, regido
adem??s por las siguientes cl??usulas:</p>
            </div>
            <br />
            <div>
                <p><b>PRIMERA:</b> OBJETO: El EMPLEADOR contrata los servicios personales de EL TRABAJADOR y este
se obliga: A) a poner al servicio de EL EMPLEADOR toda su capacidad normal de trabajo, en
forma exclusiva, en el desempe??o de las funciones propias del cargo a desempe??ar, as?? como
en las labores anexas y complementarias del mismo, de conformidad con las ??rdenes e
instrucciones que le imparta EL EMPLEADOR o sus representantes, B) a no prestar directa ni
indirectamente servicios laborales a otros empleadores, ni a trabajar por cuenta propia en el
mismo oficio durante la vigencia de ??ste contrato</p>
            </div>
            <br />
            <div>
                <p><b>PARAGRAFO:</b> Las partes califican como obligaci??n especial del contrato y cuyo
incumplimiento desde ahora se considera como grave la siguiente:
Guardar en el desempe??o de sus funciones y fuera de ellas, la discreci??n, reserva, sigilo y
prudencia que le exige</p>
            </div>
            <br />
            <div>
                <p><b>SEGUNDA:</b> NATURALEZA Y FORMA DE PAGO: EL EMPLEADOR pagar?? a LA EMPRESA, el total del
                monto acordado en la propuesta aceptada previamente. Una vez finalizado el trabajo, LA EMPRESA
                se compromete a liberar a EL TRABAJADOR el pago realizado por EL EMPLEADOR y asi completar el ciclo de trabajo.</p>
<p>Dentro de estos pagos se encuentra incluida la remuneraci??n de los descansos dominicales y
festivos de que tratan los cap??tulos I y II del Titulo VII del C.S.T. Adicionalmente a lo anterior EL
EMPLEADOR pagar?? a EL TRABAJADOR las prestaciones sociales que le corresponden de
acuerdo con el C.S.T. </p>
<p>EL TRABAJADOR manifiesta su voluntad de que las cesant??as le sean consignadas en el fondo
de cesant??as BBVA-Banco Ganadero.</p>
            </div>
            <br />
            <div>
                <p><b>TERCERA:</b> PAGOS NO CONSTITUTIVOS DE SALARIO: EL EMPLEADOR y EL TRABAJADOR,
acuerdan que no constituyen salario ninguno de los elementos enunciados en el Art??culo 128
del C.S.T., subrogado por el Art??culo 15 de la Ley 50 de 1990 y adem??s establecen de com??n
acuerdo que las sumas que ocasionalmente y por mera liberalidad recibe el TRABAJADOR de
EL EMPLEADOR, como primas, beneficios, bonificaciones, premios, incentivos, convenciones,
etc., as?? como lo que recibe en dinero o en especie para desempe??ar a cabalidad sus funciones,
como alimentaci??n, medios de transporte, elementos de trabajo y otros semejantes, no
constituyen salario ni factor de salario para liquidar Prestaciones Sociales.</p>
            </div>
            <br />
            <div>
                <p><b>CUARTA:</b> JORNADA Y HORARIO DE TRABAJO: EL TRABAJADOR posee libertad para decidir cuantas horas por dia
                realizar?? el trabajo, siempre y cuando llegue con el trabajo terminado en el tiempo estipulado por EL EMPLEADOR, 
                no pudiendo hacer ??ste ajustes o cambios de horario. Por el acuerdo expreso o
t??cito de las partes, podr??n repartirse las horas de la jornada como las partes acuerden o crean convenientes.</p>
            </div>
            <br />
            <div>
                <p><b>QUINTA:</b> TRABAJO SUPLEMENTARIO. Todo trabajo suplementario (no acordado) o en horas extras y todo
trabajo en d??a domingo o festivo, en los que legalmente debe concederse descanso, no se
remunerar?? conforme a la ley ya que queda a criterio de EL TRABAJADOR cuando realizar dicha tarea. Para el
reconocimiento y pago del trabajo suplementario, EL EMPLEADOR o sus
representantes deber??n autorizarlo previamente por escrito.</p>
            </div>
            <br />
            <div>
                <p><b>SEXTA.-</b> TRABAJOS SUPLEMENTARIO_bis: Se necesita acordar dentro de LA EMPRESA y por escrito
                con un miembro del soporte de por medio, la suma de trabajos extras o suplementarios al estipulado en la oferta.
                Todo trabajo extra acordado y/o realizado fuera del conocimiento de REwork??? queda a disposicion de las partes
                y no posee derecho de reclamo o reembolso en caso de estafa, hurto o cualquier otro percanse. Las partes se har??n responsables
                de todo da??o causado en trabajos ajenos a REwork???.</p>
            </div>
            <br />
            <div>
                <p><b>SEPTIMA:</b> JUSTAS CAUSAS DE TERMINACION UNILATERAL DEL CONTRATO DE TRABAJO: Son
justas causas para poner t??rmino a este contrato, unilateralmente las enumeradas en el
art??culo 62?? del C.S.T. subrogado por el Art??culo 7?? del Decreto 2351 de 1965, y adem??s EL
EMPLEADOR califica para el efecto, las siguientes faltas como graves: a) La violaci??n por parte
del TRABAJADOR de cualquiera de las obligaciones legales, contractuales o reglamentarias; b)
el NO cumplimiento al trabajo pactado sin excusa suficiente a juicio del EMPLEADOR.; 
c) la ejecuci??n por parte del trabajador de labores
remuneradas a servicio de terceros dedicados a la misma rama de negocios, sin autorizaci??n
del EMPLEADOR; d) La revelaci??n de secretos y datos reservados de la empresa; e) Las
repetidas fallas a la hora de realizar la labor; f) El hecho que EL TRABAJADOR
falte el respeto u ofenda a EL EMPLEADOR o cualquiera de sus allegados; g) El
hecho que EL TRABAJADOR abandone el trabajo sin el previo aviso a su contraparte; h) La falta de comunicaci??n con
EL EMPLEADOR siendo esta fundamental para el desarrollo del trabajo; i) el no cumplimiento en forma
cabal de las funciones inherentes a su cargo y descritas en este contrato y el negarse a
desempe??ar labores indispensables y/o pactadas del trabajo pactado; j) Da??ar o manipular informacion privada y/o publica
relacionada al trabajo realizado: k) El hacer mal uso, o por
m??s tiempo del requerido, de los permisos otorgados por la Empresa, por calamidad
dom??stica o de las licencias para utilizar los servicios de la EPS.</p>
            </div>
            <br />
            <div>
                <p> <b>OCTAVA.-</b> DIRECCI??N DEL TRABAJADOR. El TRABAJADOR se compromete a informar por
escrito al EMPLEADOR cualquier cambio de direcci??n teni??ndose como suya para todos los
efectos, la ??ltima direcci??n registrada en la empresa.</p>
            </div>
            <br />
            <div>
                <p><b>NOVENA.-</b> Toda variaci??n que sufre el presente contrato especialmente en cuanto hace a la
remuneraci??n del trabajador y Jornada de Trabajo, se har?? constar al pie del mismo o por
escrito separado, con las firmas de ambas partes.</p>
            </div>
            <br />
            <div>
               <p><b>DECIMA.-</b> Ambas partes declaran que en el presente contrato se entienden
incorporadas, en lo pertinente todas las disposiciones legales que regulan las relaciones entre
empleadores y trabajadores y las del reglamento interno de trabajo adoptado por la Empresa.</p> 
            </div>
            <br />
            <div>
                <p><b>DECIMA PRIMERA.</b> BUENA FE. EL TRABAJADOR se obliga a desempe??ar con lealtad y eficacia
sus funciones, a cumplir estrictamente los reglamentos pactados con su empleador y a
responder por los da??os imputables a su culpa en los elementos puestos a su cuidado,
autorizado desde ahora en forma expresa a EL EMPLEADOR para deducir su valor de los
pagos que le adeude o llegare a adeudar.
<br />
<b>DECIMA SEGUNDA.</b> El presente contrato reemplaza en su integridad y deja sin efecto alguno
cualquiera otro contrato verbal o escrito celebrado entre las partes con anterioridad, pudiendo
las partes convenir por escrito modificaciones al mismo que se anotar??n a continuaci??n de su
texto.</p>
            </div>
            <br />
            <div>
                <p><b>DECIMA TERCERA.-</b> LIQUIDACI??N. A la expiraci??n del contrato LA EMPRESA deber?? liquidar
la totalidad del pago que realiz?? EL EMPLEADOR a EL TRABAJADOR y su pago se
har?? en un plazo m??ximo de quince (15) d??as h??biles siguientes al de la finalizacion del trabajo, tiempo estimado
como necesario y suficiente para la gesti??n y pago de dicha liquidaci??n y durante el cual no se
causar?? indemnizaci??n moratoria.
</p>
            </div>
            <br />
            <div>
                <p><b>DECIMA QUINTA.-</b> Este contrato ha sido redactado estrictamente de acuerdo a la Ley y la
Jurisprudencia y ser?? interpretado de buena fe y en consonancia con el C??digo Sustantivo del
Trabajo cuyo objeto, definido en su art??culo primero (1). es lograr la justicia y equidad en las
relaciones entre empleadores y trabajadores dentro de un esp??ritu de coordinaci??n econ??mica
y equilibrio social.</p>
            </div>
            <br />
            <div>
                <p>Para constancia se firma en dos ejemplares del mismo tenor, en la ciudad de Argentina BsAs. hoy {getActualyDay(dateNow.getDay())} ({dateNow.getDate()}) del {dateNow.getMonth()} de {dateNow.getFullYear()}.</p>
            </div>
            <div className='firmas'>
                <span>EL EMPLEADOR <img src={clientResult()}></img></span> <span>EL TRABAJADOR <img src={workerResult()}></img></span>
            </div>
            <div className='firma_rework'>
                <span>LA EMPRESA</span>
                <img src={firma} alt="firma" />
                </div>
        </div>
        <div className='botones'>
            <button onClick={modalFunction} className='rechazar'>RECHAZAR</button>
            <button onClick={acceptContract} className='aceptar'>ACEPTAR</button>
        </div>
        
    </div>
  )
}

export default Contract