/**
 * @file Component.tsx
 * @author { Dominik Petrik (xpetri25) }
 * @date 17.12.2023
 * @brief Definition of Component component
 */

import { Stack } from "@mui/joy";
import { Page } from "@src/shared/components/Page";
import React from "react";
import { Filters } from "./Filters";
import { GroupResults } from "./GroupResults";
import { SearchInput } from "./SearchInput";
import { ThreadResults } from "./ThreadResults";
import { UserResults } from "./UserResults";

export const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentCategory, setCurrentCategory] = React.useState("all");

  const categories = {
    all: (
      <>
        <GroupResults searchTerm={searchTerm} />
        <ThreadResults searchTerm={searchTerm} />
        <UserResults searchTerm={searchTerm} />
      </>
    ),
    groups: <GroupResults searchTerm={searchTerm} />,
    threads: <ThreadResults searchTerm={searchTerm} />,
    users: <UserResults searchTerm={searchTerm} />,
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <Page>
      <Stack direction={"column"} alignItems={"center"} width={"100%"}>
        <SearchInput onChange={handleSearch} onSearch={handleSearch} />
        <Filters onCategoryChange={handleCategoryChange} />
        <Stack
          width={"100%"}
          sx={{ overflowY: "scroll", overflowX: "hidden" }}
          height={"700px"}
        >
          {categories[currentCategory]}
        </Stack>
      </Stack>
    </Page>
  );
};
