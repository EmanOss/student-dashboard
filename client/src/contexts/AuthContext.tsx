import React, { useReducer, createContext, Dispatch } from 'react';

type State = {
  isAuthenticated: boolean | null;
};

type Action = { type: 'LOGIN' } | { type: 'LOGOUT' };

const initialState: State = {
  isAuthenticated: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN', { ...state, isAuthenticated: true });
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}

const AuthContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({ state: initialState, dispatch: () => null });

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };