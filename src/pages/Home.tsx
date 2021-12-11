import { NavLink } from "react-router-dom";
import { Header, Container, Button, Icon, Segment } from "semantic-ui-react";

const HomepageHeading = ({ mobile }: { mobile: boolean }): JSX.Element => (
  <Container text>
    <Header
      as="h1"
      content="Imagine a Template"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="That solved your todo list needs."
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
        marginBottom: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button color="green" size="huge" as={NavLink} to="todo">
      Get Started
      <Icon name="arrow up" />
    </Button>
  </Container>
);

const Home = () => {
  return (
    <Segment
      inverted
      color="grey"
      textAlign="center"
      style={{ minHeight: 700, padding: "1em 0em" }}
      vertical
    >
      {/* @ts-ignore */}
      <HomepageHeading />
      {/* // <Container text>
    //   <Header>Home</Header>
    // </Container> */}
    </Segment>
  );
};

export default Home;
