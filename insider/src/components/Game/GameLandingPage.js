import Games from "./Games";
import { Grid } from "@mui/material";
import SignOut from "../Logout";

const GameLandingPage = () => {
  return (
    <div>
      <Grid container spacing={2} marginTop={30}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Games />
        </Grid>
      </Grid>
      <SignOut />
    </div>
  );
};

export default GameLandingPage;
