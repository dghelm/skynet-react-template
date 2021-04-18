import { Container, Menu, Icon } from 'semantic-ui-react';
import { NavLink, useLocation } from 'react-router-dom';
import MySkyButton from './MySkyButton';

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
        <Menu.Menu position="right">
          <Menu.Item>
            <MySkyButton />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default NavigationBar;
