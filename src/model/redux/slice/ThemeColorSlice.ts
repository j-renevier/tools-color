import {createSlice} from '@reduxjs/toolkit'
import { isThemeColor } from '../../../util/type';
import ThemeColor, { TThemeColor } from '../../../util/ThemeColorType';

interface ThemeColorInitialStateType {
  value: TThemeColor
}; // the type of the initial state of slice.

const getInitialState = (): TThemeColor => {
  try {
    const state = localStorage.getItem('State');
    if (!state){
      if (!window.matchMedia) {
        throw new Error('State and Media not found');
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        return ThemeColor.DARK;
      } else {
        return ThemeColor.LIGHT;
      }
    }
    const theme = JSON.parse(state).Theme.value;
    if (theme && isThemeColor(theme)) {
      return theme;
    }
  } catch (error) {
    return ThemeColor.DARK;
  }
  return ThemeColor.DARK;
};

const initialState: ThemeColorInitialStateType = {
  value: getInitialState()
};

const ThemeColorSlice = createSlice({
  name: 'ThemeColorSlice', //must be unique for every slice. convention is to put the same as file name
  initialState, //the initial state of the slice
  reducers: {
    changeTheme: (state, action:{payload:TThemeColor}) => {
      state.value = action.payload;
    },
    defaultTheme: (state) => {
      state.value = initialState.value;
    }
  }, // action methods
});

export const ThemeColorServices = {
  actions: ThemeColorSlice.actions, //This includes all the action methods written above
};

const ThemeColorReducer = ThemeColorSlice.reducer; //This is stored in the main store

export default ThemeColorReducer;