import {BaseState} from 'utils/slice/BaseState';

export interface MemberState extends BaseState {
  category: {
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
  };
}

// export interface MemberState{
//   data: {
//     create: any,
//     edit: any,
//     delete: any,
//     list: {
//         data: Array<Object>;
//         total: number;
//         query: {
//           limit: number;
//           page: number;
//           offset: number;
//           sort: string;
//           query: string;
//           status?: number;
//         };
//     },
//     detail: any
// };
// }
