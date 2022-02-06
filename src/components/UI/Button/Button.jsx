import React from 'react'
import classes from './Button.module.scss'

const Button = (props) => {

    const {children, ...restProps} = props;

    return (
        <button className={classes.Button} {...restProps}>
            { children }
        </button> 
    )
}

export default Button
