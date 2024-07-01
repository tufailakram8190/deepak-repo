
import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  data: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('https://tetratrionofficial.github.io/hosted_api/assignment_dashboard.json')
      .then((response) => response.text())
      .then((text) => {
        // Remove the unwanted string 'Apollo'
        const cleanedText = text.replace('Apollo', '');
        // Parse the cleaned text to JSON
        const data = JSON.parse(cleanedText);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_ERROR', payload: error });
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
