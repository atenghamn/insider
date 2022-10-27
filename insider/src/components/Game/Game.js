import { Button, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Game = ({ game, setGames }) => {
  const navigate = useNavigate();

  const joinGame = async () => {
    const result = await fetch("http://localhost:5000/game/" + game.id, {
      method: "PUT",
      credentials: "include",
    });
    console.log(result.status);
    navigate("/game/" + game.id);
  };

  const deleteGame = async () => {
    await fetch("http://localhost:5000/game/" + game.id, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await fetch("http://localhost:5000/game/", {
      credentials: "include",
    });
    let body = await data.json();
    setGames(body);
  };

  const startGame = async () => {
    const response = await fetch(
      "http://localhost:5000/game/start/" + game.id,
      {
        credentials: "include",
      }
    );

    console.log(response);

    switch (response.status) {
      case 100:
        console.log("Wait for more players");
        break;

      case 200:
        console.log("wilcommen");
        navigate("/game/id");
        break;

      default:
        console.log("Not authorized");
    }
  };

  return (
    <Stack margin={2}>
      <Card variant="outlined">
        <h1>Game id: {game.id}</h1>
        <p>Started by: {game.host}</p>
        <p>Number of players: {game.numberOfPlayer}</p>
        <Button color="primary" onClick={joinGame}>
          JOIN
        </Button>
        <Button color="success" onClick={startGame}>
          START
        </Button>
        <Button color="error" onClick={deleteGame}>
          DELETE
        </Button>
      </Card>
    </Stack>
  );
};

export default Game;
