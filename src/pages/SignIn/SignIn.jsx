import React from "react";
import classes from "./SignIn.module.scss";
import Input from "./../../components/UI/Input/Input"
import Button from "./../../components/UI/Button/Button"
import { useNavigate } from "react-router-dom";

const SignIn = ({setIsAuth}) => {
    const navigate = useNavigate()
    const clickAuthHandler = () => {
        setIsAuth(true)
        navigate('/')
        localStorage.setItem("isAuth", true)
    }

    return (
        <div className={classes.SignIn}>
            <h1 className={classes.Title}>Sign In</h1>
            <form className={classes.FormSignIn}>      
                <Input className={classes.Input} type="text" placeholder="Enter email" />
                <Input className={classes.Input} type="text" placeholder="Enter password" />
                <Button className={classes.Button} onClick={clickAuthHandler}>Sign In</Button>
            </form>
        </div>
    )
}

export default SignIn