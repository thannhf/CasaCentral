import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import Item from "../components/Item";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";

const Listing = () => {
  const { data, isLoading, isError } = useProperties();
  const [filter, setFilter] = useState("");

  if (isError) {
    return (
      <div>
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <main className="max-padd-container my-[99px]">
      <div className="max-padd-container py-10 xl:py-22 bg-primary rounded-3xl">
        <div>
          <Searchbar filter={filter} setFilter={setFilter} />
          {/* container */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10">
            {data
              .filter((property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((property) => (
                <Item key={property.title} property={property} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Listing;
