/**
 * @file ThreadResults.tsx
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of ThreadResults component
 */

import { Button, CircularProgress, Divider, Stack, Typography } from "@mui/joy";
import { searchService } from "@src/services/searchService";
import { Thread } from "@src/shared/components/Threads";
import { ThreadModel } from "@src/shared/models/ThreadModel";
import React from "react";
import { useQuery } from "react-query";

interface ResultsProps {
  searchTerm?: string;
  typeFilter?: "all" | "groups" | "threads" | "users";
}

export const ThreadResults = ({
  searchTerm = "",
  typeFilter = "all",
}: ResultsProps) => {
  const [limit, setLimit] = React.useState(5);
  const [showMore, setShowMore] = React.useState(false);
  const {
    data: threadData,
    refetch: searchAgain,
    isLoading,
  } = useQuery("threadSearch", async (): Promise<ThreadModel[] | undefined> => {
    const data = await searchService.searchThreads(searchTerm, limit);
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
    <Stack marginTop={2} alignItems={"center"} sx={{ width: "100%" }}>
      <>
        {isLoading && <CircularProgress />}
        {threadData && threadData.length > 0 && (
          <>
            <Divider sx={{ width: "100%" }}>
              <Typography color="neutral" level={"h3"}>
                Threads
              </Typography>
            </Divider>

            <Stack marginTop={2} width={"100%"}>
              {threadData.map((thread) => {
                return <Thread thread={thread} onDelete={() => {}} />;
              })}
            </Stack>
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
