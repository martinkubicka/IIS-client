import * as React from 'react';
import {Button, Divider, DialogTitle, DialogContent, DialogActions, Modal, ModalDialog, Input, FormHelperText} from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
  textConfirm?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  textConfirm = ''
}) => {

  

  const [confirmValue, setConfirmValue] = React.useState('');
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>{content}</DialogContent>
        {textConfirm && <><Input onChange={(event) => setConfirmValue(event.target.value)} value={confirmValue}/><FormHelperText>Insert group name to confirm deletion</FormHelperText></>}
        <DialogActions>
          <Button disabled={textConfirm != '' && confirmValue !== textConfirm} variant="solid" color="danger" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default Dialog;
