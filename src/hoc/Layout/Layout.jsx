import React from "react";
import classes from "./Layout.module.scss";
import HeaderBackground from "../../components/HeaderBackground/HeaderBackground"
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle'

const Layout = ({ onChangeThemeHandler, children }) => {

  return (
    <div className={classes.Layout}>
      <main>
        <div className={classes.Header}>
          <HeaderBackground />
          <div className={classes.HeaderWrapper}>
            <div className={classes.HeaderTitleWrapper}>
              <HeaderTitle onChangeThemeHandler={onChangeThemeHandler} />
            </div>
            { children }
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
