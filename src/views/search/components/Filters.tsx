import { Box, Chip, Radio, RadioGroup } from "@mui/joy";
import React from "react";

interface FiltersProps {
  onCategoryChange?: (category: string) => void;
}

export const Filters = ({ onCategoryChange }: FiltersProps) => {
  const [selected, setSelected] = React.useState("all");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
    onCategoryChange && onCategoryChange(event.target.value);
  };

  return (
    <Box sx={{ width: { xs: "95%", md: "80%" }, padding: "20px" }}>
      {" "}
      <RadioGroup
        sx={{
          width: { xs: "50%", lg: "40%", xl: "25%" },
          flexDirection: "row",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        {["all", "groups", "threads", "users"].map((item) => {
          const checked = selected === item;
          return (
            <Chip variant={"soft"} color={checked ? "primary" : "neutral"}>
              <Radio
                onChange={handleChange}
                value={item}
                overlay
                disableIcon
                checked={checked}
                label={item}
                sx={{ padding: "10px" }}
                variant={"plain"}
              />
            </Chip>
          );
        })}
      </RadioGroup>
    </Box>
  );
};
