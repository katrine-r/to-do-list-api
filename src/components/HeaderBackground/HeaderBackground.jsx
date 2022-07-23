import React, { useContext } from "react";
import classes from "./HeaderBackground.module.scss";
import architecture from "../../images/architecture-g4668b87fd_500.jpg"
import mountains from "../../images/pexels-tom-nagel-3878622_1920_500.jpg"
import { ChangeThemeContext } from "../../context";

const HeaderBackground = () => {

  const { changeTheme } = useContext(ChangeThemeContext)

  return (
    <div className={classes.HeaderBackground}>
      { changeTheme === "dark"
        ? <img src={architecture} alt="architecture" />
        : <img src={mountains} alt="mountains" />
      }
      <div className={classes.HeaderGradient}>
      </div>
    </div>
  );
};

export default HeaderBackground;
