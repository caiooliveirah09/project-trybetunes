import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import Header from './components/Header';
import validateForm from './components/validateForm';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      logged: false,
    };
  }

  onInputChange = (event) => {
    const name = event.target.value;
    this.setState({ name }, () => {
      this.setState({ buttonDisabled: validateForm(name) });
    });
  }

  saveUser = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState(
      { loading: true },
      async () => {
        await createUser({ name });
        this.setState({ name: '', loading: false, logged: true });
      },
    );
  }

  render() {
    const { buttonDisabled, name, loading, logged } = this.state;
    console.log(logged);
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              buttonDisabled={ buttonDisabled }
              onInputChange={ this.onInputChange }
              saveUser={ this.saveUser }
              name={ name }
              loading={ loading }
              logged={ logged }
            />) }
          />
          <Route
            path="/search"
            render={ (props) => (<Search
              { ...props }
              logged={ logged }
            />) }
          />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
