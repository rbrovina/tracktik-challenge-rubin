import { ApiData } from "@/dto/ApiData";

export interface Site extends ApiData {
  logo: string;
  title: string;
  tags: string[];
  images: string[];
}
