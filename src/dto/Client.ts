import { ApiData } from "@/dto/ApiData";

export interface Client extends ApiData {
  givenName: string;
  logo: string;
  tags: string[];
}