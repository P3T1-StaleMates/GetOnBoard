import React, { useState } from 'react';
import { Link, /*useNavigate*/ } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import '../styles/login.css';
import Auth from '../utils/auth';

const Login = (props) => {
  // const navigate = useNavigate();

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      console.log(data)

      setFormState({
        email: '',
        password: '',
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }


    // navigate('/Dashboard', { replace: true });

    // clear form values

  };

  return (
    <div className="padding-40">
    <main className="flex-row p-3 mb-4">
        <div className="padding-40">
       <h1> Welcome to Get On Board!</h1>
        <br />
        <h2>Log in and Get On Board!</h2>
        </div>
       <div className='padding-bottom-40'>
      <div className="col-8 center pb-4 col-lg-8">
        <div className="card  height border-none">
          <h4 className="p-2 text-center">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/dashboard">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                /><br></br>
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                /><br></br>
                <button
                  className="btn-green btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>

   </div>
   <div className='col-6 center '>
        <p>Don't Have an account? Click <Link to="/Signup">here</Link> to Sign up</p>
        </div>
    </main>
   </div>
  );
};

export default Login;
