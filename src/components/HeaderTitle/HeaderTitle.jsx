import React, { useContext } from "react"
import classes from "./HeaderTitle.module.scss"
import "./HeaderTitle.scss"
import Button from "../UI/Button/Button"
import { ChangeThemeContext } from "../../context"
import { NavLink, useNavigate } from "react-router-dom"
import SunnyIcon from "../../icons/SunnyIcon"
import MoonIcon from "../../icons/MoonIcon"

const HeaderTitle = ({ setIsAuth, onChangeThemeHandler }) => {

  const { changeTheme } = useContext(ChangeThemeContext)
  const navigate = useNavigate()
  const clickSignOutHandler = () => {
      setIsAuth(false)
      navigate('/signin')
      localStorage.removeItem('isAuth')
      localStorage.removeItem('status')
      localStorage.removeItem('tokenType')
      localStorage.removeItem('tokenAccess')
  }

  const token = window.localStorage.getItem('tokenAccess')
  const status = Number(window.localStorage.getItem('status'))

  return (
    <div className={classes.HeaderTitle}>
      <div>
        <NavLink to="/" className={classes.Title}>ToDo</NavLink>
      </div>
      <nav>
        { token && status === 200 ?
          <>
            <NavLink to="/">To Do</NavLink>
            <span className={classes.SignOut} onClick={clickSignOutHandler}>Sign Out</span>
          </>
        : <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink> 
          </>
        }
      </nav>
      <div>
        <Button 
          className={classes.Button} 
          onClick={() => onChangeThemeHandler(changeTheme)}
        >
          { changeTheme === "dark" 
              ? <SunnyIcon />
              : <MoonIcon />
          }
        </Button>
      </div>
    </div>
  )
}

export default HeaderTitle
