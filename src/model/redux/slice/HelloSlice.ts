import {createSlice} from '@reduxjs/toolkit'

interface HelloInitialStateType {
  message: string
}; // the type of the initial state of slice.

const getInitialState = (): string => {
  try {
    const state = localStorage.getItem('State');
    if (!state){
      throw new Error('State not found');
    }
    const message = JSON.parse(state).Hello.message
    if (message && typeof message === "string") {
      return message;
    }
  } catch (error) {
    return 'Hello from redux';
  }
  return 'Hello from redux';
};


const initialState: HelloInitialStateType = {
  message: getInitialState()
};

const HelloSlice = createSlice({
  name: 'HelloSlice', //must be unique for every slice. convention is to put the same as file name
  initialState, //the initial state of the slice
  reducers: {
    changeMessage: (state, action:{payload:string}) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = '';
    },
    initialMessage: (state) => {
      state.message = initialState.message;
    },
    defaultMessage: (state) => {
      state.message = 'Hello from redux';
    }
  }, // action methods
});

export const HelloServices = {
  actions: HelloSlice.actions, //This includes all the action methods written above
};

const HelloReducer = HelloSlice.reducer; //This is stored in the main store

export default HelloReducer;