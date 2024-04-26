import api from "utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "utils/app/@reduxjs/toolkit";
import { useInjectReducer } from "utils/app/redux-injectors";
import { StatisticState } from "./types";
import { convertToParameters } from "utils/general";
import moment from "moment";
import { ReportTypeEnum } from "utils/enum";

export const initialState: StatisticState = {
  loading: {
    system: false,
    agency: false,
    member: {
      depositWithdrawal: false,
      winLose: false,
      promotionRebate: false
    },
    incomeAndExpenditure: false,
    dashboard:{
      month: false,
      date: false
    }
  },
  error: {
    system: "",
    agency: "",
    member: {
      depositWithdrawal: "",
      winLose: "",
      promotionRebate: ""
    },
    incomeAndExpenditure: "",
    dashboard:{
      month: "",
      date: "boolean"
    }
  },
  data: {
    system: null,
    agency: null,
    member: {
      depositWithdrawal: null,
      winLose: null,
      promotionRebate: null
    },
    incomeAndExpenditure: null,
    dashboard:{
      month: null,
      date: null
    }
  },
};

const getSystemStatistic = createAsyncThunk(
  "statistic/get-system-statistic",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/statistics/total_by_date_or_month?type=${params}`);

      if (status !== 200) {
        return action.rejectWithValue("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }

      const newData: any = {
        categories: [],
        Series: [
          {
            name: 'Nạp',
            data: []
          },
          {
            name: 'Rút',
            data: []
          }
        ]
      }

      data?.data.map((item: any) => {
        if (params === ReportTypeEnum.DATE) {
          newData.categories.push(moment(item.StatisticDate).format("DD-MM-YYYY"))
        } else {
          newData.categories.push(`Tháng ${moment(item.Month).month(moment(item.Month).month()).format('MM')}`)
        }
        newData.Series[0].data.push(item.TotalDeposit)
        newData.Series[1].data.push(Math.abs(item.TotalWithdrawal))
      })

      return newData;
    } catch (err: any) {
      return action.rejectWithValue('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  }
);

const getDashboardStatistic = createAsyncThunk(
  "statistic/get-dashboard-statistic",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/statistics/total_by_date_or_month?type=${params}`);

      if (status !== 200) {
        return action.rejectWithValue("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }

      const newData: any = {
        categories: [],
        Series: [
          {
            name: 'Nạp',
            data: []
          },
          {
            name: 'Rút',
            data: []
          }
        ]
      }

      data?.data.map((item: any) => {
        if (params === ReportTypeEnum.DATE) {
          newData.categories.push(moment(item.StatisticDate).format("DD-MM-YYYY"))
        } else {
          newData.categories.push(`${moment(item.Month).month(moment(item.Month).month()).format('MM')}`)
        }
        newData.Series[0].data.push(item.TotalDeposit)
        newData.Series[1].data.push(Math.abs(item.TotalWithdrawal))
      })

      return newData;
    } catch (err: any) {
      return action.rejectWithValue('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  }
);

const getMemberDepositWithdrawalStatistic = createAsyncThunk(
  "statistic/get-member-deposit-withdrawal-statistic",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/statistics/top_members?${convertToParameters(params)}`);

      if (status !== 200) {
        return action.rejectWithValue("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }

      const newData: any = {
        categories: [],
        Series: [
          {
            name: 'Nạp',
            data: []
          },
          {
            name: 'Rút',
            data: []
          }
        ]
      }

      data?.data.map((item: any) => {
        newData.categories.push(item.Username)

        newData.Series[0].data.push(item.TotalDeposit)
        newData.Series[1].data.push(Math.abs(item.TotalWithdrawal))
      })

      return newData;
    } catch (err: any) {
      return action.rejectWithValue('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  }
);

const getMemberWinLoseStatistic = createAsyncThunk(
  "statistic/get-member-win-lose-statistic",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/statistics/top_members?${convertToParameters(params)}`);

      if (status !== 200) {
        return action.rejectWithValue("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }

      const newData: any = {
        categories: [],
        Series: [
          {
            name: 'Thắng',
            data: []
          },
          {
            name: 'Thua',
            data: []
          }
        ]
      }

      data?.data.map((item: any) => {
        newData.categories.push(item.Username)
        if (item.TotalNetAmount >= 0) {
          newData.Series[0].data.push(item.TotalNetAmount)
          newData.Series[1].data.push(0)
        } else {
          newData.Series[0].data.push(0)
          newData.Series[1].data.push(Math.abs(item.TotalNetAmount))
        }

      })

      return newData;
    } catch (err: any) {
      return action.rejectWithValue('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  }
);

const getMemberPromotionRebateStatistic = createAsyncThunk(
  "statistic/get-member-promotion-rebate-statistic",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.get(`/statistics/top_members?${convertToParameters(params)}`);

      if (status !== 200) {
        return action.rejectWithValue("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }

      const newData: any = {
        categories: [],
        Series: [
          {
            name: 'Khuyến mãi',
            data: []
          },
          {
            name: 'Hoàn trả',
            data: []
          }
        ]
      }

      data?.data.map((item: any) => {
        newData.categories.push(item.Username)

        newData.Series[0].data.push(item.TotalPromotionAmount)
        newData.Series[1].data.push(item.TotalRebate)
      })

      return newData;
    } catch (err: any) {
      return action.rejectWithValue('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  }
);

const slice = createSlice({
  name: "statistic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSystemStatistic.pending, (state: any) => {
      state.loading.system = true;
      state.error.system = "";
    });
    builder.addCase(getSystemStatistic.fulfilled, (state: any, action: any) => {
      state.loading.system = false;
      state.data.system = action.payload;
      state.error.system = "success";
    });
    builder.addCase(getSystemStatistic.rejected, (state: any, action: any) => {
      state.loading.system = false;
      state.error.system = action.payload;
    });

    builder.addCase(getDashboardStatistic.pending, (state: any, action: any) => {
      state.loading.dashboard[action.meta.arg] = true;
      state.error.dashboard[action.meta.arg] = "";
    });
    builder.addCase(getDashboardStatistic.fulfilled, (state: any, action: any) => {
      state.loading.dashboard[action.meta.arg] = false;
      state.data.dashboard[action.meta.arg] = action.payload;
      state.error.dashboard[action.meta.arg] = "success";
    });
    builder.addCase(getDashboardStatistic.rejected, (state: any, action: any) => {
      state.loading.dashboard[action.meta.arg] = false;
      state.error.dashboard[action.meta.arg] = action.payload;
    });
    
    builder.addCase(getMemberDepositWithdrawalStatistic.pending, (state: any) => {
      state.loading.member.depositWithdrawal = true;
      state.error.member.depositWithdrawal = "";
    });
    builder.addCase(getMemberDepositWithdrawalStatistic.fulfilled, (state: any, action: any) => {
      state.loading.member.depositWithdrawal = false;
      state.data.member.depositWithdrawal = action.payload;
      state.error.member.depositWithdrawal = "success";
    });
    builder.addCase(getMemberDepositWithdrawalStatistic.rejected, (state: any, action: any) => {
      state.loading.member.depositWithdrawal = false;
      state.error.member.depositWithdrawal = action.payload;
    });
    builder.addCase(getMemberWinLoseStatistic.pending, (state: any) => {
      state.loading.member.winLose = true;
      state.error.member.winLose = "";
    });
    builder.addCase(getMemberWinLoseStatistic.fulfilled, (state: any, action: any) => {
      state.loading.member.winLose = false;
      state.data.member.winLose = action.payload;
      state.error.member.winLose = "success";
    });
    builder.addCase(getMemberWinLoseStatistic.rejected, (state: any, action: any) => {
      state.loading.member.winLose = false;
      state.error.member.winLose = action.payload;
    });
    builder.addCase(getMemberPromotionRebateStatistic.pending, (state: any) => {
      state.loading.member.promotionRebate = true;
      state.error.member.promotionRebate = "";
    });
    builder.addCase(getMemberPromotionRebateStatistic.fulfilled, (state: any, action: any) => {
      state.loading.member.promotionRebate = false;
      state.data.member.promotionRebate = action.payload;
      state.error.member.promotionRebate = "success";
    });
    builder.addCase(getMemberPromotionRebateStatistic.rejected, (state: any, action: any) => {
      state.loading.member.promotionRebate = false;
      state.error.member.promotionRebate = action.payload;
    });
  },
});

export const { actions: statisticActions } = slice;

export const useStatisticSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return {
    ...slice.actions,
    getSystemStatistic,
    getDashboardStatistic,
    getMemberDepositWithdrawalStatistic,
    getMemberWinLoseStatistic,
    getMemberPromotionRebateStatistic
  };
};
