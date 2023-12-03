/**
 * @file PermissionDenied.tsx
 * @author { Matěj Macek (xmacek27) }
 * @date 17.12.2023
 * @brief Definition of Component for displaying permission denied page
 */

import { Button } from "@mui/joy";
import { Page } from "@src/shared/components/Page";
import React from "react";
import { Link } from "react-router-dom";

interface PermissionDeniedProps {
  errorMessage: string; // Prop for the error message
}

const PermissionDenied: React.FC<PermissionDeniedProps> = ({
  errorMessage,
}) => {
  return (
    <Page>
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p>{errorMessage}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button color="primary">Go to Dashboard</Button>
        </Link>
      </div>
    </Page>
  );
};

export default PermissionDenied;
