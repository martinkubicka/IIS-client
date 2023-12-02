/**
 * @file ThreadFilter.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of ThreadFilter component
 */

import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/joy";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { TextField } from "@mui/material";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import React from "react";
import "./threadFilter.css";

interface ThreadFilterProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  name?: string | null;
  fromDate?: string | null;
  toDate?: string | null;
}

const materialTheme = materialExtendTheme();

const ThreadFilter: React.FC<ThreadFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<Filters>({
    name: null,
    fromDate: null,
    toDate: null,
  });

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filterKey: keyof Filters
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: event.target.value,
    }));

    if (
      filters.toDate &&
      filterKey === "fromDate" &&
      event.target.value >= filters.toDate
    ) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        toDate: event.target.value,
      }));
    } else if (
      filters.fromDate &&
      filterKey === "toDate" &&
      event.target.value <= filters.fromDate
    ) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        fromDate: event.target.value,
      }));
    }

    onFilterChange({
      ...filters,
      [filterKey]: event.target.value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      name: null,
      fromDate: null,
      toDate: null,
    });

    onFilterChange({
      name: null,
      fromDate: null,
      toDate: null,
    });
  };

  return (
    <div>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <AccordionGroup
            sx={{
              [`& .${accordionSummaryClasses.indicator}`]: {
                transition: "0.2s",
              },
              [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]:
                {
                  transform: "rotate(45deg)",
                },
              paddingBottom: "30px",
            }}
          >
            <Accordion>
              <AccordionSummary indicator={<AddIcon />}>
                Filters
              </AccordionSummary>
              <AccordionDetails>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div style={{ marginRight: "25px" }}>
                    <Typography>Name</Typography>
                    <TextField
                      variant="standard"
                      value={filters.name}
                      onChange={(e) => handleFilterChange(e, "name")}
                    />
                  </div>

                  <div style={{ marginRight: "25px" }}>
                    <Typography>From date</Typography>
                    <TextField
                      variant="standard"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={filters.fromDate}
                      onChange={(e) => handleFilterChange(e, "fromDate")}
                      inputProps={{ max: filters.toDate }}
                    />
                  </div>

                  <div>
                    <Typography>To date</Typography>
                    <TextField
                      variant="standard"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={filters.toDate}
                      onChange={(e) => handleFilterChange(e, "toDate")}
                      inputProps={{ min: filters.fromDate }}
                    />
                  </div>

                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={handleResetFilters}
                    size="md"
                    sx={{ marginLeft: "25px" }}
                  >
                    Reset filters
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </div>
  );
};

export default ThreadFilter;
