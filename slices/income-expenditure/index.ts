import api from 'utils/api';
import {PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {createSlice} from 'utils/app/@reduxjs/toolkit';
import {useInjectReducer} from 'utils/app/redux-injectors';
import {IncomeAndExpenditureState} from './types';
import {uiActions} from 'slices/ui';
import {AlertTypeEnum} from 'utils/enum';
import error from 'utils/error';
import BaseSlice from 'utils/slice/BaseSlice';

export const initialState: IncomeAndExpenditureState = {
  data: {
    category: {
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

const baseSlice = new BaseSlice('income-expenditure');

baseSlice.buildSlice({
  detail: {
    url: 'income_expense',
    message: 'Chi tiết thu chi',
  },
  create: {
    url: 'income_expense',
    message: 'Tạo thu chi',
    slug: 'income-and-expenditure'
  },
  update: {
    url: 'income_expense',
    message: 'Cập nhật thu chi',
    key: 'id'
  },
  list: {
    url: 'income_expense',
    message: 'Danh sách thu chi',
  },
  delete: {
    url: 'income_expense',
    message: 'Xóa thu chi',
    key: 'id',
  },
});

const createIncomeAndExpenditureCategory = createAsyncThunk(
  'income-and-expenditure-category/create',
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess());
      const {status, data} = await api.post(
        `/income_expense_categories`,
        params,
      );

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

      window.location.href = '/income-and-expenditure-category';

      return data;
    } catch (err: any) {
      action.dispatch(
        uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: `Thêm mới thất bại ${err}`,
        }),
      );
      action.dispatch(uiActions.stopProcess());
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  },
);

const editIncomeAndExpenditureCategory = createAsyncThunk(
  'income-and-expenditure-category/edit',
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess());

      const {status, data} = await api.put(
        `/income_expense_categories/${params.id}`,
        params,
      );

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
          title: err,
        }),
      );
      action.dispatch(uiActions.stopProcess());
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  },
);

const deleteIncomeAndExpenditureCategory = createAsyncThunk(
  'income-and-expenditure-category/delete',
  async (params: any, action: any) => {
    try {
      const {status, data} = await api.delete(
        `/income_expense_categories/${params.id}`,
      );

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

const listIncomeAndExpenditureCategory = createAsyncThunk(
  'income-and-expenditure-category/list',
  async (params: any, action: any) => {
    try {
      const {status, data} = await api.get(`/income_expense_categories`, {
        params: params,
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
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  },
);

const detailIncomeAndExpenditureCategory = createAsyncThunk(
  'income-and-expenditure-category/detail',
  async (params: any, action: any) => {
    try {
      const {status, data} = await api.get(
        `/income_expense_categories/${params}`,
      );

      if (status !== 200) {
      }

      return data.data;
    } catch (err: any) {}
  },
);

const slice = createSlice({
  name: 'incomeAndExpenditure',
  initialState,
  reducers: {
    setListPagingCategory: (state, action: PayloadAction<any>) => {
      state.data.category.list.query = {
        ...state.data.category.list.query,
        ...action.payload,
      };
    },
    setListPaging: (state, action: PayloadAction<any>) => {
      state.data.list.query = {
        ...state.data.list.query,
        ...action.payload,
      };
    },
    setCategory: (state, action: PayloadAction<any>) => {
      baseSlice.buildReducerSetCategory(
        state,
        action,
        'incomeAndExpenditureCategory',
      );
    },
  },
  extraReducers: builder => {
    baseSlice.buildExtraReducers(builder);
    builder.addCase(
      createIncomeAndExpenditureCategory.pending,
      (state: any, action: any) => {
        state.data.category.create = '';
      },
    );
    builder.addCase(
      createIncomeAndExpenditureCategory.fulfilled,
      (state: any, action: any) => {
        state.data.category.create = action.payload;
      },
    );
    builder.addCase(
      createIncomeAndExpenditureCategory.rejected,
      (state: any, action: any) => {
        state.data.category.create = '';
      },
    );

    builder.addCase(
      editIncomeAndExpenditureCategory.pending,
      (state: any, action: any) => {
        state.data.category.edit = '';
      },
    );
    builder.addCase(
      editIncomeAndExpenditureCategory.fulfilled,
      (state: any, action: any) => {
        state.data.category.edit = action.payload;
      },
    );
    builder.addCase(
      editIncomeAndExpenditureCategory.rejected,
      (state: any, action: any) => {
        state.data.category.edit = '';
      },
    );

    builder.addCase(
      deleteIncomeAndExpenditureCategory.pending,
      (state: any, action: any) => {
        state.data.category.delete = '';
      },
    );
    builder.addCase(
      deleteIncomeAndExpenditureCategory.fulfilled,
      (state: any, action: any) => {
        state.data.category.delete = action.payload;
      },
    );
    builder.addCase(
      deleteIncomeAndExpenditureCategory.rejected,
      (state: any, action: any) => {
        state.data.category.delete = '';
      },
    );

    builder.addCase(
      listIncomeAndExpenditureCategory.pending,
      (state: any, action: any) => {
        state.data.category.list.data = [];
      },
    );
    builder.addCase(
      listIncomeAndExpenditureCategory.fulfilled,
      (state: any, action: any) => {
        state.data.category.list.data = action.payload.data;
        state.data.category.list.query = action.payload.paging;
        state.data.category.list.total = action.payload.paging.total;
      },
    );
    builder.addCase(
      listIncomeAndExpenditureCategory.rejected,
      (state: any, action: any) => {
        //state.data.category.list.data = [];
      },
    );

    builder.addCase(
      detailIncomeAndExpenditureCategory.pending,
      (state: any, action: any) => {
        state.data.category.detail = '';
      },
    );
    builder.addCase(
      detailIncomeAndExpenditureCategory.fulfilled,
      (state: any, action: any) => {
        state.data.category.detail = action.payload;
      },
    );
    builder.addCase(
      detailIncomeAndExpenditureCategory.rejected,
      (state: any, action: any) => {
        state.data.category.detail = '';
      },
    );
  },
});

export const {actions: statisticActions} = slice;

export const useIncomeAndExpenditureSlice = () => {
  useInjectReducer({key: slice.name, reducer: slice.reducer});
  return {
    ...slice.actions,
    createIncomeAndExpenditureCategory,
    editIncomeAndExpenditureCategory,
    deleteIncomeAndExpenditureCategory,
    listIncomeAndExpenditureCategory,
    detailIncomeAndExpenditureCategory,
    actions: baseSlice.getAction(),
  };
};
