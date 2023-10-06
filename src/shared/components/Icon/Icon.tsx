import { Typography } from "@mui/joy";
import nameMap from "emoji-name-map";

interface IconProps {
  iconName?: string;
  size?: number;
}

export const Icon = ({ iconName, size = 18 }: IconProps) => {
  return (
    <Typography fontSize={size}>
      {!iconName || iconName === ""
        ? nameMap.get(iconName)
        : nameMap.get("rocket")}
    </Typography>
  );
};
