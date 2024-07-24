import {createSlice} from '@reduxjs/toolkit'

interface CountInitialStateType {
  value: number
}; // the type of the initial state of slice.

const getInitialState = (): number => {
  try {
    const state = localStorage.getItem('State');
    if (!state){
      throw new Error('State not found');
    }
    const value = JSON.parse(state).Count.value;
    if (value) {
      return Number(value);
    }
  } catch (error) {
    return 0;
  }
  return 0;
};

const initialState: CountInitialStateType = {
  value: getInitialState()
};

const CountSlice = createSlice({
  name: 'CountSlice', //must be unique for every slice. convention is to put the same as file name
  initialState, //the initial state of the slice
  reducers: {
    changeCount: (state, action:{payload:number}) => {
      state.value = action.payload;
    },
    clearCount: (state) => {
      state.value = 0
    },
    defaultCount: (state) => {
      state.value = initialState.value;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  }, // action methods
});

export const CountServices = {
  actions: CountSlice.actions, //This includes all the action methods written above
};

const CountReducer = CountSlice.reducer; //This is stored in the main store

export default CountReducer;