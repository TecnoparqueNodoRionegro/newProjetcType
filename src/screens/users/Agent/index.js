"use client"
import React,{ useState,useEffect } from 'react'
import MenuUser from "../../../components/MenuUser";
import { Link } from 'react-router-dom';
// import { routers } from '@/app/src/Routers';
import "bootstrap/dist/css/bootstrap.css";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { api, resources } from "../../../utils/sdk";
import { auth } from "../../../components/Auth";
import { Card } from '../../../components';
import parse from "html-react-parser";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

const PublicationsAgent=()=>{
    const [publicationsActive,setPublicationsActive]=useState([])
    const [publicationsInactive,setPublicationsInactive]=useState([])

    const getPublications=async()=>{
        const response= await api.get(`${resources.article}?account=${auth.users.id}&state=1`)
        const response2= await api.get(`${resources.article}?account=${auth.users.id}&state=2`)
        setPublicationsActive(response.data)
        setPublicationsInactive(response2.data)
    }

    useEffect(()=>{
        getPublications()
    },[])

    return (
        <div className="content-user">
            <div className="menu-component">
                <MenuUser />
            </div>
            <div className='request-agent'>
                <div className='title'>
                    <p>Mis publicaciones</p>
                </div>
                <div className='text-end button-add-publications'>
                    <Link to="/agente/publicar">
                        Agregar publicacion
                        <ControlPointIcon/>
                    </Link>
                </div>
                <div className='text-start button-add-publications'>
                    <p>Activos</p>
                </div>
                <div className="row container-cards">
                    {publicationsActive.map((item,index)=>(
                        <Card 
                        styles="col-lg-5 col-md-12 col-sm-12 col-sm-12 card-html" buttonStyles="btn-card" 
                        textButton="Ver mas informacion" 
                        info={parse(item.html)} 
                        isSale={false}
                        >
                            {parse(item.html)}
                            <div className="footer-card-agent">
                                <Link
                                    // className="btn-edit"
                                    href={`/src/Page/User/Agent/${item.id}`}
                                >
                                    <BorderColorIcon/>
                                </Link>
                                <button><DeleteIcon/></button>
                            </div>
                        </Card>
                        
                    ))}
                </div>
                <div className='text-start button-add-publications'>
                    <p>Inactivos</p>
                </div>
                <div className="row container-cards">
                    {publicationsInactive.map((item,index)=>(
                        <Card styles="col-lg-5 col-md-12 col-sm-12 col-sm-12 card-html" buttonStyles="btn-card" 
                        textButton="Ver mas informacion" 
                        info={parse(item.html)} 
                        isSale={false}>
                            {parse(item.html)}
                            <button><DeleteIcon/></button>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PublicationsAgent