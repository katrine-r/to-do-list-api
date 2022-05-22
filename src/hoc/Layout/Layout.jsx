import React from "react";
import classes from "./Layout.module.scss";
import NavBar from "../../components/UI/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Layout = ({isAuth, setIsAuth, onChangeThemeHandler }) => {

  return (
    <div className={classes.Layout}>
      <NavBar 
        isAuth={isAuth} 
        setIsAuth={setIsAuth}
        onChangeThemeHandler={onChangeThemeHandler} 
      />
      <Outlet />
    </div>
  );
};

export default Layout;
