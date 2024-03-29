import React, { useState } from 'react';
import classes from './SignUp.module.scss';
import Input from './../../components/UI/Input/Input';
import validator from 'validator';
import TodosService from '../../api/TodosService';

const SignUp = () => {
    const [register, setRegister] = useState(() => {
        return {
            username: '',
            email: '',
            password1: '',
            password2: ''
        }
    })
    const [error, setError] = useState('')

    const changeValueRegister = event => {
        event.persist()
        setError('')
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            } 
        })
        console.log('register', register)
    }

    const submitRegisterHandler = async (event) => {
        event.preventDefault()

        if (register.username === '' || register.email === '' || 
            register.password1 === '' || register.password2 === '') {
                setError('Please enter all data')
        } else if (!validator.isEmail(register.email)) {
            setError('Please enter correct email')
        } else if (register.password1 !== register.password2) {
            setError('Repeated password incorrectlyl')
        } else if (!validator.isStrongPassword(register.password1, {minSymbols: 0})) {
            setError('Password must consist of one lowercase, uppercase letter and number, at least 8 characters')
        } else {
            const objNewUser = {
                name: register.username, 
                email: register.email, 
                password: register.password1
            }
            await TodosService.postCreateUsers(objNewUser)
            const status = Number(window.localStorage.getItem('status'))
            if (status !== 200) {
                setError('This user is already registered')
            }
        }

        console.log('register', register)
    }

    return (
        <div className={classes.SignUp}>
            <h1 className={classes.Title}>Sign Up</h1>
            <form onSubmit={submitRegisterHandler} className={classes.FormSignUp}>      
                <Input 
                    className={classes.Input} 
                    type="username" 
                    placeholder="Enter name" 
                    name="username"
                    value={register.username}
                    onChange={changeValueRegister}
                />
                <Input 
                    className={classes.Input} 
                    type="email" 
                    placeholder="Enter email" 
                    name="email"
                    value={register.email}
                    onChange={changeValueRegister}
                />
                <Input 
                    className={classes.Input} 
                    type="password" 
                    placeholder="Enter password"
                    name="password1"
                    value={register.password1}
                    onChange={changeValueRegister} 
                />
                <Input 
                    className={classes.Input} 
                    type="password" 
                    placeholder="Enter password" 
                    name="password2"
                    value={register.password2}
                    onChange={changeValueRegister}
                />
                <span className={classes.Error}>{error}</span>
                <input type="submit" value="Sign Up" className={classes.Button} />
            </form>
        </div>
    )
}

export default SignUp