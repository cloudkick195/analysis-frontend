import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectSlice = (state: RootState) => state?.statistic || initialState;

export const selectStatistic = createSelector([selectSlice], state => state);
