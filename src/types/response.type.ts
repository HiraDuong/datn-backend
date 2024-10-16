export interface BEResponse<T> {
    code: string;
    message: string;
    data: T;
}
