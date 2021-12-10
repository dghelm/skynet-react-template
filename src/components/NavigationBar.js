import { Container, Menu, Icon, Rail } from "semantic-ui-react";
import { NavLink, useLocation } from "react-router-dom";
import MySkyButton from "./MySkyButton";
import MessageDisplay from "./MessageDisplay";

const NavMenuItem = ({ title, route, currentRoute }) => {
  const active = currentRoute === `/${route}`;
  return (
    <Menu.Item as={active ? null : NavLink} to={route} active={active}>
      {title}
    </Menu.Item>
  );
};

const NavigationBar = () => {
  const location = useLocation();

  return (
    <Container>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Icon circular inverted color="teal" name="gem" />
            Very Cool Skapp
          </Menu.Item>
          <NavMenuItem
            title="Home"
            route="home"
            currentRoute={location.pathname}
          />
          <NavMenuItem
            title="Todo"
            route="todo"
            currentRoute={location.pathname}
          />
          <NavMenuItem
            title="Upload"
            route="upload"
            currentRoute={location.pathname}
          />
          <NavMenuItem
            title="Library"
            route="library"
            currentRoute={location.pathname}
          />
          <NavMenuItem
            title="Recently Played"
            route="recently-played"
            currentRoute={location.pathname}
          />
          <NavMenuItem
            title="Deploy"
            route="deploy"
            currentRoute={location.pathname}
          />
          <NavMenuItem
            title="Profile"
            route="profile"
            currentRoute={location.pathname}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <MySkyButton />
            </Menu.Item>
          </Menu.Menu>
        </Container>
        <MessageDisplay />
      </Menu>
    </Container>
  );
};

export default NavigationBar;
