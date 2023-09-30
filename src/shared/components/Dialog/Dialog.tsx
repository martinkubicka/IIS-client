import * as React from 'react';
import {Button, Divider, DialogTitle, DialogContent, DialogActions, Modal, ModalDialog} from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={onConfirm}>
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
