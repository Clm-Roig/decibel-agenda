import { MAX_IMAGE_SIZE } from "@/domain/image";

export enum GIG_IMAGE_ERROR_NAMES {
  INVALID_IMAGE_URL = "INVALID_IMAGE_URL",
  TOO_BIG_IMAGE_FILE = "TOO_BIG_IMAGE_FILE",
}

export const invalidImageUrlError = {
  name: GIG_IMAGE_ERROR_NAMES.INVALID_IMAGE_URL,
  message: "The gig poster URL provided is not an image URL.",
  frMessage: "L'URL de l'affiche du concert n'est pas une URL d'image.",
  status: 400,
};

export const tooBigImageFileError = {
  name: GIG_IMAGE_ERROR_NAMES.TOO_BIG_IMAGE_FILE,
  message: `The gig poster file is too big (max size: ${MAX_IMAGE_SIZE} Mo).`,
  frMessage: `Le fichier d''affiche du concert est trop volumineux (taille maximale autorisée : ${MAX_IMAGE_SIZE} Mo).`,
  status: 400,
};
