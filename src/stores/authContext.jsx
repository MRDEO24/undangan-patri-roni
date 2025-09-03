import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useRef, useEffect } from 'react';
import { currentUser } from '../data/user';
import { login, register } from '../data/authentication';
import { getToken, setToken as setTokenCookies, verifyToken } from '../utils/auth';
import { createStore } from 'zustand';
import Cookies from 'js-cookie';
import { TOKEN_COOKIES, USER_LOCAL_STORAGE } from '../constants/auth';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const queryClient = useQueryClient();
  const token = getToken();
  const { isFetching, isPending, refetch: fetchCurrentUser } = useQuery(['user'], currentUser, {
    enabled: !!token,
  });
  console.log(localStorage.getItem(USER_LOCAL_STORAGE));
  const userLocalStorage = localStorage.getItem(USER_LOCAL_STORAGE) !== undefined ? JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE)) : null;
  const isLoadingUser = !userLocalStorage && isFetching && isPending;
  const { isLoading: isLoadingRegister, mutateAsync: mutateRegister } = useMutation(register);
  const { isLoading: isLoadingLogin, mutateAsync: mutateLogin } = useMutation(login, {
    onError: () => dispatchEvent(new ErrorEvent('error', {
      error: new Error('Email atau password anda salah'),
    })),
    onSuccess: (response) => {
      setTokenCookies(response.jwt);
      store.current.getState().setToken(response.jwt);
      store.current.getState().fetchUser();
    },
  });
  const isLoadingCurrentUser = isLoadingUser ?? !!token;
  const isLoading = isLoadingLogin || isLoadingRegister || isLoadingCurrentUser;
  const store = useRef(createStore(
    (set) => ({
      register: mutateRegister,
      login: mutateLogin,
      isAuthenticated: Boolean(token && userLocalStorage),
      user: userLocalStorage,
      token: null,
      setToken: (token) => set({ token }),
      fetchUser: async () => {
        const user = await fetchCurrentUser();
        if (user.data) {
          localStorage.setItem(USER_LOCAL_STORAGE, JSON.stringify(user.data));
          set({ user: user.data });
        } else {
          store.current.getState().logout();
        }
      },
      logout: () => {
        Cookies.remove(TOKEN_COOKIES);
        localStorage.removeItem(USER_LOCAL_STORAGE);
        queryClient.removeQueries({ queryKey: ['user'], exact: true });
        set({
          user: null,
          token: null,
        });
      },
      isLoading,
    }),
  ));

  useEffect(() => {
    if (store.current.getState().isLoading !== isLoading) {
      store.current.setState({ isLoading });
    }
  }, [isLoading]);

  useEffect(() => {
    const unSub = store.current.subscribe(({ token, user, isAuthenticated }) => {
      const authenticated = Boolean(token && user);
      if (isAuthenticated !== authenticated) {
        store.current.setState({ isAuthenticated: authenticated });
      }

      if (authenticated && !verifyToken(token)) {
        store.current.getState().logout();
      }
    });

    if (token) {
      store.current.getState().fetchUser();
      store.current.setState({ token });
    }

    return unSub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={store.current}>
      {children}
    </AuthContext.Provider>
  );
}