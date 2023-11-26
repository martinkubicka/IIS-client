import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, FormHelperText } from "@mui/joy";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { IconButton, Input, InputAdornment } from "@mui/material";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import { loginService } from "@src/services/loginService";
import { Page } from "@src/shared/components/Page";
import style from "@src/shared/components/PageHeader/PageHeader.module.css";
import { NewPasswordModel } from "@src/shared/models/NewPasswordModel";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const materialTheme = materialExtendTheme();

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [validForm, setValidForm] = useState<boolean>(true);
  const [validPassword, setValidPassword] = useState<boolean>(true);
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
    const token = urlParams.get("token");

    if (token !== null) {
      const resetModel: NewPasswordModel = {
        token: token,
        password: password,
      };

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

        await loginService.newPassword(resetModel);

        localStorage.setItem(
          "snackbarData",
          JSON.stringify({
            message: "Password updated successfully.",
            variant: "success",
            duration: 2000,
            fontFamily: "Arial",
          })
        );

        navigate("/login");
      } catch (error) {
        enqueueSnackbar("Token not valid.", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          autoHideDuration: 2000,
          style: {
            fontFamily: "Arial",
          },
        });
      }
    }
  };

  const handleSecondPasswordChange = (pswd: string) => {
    setSecondPassword(pswd);
    if (password !== pswd) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  };

  const handlePasswordChange = (pswd: string) => {
    if (
      pswd.length >= 8 &&
      /[A-Z]/.test(pswd) &&
      /\d/.test(pswd) &&
      /[^A-Za-z0-9]/.test(pswd) &&
      pswd?.trim() !== ""
    ) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }

    setPassword(pswd);
    if (secondPassword !== pswd) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  };

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
            width: "25%",
          }}
        >
          <MaterialCssVarsProvider
            theme={{ [MATERIAL_THEME_ID]: materialTheme }}
          >
            <JoyCssVarsProvider>
              <h2 className={style.PageHeaderNoPadding}>Reset password</h2>
              <h4 className={style.PageHeaderNoPadding}>New password</h4>

              <FormControl error={!validPassword}>
                <Input
                  error={!validPassword}
                  type={showPassword ? "text" : "password"}
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
                {!validPassword && (
                  <FormHelperText>
                    Password must be at least 8 characters long, contain at
                    least one uppercase letter, one number, and one special
                    character.
                  </FormHelperText>
                )}
              </FormControl>

              <h4 className={style.PageHeaderNoPadding}>Confirm password</h4>
              <FormControl error={!validForm}>
                <Input
                  error={!validForm}
                  type={showSecondPassword ? "text" : "password"}
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
                        {showSecondPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {!validForm && (
                  <FormHelperText>Passwords do not match.</FormHelperText>
                )}
              </FormControl>

              <Button
                sx={{ float: "right", marginTop: "20px" }}
                onClick={reset}
                disabled={!validForm || password == "" || secondPassword == ""}
              >
                Reset
              </Button>
            </JoyCssVarsProvider>
          </MaterialCssVarsProvider>
        </div>
      </Box>
    </Page>
  );
};
