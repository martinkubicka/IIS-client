/**
 * @file RegisterForm.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of register form component
 */

import { ClickAwayListener, Popper } from "@mui/base";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, FormControl, FormHelperText } from "@mui/joy";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { IconButton, Input, InputAdornment } from "@mui/material";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import { loginService } from "@src/services/loginService";
import { Icon } from "@src/shared/components/Icon/Icon";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import { UserDetailModel } from "@src/shared/models/UserDetailModel";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";

const materialTheme = materialExtendTheme();

interface RegisterFormProps {
  setTabIndex: (value: number) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ setTabIndex }) => {
  const [password, setPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("doughnut");
  const [email, setEmail] = useState("");
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [validEmail, setValidEmail] = useState<boolean>(true);
  const [validName, setValidName] = useState<boolean>(true);
  const [validHandle, setValidHandle] = useState<boolean>(true);
  const [validHandleExists, setValidHandleExists] = useState<boolean>(true);
  const [validEmailExists, setValidEmailExists] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const register = async (e: any) => {
    const registerModel: UserDetailModel = {
      handle: handle,
      name: name,
      icon: icon,
      role: 1,
      email: email,
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

      await loginService.register(registerModel);

      enqueueSnackbar("Registration successful.", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        autoHideDuration: 2000,
        style: {
          fontFamily: "Arial",
        },
      });
      setTabIndex(0);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.data.includes("Email")) {
          enqueueSnackbar("User with email already exists.", {
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
          setValidEmailExists(false);
        } else {
          enqueueSnackbar("User with handle already exists.", {
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
          setValidHandleExists(false);
        }
      }
    }
  };
  useEffect(() => {
    handleFieldChange();
  }, [password, name]);

  useEffect(() => {
    setValidEmailExists(true);
    handleFieldChange();
  }, [email]);

  useEffect(() => {
    setValidHandleExists(true);
    handleFieldChange();
  }, [handle]);

  const handleFieldChange = () => {
    if (
      password?.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password?.trim() !== ""
    ) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }

    if (name?.trim() === "") {
      setValidName(false);
    } else {
      setValidName(true);
    }

    if (handle?.trim() === "") {
      setValidHandle(false);
    } else {
      setValidHandle(true);
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email?.trim() === "" || emailPattern.test(email) === false) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const handleIconSelect = (code: string) => {
    setOpen(false);
    setIcon(code);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <form onSubmit={register}>
            <h2>Register</h2>

            <h4>Icon</h4>
            <Avatar ref={ref} onClick={handleClick}>
              <Icon iconName={icon} />
            </Avatar>
            <Popper anchorEl={ref.current} placement="left-start" open={open}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box width={"300px"} height={"300px"}>
                  <IconPicker onSelect={handleIconSelect} />
                </Box>
              </ClickAwayListener>
            </Popper>

            <h4>Email</h4>
            <FormControl error={!validEmail || !validEmailExists}>
              <Input
                error={!validEmail || !validEmailExists}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {!validEmail && (
                <FormHelperText>
                  Email cannot be empty or contains only whitespaces and have to
                  be in right format.
                </FormHelperText>
              )}
              {!validEmailExists && (
                <FormHelperText>User with email already exists.</FormHelperText>
              )}
            </FormControl>

            <h4>Handle</h4>
            <FormControl error={!validHandle || !validHandleExists}>
              <Input
                error={!validHandle || !validHandleExists}
                value={handle}
                onChange={(e) => {
                  e.target.value = e.target.value.slice(0, 50);
                  setHandle(e.target.value);
                }}
              />
              {!validHandle && (
                <FormHelperText>
                  Handle cannot be empty or contains only whitespaces.
                </FormHelperText>
              )}
              {!validHandleExists && (
                <FormHelperText>
                  User with handle already exists.
                </FormHelperText>
              )}
            </FormControl>

            <h4>Name</h4>
            <FormControl error={!validName}>
              <Input
                error={!validName}
                value={name}
                onChange={(e) => {
                  e.target.value = e.target.value.slice(0, 50);
                  setName(e.target.value);
                }}
              />
              {!validName && (
                <FormHelperText>
                  Name cannot be empty or contains only whitespaces.
                </FormHelperText>
              )}
            </FormControl>

            <h4>Password</h4>
            <FormControl error={!validPassword}>
              <Input
                error={!validPassword}
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
              {!validPassword && (
                <FormHelperText>
                  Password must be at least 8 characters long, contain at least
                  one uppercase letter, one number, and one special character.
                </FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              sx={{ float: "right", marginTop: "20px" }}
              disabled={
                !validPassword ||
                !validHandle ||
                !validName ||
                !validEmail ||
                !validEmailExists ||
                !validHandleExists
              }
            >
              Register
            </Button>
          </form>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </div>
  );
};
