import { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Container,
  Grid,
  CssBaseline,
} from "@mui/material";
import Winner from "./Winner";

export default function InGame() {
  const [game, setGame] = useState({});
  const [gameId, setGameId] = useState(0);
  const [player, setPlayer] = useState({});
  const [username, setUsername] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [winner, setWinner] = useState();

  useEffect(() => {
    const fetchId = async () => {
      const getPlayer = await fetch("http://localhost:5000/game/userinfo", {
        credentials: "include",
      });

      let response = await getPlayer.json();
      setGameId(response.gameId);
      setPlayer(response);
    };
    fetchId();

    const fetchInterval = setInterval(fetchGames, 3000);
    return () => clearInterval(fetchInterval);
  }, [gameId]);

  const fetchGames = async () => {
    if (gameId !== 0 && loaded === false) {
      const data = await fetch("http://localhost:5000/game/" + gameId, {
        credentials: "include",
      });
      let body = await data.json();
      setGame(body);
      setLoaded(true);
      if (game.isDone) {
        await fetch("http://localhost:5000/game/players/" + game.winner);
        let playerWhoWon = await data.json();
        setWinner(playerWhoWon.username);
      }
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch("http://localhost:5000/game/winner/" + gameId, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      let user = await response.json();
      console.log(user.username)
      setWinner(user.username);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid container marginTop={30}>
        <Grid item>{(!loaded || !game?.isActive) && <CircularProgress />}</Grid>
        <Grid item>
          <Box sx={{ display: "flex" }}>
            {loaded && game?.isActive && (
              <Card>
                <CardContent>
                  <Typography variant="h3">THE GAME IS UNDERWAY...</Typography>
                </CardContent>
              </Card>
            )}
            {loaded &&
              player.id === game?.host &&
              winner === undefined &&
              game?.isActive && (
                <Card>
                  <CardContent>
                    <Typography variant="h3">Report Winner...</Typography>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="username"
                      name="username"
                      autoFocus
                      onChange={handleUsername}
                    />
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </CardActions>
                </Card>
              )}
          </Box>
        </Grid>
        <Grid item>{game.isDone === true && <Winner winner={winner} />}</Grid>
      </Grid>
    </Container>
  );
}
