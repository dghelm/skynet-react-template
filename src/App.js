import { Container, Header } from 'semantic-ui-react';
import NavigationBar from './components/NavigationBar';
import { Home, Todo, Upload, Library, RecentlyPlayed } from './pages';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { SkynetProvider } from './state/SkynetContext';
import { StoreProvider } from 'easy-peasy';
import { store } from './state/store';

const App = () => {
  return (
    <SkynetProvider>
      <StoreProvider store={store}>
        <Router>
          <NavigationBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route path="/todo">
                <Todo />
              </Route>
              <Route path="/upload">
                <Upload />
              </Route>
              <Route path="/library">
                <Library />
              </Route>
              <Route path="/recently-played">
                <RecentlyPlayed />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </Router>
      </StoreProvider>
    </SkynetProvider>
  );
};

export default App;
