import { Container, Header, Rail } from "semantic-ui-react";
import NavigationBar from "./components/NavigationBar";
import MessageDisplay from "./components/MessageDisplay";
import { Home, Todo, Upload, Deploy, Profile } from "./pages";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { SkynetProvider } from "./state/SkynetContext";
import { StoreProvider } from "easy-peasy";
import { store } from "./state/store";

const App = () => {
  return (
    <SkynetProvider>
      <StoreProvider store={store}>
        <Router>
          <NavigationBar />
          <Container>
            <MessageDisplay />
            <Switch>
              <Route path="/todo">
                <Todo />
              </Route>
              <Route path="/upload">
                <Upload />
              </Route>
              <Route path="/deploy">
                <Deploy />
              </Route>
              <Route path="/profile">
                <Profile />
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
