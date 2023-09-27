import { IconButton, ListItem, Avatar, ColorPaletteProp } from "@mui/joy";
import emojiname from "emoji-name-map";
import { Link } from "react-router-dom";

export interface NavbarItemProps {
  name: string;
  icon?: React.ReactNode;
  avatar?: string;
  color?: ColorPaletteProp;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  name,
  icon,
  avatar,
  color,
}: NavbarItemProps) => {
  return (
    <ListItem key={name}>
      <Link to={"/" + name}>
        {icon && (
          <IconButton color={color ? color : "neutral"} size="lg">
            {icon}
          </IconButton>
        )}
        {avatar && (
          <Avatar variant="outlined" size="lg">
            {emojiname.get(avatar)}
          </Avatar>
        )}
      </Link>
    </ListItem>
  );
};
