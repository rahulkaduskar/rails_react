import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Component } from 'react';

import Header from './container/header';
import Footer from './container/footer';
import UserLogin from './components/front/users/login';
import UserProfile from './components/front/users/profile';
import Dashboard from './components/front/users/dashboard';
import UserSignup from './components/front/users/signup';
import PostsIndex from './components/front/posts/index';
import PostNew from './components/front/posts/new';
import PostShow from './components/front/posts/show';

import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from 'react-cookie-consent';

export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Header></Header>
                <div className='row m-0 p-3'>
                    <Switch >
                        <Route path='/user/login' component={UserLogin}/>
                        <Route path='/user/profile' component={UserProfile}/>
                        <Route path='/user/signup' component={UserSignup}/>
                        <Route path='/user/posts/new' component={PostNew}/>
                        <Route path='/user/posts/:id' component={PostShow}/>
                        <Route path='/user/posts' component={PostsIndex}/>
                        <Route path='/' component={Dashboard}/>
                    </Switch> 
                    <div className="clearfix"></div>
                </div>
                <Footer></Footer>
                <CookieConsent>
                    This website uses cookies to enhance the user experience.
                </CookieConsent>
            </ErrorBoundary>
        </BrowserRouter>
    );
  }
}
