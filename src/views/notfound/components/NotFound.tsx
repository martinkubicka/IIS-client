/**
 * @file NotFound.tsx
 * @author { Martin Kubicka (xkubic45) }
 * @date 17.12.2023
 * @brief Definition of NotFound component representing 404 error page
 */

import { Page } from "@src/shared/components/Page";
import { PageHeader } from "@src/shared/components/PageHeader";

export const NotFound = () => {
  return (
    <Page>
      <PageHeader text="Error: Page not found" />
    </Page>
  );
};
