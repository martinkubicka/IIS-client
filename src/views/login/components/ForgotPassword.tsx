import { useState, useEffect } from 'react';
import { Button, FormControl, FormLabel, Input, Divider, Modal, FormHelperText, ModalDialog, Box, DialogTitle, Stack, Textarea } from '@mui/joy';
import { loginService } from '@src/services/loginService';
import { enqueueSnackbar } from 'notistack';

export default function ForgotPassword({open, onClose}) {
  const [email, setName] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(true);

  useEffect(() => {
    handleFieldChange();
  }, [email]);


  const handleFieldChange = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email?.trim() === '' || emailPattern.test(email) === false) {
        setValidEmail(false);
    } else {
        setValidEmail(true);
    }
  };

  const onSubmit = async (email: string) => {
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

        await loginService.forgot(email);

        enqueueSnackbar("Email with reset password link sent.", {
            variant: 'success',
            anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
            },
            autoHideDuration: 2000,
            style: {
                fontFamily: 'Arial',
            },
        });

        onClose();

    } catch (error) {
        enqueueSnackbar("User with entered email does not exists.", {
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

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog size="lg">
        <DialogTitle>Forgot password</DialogTitle>
        <Divider />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(email);
          }}
        >
          <Stack spacing={2}>
            <FormControl error={!validEmail}>
              <FormLabel>Email</FormLabel>
              <Input
                autoFocus
                required
                value={email}
                onChange={(e) => setName(e.target.value)}
                error={!validEmail}
                sx={{minWidth: "320px"}}
              />
              {!validEmail && <FormHelperText>Email must be in right format!</FormHelperText>}
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Button size="lg" color='neutral' onClick={onClose}>Cancel</Button>
                <Button size="lg" type="submit" disabled={!validEmail}>Reset password</Button>
            </Box>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
