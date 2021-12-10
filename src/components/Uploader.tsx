import bytes from "bytes";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import React, { useContext, useState, useEffect } from "react";
import path from "path-browserify";
import { useDropzone } from "react-dropzone";
import { SkynetContext } from "../state/SkynetContext";

import { Container, Header, Icon, Segment } from "semantic-ui-react";
import UploadElement from "./UploadElement";

const getFilePath = (file: { webkitRelativePath: any; path: any; name: any }) =>
  file.webkitRelativePath || file.path || file.name;

const getRelativeFilePath = (file: any) => {
  const filePath = getFilePath(file);
  const { root, dir, base } = path.parse(filePath);
  const relative = path
    .normalize(dir)
    .slice(root.length)
    .split(path.sep)
    .slice(1);

  return path.join(...relative, base);
};

const getRootDirectory = (file: any) => {
  const filePath = getFilePath(file);
  const { root, dir } = path.parse(filePath);

  return path.normalize(dir).slice(root.length).split(path.sep)[0];
};

const createUploadErrorMessage = (error: any) => {
  // The request was made and the server responded with a status code that falls out of the range of 2xx
  if (error.response) {
    if (error.response.data.message) {
      return `Upload failed with error: ${error.response.data.message}`;
    }

    const statusCode = error.response.status;
    const statusText = getReasonPhrase(error.response.status);

    return `Upload failed, our server received your request but failed with status code: ${statusCode} ${statusText}`;
  }

  // The request was made but no response was received. The best we can do is detect whether browser is online.
  // This will be triggered mostly if the server is offline or misconfigured and doesn't respond to valid request.
  if (error.request) {
    if (!navigator.onLine) {
      return "You are offline, please connect to the internet and try again";
    }

    // TODO: We should add a note "our team has been notified" and have some kind of notification with this error.
    return "Server failed to respond to your request, please try again later.";
  }

  // TODO: We should add a note "our team has been notified" and have some kind of notification with this error.
  return `Critical error, please refresh the application and try again. ${error.message}`;
};

const Uploader = ({ uploadMode }: { uploadMode: string }) => {
  const { client } = useContext(SkynetContext);
  const [mode] = useState<string>(uploadMode ? uploadMode : "file");
  const [files, setFiles] = useState<File[] | any[]>([]);

  const handleDrop = async (acceptedFiles: any[]) => {
    if (mode === "directory" && acceptedFiles.length) {
      const rootDir = getRootDirectory(acceptedFiles[0]); // get the file path from the first file

      acceptedFiles = [
        { name: rootDir, directory: true, files: acceptedFiles },
      ];
    }

    setFiles((previousFiles) => [
      ...acceptedFiles.map((file: any) => ({ file, status: "uploading" })),
      ...previousFiles,
    ]);

    const onFileStateChange = (
      file: any,
      state: { status?: string; progress?: any; error?: string; url?: string }
    ) => {
      setFiles((previousFiles) => {
        const index = previousFiles.findIndex((f) => f.file === file);

        return [
          ...previousFiles.slice(0, index),
          {
            ...previousFiles[index],
            ...state,
          },
          ...previousFiles.slice(index + 1),
        ];
      });
    };

    acceptedFiles.forEach((file: File) => {
      const onUploadProgress = (progress: number) => {
        const status = progress === 1 ? "processing" : "uploading";

        onFileStateChange(file, { status, progress });
      };

      // Reject files larger than our hard limit of 1 GB with proper message
      if (file.size > bytes("1 GB")) {
        onFileStateChange(file, {
          status: "error",
          error: "This file size exceeds the maximum allowed size of 1 GB.",
        });

        return;
      }

      async function upload(): Promise<any> {
        try {
          let response;
          // TODO: FIX THIS
          //  @ts-ignore
          if (file.directory) {
            // @ts-ignore
            const directory = file.files.reduce(
              (acc: any, file: any) => ({
                ...acc,
                [getRelativeFilePath(file)]: file,
              }),
              {}
            );
            if (client) {
              response = await client.uploadDirectory(
                directory,
                encodeURIComponent(file.name),
                { onUploadProgress }
              );
            }
          } else {
            if (client) {
              response = await client.uploadFile(file, { onUploadProgress });
              const url = await client.getSkylinkUrl(response.skylink, {
                subdomain: mode === "directory",
              });

              onFileStateChange(file, { status: "complete", url });
            }
          }
        } catch (error: any) {
          if (error?.response?.status === StatusCodes.TOO_MANY_REQUESTS) {
            onFileStateChange(file, { progress: -1 });

            return new Promise((resolve) =>
              setTimeout(() => resolve(upload()), 3000)
            );
          }

          onFileStateChange(file, {
            status: "error",
            error: createUploadErrorMessage(error),
          });
        }
      }

      upload();
    });
  };

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop: handleDrop,
  });
  const inputElement = inputRef.current;

  useEffect(() => {
    if (!inputElement) return;
    if (mode === "directory")
      inputElement.setAttribute("webkitdirectory", "true");
    if (mode === "file") inputElement.removeAttribute("webkitdirectory");
  }, [inputElement, mode]);

  return (
    <Container>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Container textAlign="center">
          <Segment stacked>
            <Header as="h3">
              <Icon name="add" size="large" />
              {mode === "file" &&
                "Add or drop your files here to pin to Skynet"}
              {mode === "directory" &&
                "Add or drop your build folder here to deploy to Skynet"}
            </Header>
          </Segment>
        </Container>
      </div>

      {files.length > 0 && (
        <Segment.Group>
          {files.map((file, index) => (
            <UploadElement key={index} {...file} />
          ))}
        </Segment.Group>
      )}
    </Container>
  );
};

export default Uploader;
