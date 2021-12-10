import { Header, Container } from "semantic-ui-react";
import Uploader from "../components/Uploader";

const Upload = () => {
  return (
    <Container text style={{ marginTop: "7em" }}>
      <Header>Upload Your File</Header>
      <Uploader uploadMode="file" />
    </Container>
  );
};

export default Upload;
