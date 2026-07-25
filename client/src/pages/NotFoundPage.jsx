import React from "react";
import MainLayout from "../components/layout/MainLayout";
import EmptyState from "../components/common/EmptyState";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <MainLayout>
      <EmptyState
        title="404 - Page Not Found"
        text="The page you are looking for does not exist or has been moved. Use the button below to navigate back to the home lobby."
        actionLabel="Go to Homepage"
        onAction={handleGoHome}
      />
    </MainLayout>
  );
}

export default NotFoundPage;
