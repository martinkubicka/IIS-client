import React from "react";
import { Page } from "@src/shared/components/Page";
import { Button } from "@mui/joy";
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
