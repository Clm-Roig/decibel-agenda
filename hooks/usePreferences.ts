import { useLocalStorage } from "@mantine/hooks";
import { Genre, Place } from "@prisma/client";

export default function usePreferences() {
  const [excludedGenres, setExcludedGenres] = useLocalStorage<Genre[]>({
    key: "gigList-excludedGenres",
    defaultValue: [],
  });
  const [excludedPlaces, setExcludedPlaces] = useLocalStorage<Place["id"][]>({
    key: "gigList-excludedPlaces",
    defaultValue: [],
  });
  const [grayOutPastGigs, setGrayOutPastGigs] = useLocalStorage<boolean>({
    key: "gigList-grayOutPastGigs",
    defaultValue: false,
  });

  return {
    excludedGenres: excludedGenres || [],
    excludedPlaces: excludedPlaces || [],
    grayOutPastGigs,
    setExcludedGenres,
    setExcludedPlaces,
    setGrayOutPastGigs,
  };
}
