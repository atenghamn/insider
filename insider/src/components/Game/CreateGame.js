import { Button, Card, Typography } from "@mui/material";

const CreateGame = ({ setGames }) => {
  const handleSave = async () => {
    await fetch("http://localhost:5000/game", {
      method: "POST",
      credentials: "include",
    });
    const data = await fetch("http://localhost:5000/game/", {
      credentials: "include",
    });
    let body = await data.json();
    setGames(body);
  };

  return (
    <Card variant="contained">
      <Typography variant="h5" component="div">
        New Game
      </Typography>
      <Button
        variant="outlined"
        color="success"
        size="small"
        onClick={handleSave}
      >
        CREATE
      </Button>
    </Card>
  );
};

export default CreateGame;
