import React from 'react';

const Login = (props) => {

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <div>
            Login
            <form onSubmit={onSubmit}>
                <label>Username:</label>
                <input type="text" name="username"/>
                <label>Password:</label>
                <input type="text" name="password"/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Login