import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import { searchService } from "@src/services/searchService";
import { Thread } from "@src/shared/components/Threads";
import User from "@src/shared/components/User/User";
import { UserProfileModel } from "@src/shared/models/UserProfileModel";
import React from "react";
import { useMutation, useQuery } from "react-query";

interface ResultsProps {
  searchTerm?: string;
  typeFilter?: "all" | "groups" | "threads" | "users";
}

export const UserResults = ({
  searchTerm = "",
  typeFilter = "all",
}: ResultsProps) => {
  const [limit, setLimit] = React.useState(5);
  const [showMore, setShowMore] = React.useState(false);
  const {
    data: userData,
    refetch: searchAgain,
    isLoading,
  } = useQuery(
    "userSearch",
    async (): Promise<UserProfileModel[] | undefined> => {
      const data = await searchService.searchUsers(searchTerm, limit);
      return data;
    }
  );

  React.useEffect(() => {
    setLimit(5);
    searchAgain();
  }, [searchTerm]);

  React.useEffect(() => {
    searchAgain();
  }, [limit]);

  const handleShowMore = () => {
    setLimit(showMore ? 5 : 30);
    setShowMore((prev) => !prev);
  };

  return (
    <Stack alignItems={{ xs: "center", md: "unset" }} width={"100%"}>
      <>
        {isLoading && <CircularProgress />}
        {userData && userData.length > 0 && (
          <>
            <Divider sx={{ width: "100%" }}>
              <Typography color="neutral" level={"h3"}>
                Users
              </Typography>
            </Divider>

            <Grid
              wrap="wrap"
              marginTop={2}
              spacing={{ xs: 2, md: 3 }}
              width={{ xs: "min-content", md: "auto" }}
              container
            >
              {userData.map((user) => {
                return (
                  <Grid display={"flex"} justifyContent={"center"}>
                    <User {...user} />
                  </Grid>
                );
              })}
            </Grid>
            <Stack
              height={"80px"}
              width={"100%"}
              direction={"row"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Button
                onClick={handleShowMore}
                variant="plain"
                sx={{ width: "130px", padding: 2 }}
              >
                {showMore ? "Show less" : "Show more"}
              </Button>
            </Stack>
          </>
        )}
      </>
    </Stack>
  );
};
