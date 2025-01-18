import { IMedia } from "../media.model";

export interface IMediaResponse {
    currentPage: number,
    totalItems: number,
    itemsPerPage: number,
    media: IMedia[]
}