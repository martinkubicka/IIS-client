import { FormControl, FormHelperText, Link, Typography, Button } from '@mui/joy';
import { useState } from "react";
import {
    Input,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
experimental_extendTheme as materialExtendTheme,
Experimental_CssVarsProvider as MaterialCssVarsProvider,
THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import ForgotPassword from './ForgotPassword';
import { loginService } from '@src/services/loginService';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { LoginModel } from '@src/shared/models/LoginModel';

const materialTheme = materialExtendTheme();

export const LoginForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [validForm, setValidForm] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [openForgotModal, setOpenForgotModal] = useState(false);
    const navigate = useNavigate();
  
    const handlePasswordVisibilityToggle = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleOpenForgotModal = () => {
        setOpenForgotModal(true);
    };

    const handleCloseForgotModal = () => {
        setOpenForgotModal(false);
    };

    const singin = async () => {
        const loginModel: LoginModel = {
            email: name,
            password: password
        }

        try {
        enqueueSnackbar("Loading..", {
            variant: 'info',
            anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
            },
            autoHideDuration: 2000,
            style: {
                fontFamily: 'Arial',
            },
        });

        await loginService.login(loginModel);

        localStorage.setItem('snackbarData', JSON.stringify({
            message: "Login successful.",
            variant: 'success',
            duration: 2000,
            fontFamily: 'Arial',
          }));

          navigate('/');
    } catch (error) {
        setValidForm(false);
    }   
}

    return (
        <div>
        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
            <JoyCssVarsProvider>
           <h2>Sign in</h2>
           <h4>Email</h4>
            <FormControl error={!validForm}>
            <Input error={!validForm} value={name} onChange={(e) => {setName(e.target.value);}}/>
            </FormControl>

            <h4>Password</h4>
      <FormControl error={!validForm}>
        <Input
          error={!validForm}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={handlePasswordVisibilityToggle}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {!validForm && <FormHelperText>Invalid email or password.</FormHelperText>}
      </FormControl>
            
            <Typography align='right' sx={{paddingTop: "10px"}}>
                <Link level="title-sm" onClick={handleOpenForgotModal}>
                        Forgot your password?
                </Link>
            </Typography>

            <Button sx={{float: "right", marginTop: "20px"}} onClick={singin}>Sign in</Button>
            <ForgotPassword open={openForgotModal} onClose={handleCloseForgotModal}/>
            </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
        </div>
    );
};
