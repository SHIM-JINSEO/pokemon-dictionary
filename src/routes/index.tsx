import { createFileRoute } from "@tanstack/react-router";
import { usePokeApi } from "../api/pokeapi";
import PokeCard from "../components/card";
import { Suspense, useState, useMemo } from "react";
import Loading from "../components/loading";

interface Pokemon {
  name: string;
  url: string;
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = pageIndex; i <= pageIndex + 10; i++) {
      pages.push(i);
    }
    return pages;
  }, [pageIndex]);

  const { data, isLoading, isError } = usePokeApi(pageIndex);
  if (isLoading) return <div>Loading...pokemons</div>;
  if (isError) return <div>Error loading data</div>;

  const pokemons: Pokemon[] = data.results;
  console.log("Pokemons fetched:", pokemons);
  return (
    <div className="mx-[200px] my-[40px]">
      <div className="flex flex-wrap items-center my-[20px]">
        {pokemons.map((pokemon: Pokemon) => (
          <Suspense key={pokemon.name} fallback={<Loading />}>
            <PokeCard key={pokemon.name} name={pokemon.name} />
          </Suspense>
        ))}
      </div>
      <div className="flex justify-between items-center my-[20px]">
        <button
          className="w-0 h-0 border-t-[10px] border-b-[10px] border-r-[10px] border-t-transparent border-b-transparent border-r-gray-700"
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
        />
        {pageNumbers.map((page) => (
          <button onClick={()=>setPageIndex(page)}>{page}</button>
        ))}
        <button
          className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[10px] border-t-transparent border-b-transparent border-l-gray-700"
          onClick={() => setPageIndex(pageIndex + 1)}
        />
      </div>
    </div>
  );
}
