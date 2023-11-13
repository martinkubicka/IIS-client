import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import { searchService } from "@src/services/searchService";
import { GroupModel } from "@src/shared/models/GroupModel";
import GroupComponent from "@src/views/dashboard/components/GroupComponent";
import React from "react";
import { useMutation, useQuery } from "react-query";

interface ResultsProps {
  searchTerm?: string;
}

export const GroupResults = ({ searchTerm = "" }: ResultsProps) => {
  const [limit, setLimit] = React.useState(5);
  const [showMore, setShowMore] = React.useState(false);
  const {
    data: groupData,
    refetch: searchAgain,
    isLoading,
  } = useQuery("groupSearch", async (): Promise<GroupModel[] | undefined> => {
    const data = await searchService.searchGroups(searchTerm, limit);
    return data;
  });

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
        {groupData && groupData.length > 0 && (
          <>
            <Divider sx={{ width: "100%" }}>
              <Typography color="neutral" level={"h3"}>
                Groups
              </Typography>
            </Divider>

            <Grid
              wrap="wrap"
              marginTop={2}
              spacing={{ xs: 2, md: 3 }}
              width={{ xs: "min-content", md: "auto" }}
              container
            >
              {groupData.map((group) => {
                return (
                  <Grid display={"flex"} justifyContent={"center"}>
                    <GroupComponent
                      imageSrc={group.icon as string}
                      title={group.name as string}
                      buttonText={""}
                      onAction={() => {}}
                      UserEmail={group.email as string}
                      key={group.handle}
                      description={group.description as string}
                      name={group.name as string}
                      {...group}
                    />
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
