import { createSlice } from '@reduxjs/toolkit';
import { FORM_TYPE, FormEntity } from '../../types/Form';
import { userFormFieldsConfig } from 'src/config/fields/users';

const initialState: { LOGIN: FormEntity | Record<string, unknown> } = {
  LOGIN: JSON.parse(localStorage.getItem(FORM_TYPE.LOGIN) || '{}')
};

/**
 * slice that creates actions and reducers for login function
 */
const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    login: (state, action: { payload: FormEntity }) => {
      const passwordField = userFormFieldsConfig.find((e) => e.passwordField)?.name;

      //excluding password when storing the login info in store
      const newValue = Object.keys(action.payload).reduce((acc, cur) => {
        if (passwordField && cur !== passwordField) {
          acc[cur] = action.payload[cur];
        }
        return acc;
      }, {} as FormEntity);

      state.LOGIN = { ...newValue, _type: FORM_TYPE.LOGIN };
      localStorage.setItem(FORM_TYPE.LOGIN, JSON.stringify(state.LOGIN));
    },

    logout: (state) => {
      state.LOGIN = {};
      localStorage.setItem(FORM_TYPE.LOGIN, JSON.stringify(state.LOGIN));
    }
  }
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
