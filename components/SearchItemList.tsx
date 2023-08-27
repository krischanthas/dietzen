import React from "react";
import Router from "next/router";

interface SearchResultListProps {
  results: [];
}
const SearchItemList: React.FC<SearchResultListProps> = ({ results }) => {
  return (
    <div>
      <h1 className="my-6 text-center">
        {results.length}{" "}
        {results.length > 1 || results.length === 0 ? "Results" : "Result"}...
      </h1>

      <div>
        <div className="grid gap-4 grid-cols-3 place-items-stretch">
          {results.map((food: any) => {
            return (
              <div
                onClick={() => Router.push("/s/[id]", `/s/${food.nix_item_id}`)}
                key={food.nix_item_id}
                className=" px-4 py-2 bg-cream rounded-md text-center hover:cursor-pointer hover:bg-softred hover:text-white"
              >
                {food.brand_name_item_name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchItemList;
