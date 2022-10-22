import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };


    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (

        <div className="login">
            <div className="hero is-info is-medium">
                <div className="hero-body has-text-centered">
                    <h1 className="title">Login</h1>
                    <p>Sign into your Acount</p>
                </div>
            </div>
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4 is-offset-4" >
                            <form onSubmit={e => onSubmit(e)}>
                                <div className="field">
                                    <label>Email</label>
                                    <div className="control">
                                        <input type="email"
                                            className="input"
                                            placeholder="Email"
                                            name="email"
                                            value={email}
                                            onChange={e => onChange(e)}
                                            required />
                                    </div>
                                </div>
                                <div className="field">
                                    <label>Password</label>
                                    <div className="control">
                                        <input type="passsword"
                                            className="input"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={e => onChange(e)}
                                            minLength='6'
                                            required />
                                    </div>
                                </div>
                                {/* <div className="notification is-danger"
                                    >
                                        <p>
                                            {{ error }}
                                        </p>
                                    </div> */}
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-dark">Log In</button>
                                    </div>
                                </div>

                            </form>
                            <hr />
                            <p className="mt-3">
                                Don't have an account
                                <Link to="/signup"> Click here </Link> to signup
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);

