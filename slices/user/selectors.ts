import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectSlice = (state: RootState) => state?.user || initialState;

export const selectUser = createSelector([selectSlice], state => state);
