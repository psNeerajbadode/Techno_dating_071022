// import {  } from '../actions/actionsTypes';

import { STAP } from '../actions/ActionType';

const initialState = {};
function Stapreducer(state = initialState, action) {
  switch (action.type) {
    case STAP:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default Stapreducer;
