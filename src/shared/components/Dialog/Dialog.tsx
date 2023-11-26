import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Input,
  Modal,
  ModalDialog,
} from "@mui/joy";
import * as React from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm: () => void;
  textConfirm?: string;
  textUnderConfirm?: string;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  textConfirm = "",
  textUnderConfirm = "Insert group name to confirm deletion",
}) => {
  const [confirmValue, setConfirmValue] = React.useState("");
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>{content}</DialogContent>
        {textConfirm && (
          <>
            <Input
              onChange={(event) => setConfirmValue(event.target.value)}
              value={confirmValue}
            />
            <FormHelperText>{textUnderConfirm}</FormHelperText>
          </>
        )}
        <DialogActions>
          <Button
            disabled={textConfirm != "" && confirmValue !== textConfirm}
            variant="solid"
            color="danger"
            onClick={onConfirm}
          >
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
