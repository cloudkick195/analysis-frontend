import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state?.ui || initialState;

export const selectUi = createSelector([selectSlice], state => state);
