import React from "react";
import { QueryClientProvider } from "react-query";
import App from "../App";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "./queryClient";

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AppWrapper;
