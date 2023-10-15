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
import { memberService } from "@src/services/memberService";
interface CardProps {
  handle: string;
  UserEmail: string;
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  name: string;
  onAction: () => void; // Add the onAction prop
}

const GroupComponent: React.FC<CardProps> = ({
  handle,
  UserEmail,
  imageSrc,
  title,
  description,
  buttonText,
  name,
  onAction, // Destructure the onAction prop
}) => {
  const handleClick = () => {
    if (buttonText === "Join") {
      // Join action
      memberService.addMember(handle, UserEmail, 1, name).then(() => {
        onAction(); // Notify the parent component that an action has been taken
      });
    } else {
      // Leave action
      memberService.deleteMember(UserEmail, handle).then(() => {
        onAction(); // Notify the parent component that an action has been taken
      });
    }
  };

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
        <Button onClick={handleClick} variant="solid" color="primary">
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default GroupComponent;
