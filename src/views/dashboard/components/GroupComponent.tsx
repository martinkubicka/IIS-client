import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/joy";
import { Icon } from "@src/shared/components/Icon/Icon";
import { Link } from "react-router-dom";

interface CardProps {
  handle: string;
  imageSrc: string;
  avatarSrcList: string[];
  title: string;
  description: string;
  buttonText: string;
  showButtonJoin: boolean;
}

const GroupComponent: React.FC<CardProps> = ({
  handle,
  imageSrc,
  avatarSrcList,
  title,
  description,
  buttonText,
  showButtonJoin,
}) => {
  return (
    <Card variant="outlined" sx={{ width: 280 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar src={imageSrc} size="lg">
          {" "}
          <Icon iconName={imageSrc} />
        </Avatar>
        {/* <AvatarGroup size="sm" sx={{ "--Avatar-size": "28px" }}>
          {avatarSrcList.map((src, index) => (
            <Avatar key={index} src={src} />
          ))}
        </AvatarGroup> */}
      </Box>
      <CardContent>
        <Typography level="title-lg">{title}</Typography>
        <Typography level="body-sm">{description}</Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <Link to={`group/${handle}`} style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary">
            View
          </Button>
        </Link>
        {showButtonJoin && ( // Conditionally render the Button
          <Button variant="solid" color="primary">
            {buttonText}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default GroupComponent;
