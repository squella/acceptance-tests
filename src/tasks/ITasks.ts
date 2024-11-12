import { FetchDataFromApi } from "@src/tasks/FetchDataFromApi";
import { PatchDataToApi } from "./PatchDataToApi";


export interface ITasks {
  fetchDataFromApi: FetchDataFromApi
  patchDataToApi : PatchDataToApi 

}
