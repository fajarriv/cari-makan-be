import { z } from "zod";

export type RequestContentLocation = "body" | "params" | "query";

export type BaseResponseBodySuccessful<T> = {
  success: true;
  result: T;
  error: null;
};

export type BaseResponseBodyFailure<T> = {
  success: false;
  result: null;
  error: T;
};

export type PlaceSearchResponse = {
  places: {
    id: string;
    formattedAddress: string;
    location: { latitude: number; longitude: number };
    displayName: {
        text: string;
        languageCode: string;
    },
    rating?: number;
    userRatingCount?: number;
  }[];
};

export const CariMakanReqQueryZ = z.object({
  namaMakanan: z.string().min(2),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  rankByNearest: z.boolean().default(false),
  openNow: z.boolean().default(false),
});

export type TCariMakanReqQuery = z.infer<typeof CariMakanReqQueryZ>;

export type CariMakanResult = {
  place_id: string;
  nama: string;
  alamat: string;
  jarak: number;
  rating: string;
};

export type CariMakanResponse = BaseResponseBodySuccessful<CariMakanResult[]>;
