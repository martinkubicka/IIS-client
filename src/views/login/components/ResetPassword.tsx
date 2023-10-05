import { Page } from "@src/shared/components/Page";
import { FormControl, FormHelperText, Button, Box} from '@mui/joy';
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
import { loginService } from '@src/services/loginService';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NewPasswordModel } from "@src/shared/models/NewPasswordModel";
import style from "@src/shared/components/PageHeader/PageHeader.module.css";

const materialTheme = materialExtendTheme();

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [validForm, setValidForm] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);
    const navigate = useNavigate();
  
    const handlePasswordVisibilityToggle = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSecondPasswordVisibilityToggle = () => {
        setShowSecondPassword((prevShowPassword) => !prevShowPassword);
      };

    const reset = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token !== null) {
            const resetModel: NewPasswordModel = {
              token: token,
              password: password
            };

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

            await loginService.newPassword(resetModel);

            localStorage.setItem('snackbarData', JSON.stringify({
                message: "Password updated successfully.",
                variant: 'success',
                duration: 2000,
                fontFamily: 'Arial',
            }));

            navigate('/login');
        } catch (error) {
            enqueueSnackbar("Token not valid.", {
                variant: 'error',
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                autoHideDuration: 2000,
                style: {
                    fontFamily: 'Arial',
                },
            });
        }   
    }
}

    const handleSecondPasswordChange = (pswd: string) => {
        setSecondPassword(pswd);
        if (password !== pswd) {
            setValidForm(false);
        } else {
            setValidForm(true);
        }
    }

    const handlePasswordChange = (pswd: string) => {
        setPassword(pswd);
        if (secondPassword !== pswd) {
            setValidForm(false);
        } else {
            setValidForm(true);
        }
    }

    return (
        <Page>
             <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                >
            <div
                style={{
                width: '25%',   
                }}
            >


        <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
            <JoyCssVarsProvider>
           
            <h2 className={style.PageHeaderNoPadding}>Reset password</h2>
            <h4 className={style.PageHeaderNoPadding}>New password</h4>
           
        <FormControl>
           <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
                handlePasswordChange(e.target.value);
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
        </FormControl>

            <h4 className={style.PageHeaderNoPadding}>Confirm password</h4>
      <FormControl error={!validForm}>
        <Input
          error={!validForm}
          type={showSecondPassword ? 'text' : 'password'}
          value={secondPassword}
          onChange={(e) => {
            handleSecondPasswordChange(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={handleSecondPasswordVisibilityToggle}
                edge="end"
              >
                {showSecondPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {!validForm && <FormHelperText>Passwords do not match.</FormHelperText>}
      </FormControl>
            
            <Button sx={{float: "right", marginTop: "20px"}} onClick={reset} disabled={!validForm || password == "" || secondPassword == ""}>Reset</Button>
            </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
        </div>
        </Box>
        </Page>
    );
};
