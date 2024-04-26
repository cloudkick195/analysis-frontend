export interface IncomeAndExpenditureState {
  data: {
    category: {
      create: any,
      edit: any,
      delete: any,
      list: {
        data: Array<Object>;
        total: number;
        query: {
          limit: number;
          page: number;
          offset: number;
          sort: string;
          query: string;
          status?: number;
        };
      };
      detail: any
    },
    create: any,
      edit: any,
      delete: any,
      list: {
        data: Array<Object>;
        total: number;
        query: {
          limit: number;
          page: number;
          offset: number;
          sort: string;
          query: string;
          status?: number;
        };
      },
      detail: any
  };
}
