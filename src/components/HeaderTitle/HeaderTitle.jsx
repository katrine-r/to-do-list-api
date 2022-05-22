import React, { useContext } from 'react'
import classes from './HeaderTitle.module.scss'
import './HeaderTitle.scss'
import { SVGiconsSelector } from '../UI/SVGiconsSelector/SVGiconsSelector'
import Button from '../UI/Button/Button'
import { ChangeThemeContext } from '../../context'
import { NavLink, useNavigate } from 'react-router-dom'

const HeaderTitle = ({ 
  isAuth, 
  setIsAuth, 
  onChangeThemeHandler 
}) => {

  const {changeTheme} = useContext(ChangeThemeContext)
  const navigate = useNavigate()
  const clickSignOutHandler = () => {
      setIsAuth(false)
      navigate('/signin')
      localStorage.removeItem("isAuth")
  }

  return (
    <div className={classes.HeaderTitle}>
      <div>
        <h1 className={classes.Title}>ToDo</h1>
      </div>
      <nav>
        { isAuth 
        ? <>
            <NavLink to="/">To Do List</NavLink>
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
              ? <SVGiconsSelector id="sunny" />
              : <SVGiconsSelector id="moon" />
          }
        </Button>
      </div>
    </div>
  )
}

export default HeaderTitle
