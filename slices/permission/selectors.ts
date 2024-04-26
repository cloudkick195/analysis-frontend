import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectSlice = (state: RootState) => state?.permission || initialState;

export const selectPermission = createSelector([selectSlice], state => state);
