import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Fader from 'react-fader';
import TransitionSwitch from 'react-router-transition-switch';
import Header from './Header'
import Home from './Home'
import Detail from './Detail';
import CreatePost from './CreatePost'
import BestPosts from './BestPosts';
import Find from './Find';
import Contact from './Contact';

class App extends Component {

  render() {
    return (
      <div className="app-container">
        <Router>
          <Header></Header>
          <TransitionSwitch component={Fader}>
            {/*<Route exact path='/' render={(props) => <PostList {...props} postList={this.state.posts} />} /> */}
            <Route exact path='/' component={Home} />
            <Route exact path='/post/:postId' component={Detail} />
            <Route exact path='/create' component={CreatePost} />
            <Route path='/best' component={BestPosts} />
            <Route path='/find' component={Find} />
            <Route path='/contact' component={Contact} />
          </TransitionSwitch>
        </Router>
      </div>
    );
  }
}

export default App;