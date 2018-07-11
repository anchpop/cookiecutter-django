import { SET_NONCE } from '../actions/actionConstants' 

export default function nonce(state = "Nonce", action) {
    switch (action.type) {
      case SET_NONCE:
        return action.nonce
      default:
        return state;
    }
  }