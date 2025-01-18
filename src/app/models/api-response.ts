interface IAPIBaseResponse {
    code: number
}

interface IAPISuccessResponse<DType = any> extends IAPIBaseResponse {
    success: true
    data: DType
}

interface IAPIErrorResponse extends IAPIBaseResponse {
    success: false
    error: string
}

export type IAPIResponse<T> = IAPISuccessResponse<T> | IAPIErrorResponse