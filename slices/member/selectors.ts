import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectSlice = (state: RootState) => state?.member || initialState;

export const selectMember = createSelector([selectSlice], state => state);
