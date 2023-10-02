import { Button, Grid, Input, Stack, Tooltip } from "@mui/joy";
import { Box } from "@mui/material";
import { SearchOffRounded, SearchRounded } from "@mui/icons-material";
import { IconWrapper } from "./IconWrapper";
import { allEmojis, emojisMap } from "@src/assets/emojis";
import React from "react";

interface IconPickerProps {
  /* Allow searching icons inside iconPicker */
  showSearch?: boolean;
  /* Callback after an icon is selected */
  onSelect: (code: string) => void;
}

export const IconPicker = ({
  showSearch = true,
  onSelect,
}: IconPickerProps) => {
  const [currentEmojis, setCurrentEmojis] = React.useState(allEmojis);

  const handleSearch = (value: string) => {
    if (value == "") {
      setCurrentEmojis(allEmojis);
    } else {
      setCurrentEmojis(allEmojis.filter((element) => element.includes(value)));
    }
  };

  return (
    <Stack height={"100%"} width={"100%"} direction={"column"}>
      {showSearch && (
        <Input
          placeholder="Search for an emoji"
          onChange={(event) => handleSearch(event.target.value)}
          startDecorator={<SearchRounded />}
        />
      )}
      <Grid overflow={"scroll"} height={"100%"} width={"100%"} container>
        <Grid xs={12}>
          {currentEmojis.map((code: string) => (
            <Button onClick={() => onSelect(code)} variant="plain" key={code}>
              {emojisMap.get(code)}
            </Button>
          ))}
        </Grid>
      </Grid>
    </Stack>
  );
};
