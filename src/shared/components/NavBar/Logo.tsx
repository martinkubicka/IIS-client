/**
 * @file Logo.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of social network logo component
 */

import PublicIcon from "@mui/icons-material/Public";
import AspectRatio, { AspectRatioProps } from "@mui/joy/AspectRatio";

export default function Logo({ sx, ...props }: AspectRatioProps) {
  return (
    <AspectRatio
      ratio="1"
      variant="plain"
      {...props}
      sx={[
        {
          width: 36,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 36 32"
          fill="none"
        >
          <PublicIcon style={{ color: "3f50b5" }} />
        </svg>
      </div>
    </AspectRatio>
  );
}
