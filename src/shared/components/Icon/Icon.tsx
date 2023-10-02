import { Typography } from "@mui/joy";
import nameMap from "emoji-name-map";

interface IconProps {
  iconName: string;
}

export const Icon = ({ iconName }: IconProps) => {
  return <Typography>{nameMap.get(iconName)}</Typography>;
};
