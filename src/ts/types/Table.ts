// Table components interface definition

// table data source record
export interface Record {
  // eslint-disable-next-line
  [key: string]: any;
}

export interface PageParams {
  page: number;
  pageSize: number;
}

export default interface Table {
  // eslint-disable-next-line
  pageLists (...rest: any[]): void;

  // eslint-disable-next-line
  selectedData (): any[];

  // eslint-disable-next-line
  getData (): any[];

  handlePageChg (currentPage: number): this;
}