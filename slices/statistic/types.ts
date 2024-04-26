export interface StatisticState {
  loading: {
    system: boolean,
    agency: boolean,
    member: {
      depositWithdrawal: boolean,
      winLose: boolean,
      promotionRebate: boolean
    },
    incomeAndExpenditure: boolean
    dashboard:{
      month: boolean,
      date: boolean
    }
  };
  error: {
    system: string,
    agency: string,
    member: {
      depositWithdrawal: string,
      winLose: string,
      promotionRebate: string
    },
    incomeAndExpenditure: string
    dashboard:{
      month: string,
      date: string
    }
  };
  data: {
    system: any,
    agency: any,
    member: {
      depositWithdrawal: any,
      winLose: any,
      promotionRebate: any
    },
    incomeAndExpenditure: any
    dashboard:{
      month: any,
      date: any
    }
  };
}
