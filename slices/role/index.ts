import api from "utils/api";
import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "utils/app/@reduxjs/toolkit";
import { useInjectReducer } from "utils/app/redux-injectors";
import { RoleState } from "./types";
import { uiActions } from "slices/ui";
import { AlertTypeEnum } from "utils/enum";
import error from "utils/error";
import { RFC_2822 } from "moment";

export const initialState: RoleState = {
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
    }
};

const createRole = createAsyncThunk(
  "role/create",
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess())
      const { status, data } = await api.post(`/role/create`, params);

      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: "Thêm mới thất bại"
        }))
      }

      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.SUCCESS,
        title: "Thêm mới thành công"
      }))
      action.dispatch(uiActions.stopProcess())

      window.location.href = "/role"

      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: `Thêm mới thất bại ${err}`
      }))
      action.dispatch(uiActions.stopProcess())
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const editRole = createAsyncThunk(
  "role/edit",
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess())

      const { status, data } = await api.post(`/role/update`, params);

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

const addPermissionsOfRole = createAsyncThunk(
  "role/permissions/add",
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess())
      
      const { status, data } = await api.put(`/role/permissions/add`, params);
      
      if (status !== 200) {
        throw new Error("Cập nhật thất bại");
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

const removePermissionsOfRole = createAsyncThunk(
  "role/permissions/remove",
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess())
     
      const { status, data } = await api.put(`/role/permissions/remove`, params);

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

const deleteRole = createAsyncThunk(
  "role/delete",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.post(`/role/delete`, params);
      
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

      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: "Xóa thất bại"
      }))
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const listRole = createAsyncThunk(
  "role/list",
  async (params: any, action: any) => {
    try {
      action.dispatch(uiActions.startProcess())
      const { status, data } = await api.get(`/role/get`, {params: params});
     
      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: `Đã có lỗi xảy ra`
        }))
        return action.rejectWithValue(error.handleErrorMessage(''));

      }
      action.dispatch(uiActions.stopProcess())

      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: `Đã có lỗi xảy ra ${err}`
      }))
      action.dispatch(uiActions.hideLoading())
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);

const detailRole = createAsyncThunk(
  "role/detail",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/role/${params}`);

      if (status !== 200) {
        action.dispatch(uiActions.showAlert({
          type: AlertTypeEnum.ERROR,
          title: `Đã có lỗi xảy ra`
        }))
        return action.rejectWithValue(error.handleErrorMessage(''));
      }
      data.addPermissions = {}
      data.deletedPermissions = {}
      let objPermissionRole = {}
      if(data?.permissions?.length > 0){
        objPermissionRole = data.permissions.reduce((acc: any, cur: any) => {
          acc[cur.ID] = cur;
          return acc;
        },{});
      }
      data.objPermission = objPermissionRole
      
      return data;
    } catch (err: any) {
      action.dispatch(uiActions.showAlert({
        type: AlertTypeEnum.ERROR,
        title: `Đã có lỗi xảy ra ${err}`
      }))
      action.dispatch(uiActions.hideLoading())
      return action.rejectWithValue(error.handleErrorMessage(err.response?.data?.message));
    }
  }
);



const slice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setListPaging: (state, action:PayloadAction<any>) => {
      state.data.list.query = {
        ...state.data.list.query,
        ...action.payload
      }
    },
    setPermission: (state, action:PayloadAction<any>) => {
      const id = action.payload

      if(state.data.detail.objPermission[id]){
        delete state.data.detail.objPermission[id]
        
        if(!state.data.detail.addPermissions[id]){
          state.data.detail.deletedPermissions[id] = parseInt(id)
        }else{
          delete state.data.detail.addPermissions[id]
        }
      }else{
        state.data.detail.objPermission[id] = id

        if(!state.data.detail.deletedPermissions[id]){
          state.data.detail.addPermissions[id] = parseInt(id)
        }else{
          delete state.data.detail.deletedPermissions[id]
        }
      }
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(createRole.pending, (state: any, action: any) => {
      state.data.list.create = "";
    });
    builder.addCase(createRole.fulfilled, (state: any, action: any) => {
      state.data.list.create = action.payload;
    });
    builder.addCase(createRole.rejected, (state: any, action: any) => {
      state.data.list.create = "";
    });

    builder.addCase(editRole.pending, (state: any, action: any) => {
      state.data.list.edit = "";
    });
    builder.addCase(editRole.fulfilled, (state: any, action: any) => {
      state.data.list.edit = action.payload;
    });
    builder.addCase(editRole.rejected, (state: any, action: any) => {
      state.data.list.edit = "";
    });

    builder.addCase(deleteRole.pending, (state: any, action: any) => {
      state.data.list.delete = "";
    });
    builder.addCase(deleteRole.fulfilled, (state: any, action: any) => {
      state.data.list.delete = action.payload;
    });
    builder.addCase(deleteRole.rejected, (state: any, action: any) => {
      state.data.list.delete = "";
    });

    builder.addCase(listRole.pending, (state: any, action: any) => {
      state.data.list.data = [];
    });
    builder.addCase(listRole.fulfilled, (state: any, action: any) => {
      state.data.list.data = action.payload.data;
      state.data.list.total = action.payload.paging.total;
    });
    builder.addCase(listRole.rejected, (state: any, action: any) => {
      //state.data.list.data = [];
    });

    builder.addCase(detailRole.pending, (state: any, action: any) => {
      state.data.detail = "";
    });
    builder.addCase(detailRole.fulfilled, (state: any, action: any) => {
      const detail = action.payload;
      state.data.detail = detail;
    });
    builder.addCase(detailRole.rejected, (state: any, action: any) => {
      state.data.detail = "";
    });

    builder.addCase(addPermissionsOfRole.fulfilled, (state: any, action: any) => {
      state.data.detail.addPermissions = {};
      state.data.detail.deletedPermissions = {};
    });

    builder.addCase(addPermissionsOfRole.rejected, (state: any, action: any) => {
      state.data.detail.objPermission = state.data.detail.permissions.reduce((acc:any, cur:any)=>{
        acc[cur.ID] = cur
        return acc
      },{})
      state.data.detail.addPermissions = {};
      state.data.detail.deletedPermissions = {};
    });

    builder.addCase(removePermissionsOfRole.fulfilled, (state: any, action: any) => {
      state.data.detail.deletedPermissions = {};
    });

    
    // builder.addCase(removePermissionsOfRole.fulfilled, (state: any, action: any) => {
    //   state.data.detail.deletedPermissions = {};
    // });

    

  },
});

export const { actions: roleActions } = slice;

export const useRoleSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return {
    ...slice.actions,
    createRole,
    editRole,
    deleteRole,
    listRole,
    detailRole,
    addPermissionsOfRole,
    removePermissionsOfRole,

  };
};
