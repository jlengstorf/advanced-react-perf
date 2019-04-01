import React, { useContext } from 'react';
import Layout from '../layout/layout';
import { useUser } from '../../context/user';
import ShameBox from '../images/shame-box.svg';

import './login.scss';
import { navigate } from '@reach/router';

const Login = () => {
  const { login } = useUser();

  return (
    <Layout>
      <main className="login">
        <ShameBox className="shame-box-illustration" alt="Box of Shame." />
        <section className="login-box">
          <h1 className="login-heading">Log in. Share the shame.</h1>
          <p>
            We’ve all been there. We take a shortcut, hit a weird edge case, or
            run into some code that’s just not going to cooperate, and then it
            happens: we ask our principles to avert their eyes and write some
            truly appalling code.
          </p>
          <p>
            To make the shame easier to bear, we’ve created a safe space where
            we can all post the hot garbage we write from time to time in the
            name of getting shit done.
          </p>
          <p>Sign in. Share your shame. Unburden your soul.</p>
          <button
            onClick={() => {
              login({
                name: 'theshamewizard',
                avatar:
                  'https://pbs.twimg.com/profile_images/1050180826753847296/Oy__CCJ0_400x400.jpg'
              });
              navigate('/');
            }}
            className="login-big-button"
          >
            Log In
          </button>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
