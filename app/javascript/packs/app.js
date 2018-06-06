import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Component } from 'react';

import Header from './container/header';
import Footer from './container/footer';
import UserLogin from './components/front/users/login';
import UserProfile from './components/front/users/profile';
import Dashboard from './components/front/users/dashboard';
import UserSignup from './components/front/users/signup';

import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from 'react-cookie-consent';

export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Header></Header>
                <div className='container'>
                    <Switch >
                        <Route path='/user/profile' component={UserProfile}/>
                        <Route path='/user/signup' component={UserSignup}/>
                        <Route path='/user/login' component={UserLogin}/>
                        <Route path='/' component={Dashboard}/>
                    </Switch> 
                    <Footer></Footer>
                    <CookieConsent>
                        This website uses cookies to enhance the user experience.
                    </CookieConsent>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    );
  }
}
