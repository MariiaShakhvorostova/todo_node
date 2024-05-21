import React from "react";
import { QueryClientProvider } from "react-query";
import App from "../App";
import queryClient from "./queryClient";

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWrapper;
