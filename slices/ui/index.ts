import { createSlice } from 'utils/app/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/app/redux-injectors';
import { UiState } from 'slices/ui/types';

export const initialState: UiState = {
  alert: {
    isShow: false,
    type: 0,
    title: ''
  },
  loading: false,
  processing: false
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showAlert: (state, payload) => {
      state.alert.isShow = true;
      state.alert.type = payload.payload.type;
      state.alert.title = payload.payload.title;
      state.processing = false
    },
    hideAlert: state => {
      state.alert.isShow = false;
      state.alert.type = 0;
      state.alert.title = '';
    },
    showLoading: state => {
      state.loading = true;
    },
    hideLoading: state => {
      state.loading = false;
    },
    startProcess: state => {
      state.processing = true;
    },
    stopProcess: state => {
      state.processing = false;
    }
  }
});

export const { actions: uiActions } = slice;

export const useUiSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return {
    ...slice.actions
  };
};
