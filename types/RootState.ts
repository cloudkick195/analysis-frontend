import { UiState } from "slices/ui/types";
import { AuthState } from "slices/auth/types";
import { StatisticState } from "slices/statistic/types";
import { IncomeAndExpenditureState } from "slices/income-expenditure/types";
import { UserState } from "slices/user/types";
import { RoleState } from "slices/role/types";
import { PermissionState } from "slices/permission/types";
import { MemberState } from "slices/member/types";

export interface RootState {
  ui: UiState;
  auth?: AuthState;
  statistic?: StatisticState;
  incomeAndExpenditure?: IncomeAndExpenditureState;
  user?: UserState
  role?: RoleState
  permission?: PermissionState,
  member?: MemberState
}
