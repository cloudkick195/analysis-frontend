import api from "utils/api";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "utils/app/@reduxjs/toolkit";
import { useInjectReducer } from "utils/app/redux-injectors";
import { UserState } from "./types";
import { convertToParameters } from "utils/general";
import error from "utils/error";
import { AlertTypeEnum } from "utils/enum";
import { uiActions } from "slices/ui";

export const initialState: UserState = {
  loading: {
    create: true,
    edit: true,
    delete: true,
    list: true,
    detail: true,
  },
  error: {
    create: '',
    edit: '',
    delete: '',
    list: '',
    detail: '',
  },
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
        role_ids: '',
      },
    },
    detail: null,
    current: null,
    addRole: {
      role_id: '0',
      user_ids: {}
    }
  },
};

const createUser = createAsyncThunk(
  "user/create",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.post(`/user/create`, params);

      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: "Cập nhật thất bại"
        }))
        return action.rejectWithValue(error.handleErrorMessage(''));
      }

      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.SUCCESS,
        title: "Cập nhật thành công"
      }))

      window.location.href = "/user/edit/"+data.user_id

      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: "Cập nhật thất bại"
      }))
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const editUser = createAsyncThunk(
  "user/edit",
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess());
      const { status, data } = await api.post(`/user/update`, params);

      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: "Cập nhật thất bại"
        }))
        return action.rejectWithValue(error.handleErrorMessage(''));
      }

      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.SUCCESS,
        title: "Cập nhật thành công"
      }))

      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: "Cập nhật thất bại"
      }))
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const editMe = createAsyncThunk(
  "user/me",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.put(`/user/me`, params);

      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: "Cập nhật thất bại"
        }))
        return action.rejectWithValue(error.handleErrorMessage(''));
      }

      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.SUCCESS,
        title: "Cập nhật thành công"
      }))
      
      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: error.handleErrorMessage(err.response?.data?.message) || "Cập nhật thất bại"
      }))
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const deleteUser = createAsyncThunk(
  "user/delete",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.post(`/user/delete`, params);
      action.dispatch(uiActions.startProcess())
      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: "Xóa thất bại"
        }))
        return action.rejectWithValue(error.handleErrorMessage(''));
      }
     
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.SUCCESS,
        title: "Xóa thành công"
      }))
      action.dispatch(uiActions.stopProcess())
      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: "Xóa thất bại"
      }))
      action.dispatch(uiActions.stopProcess())
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const listUser = createAsyncThunk(
  "user/list",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/user/get`, {params: params});

      if (status !== 200) {
        return action.rejectWithValue(error.handleErrorMessage(''));
      }

      return data;
    } catch (err: any) {
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const detailUser = createAsyncThunk(
  "user/detail",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/user/${params}`);

      if (status !== 200) {
        return action.rejectWithValue(error.handleErrorMessage(''));
      }
      data.addRoles = {}
      data.deletedRoles = {}
      
      if(data?.roles?.length > 0){
        const objPermissionRole = data.roles.reduce((acc: any, cur: any) => {
          acc[cur.ID] = cur;
          return acc;
        }, {});

        data.roles = objPermissionRole
      }
      return data;
    } catch (err: any) {
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const currentUser = createAsyncThunk(
  "user/current",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/user/current`);
      
      if (status !== 200) {
        return action.rejectWithValue(error.handleErrorMessage(''));
      }
      data.addRoles = {}
      data.deletedRoles = {}
      
      if(data?.roles?.length > 0){
        const objPermissionRole = data.roles.reduce((acc: any, cur: any) => {
          acc[cur.ID] = cur;
          return acc;
        }, {});

        data.roles = objPermissionRole
      }

      return data;
    } catch (err: any) {
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);


const addUsersRoles = createAsyncThunk(
  "user/role/add",
  async (params: any, action: any) => {
    try {

      const { status, data } = await api.put(`/user/role/add`, params);

      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: "Cập nhật thất bại"
        }))
      }
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.SUCCESS,
        title: "Cập nhật thành công"
      }))


      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: err.message
      }))

      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const removeUsersRoles = createAsyncThunk(
  "user/role/remove",
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess())
     
      const { status, data } = await api.put(`/user/role/remove`, params);

      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: "Cập nhật thất bại"
        }))
      }
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.SUCCESS,
        title: "Cập nhật thành công"
      }))

      action.dispatch(uiActions.stopProcess())

      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: err.message
      }))
      action.dispatch(uiActions.stopProcess())
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const clearUsersOfRole = createAsyncThunk(
  "user/role/clear",
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess())
     
      const { status, data } = await api.put(`/user/role/clear`, params);

      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: "Cập nhật thất bại"
        }))
      }
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.SUCCESS,
        title: "Cập nhật thành công"
      }))

      action.dispatch(uiActions.stopProcess())

      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: err.message
      }))
      action.dispatch(uiActions.stopProcess())
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setListPaging: (state, action:PayloadAction<any>) => {
      state.data.list.query = {
        ...state.data.list.query,
        ...action.payload
      }
    },
    setRole: (state, action:PayloadAction<any>) => {
      const id = action.payload
   
      if(state.data.detail.roles[id]){
        delete state.data.detail.roles[id]
        
        if(!state.data.detail.addRoles[id]){
          state.data.detail.deletedRoles[id] = parseInt(id)
        }else{
          delete state.data.detail.addRoles[id]
        }
      }else{
        state.data.detail.roles[id] = id

        if(!state.data.detail.deletedRoles[id]){
          state.data.detail.addRoles[id] = parseInt(id)
        }else{
          delete state.data.detail.deletedRoles[id]
        }
      }
    },
    setSelectedUsersRole: (state, action:PayloadAction<any>)=>{
      const params = action.payload
      if(params.role_id){
        state.data.addRole.role_id = params.role_id
      }
      if(params.user_ids){
        params.user_ids.forEach((element:any) => {
          if(state.data.addRole.user_ids[element]){
            delete state.data.addRole.user_ids[element]
          }else{
            state.data.addRole.user_ids[element] = parseInt(element)
          }
        });
    
      }
      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state: any, action: any) => {
      state.loading.create = true;
      state.error.create = "";
    });
    builder.addCase(createUser.fulfilled, (state: any, action: any) => {

      state.loading.create = false;
      state.data.create = action.payload;
      state.error.create = "success";
    });
    builder.addCase(createUser.rejected, (state: any, action: any) => {
      state.loading.create = false;
      state.error.create = action.payload;
    });

    builder.addCase(editUser.pending, (state: any, action: any) => {
      state.loading.edit = true;
      state.error.edit = "";
    });
    builder.addCase(editUser.fulfilled, (state: any, action: any) => {
      state.loading.edit = false;
      state.data.edit = action.payload;
      state.error.edit = "success";
    });
    builder.addCase(editUser.rejected, (state: any, action: any) => {
      state.loading.edit = false;
      state.error.edit = action.payload;
    });

    builder.addCase(editMe.pending, (state: any, action: any) => {
      state.loading.edit = true;
      state.error.edit = "";
    });
    builder.addCase(editMe.fulfilled, (state: any, action: any) => {
      state.loading.edit = false;
      state.data.edit = action.payload;
      state.error.edit = "success";
    });
    builder.addCase(editMe.rejected, (state: any, action: any) => {
      state.loading.edit = false;
      state.error.edit = action.payload;
    });

    builder.addCase(deleteUser.pending, (state: any, action: any) => {
      state.loading.delete = true;
      state.error.delete = "";
    });
    builder.addCase(deleteUser.fulfilled, (state: any, action: any) => {
      state.loading.delete = false;
      state.data.delete = action.payload;
      state.error.delete = "success";
    });
    builder.addCase(deleteUser.rejected, (state: any, action: any) => {
      state.loading.delete = false;
      state.error.delete = action.payload;
    });

    builder.addCase(listUser.pending, (state: any, action: any) => {
      state.loading.list = true;
      state.error.list = "";
    });
    builder.addCase(listUser.fulfilled, (state: any, action: any) => {
      state.loading.list = false;
      state.data.list.data = action.payload.data;
      state.data.list.total = action.payload.paging.total;
      state.error.list = "success";
    });
    builder.addCase(listUser.rejected, (state: any, action: any) => {
      state.loading.list = false;
      state.error.list = action.payload;
    });

    
    builder.addCase(currentUser.pending, (state: any, action: any) => {
      state.loading.current = true;
      state.error.current = "";
    });
    builder.addCase(currentUser.fulfilled, (state: any, action: any) => {
      const current = action.payload;
      state.data.current = current;

    });
    builder.addCase(currentUser.rejected, (state: any, action: any) => {
      state.loading.current = false;
      state.error.current = action.payload;
    });

    builder.addCase(detailUser.pending, (state: any, action: any) => {
      state.loading.detail = true;
      state.error.detail = "";
    });
    builder.addCase(detailUser.fulfilled, (state: any, action: any) => {
      const detail = action.payload;
      state.data.detail = detail;
    });
    builder.addCase(detailUser.rejected, (state: any, action: any) => {
      state.loading.detail = false;
      state.error.detail = action.payload;
    });
    builder.addCase(addUsersRoles.fulfilled, (state: any, action: any) => {
      state.data.addRole = {
        role_id: '0',
        user_ids: {}
      }
    });
    builder.addCase(clearUsersOfRole.fulfilled, (state: any, action: any) => {
      state.data.addRole = {
        role_id: '0',
        user_ids: {}
      }
    });
  },
});

export const { actions: statisticActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return {
    ...slice.actions,
    createUser,
    editUser,
    deleteUser,
    listUser,
    detailUser,
    currentUser,
    addUsersRoles,
    removeUsersRoles,
    clearUsersOfRole,
    editMe
  };
};
