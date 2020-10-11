// http response interface definition

export interface Page {
  total: number;
  page: number;
  pageSize: number;
}

export interface ObjectResponse {
  // eslint-disable-next-line
  [key: string]: any;
}

// eslint-disable-next-line
export type ArrayResponse = any[];

export interface PageResponse {
  // eslint-disable-next-line
  body: any;
  page?: Page;
}

type Response = ObjectResponse | ArrayResponse | PageResponse;

export default Response;