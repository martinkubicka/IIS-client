import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import Pagination from "@mui/material/Pagination";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import React from "react";

interface PaginationComponentProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const materialTheme = materialExtendTheme();

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };

  if (totalPages === 0 || totalPages == 1) {
    return null;
  }

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            size="large"
            count={totalPages}
            page={currentPage}
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
};

export default PaginationComponent;
