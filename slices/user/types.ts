export interface UserState {
  loading: {
    create: boolean;
    edit: boolean;
    delete: boolean;
    list: boolean;
    detail: boolean;
  };
  error: {
    create: string;
    edit: string;
    delete: string;
    list: string;
    detail: string;
  };
  data: {
    create: any;
    edit: any;
    delete: any;
    list: {
      data: Array<Object>;
      total: number;
      query: {
        limit: number;
        page: number;
        offset: number;
        sort: string;
        query: string;
        role_ids?: string;
      };
    };
    detail: any;
    current: any;
    addRole: {
      role_id: string,
      user_ids: any;
    }
  };
}
