import React from "react";
import HeaderBackground from "../../HeaderBackground/HeaderBackground";
import HeaderTitle from "../../HeaderTitle/HeaderTitle";
import classes from "./NavBar.module.scss";

const NavBar = ({ isAuth, setIsAuth, onChangeThemeHandler }) => {
    return (
        <div className={classes.NavBar}>
            <main>
                <div className={classes.Header}>
                    <HeaderBackground />
                    <div className={classes.HeaderWrapper}>
                        <div className={classes.HeaderTitleWrapper}>
                            <HeaderTitle 
                                isAuth={isAuth} 
                                setIsAuth={setIsAuth}
                                onChangeThemeHandler={onChangeThemeHandler} 
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default NavBar