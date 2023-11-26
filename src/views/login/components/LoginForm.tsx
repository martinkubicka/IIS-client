import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  Link,
  Typography,
} from "@mui/joy";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { IconButton, Input, InputAdornment } from "@mui/material";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import { loginService } from "@src/services/loginService";
import { LoginModel } from "@src/shared/models/LoginModel";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

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

  const singin = async (e: any) => {
    const loginModel: LoginModel = {
      email: name,
      password: password,
    };

    e.preventDefault();

    try {
      enqueueSnackbar("Loading..", {
        variant: "info",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 2000,
        style: {
          fontFamily: "Arial",
        },
      });

      await loginService.login(loginModel);

      localStorage.setItem(
        "snackbarData",
        JSON.stringify({
          message: "Login successful.",
          variant: "success",
          duration: 2000,
          fontFamily: "Arial",
        })
      );

      navigate("/");
    } catch (error) {
      setValidForm(false);
    }
  };

  return (
    <div>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <form onSubmit={singin}>
            <h2>Sign in</h2>
            <h4>Email</h4>
            <FormControl error={!validForm}>
              <Input
                error={!validForm}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>

            <h4>Password</h4>
            <FormControl error={!validForm}>
              <Input
                error={!validForm}
                type={showPassword ? "text" : "password"}
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
              {!validForm && (
                <FormHelperText>Invalid email or password.</FormHelperText>
              )}
            </FormControl>

            <Typography align="right" sx={{ paddingTop: "10px" }}>
              <Link level="title-sm" onClick={handleOpenForgotModal}>
                Forgot your password?
              </Link>
            </Typography>

            <Button sx={{ float: "right", marginTop: "20px" }} type="submit">
              Sign in
            </Button>
            <ForgotPassword
              open={openForgotModal}
              onClose={handleCloseForgotModal}
            />
          </form>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </div>
  );
};
