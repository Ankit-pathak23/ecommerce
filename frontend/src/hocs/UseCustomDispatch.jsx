import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
export const useCustomDispatch = (action) => {
 


 const dispatch = useDispatch();
 return useCallback(() => dispatch(action), [dispatch, action]);
// Return the custom dispatch function
}


