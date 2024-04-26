import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectSlice = (state: RootState) => state?.role || initialState;

export const selectRole = createSelector([selectSlice], state => state);
