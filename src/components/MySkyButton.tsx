import { useEffect, useContext, useState } from "react";
import { Button, Icon, Loader } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";
import { SkynetContext } from "../state/SkynetContext";

const MySkyButton = () => {
  const { mySky } = useContext(SkynetContext);

  // const [loggedIn, setLoggedIn] = useState(false); //This will get moved to global state.
  const [loading, setLoading] = useState(true); //This will get moved to global state.
  const { fetchUserID, logout } = useStoreActions((state) => state.mySky);
  const { loggedIn } = useStoreState((state) => state.mySky);

  useEffect(() => {
    // if we have MySky loaded
    setLoading(true);
    if (mySky) {
      mySky.checkLogin().then((result: any) => {
        if (result) {
          fetchUserID({ mySky });
        }
        setLoading(false);
      });
    }
  }, [mySky]);

  const onLogin = () => {
    setLoading(true);
    if (mySky) {
      mySky.requestLoginAccess().then((result: any) => {
        if (result) {
          fetchUserID({ mySky });
        }
        setLoading(false);
      });
    }
  };

  const onLogout = () => {
    if (mySky) {
      logout({ mySky });
    }
  };

  return (
    <>
      {loading && (
        <Button color="green" size="medium">
          <Loader inverted active inline="centered" size="tiny" />
        </Button>
      )}
      {!loading && !loggedIn && (
        <Button onClick={onLogin} color="green" size="medium">
          <Icon name="user" /> MySky Log In
        </Button>
      )}
      {!loading && loggedIn && (
        <Button onClick={onLogout} color="green" size="medium">
          <Icon name="user" /> Log Out
        </Button>
      )}
    </>
  );
};

export default MySkyButton;
