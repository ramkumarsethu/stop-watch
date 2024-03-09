import { createSlice } from '@reduxjs/toolkit';
import { idGenerator } from '../../util/util';
import { FORM_TYPE, FormEntity } from '../../types/Form';

const initialState = Object.values(FORM_TYPE).reduce((acc, cur) => {
  acc[cur] = JSON.parse(localStorage.getItem(cur) || '[]');
  console.log(acc);
  return acc;
}, {} as Record<FORM_TYPE, Array<FormEntity>>);

/**
 * slice that creates actions and reducers for Roles & Users
 */
const formSlice = createSlice({
  name: 'entities',
  initialState: initialState,
  reducers: {
    addToStore: (state, action: { payload: FormEntity }) => {
      const { _type } = action.payload;
      state[_type] = [...state[_type], { ...action.payload, id: idGenerator(_type) }];
      localStorage.setItem(_type, JSON.stringify(state[_type]));
    },

    deleteFromStore: (state, action: { payload: FormEntity }) => {
      const { _type, id } = action.payload;
      state[_type] = state[_type].filter((entity) => entity.id !== id);
      localStorage.setItem(_type, JSON.stringify(state[_type]));
    },

    updateValueInStore: (state, action: { payload: FormEntity }) => {
      const { _type, id } = action.payload;
      const index = state[_type].findIndex((entity) => entity.id === id);
      state[_type].splice(index, 1, action.payload);
      state[_type] = [...state[_type]];
      localStorage.setItem(_type, JSON.stringify(state[_type]));
    }
  }
});

export const { addToStore, deleteFromStore, updateValueInStore } = formSlice.actions;

export default formSlice.reducer;
