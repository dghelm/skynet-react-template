import { createContext, useState, useEffect, ReactNode } from "react";
import { MySky, SkynetClient } from "skynet-js";
// import { FileSystemDAC } from "fs-dac-library";

// To import DAC, uncomment here, and 2 spots below.
// import { ContentRecordDAC } from '@skynetlabs/content-record-library';
import { UserProfileDAC } from "@skynethub/userprofile-library";
import { Provider } from "react";

interface ISkynetContext {
  client?: SkynetClient;
  mySky?: MySky;
  userProfile?: UserProfileDAC;
  dataDomain?: string;
}

const SkynetContext = createContext<ISkynetContext>({});

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal =
  window.location.hostname === "localhost" ? "https://siasky.net" : undefined;

// Initiate the SkynetClient
const client = new SkynetClient(portal);

// For now, we won't use any DACs -- uncomment to create
// const contentRecord = new ContentRecordDAC();
// const contentRecord = null;

const userProfile = new UserProfileDAC();
// const fileSystem = new FileSystemDAC();

const dataDomain =
  window.location.hostname === "localhost"
    ? "localhost"
    : "AQDRh7aTcPoRFWp6zbsMEA1an7iZx22DBhV_LVbyPPwzzA";

const SkynetProvider = ({ children }: { children: ReactNode }) => {
  const [skynetState, setSkynetState] = useState<ISkynetContext>({
    client,
    mySky: undefined,
    userProfile,
    // fileSystem,
    dataDomain,
  });

  useEffect(() => {
    // define async setup function
    async function initMySky() {
      try {
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain, {
          debug: true,
          // dev: true,
        });

        // load necessary DACs and permissions
        // Uncomment line below to load DACs
        // await mySky.loadDacs(contentRecord);
        // await mySky.loadDacs(userProfile);

        // await mySky.loadDacs(fileSystem);

        // replace mySky in state object
        setSkynetState({ ...skynetState, mySky });
      } catch (e) {
        console.error(e);
      }
    }

    // call async setup function
    if (!skynetState.mySky) {
      initMySky();
    }

    return () => {
      if (skynetState.mySky) {
        skynetState.mySky.destroy();
      }
    };
  }, [skynetState]);

  return (
    <SkynetContext.Provider value={skynetState}>
      {children}
    </SkynetContext.Provider>
  );
};

export { SkynetContext, SkynetProvider };
