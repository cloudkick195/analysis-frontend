import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectSlice = (state: RootState) => state?.incomeAndExpenditure || initialState;

export const selectIncomeExpenditure = createSelector([selectSlice], state => state);
