/** @format */

import { RentSpace } from "@domain/models/rent-space.model";
import { HttpService } from "@http-services";

const http = new HttpService({}, true);

export const RentSpaceQuery = {
  getAll: () => http.get<RentSpace[]>("/"),
  getById: (id: string) => http.get<RentSpace>(`/${id}`),
  create: (data: RentSpace) => http.post<RentSpace, RentSpace>("/", data),
  update: (id: string, data: RentSpace) =>
    http.put<RentSpace, RentSpace>(`/${id}`, data),
  delete: (id: string) => http.delete<RentSpace>(`/${id}`),
};
