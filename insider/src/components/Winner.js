
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Grid,
  Container,
  CssBaseline
} from "@mui/material";


const Winner = ({ winner }) => {
const nav = useNavigate()

  const goBack = () => nav('/')
 
  return (
   
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
  
        <Grid container>
          <Grid item>
          <Card>
    <CardContent>
      <Typography variant="h5">And the winner is</Typography>
      <Typography variant="h1">{winner}</Typography>
     
    </CardContent>
    <CardActions>
      <Button size="small" onClick={goBack}>
        BACK
      </Button>
    </CardActions>
  </Card>
          </Grid>
        </Grid>
      </Box>
  </Container>

  );
};
export default Winner;
