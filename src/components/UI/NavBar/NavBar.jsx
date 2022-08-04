import React from 'react';
import HeaderBackground from '../../HeaderBackground/HeaderBackground';
import HeaderTitle from '../../HeaderTitle/HeaderTitle';
import classes from './NavBar.module.scss';

const NavBar = ({ setIsAuth, onChangeThemeHandler }) => {
    return (
        <div className={classes.NavBar}>
            <div className={classes.Header}>
                <HeaderBackground />
                <div className={classes.HeaderWrapper}>
                    <div className={classes.HeaderTitleWrapper}>
                        <HeaderTitle 
                            setIsAuth={setIsAuth}
                            onChangeThemeHandler={onChangeThemeHandler} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar