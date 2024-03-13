import React, { useState } from "react";
// import { menuUser } from "@/app/src/Style";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../Auth/index";
import { Link, useNavigate } from 'react-router-dom';

const MenuUserRight = ({ style }) => {
  const [menu, setMenu] = useState(false);
  const [userName, setUserName] = useState("Nombre de Usuario");
  let navigate = useNavigate();

  const toggleMenu = (option) => {
    setMenu(option);
  };

  const handleEditProfile = () => {
    // router.push("/src/Page/User/profile");
    // <Link className="btn-menu-right" to="/" />
    navigate('/perfil')
    toggleMenu(false);
  };

  const handleHome = () => {
    // <Link className="btn-menu-right" to="/" />
    toggleMenu(false);
  };

  const handleRoutes = () => {
    // <Link className="btn-menu-right" to="/rutas" />
    toggleMenu(false);
  };

  const handleServices = () => {
    // <Link className="btn-menu-right" to="/servicios" />
    toggleMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("users");
    navigate("/");
    window.location.reload();
    toggleMenu();
  };

  return (
    <div>
      <div className={`menu-right${style ? "-open" : ""}`}>
        <div className="ul-menu-right">
          <div className="menu-options">
            <AccountCircleIcon className="icon-circle-right" />
            <p className="nameUser">{userName}</p>
            <button className="btn-menu-right no-web" onClick={handleHome}>
              Inicio
            </button>
            <button className="btn-menu-right no-web" onClick={handleRoutes}>
              Rutas
            </button>
            <button className="btn-menu-right no-web" onClick={handleServices}>
              Servicios
            </button>
            <button className="btn-menu-right" onClick={handleEditProfile}>
              Editar Perfil
            </button>
            {auth.users.type_account===2 ? 
            <Link className="btn-menu-right" to="/publicaciones-agente">Mis publicaciones</Link>
            :
            <Link className="btn-menu-right" to="/solicitud-agente">Quiero ser agente</Link>
            }
            <button className="btn-menu-right" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUserRight;
