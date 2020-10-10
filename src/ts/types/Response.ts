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

export interface PageResponse {
  // eslint-disable-next-line
  body: any;
  page?: Page;
}

// eslint-disable-next-line
export type ArrayResponse = any[];

type Response = ObjectResponse | PageResponse | ArrayResponse;

export default Response;