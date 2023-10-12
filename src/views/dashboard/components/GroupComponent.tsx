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
  avatarSrcList: string[];
  title: string;
  description: string;
  buttonText: string;
  showButtonJoin: boolean;
  name: string;
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
  name,
}) => {
  const handleClick = () => {
    if (buttonText === "Join") {
      //TODO should I add async?
      console.log("Joining group");
      console.log(handle);
      console.log(UserEmail);
      console.log(name);
      memberService.addMember(handle, UserEmail, 1, name);
    } else {
      console.log("Leaving group");
      console.log(handle);
      console.log(UserEmail);
      memberService.deleteMember(UserEmail, handle);
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
