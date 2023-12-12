/**
 * @file Icon.tsx
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of Icon component
 */

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
        ? nameMap.get("rocket")
        : nameMap.get(iconName)}
    </Typography>
  );
};
