import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../services/api'
import {getId} from '../../services/auth'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Perfil() {
  const classes = useStyles();

    const [nome, setNome] = useState("")
    const [CPF, setCPF] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")

    useEffect(() => {
      setId(getId())
     
    }, [])
     
   
    async function atualiza(){
      try {
        
        const data = {
          username: nome,
          CPF: CPF,
          email: email,
          id: id
        }
        console.log(data)
        const response = await api.put("/update",data)
        window.alert('Perfil atualizada')
       
            }
        catch(err){
          console.log(err)
        }
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <div style={{width:50, height:50}}>
        <img              
               src="https://mindconsulting.com.br/wp-content/uploads/2020/01/bear-png.png"
               alt="MdLockLogin App"
            />
        </div>
        <Typography component="h1" variant="h5">
          Informações Pessoais
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Nome"
            label="Nome"
            name="Nome"
            autoComplete="Nome"
            autoFocus
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="CPF"
            label="CPF"
            name="CPF"
            autoComplete="CPF"
            autoFocus
            value={CPF} 
            onChange={e => setCPF(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          
        </form>
      </div>

      
      <Button
            onClick={()=>{ 
              atualiza()
            }}
            type="submit"
            fullWidth
            variant="outlined"
            color="disable"
            className={classes.submit}
          >
             Salvar Alterações
          </Button>
     
    </Container>
  );
}