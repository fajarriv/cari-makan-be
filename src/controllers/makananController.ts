import { RequestHandler } from "express";
import {
  BaseResponseBodySuccessful,
  CariMakanResponse,
  CariMakanResult,
  PlaceSearchResponse,
  TCariMakanReqQuery,
} from "../types";
import { MAKANAN_INDONESIA, getDistanceFromLatLonInKm } from "../utils";
import { format } from "path";

const makananRandom: RequestHandler<
  null,
  BaseResponseBodySuccessful<string>,
  null,
  null
> = (req, res) => {
  const len = MAKANAN_INDONESIA.length;
  const randomIndex = Math.floor(Math.random() * len);
  const randomMakanan = MAKANAN_INDONESIA[randomIndex];
  res
    .send({
      success: true,
      result: randomMakanan,
      error: null,
    })
    .status(200);
};

const cariMakanan: RequestHandler<
  null,
  //   CariMakanResponse,
  any,
  null,
  TCariMakanReqQuery
> = async (req, res) => {
  const radius = 5000;
  const fieldMask =
    "places.id,places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.location";

  const rankPreference = req.query.rankByNearest === true ? "DISTANCE" : "RELEVANCE";
  const placesApiReqBody = {
    textQuery: req.query.namaMakanan,
    includedType: "restaurant",
    locationBias: {
      circle: {
        center: {
          latitude: req.query.latitude,
          longitude: req.query.longitude,
        },
        radius: radius,
      },
    },
    openNow: req.query.openNow,
    rankPreference: rankPreference,
    languageCode: "en",
  };
  const placesApiHeaders = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": String(process.env.GOOGLE_API_KEY),
    "X-Goog-FieldMask": fieldMask,
  };

  const placesApiUrl = "https://places.googleapis.com/v1/places:searchText";
  const response = await fetch(placesApiUrl, {
    method: "POST",
    headers: placesApiHeaders,
    body: JSON.stringify(placesApiReqBody),
  });

  const data: PlaceSearchResponse = await response.json();

  res.send(formatResponse(data, req.query.latitude, req.query.longitude));
};

const formatResponse = (
  data: PlaceSearchResponse,
  latOrigin: number,
  lngOrigin: number
): CariMakanResult[] => {
  return data.places.map((place) => {
    const jarak = getDistanceFromLatLonInKm(
      latOrigin,
      lngOrigin,
      place.location.latitude,
      place.location.longitude
    );
    return {
      place_id: place.id,
      nama: place.displayName.text,
      alamat: place.formattedAddress,
      jarak: jarak,
      rating: place.rating
        ? `${place.rating}(${place.userRatingCount})`
        : "N/A",
    };
  });
};

export const makananController = { makananRandom, cariMakanan };
