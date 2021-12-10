import { useEffect, useContext, useState } from "react";
import { Button, Icon, Loader } from "semantic-ui-react";
import { useStoreState, useStoreActions, useStore } from "easy-peasy";
import { SkynetContext } from "../state/SkynetContext";

const MySkyButton = () => {
  const { mySky } = useContext(SkynetContext);
  // const [loggedIn, setLoggedIn] = useState(false); //This will get moved to global state.
  const [loading, setLoading] = useState(true); //This will get moved to global state.
  const { fetchUserID, logout } = useStoreActions((state) => state.mySky);
  const { loggedIn } = useStoreState((state) => state.mySky);
  const { store } = useStore();

  useEffect(() => {
    // if we have MySky loaded
    setLoading(true);
    if (mySky) {
      mySky.checkLogin().then((result) => {
        if (result) {
          fetchUserID({ mySky });
        }
        setLoading(false);
      });
    }
  }, [mySky]);

  const onLogin = () => {
    setLoading(true);
    mySky.requestLoginAccess().then((result) => {
      if (result) {
        fetchUserID({ mySky });
      }
      setLoading(false);
    });
  };

  const onLogout = () => {
    logout({ mySky });
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
