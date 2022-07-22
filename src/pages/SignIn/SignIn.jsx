import React, { useState } from 'react';
import classes from './SignIn.module.scss';
import Input from './../../components/UI/Input/Input';
import { useNavigate } from 'react-router-dom';
import TodosService from '../../api/TodosService';

const SignIn = ({ setIsAuth }) => {
    const navigate = useNavigate()

    const [authorization, setAuthorization] = useState(() => {
        return {
            email: '',
            password: ''
        }
    })
    const [error, setError] = useState('')

    const changeValueAuthorization = event => {
        event.persist()
        setError('')
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

        const objUser = {email: authorization.email, password: authorization.password}
        await TodosService.postLoginUser(objUser)
        setError('')

        const status = Number(window.localStorage.getItem('status'))
        console.log('status number', status)

        if (status === 200) {
            window.localStorage.setItem('isAuth', true)
            setIsAuth(window.localStorage.getItem('isAuth'))
            setError('')
            navigate('/')
        } else {
            window.localStorage.setItem('isAuth', false)
            setIsAuth(window.localStorage.getItem('isAuth'))
            setError('Please enter correct email or password')
            navigate('/signin')
        }
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
                <span className={classes.Error}>{error}</span>
                <input type="submit" value="Sign In" className={classes.Button} />
            </form>
        </div>
    )
}

export default SignIn