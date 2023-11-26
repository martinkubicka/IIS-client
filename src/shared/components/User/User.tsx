import { Avatar, Card, CardContent, Typography } from "@mui/joy";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";
import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon";

const User = ({ handle, name, icon }: UserProfileModel) => {
  return (
    <Card sx={{ width: "200px", height: "100px" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Link to={`/profile/${handle}`} style={{ textDecoration: "none" }}>
          <Avatar>
            <Icon iconName={icon} />
          </Avatar>
        </Link>
        <Link to={`/profile/${handle}`} style={{ textDecoration: "none" }}>
          <Typography level="title-lg">{name}</Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default User;
