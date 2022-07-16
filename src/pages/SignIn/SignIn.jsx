import React, { useState } from "react";
import classes from "./SignIn.module.scss";
import Input from "./../../components/UI/Input/Input";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import TodosService from "../../api/TodosService";

const SignIn = ({ setIsAuth }) => {
    const navigate = useNavigate()

    const [authorization, setAuthorization] = useState(() => {
        return {
            email: '',
            password: ''
        }
    })

    const changeValueAuthorization = event => {
        event.persist()
        setAuthorization(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            } 
        })
        console.log('authorization', authorization)
    }

    const submitAuthHandler = async (event) => {
        event.preventDefault()

        if (!validator.isEmail(authorization.email)) {
            alert("Please enter correct email")
        } else if (!validator.isStrongPassword(authorization.password, {minSymbols: 0})) {
            alert("Password must consist of one lowercase, uppercase letter and number, at least 8 characters")
        } else {
            const objUser = {email: authorization.email, password: authorization.password}
            await TodosService.postLoginUser(objUser)
        }

        setIsAuth(true)
        navigate('/')
        localStorage.setItem("isAuth", true)
    }

    return (
        <div className={classes.SignIn}>
            <h1 className={classes.Title}>Sign In</h1>
            <form onSubmit={submitAuthHandler} className={classes.FormSignIn}>      
                <Input 
                    className={classes.Input} 
                    type="email" 
                    placeholder="Enter email" 
                    name="email"
                    value={authorization.email}
                    onChange={changeValueAuthorization}
                />
                <Input 
                    className={classes.Input} 
                    type="password" 
                    placeholder="Enter password" 
                    name="password"
                    value={authorization.password1}
                    onChange={changeValueAuthorization}
                />
                <input type="submit" value="Sign In" className={classes.Button} />
            </form>
        </div>
    )
}

export default SignIn