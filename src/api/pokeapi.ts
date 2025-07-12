import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePokeApi() {
  const { data, error, isLoading } = useSWR(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
    fetcher
  );
  return {
    data: data,
    isLoading,
    isError: error,
  };
}

export function usePokemonDetails(name: string) {
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    fetcher,
    { suspense: true }
  );
  return {
    data: data,
    isLoading,
    isError: error,
  };
}
