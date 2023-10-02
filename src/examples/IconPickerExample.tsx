import { Avatar, Box } from "@mui/joy";
import { Popper } from "@mui/material";
import { Icon } from "@src/shared/components/Icon/Icon";
import { IconPicker } from "@src/shared/components/IconPicker/IconPicker";
import React from "react";

export const IconPickerExample = () => {
  const [iconName, setIconName] = React.useState("doughnut");
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  const handleIconSelect = (code: string) => {
    setOpen(false);
    setIconName(code);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Avatar ref={ref} onClick={handleClick}>
        <Icon iconName={iconName} />
      </Avatar>
      <Popper anchorEl={ref.current} placement="left-start" open={open}>
        <Box width={"300px"} height={"300px"}>
          <IconPicker onSelect={handleIconSelect} showSearch={false} />
        </Box>
      </Popper>
    </>
  );
};
