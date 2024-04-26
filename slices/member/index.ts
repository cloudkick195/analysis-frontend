import api from 'utils/api';
import {PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {createSlice} from 'utils/app/@reduxjs/toolkit';
import {useInjectReducer} from 'utils/app/redux-injectors';
import {MemberState} from './types';
import {uiActions} from 'slices/ui';
import {AlertTypeEnum} from 'utils/enum';
import error from 'utils/error';
import BaseSlice from 'utils/slice/BaseSlice';

export const initialState: MemberState = {
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
  category:{
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
  }
};

const listMemberActivity = createAsyncThunk(
  'member/list_activity',
  async (params: any, action: any) => {
    try {
      const {status, data} = await api.get(`/member/${params.id}/activity`, {
        params: params.query
      });
      if (status !== 200) {
        action.dispatch(
          uiActions.showAlert({
            type: AlertTypeEnum.ERROR,
            title: `Đã có lỗi xảy ra`,
          }),
        );
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

const baseSlice = new BaseSlice('member');

baseSlice.buildSlice({
  detail: {
    url: 'member',
    message: 'Chi tiết member',
  },
  list: {
    url: 'member',
    message: 'Danh sách member',
  },
});

const slice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setListPaging: baseSlice.setListPaging,
    setCategoryListPaging: (state:any, action: PayloadAction<any>) => {
      state.category.list.query = {
        ...state.category.list.query,
        ...action.payload,
      };
    }
  },
  extraReducers: builder => {
    baseSlice.buildExtraReducers(builder);
    builder.addCase(
      listMemberActivity.pending,
      (state: any, action: any) => {
        state.category.list.data = [];
      },
    );
    builder.addCase(
      listMemberActivity.fulfilled,
      (state: any, action: any) => {
        state.category.list.data = action.payload.data;
        state.category.list.query = action.payload.paging;
        state.category.list.total = action.payload.paging.total;
      },
    );
    builder.addCase(
      listMemberActivity.rejected,
      (state: any, action: any) => {
        //state.data.category.list.data = [];
      },
    );
  },
});

export const {actions: MemberActions} = slice;

export const useMemberSlice = () => {
  useInjectReducer({key: slice.name, reducer: slice.reducer});
  return {
    ...slice.actions,
    actions: baseSlice.getAction(),
    listMemberActivity
  };
};
