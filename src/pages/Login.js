import { Box, Button, Card, TextField } from '@mui/material';
import bgImage from '../assets/images/bg.jpg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const login = () => {
    navigate('/')
    fetch(`${process.env.REACT_APP_AUTHENTICATION_SERVICE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: email,
        password
      })
    }).then(res => res.json())
      .then(res => {
        if (res.status === 'error') {
          toast.error(res.message)
        } else {
          toast.success("Login successful!");
          localStorage.setItem("token", res.token)
          navigate('/home')
        }
      })
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <Card sx={{ width: 350, display: 'flex', flexDirection: 'column', padding: 2, gap: 2 }}>
        <h1>Login</h1>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          type="password"
          label="password"
          variant="outlined"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="contained" disableElevation onClick={login}>
          Login
        </Button>
        <Box textAlign="left" sx={{mb: 1}}>Don't have an account?<Link to='/sign-up'>Sign up</Link></Box>
      </Card>
    </Box>
  )
}

export default Login
