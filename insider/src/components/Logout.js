import * as React from 'react';
import {Button , Box, Container} from '@mui/material'
import { useNavigate } from 'react-router-dom'


export default function SignOut() {

  const navigate = useNavigate()

  const handleSubmit = async () => {  
      await fetch('http://localhost:5000/logout', {
              method: 'POST',
              credentials: 'include'
            })
      navigate('/login')
    }

 return (
      <Container component="main" maxWidth="xs">
          <Box component="form" sx={{ mt: 1 }}>
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Out
            </Button>
           </ Box>
      </Container>
 )
}