import React, { useContext } from "react"
import classes from "./HeaderTitle.module.scss"
import "./HeaderTitle.scss"
import Button from "../UI/Button/Button"
import { ChangeThemeContext } from "../../context"
import { NavLink, useNavigate } from "react-router-dom"
import SunnyIcon from "../../icons/SunnyIcon"
import MoonIcon from "../../icons/MoonIcon"
import TodosService from "../../api/TodosService"
import { useFetching } from "../../hooks/useFetching"
import { useDispatch } from "react-redux"
import { activeList, getMyToDoList } from "../../store/actions/myToDo"

const HeaderTitle = ({ setIsAuth, onChangeThemeHandler }) => {

  const { changeTheme } = useContext(ChangeThemeContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = window.localStorage.getItem('tokenAccess')
  const status = Number(window.localStorage.getItem('status'))

  const [fetching, isLoading, error] = useFetching(async () => {
    const myToDo = await TodosService.getTodos();
    const status = Number(window.localStorage.getItem('status'))
    console.log('status number', status)
    dispatch(getMyToDoList(myToDo));
    dispatch(activeList("all"));
    if (status === 200) {
      navigate('/')
    } else {
      navigate('/signin')
    }
  });  

  const clickHomeToDoHandler = () => {
    fetching()
  }
  
  const clickSignOutHandler = () => {
      setIsAuth(false)
      window.localStorage.setItem('isAuth', false)
      navigate('/signin')
      window.localStorage.removeItem('status')
      window.localStorage.removeItem('tokenType')
      window.localStorage.removeItem('tokenAccess')
  }

  return (
    <div className={classes.HeaderTitle}>
      <div>
        <NavLink to="/" className={classes.Title}>
          <span onClick={clickHomeToDoHandler}>ToDo</span>
          </NavLink>
      </div>
      <nav>
        { token && status === 200 ?
          <>
            <NavLink to="/">
              <span onClick={clickHomeToDoHandler}>To Do</span>
            </NavLink>
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
