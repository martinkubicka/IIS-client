import { SearchRounded } from "@mui/icons-material";
import { Input } from "@mui/joy";
import React from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
  onChange?: (value: string) => void;
}

export const SearchInput = ({ onSearch, onChange }: SearchInputProps) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange && onChange(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "Enter" && value != "") {
      onSearch(value);
    }
  };

  return (
    <Input
      sx={{ width: { xs: "95%", md: "80%" }, padding: "20px" }}
      startDecorator={<SearchRounded />}
      size={"lg"}
      onChange={handleChange}
      autoFocus
      value={value}
      placeholder="Search for anything..."
      variant={"soft"}
      onKeyDown={handleKeyDown}
    />
  );
};
