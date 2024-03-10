import { createSlice } from '@reduxjs/toolkit';
import { idGenerator } from '../../util/util';
import { FORM_TYPE, FormEntity } from '../../types/Form';
import { formFieldsConfig } from 'src/config/config';

const initialState = Object.values(FORM_TYPE).reduce((acc, cur) => {
  acc[cur] = JSON.parse(localStorage.getItem(cur) || '[]');
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
      const value = action.payload;

      //check if user type and append default password accordingly
      if (_type === FORM_TYPE.USERS) {
        //get password field in User type to set the password
        const passwordField = formFieldsConfig[_type].find((e) => e.passwordField)?.name;
        if (passwordField) {
          value[passwordField] = '12345';
        }
      }

      state[_type] = [...state[_type], { ...value, id: idGenerator(_type) }];
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
      state[_type].splice(index, 1, { ...state[_type][index], ...action.payload }); //spreading old value followed by new value (cases like password are never updated from UI so relaying such field to the store along with new values)
      state[_type] = [...state[_type]];
      localStorage.setItem(_type, JSON.stringify(state[_type]));
    }
  }
});

export const { addToStore, deleteFromStore, updateValueInStore } = formSlice.actions;

export default formSlice.reducer;
