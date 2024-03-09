import { configureStore } from '@reduxjs/toolkit';
import FormSliceReducer from './slices/FormSlice';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

/**
 * Redux store for state management on the client side
 */
export const store = configureStore({
  reducer: {
    entities: FormSliceReducer
  }
});

/* 
Following types are created to infer State and Dispatch to the store objects.
This is to gain type-safety with our store operations
*/
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
