import { atom } from "recoil";
export const courseState = atom({
    key: 'courseState', // unique ID (with respect to other atoms/selectors)
    default: {
        course : '',
        isLoading : true
    } // default value (aka initial value)
  });