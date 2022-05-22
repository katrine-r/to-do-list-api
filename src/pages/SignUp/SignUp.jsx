import React from "react";
import classes from "./SignUp.module.scss";
import Input from "./../../components/UI/Input/Input"
import Button from "./../../components/UI/Button/Button"

const SignUp = () => {
    return (
        <div className={classes.SignUp}>
            <h1 className={classes.Title}>Sign Up</h1>
            <form className={classes.FormSignUp}>      
                <Input className={classes.Input} type="text" placeholder="Enter name" />
                <Input className={classes.Input} type="text" placeholder="Enter email" />
                <Input className={classes.Input} type="text" placeholder="Enter password" />
                <Button className={classes.Button}>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp