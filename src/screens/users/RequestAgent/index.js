"use client"
import React,{useState,useEffect} from 'react'
import MenuUser from '../../../components/MenuUser';
import { requestAgent } from '../../../theme';
import { auth } from "../../../components/Auth";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button,Alerts } from '../../../components';
import "bootstrap/dist/css/bootstrap.css";
import { api, resources } from "../../../utils/sdk";

const RequestAgent = () => {
    const [account,setAccount]=useState([])
    const [request,setRequest]=useState({observ:"vacio",state_id:1})
    const [showAlert,setShowAlert]=useState(0)
    const [accept,setAccept]=useState(false)

    const getAccount=async()=>{
        const response= await api.get(`${resources.account}${auth.users.id}`)
        setAccount(response.data)        
        setRequest({...request,account_id:response.data.id})
    }

    useEffect(()=>{
        getAccount()
    },[])

    const saveRequest=async()=>{
        console.log(request)
        if(account.address===''||account.email===''||account.phone===''||request.services===''||request.services===undefined||request.year_experience===''||request.year_experience===undefined){
            setShowAlert(1)
        }else{
            if(accept){
                try{
                    const response= await api.put(`${resources.account}${account.id}/`,account)
                    const response2= await api.post(`${resources.request}`,request)
                    setShowAlert(3)
                }catch{
                    setShowAlert(4)
                }
            }else{
                setShowAlert(2)
            }
        }
    }
    return ( 
        <div className="content-request">           
            <div className="menu-component">
                <MenuUser />
            </div>
            <div className='request-agent'>
                <div className='ad-request'>
                <p>¿Cuentas con un servicio y te gustaría publicarlo? ¡Solicita ser agente!</p>
                </div>
                <div className='form-request'>
                    <div className='row'>
                        <p>RESIDENCIA</p>
                        <div className='col-lg-3 col-md-12 col-sm-12 col-sm-12'>
                            <TextField
                            id="outlined-select-currency"
                            select
                            label="Departamento"
                            className='input-request'
                            >
                            <MenuItem value="">
                                HOLA
                            </MenuItem>
                            </TextField>
                        </div>
                        <div className='col-lg-3 col-md-12 col-sm-12 col-sm-12'>
                            <TextField
                            id="outlined-select-currency"
                            select
                            label="Municipio"
                            className='input-request'
                            >
                            <MenuItem value="">
                                HOLA
                            </MenuItem>
                            </TextField>
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-sm-12'>
                            <TextField 
                            id="outlined-basic" 
                            className='input-request' 
                            label="Direccion" 
                            variant="outlined"
                            value={`${account.address}`}
                            onChange={(e)=>setAccount({...account,address:e.target.value})}
                            />
                        </div>
                        <p>CONTACTO</p>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-sm-12'>
                            <TextField 
                            id="outlined-basic" 
                            className='input-request' 
                            label="Telefono" 
                            variant="outlined" 
                            value={`${account.phone}`}
                            onChange={(e)=>setAccount({...account,phone:e.target.value})}
                            />
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-sm-12'>
                            <TextField 
                            id="outlined-basic" 
                            className='input-request' 
                            label="Email" 
                            variant="outlined"
                            value={`${account.email}`}
                            onChange={(e)=>setAccount({...account,email:e.target.value})} 
                            />
                        </div>
                        <p>SERVICIO</p>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-sm-12'>
                            <TextField
                            id="outlined-multiline-flexible"
                            label="Servicio que ofrece"
                            multiline
                            maxRows={6}
                            className='input-request' 
                            onChange={(e)=>setRequest({...request,services:e.target.value})}
                            />
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12 col-sm-12'>
                            <TextField 
                            id="outlined-basic" 
                            className='input-request' 
                            label="Años de experiencia" 
                            variant="outlined" 
                            onChange={(e)=>setRequest({...request,year_experience:e.target.value})}
                            />
                        </div>
                        <div className='terms-and-conditions'>
                            <FormControlLabel onClick={()=>setAccept(!accept)} control={<Checkbox />} label="Acepto"/>
                            <p>términos y condiciones</p>
                        </div>
                        {showAlert===1?<Alerts style="error">Por favor llene todos los campos</Alerts>:showAlert===2?<Alerts style="error">Acepta los terminos y condiciones</Alerts>:showAlert===3?<Alerts style="success">Solicitud exitosa</Alerts>:showAlert===4?<Alerts style="error">Error! no se pudo realizar la solicitud</Alerts>:''}
                        <div className='footer-request'>
                            <Button onClick={()=>saveRequest()} className={'button-blue'}>Solicitar</Button>
                        </div>
                    </div>
                </div>     
            </div>
        </div>
     );
}
 
export default RequestAgent;