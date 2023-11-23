import { Box, Divider, Stack, Typography } from "@mui/joy";
import { threadHeaderStyle } from "./styles/style";

interface ThreadHeaderProps {
  name: string;
  description?: string;
}

export const ThreadHeader = ({ name, description = "" }: ThreadHeaderProps) => {
  return (
    <Box sx={threadHeaderStyle}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box padding={2}>
          <Typography level="h1">{`#${name}`}</Typography>
          <Typography level="body-lg">{description}</Typography>
        </Box>
      </Stack>

      <Divider />
    </Box>
  );
};
