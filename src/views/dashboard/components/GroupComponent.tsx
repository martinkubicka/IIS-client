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
import { groupService } from "@src/services/groupService";

interface CardProps {
  handle: string;
  UserEmail: string;
  imageSrc: string;
  avatarSrcList: string[];
  title: string;
  description: string;
  buttonText: string;
  showButtonJoin: boolean;
}

const GroupComponent: React.FC<CardProps> = ({
  handle,
  UserEmail,
  imageSrc,
  avatarSrcList,
  title,
  description,
  buttonText,
  showButtonJoin,
}) => {
  const handleClick = () => {
    if (buttonText === "Join") {
      //todo should I add async?
      console.log("Joining group");
      console.log(handle);
      console.log(UserEmail);
      groupService.joinGroup(handle, UserEmail);
    } else {
      console.log("Leaving group");
      console.log(handle);
      console.log(UserEmail);
      groupService.leaveGroup(handle, UserEmail);
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
        <Button onClick={handleClick} variant="solid" color="primary">
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default GroupComponent;
