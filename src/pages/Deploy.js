import { Header, Container } from "semantic-ui-react";
import HNSList from "../components/HNSList";
import HNSForm from "../components/HNSForm";
import Uploader from "../components/Uploader";

const Deploy = () => {
  return (
    <>
      <Container text style={{ marginTop: "7em" }}>
        <Header>Upload Your File</Header>
        <Uploader uploadMode="directory" />
      </Container>
      <Container style={{ marginTop: "7em" }}>
        <HNSList />
        <HNSForm />
      </Container>
    </>
  );
};

export default Deploy;
