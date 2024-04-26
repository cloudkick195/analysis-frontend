import api from 'utils/api';
import {PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {createSlice} from 'utils/app/@reduxjs/toolkit';
import {useInjectReducer} from 'utils/app/redux-injectors';
import {PermissionState} from './types';
import {uiActions} from 'slices/ui';
import {AlertTypeEnum} from 'utils/enum';
import error from 'utils/error';

export const initialState: PermissionState = {
  data: {
    create: null,
    edit: null,
    delete: null,
    list: {
      data: [],
      total: 0,
      query: {
        limit: 10,
        page: 1,
        offset: 0,
        sort: '',
        query: '',
      },
    },
    detail: null,
  },
};

const createPermission = createAsyncThunk(
  'permission/create',
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess());
      const {status, data} = await api.post(`/permission/create`, params);

      if (status !== 200) {
        action.dispatch(
          uiActions.showAlert({
            type: AlertTypeEnum.ERROR,
            title: 'Thêm mới thất bại',
          }),
        );
      }

      action.dispatch(
        uiActions.showAlert({
          type: AlertTypeEnum.SUCCESS,
          title: 'Thêm mới thành công',
        }),
      );
      action.dispatch(uiActions.stopProcess());

      window.location.href = '/permission';

      return data;
    } catch (err: any) {
      action.dispatch(
        uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: `Thêm mới thất bại ${err}`,
        }),
      );
      action.dispatch(uiActions.stopProcess());
    }
  },
);

const editPermission = createAsyncThunk(
  'permission/edit',
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess());

      const {status, data} = await api.post(`/permission/update`, params);

      if (status !== 200) {
        action.dispatch(
          uiActions.showAlert({
            type: AlertTypeEnum.ERROR,
            title: 'Cập nhật thất bại',
          }),
        );
      }
      action.dispatch(
        uiActions.showAlert({
          type: AlertTypeEnum.SUCCESS,
          title: 'Cập nhật thành công',
        }),
      );

      action.dispatch(uiActions.stopProcess());

      return data;
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

const deletePermission = createAsyncThunk(
  'permission/delete',
  async (params: any, action: any) => {
    try {
      const {status, data} = await api.post(`/permission/delete`, params);

      if (status !== 200) {
        action.dispatch(
          uiActions.showAlert({
            type: AlertTypeEnum.ERROR,
            title: 'Xóa thất bại',
          }),
        );
        return action.rejectWithValue(error.handleErrorMessage(''));
      }
      action.dispatch(
        uiActions.showAlert({
          type: AlertTypeEnum.SUCCESS,
          title: 'Xóa thành công',
        }),
      );

      return data;
    } catch (err: any) {
      action.dispatch(
        uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: 'Xóa thất bại',
        }),
      );
      return action.rejectWithValue(
        error.handleErrorMessage(err.response?.data?.message),
      );
    }
  },
);

const listPermission = createAsyncThunk(
  'permission/list',
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess());
      const {status, data} = await api.get(`/permission/get`, {params: params});

      if (status !== 200) {
        action.dispatch(
          uiActions.showAlert({
            type: AlertTypeEnum.ERROR,
            title: `Đã có lỗi xảy ra`,
          }),
        );
        return action.rejectWithValue(error.handleErrorMessage(''));
      }
      action.dispatch(uiActions.stopProcess());

      return data;
    } catch (err: any) {
      action.dispatch(
        uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: `Đã có lỗi xảy ra ${err}`,
        }),
      );
      action.dispatch(uiActions.hideLoading());
    }
  },
);

const detailPermission = createAsyncThunk(
  'permission/detail',
  async (params: any, action: any) => {
    try {
      const {status, data} = await api.get(`/permission/${params}`);

      if (status !== 200) {
        action.dispatch(
          uiActions.showAlert({
            type: AlertTypeEnum.ERROR,
            title: `Đã có lỗi xảy ra`,
          }),
        );
        return action.rejectWithValue(error.handleErrorMessage(''));
      }

      return data;
    } catch (err: any) {
      action.dispatch(
        uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: `Đã có lỗi xảy ra ${err}`,
        }),
      );
      action.dispatch(uiActions.hideLoading());
      return action.rejectWithValue(
        error.handleErrorMessage(err.response?.data?.message),
      );
    }
  },
);

const slice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setListPaging: (state, action: PayloadAction<any>) => {
      state.data.list.query = {
        ...state.data.list.query,
        ...action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(createPermission.pending, (state: any, action: any) => {
      state.data.list.create = '';
    });
    builder.addCase(createPermission.fulfilled, (state: any, action: any) => {
      state.data.list.create = action.payload;
    });
    builder.addCase(createPermission.rejected, (state: any, action: any) => {
      state.data.list.create = '';
    });

    builder.addCase(editPermission.pending, (state: any, action: any) => {
      state.data.list.edit = '';
    });
    builder.addCase(editPermission.fulfilled, (state: any, action: any) => {
      state.data.list.edit = action.payload;
    });
    builder.addCase(editPermission.rejected, (state: any, action: any) => {
      state.data.list.edit = '';
    });

    builder.addCase(deletePermission.pending, (state: any, action: any) => {
      state.data.list.delete = '';
    });
    builder.addCase(deletePermission.fulfilled, (state: any, action: any) => {
      state.data.list.delete = action.payload;
    });
    builder.addCase(deletePermission.rejected, (state: any, action: any) => {
      state.data.list.delete = '';
    });

    builder.addCase(listPermission.pending, (state: any, action: any) => {
      state.data.list.data = [];
    });
    builder.addCase(listPermission.fulfilled, (state: any, action: any) => {
      state.data.list.data = action.payload.data;
      state.data.list.total = action.payload.paging.total;
    });
    builder.addCase(listPermission.rejected, (state: any, action: any) => {
      //state.data.list.data = [];
    });

    builder.addCase(detailPermission.pending, (state: any, action: any) => {
      state.data.detail = '';
    });
    builder.addCase(detailPermission.fulfilled, (state: any, action: any) => {
      state.data.detail = action.payload;
    });
    builder.addCase(detailPermission.rejected, (state: any, action: any) => {
      state.data.detail = '';
    });
  },
});

export const {actions: PermissionActions} = slice;

export const usePermissionSlice = () => {
  useInjectReducer({key: slice.name, reducer: slice.reducer});
  return {
    ...slice.actions,
    createPermission,
    editPermission,
    deletePermission,
    listPermission,
    detailPermission,
  };
};
