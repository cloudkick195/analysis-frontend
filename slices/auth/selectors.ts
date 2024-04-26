import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

export const selectSlice = (state: RootState) => state?.auth || initialState;

export const selectAuth = createSelector([selectSlice], state => state);
