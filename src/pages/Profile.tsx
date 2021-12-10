import { useContext, useState, useEffect } from "react";
import { Header, Container } from "semantic-ui-react";
import { SkynetContext } from "../state/SkynetContext";
import { useStoreState } from "easy-peasy";

const Profile = () => {
  const { userProfile } = useContext(SkynetContext);
  const { loggedIn, userID } = useStoreState((store) => store.mySky);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log("start userprofile");
    userProfile.getProfile(userID).then((profile) => {
      setProfile(profile);

      console.log(profile);
      console.log("end userprofile");
    });

    userProfile.getPreferences(userID).then((prefs) => {
      console.log("prefs:", prefs);
    });

    // userProfile
    //   .setProfile({
    //     version: 1,
    //     username: 'dghelm',
    //     aboutMe: 'Developer Evangelist | Skynet Labs',
    //     location: 'OKC, OK, USA',
    //   })
    //   .then(() => {
    //     console.log('profileSet');
    //   });
  }, [userID]);

  return (
    <>
      <Container text style={{ marginTop: "7em" }}>
        <Header as="h2">Profile</Header>
        <Header as="h3">getProfile</Header>
      </Container>
    </>
  );
};

export default Profile;
