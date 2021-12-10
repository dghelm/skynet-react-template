import { Segment, Icon, Container, Progress } from "semantic-ui-react";
import bytes from "bytes";

const UploadElement: React.FC<{
  file: File;
  status: string;
  error: string;
  url: string;
  progress: number;
}> = ({ file, status, error, url = "", progress = 0 }) => {
  console.log("this is file", file);

  return (
    <Segment>
      <div className="flex items-center">
        {status === "uploading" && <Icon loading name="circle notch" />}
        {status === "processing" && <Icon loading name="spinner" />}
        {status === "complete" && <Icon name="check circle" />}
        {status === "error" && <Icon name="delete" />}
        <div>
          <div>{file.name}</div>
          <div>
            <div>
              {status === "uploading" && (
                <span className="tabular-nums">
                  Uploading {bytes(file.size * progress)} of {bytes(file.size)}
                </span>
              )}

              {status === "processing" && (
                <span className="text-palette-300">Processing...</span>
              )}
              {status === "complete" && <Icon name="check circle" />}

              {status === "error" && error && (
                <span className="text-error">{error}</span>
              )}
            </div>
            <div>
              {status === "uploading" && (
                <span className="uppercase tabular-nums">
                  {Math.floor(progress * 100)}%
                  <span className="hidden desktop:inline"> completed</span>
                </span>
              )}
              {status === "processing" && (
                <span className="uppercase text-palette-300">Wait</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Container>
        {status !== "processing" &&
          status !== "error" &&
          status !== "complete" && (
            <Progress size="tiny" percent={Math.floor(progress * 100)} />
          )}
      </Container>
    </Segment>
  );
};

export default UploadElement;
