import React from 'react';
import classes from './Layout.module.scss';
import NavBar from '../../components/UI/NavBar/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = ({ setIsAuth, onChangeThemeHandler }) => {

  return (
    <div className={classes.Layout}>
      <NavBar 
        setIsAuth={setIsAuth}
        onChangeThemeHandler={onChangeThemeHandler} 
      />
      <Outlet />
    </div>
  );
};

export default Layout;
