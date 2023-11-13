import { Button, CircularProgress, Grid, Input, Stack } from "@mui/joy";

import { SearchRounded } from "@mui/icons-material";
import { allEmojis, emojisMap } from "@src/assets/emojis";
import React from "react";
import { iconPickerStyle } from "./style";

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
  const [currentEmojis, setCurrentEmojis] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setCurrentEmojis(allEmojis);
    setLoading(false);
  }, []);

  const handleSearch = (value: string) => {
    if (value == "") {
      setCurrentEmojis(allEmojis);
    } else {
      setCurrentEmojis(allEmojis.filter((element) => element.includes(value)));
    }
  };

  return (
    <Stack
      sx={iconPickerStyle}
      height={"100%"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
    >
      {showSearch && (
        <Input
          autoFocus
          fullWidth
          placeholder="Search for an emoji"
          onChange={(event) => handleSearch(event.target.value)}
          startDecorator={<SearchRounded />}
        />
      )}
      {loading ? (
        <CircularProgress variant="plain" />
      ) : (
        <Grid overflow={"scroll"} height={"100%"} width={"100%"} container>
          <Grid xs={12}>
            {currentEmojis.map((code: string) => (
              <Button
                size="lg"
                onClick={() => onSelect(code)}
                variant="plain"
                key={code}
              >
                {emojisMap.get(code)}
              </Button>
            ))}
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};
