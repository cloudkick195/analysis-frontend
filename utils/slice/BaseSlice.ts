import {PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {uiActions} from 'slices/ui';
import api from 'utils/api';
import {AlertTypeEnum} from 'utils/enum';
import error from 'utils/error';

type ActionMethod = 'list' | 'create' | 'detail' | 'update' | 'delete';
interface HandlerApi {
  [key: string]: (url: string, params: any) => Promise<any>;
}
interface IReducerHandlers {
  [key: string]: (state: any, action: { payload: any; type: string }) => void;
}

export default class BaseSlice {
  private name: string;
  private asyncThunks: Record<string, any> = {};
  private arrAction: any = {};
  private handleSlice: Record<string, (builder: any, key: string) => void> = {
    detail: (builder: any, key: string) => {
      builder.addCase(
        this.asyncThunks[key].pending,
        (state: any, action: any) => {
          state.data.detail = '';
        },
      );
      builder.addCase(
        this.asyncThunks[key].fulfilled,
        (state: any, action: any) => {
          state.data.detail = action.payload;
        },
      );
      builder.addCase(
        this.asyncThunks[key].rejected,
        (state: any, action: any) => {
          state.data.detail = '';
        },
      );
    },
    create: (builder: any, key: string) => {
      builder.addCase(
        this.asyncThunks[key].pending,
        (state: any, action: any) => {
          state.data.create = '';
        },
      );
      builder.addCase(
        this.asyncThunks[key].fulfilled,
        (state: any, action: any) => {
          state.data.create = action.payload;
        },
      );
      builder.addCase(
        this.asyncThunks[key].rejected,
        (state: any, action: any) => {
          state.data.create = '';
        },
      );
    },
    list: (builder: any, key: string) => {
      builder.addCase(
        this.asyncThunks[key].pending,
        (state: any, action: any) => {
          state.data.list.data = [];
        },
      );
      builder.addCase(
        this.asyncThunks[key].fulfilled,
        (state: any, action: any) => {
          state.data.list.data = action.payload.data;
          state.data.list.query = action.payload.paging;
          state.data.list.total = action.payload.paging.total;
        },
      );
      builder.addCase(
        this.asyncThunks[key].rejected,
        (state: any, action: any) => {
          state.data.list.data = [];
        },
      );
    },
    delete: (builder: any, key: string) => {
      builder.addCase(
        this.asyncThunks[key].pending,
        (state: any, action: any) => {
          state.data.delete = '';
        },
      );
      builder.addCase(
        this.asyncThunks[key].fulfilled,
        (state: any, action: any) => {
          state.data.delete = action.payload;
        },
      );
      builder.addCase(
        this.asyncThunks[key].rejected,
        (state: any, action: any) => {
          state.data.delete = '';
        },
      );
    },

    update: (builder: any, key: string) => {
      builder.addCase(
        this.asyncThunks[key].pending,
        (state: any, action: any) => {
          state.data.edit = '';
        },
      );
      builder.addCase(
        this.asyncThunks[key].fulfilled,
        (state: any, action: any) => {
          state.data.edit = action.payload;
        },
      );
      builder.addCase(
        this.asyncThunks[key].rejected,
        (state: any, action: any) => {
          state.data.edit = '';
        },
      );
    },
  };

  setListPaging(state:any, action: PayloadAction<any>) {
    state.data.list.query = {
      ...state.data.list.query,
      ...action.payload,
    };
  }
  private handlerApi: HandlerApi = {
    create: async (url: string, params: any) => {
      return await api.post(url, params);
    },
    list: async (url: string, params: any) => {
      return await api.get(url, {params: params});
    },
    detail: async (url: string, params: any) => {
      return await api.get(`${url}/${params}`);
    },
    update: async (url: string, params: any) => {
      return await api.put(`${url}`, params);
    },
    delete: async (url: string, params: any) => {
      return await api.delete(`${url}`);
    },
  };

  constructor(name: string) {
    this.name = name;
  }

  convertUrl(url: string, params: any, key?: string) {
    if (!key) return url;
    return `${url}/${params[key]}`;
  }

  async buildSliceApi(
    url: string,
    type: ActionMethod,
    action: any,
    params: any,
    message: string,
    slug?:string, 
  ) {
    try {
      action.dispatch(uiActions.startProcess());

      const {status, data} = await this.handlerApi[type](url, params);

      if (['create', 'update', 'delete'].includes(type)) {
        if (status !== 200) {
          action.dispatch(
            uiActions.showAlert({
              type: AlertTypeEnum.ERROR,
              title: `${message} thất bại`,
            }),
          );
        }

        action.dispatch(
          uiActions.showAlert({
            type: AlertTypeEnum.SUCCESS,
            title: `${message} thành công`,
          }),
        );
      }

      action.dispatch(uiActions.stopProcess());

      if (type == 'create') {
        window.location.href = `/${slug}`;
      }

      return data;
    } catch (err: any) {
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }

  buildSlice(
    actions: Record<string, {url: string; message: string; key?: string, slug?:string}>,
  ) {
    this.arrAction = actions;

    for (const key in actions) {
      const value = actions[key];

      this.asyncThunks[key] = createAsyncThunk(
        `${this.name}/${key}`,
        async (params: any, action: any) => {
          try {
            return await this.buildSliceApi(
              this.convertUrl(value.url, params, value.key),
              key as ActionMethod,
              action,
              params,
              value.message,
              value.slug,
            );
          } catch (err: any) {
            action.dispatch(
              uiActions.showAlert({
                type: AlertTypeEnum.ERROR,
                title: err.message,
              }),
            );
            action.dispatch(uiActions.stopProcess());
          }
        },
      );
    }
  }

  buildExtraReducers(builder: any) {
    for (const key in this.arrAction) {
      this.handleSlice[key](builder, key);
    }
  }

  getAction() {
    return this.asyncThunks;
  }

  buildReducerSetCategory(
    state: any,
    action: PayloadAction<any>,
    name: string,
  ) {
    const id = action.payload;
    if (!state?.data?.detail) {
      state.data.detail = {};
      state.data.detail[name] = {
        add: {},
        deleted: {},
      };
    }

    if (state.data.detail[name][id]) {
      delete state.data.detail[name][id];

      if (!state.data.detail[name].add[id]) {
        state.data.detail[name].deleted[id] = parseInt(id);
      } else {
        delete state.data.detail[name].add[id];
      }
    } else {
      state.data.detail[name][id] = id;

      if (!state.data.detail[name].deleted[id]) {
        state.data.detail[name].add[id] = parseInt(id);
      } else {
        delete state.data.detail[name].deleted[id];
      }
    }
  }
}
