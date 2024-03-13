import React, { useState } from "react";
import { menuAdmin } from "../../theme";
import { Link,useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListIcon from "@mui/icons-material/List";
import SourceIcon from "@mui/icons-material/Source";
import {ModalAction} from "../index"
import { auth } from "../Auth";

const MenuAdmin = () => {
  const [menu, setMenu] = useState(false);
  const [optionSale, setOptionSale] = useState(false);
  const [optionRequest, setOptionRequest] = useState(false);
  const [optionEditWeb, setOptionEditWeb] = useState(false);
  const [aceptarModalIsOpen, setAceptarModalIsOpen] = useState(false);
  let navigate = useNavigate();

  const addOptionsSale = (option, openMenu) => {
    setMenu(openMenu);
    setOptionSale(option);
    if (optionEditWeb === true || optionRequest === true) {
      setOptionEditWeb(false);
      setOptionRequest(false);
    }
  };

  const addOptionsRequest = (option, openMenu) => {
    setMenu(openMenu);
    setOptionRequest(option);
    if (optionEditWeb === true || optionSale === true) {
      setOptionEditWeb(false);
      setOptionSale(false);
    }
  };

  const addOptionsEditWeb = (option, openMenu) => {
    setMenu(openMenu);
    setOptionEditWeb(option);
    if (optionRequest === true || optionSale === true) {
      setOptionRequest(false);
      setOptionSale(false);
    }
  };

  const toggleMenu = (option) => {
    setMenu(option);
    setOptionSale(false);
    setOptionRequest(false);
    setOptionEditWeb(false);
  };

  const openAceptarModal = async (item) => {
    setAceptarModalIsOpen(true);
  };

  const closeAceptarModal = () => {
    setAceptarModalIsOpen(false);
  };

  const logOut=async()=>{
    console.log("Cerrar sesion")
    localStorage.removeItem("users")
    localStorage.removeItem("token")
    auth
    setTimeout(() => {
      navigate('/')
      location.reload();
    }, 1000)
    
  }

  return (
    <div className="Menu-a">
      <div className={`menu-admin ${menu ? "open" : ""}`}>
        <div className="menu-logo">
          <div className="logo"></div>
        </div>
        <div className="menu-content">
          <div className="ul-menu">
            <Link className="link-menu" to="/admin"><HomeOutlinedIcon className="icono" />{menu ? " Inicio" : ""}</Link>
          </div>
          <div className="ul-menu">
            <button className="btn-menu" onClick={() => addOptionsSale(!optionSale, true)}>
              <ShoppingCartOutlinedIcon className="icono" />
              {menu ? " Tienda" : ""}
            </button>
            {optionSale ? (
              <div className="sub-ul">
                <div className="ul-sub-menu">
                <Link className="link-menu" to="/ventas">Ventas</Link>
                </div>
                <div className="ul-sub-menu">
                <Link className="link-menu" to="/inventario">Inventario</Link>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="ul-menu">
            <Link className="link-menu" to="/categorias"><ListIcon className="icono" />{menu ? " Categorias" : ""}</Link>
          </div>
          <div className="ul-menu">
            <Link className="link-menu" to="/publicaciones"><SourceIcon className="icono" />{menu ? " Publicaciones" : ""}</Link>
          </div>
          <div className="ul-menu">
            <Link className="link-menu" to="/usuarios"><PeopleAltOutlinedIcon className="icono" />{menu ? " Usuarios" : ""}</Link>
          </div>
          <div className="ul-menu">
            <Link className="link-menu" to="/perfil-admin"><AccountCircleOutlinedIcon className="icono" />{menu ? " Perfil" : ""}</Link>
          </div>
          <div className="ul-menu">
            <button onClick={()=>openAceptarModal()} className="btn-menu">
              <ExitToAppOutlinedIcon className="icono" />
              {menu ? " Cerrar sesion" : ""}
            </button>
          </div>
        </div>
      </div>
      <button onClick={() => toggleMenu(!menu)} className="toggle-menu">
        {menu ? (
          <CloseRoundedIcon className="icon-toggle" />
        ) : (
          <MenuIcon className="icon-toggle" />
        )}
      </button>
      <ModalAction
        isOpen={aceptarModalIsOpen}
        onRequestClose={closeAceptarModal}
        Accept="true"
        title="Cerrar sesion"
        onAccept={() => {
          closeAceptarModal();
        }}
      >
        <h4>Estas seguro de que quieres cerrar sesion?</h4>
        <button onClick={()=>logOut()}>Aceptar</button>
        <button onClick={()=>closeAceptarModal()}>Cancelar</button>
      </ModalAction>
    </div>
  );
};

export default MenuAdmin;
