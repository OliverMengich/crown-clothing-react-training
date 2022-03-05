import React from "react";
import './sign-up.styles.css';

import FormInput from "../form-input/form-input.component";

import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class Signup extends React.Component{
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    handleSubmit = async event=>{
        event.preventDefault();
        const {displayName, email,password,confirmPassword} = this.state;
        if(password !== confirmPassword ){
            alert('Passwords do not match');
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user, {displayName})
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.error(error);
        }
    }
    handleChange = event =>{
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }
    render(){
        const {displayName, email,password,confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign Up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput type="text" 
                                name="displayName"
                                onChange = {this.handleChange }
                                label = 'Display Name'
                                required
                                value={displayName}>
                    </FormInput>
                    <FormInput type="email" 
                                name="email"
                                onChange = {this.handleChange }
                                label = 'Email'
                                required
                                value={email}>
                    </FormInput>
                    <FormInput type="password" 
                                name="password"
                                onChange = {this.handleChange }
                                label = 'Password'
                                required
                                value={password}>
                    </FormInput>
                    <FormInput type="password" 
                                name="confirmPassword"
                                onChange = {this.handleChange }
                                label = 'Confirm Password'
                                required
                                value={confirmPassword}>
                    </FormInput>
                    <CustomButton type='submit'>REGISTER</CustomButton>
                </form>
            </div>
        )
    }
}
export default Signup;