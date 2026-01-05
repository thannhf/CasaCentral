import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllProperties } from "../utils/api.js";

const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allProperties"],
    queryFn: getAllProperties,
    refetchOnWindowFocus: false,
  });

  return {data, isError, isLoading, refetch};
};

export default useProperties;
