import { GigWithBandsAndPlace } from "@/domain/Gig/Gig.type";
import { capitalize } from "@/utils/utils";
import dayjs from "dayjs";

export const computeGigSlug = (gig: GigWithBandsAndPlace): string => {
  const { bands, date } = gig;
  const dateString = dayjs(date).format("DD-MM-YYYY");
  const bandsString = bands
    .map((band) => band.name.toLowerCase().replaceAll(" ", "-"))
    .join("_");
  return dateString + "_" + bandsString;
};

export const getDataFromGigSlug = (
  slug: string,
): { date: string; bandNames: string[] } => {
  const splittedSlug = slug.split("_");
  const date = splittedSlug[0];
  const bandNames = splittedSlug.slice(1).map((bandName) =>
    bandName
      .split("-")
      .map((w) => capitalize(w))
      .join(" "),
  );
  return { date: date, bandNames: bandNames };
};