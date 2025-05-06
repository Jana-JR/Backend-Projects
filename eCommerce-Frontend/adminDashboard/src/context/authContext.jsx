import { createContext, useReducer, useEffect, useCallback } from "react";
import axios from "../Utils/axios";
import { useNavigate, useLocation } from "react-router-dom";

const INITIAL_STATE = {
  user: null,
  loading: true,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { user: action.payload, loading: false, error: null };
    case "LOGIN_FAILURE":
      return { user: null, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...INITIAL_STATE, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = useCallback(async () => {
    dispatch({ type: "LOGIN_START" });

    try {
      const { data } = await axios.get("/auth/check-auth", { withCredentials: true });

      const user = data.user || {
        _id: data.userId,
        email: "",
        isAdmin: data.isAdmin,
      };

      if (!user._id) throw new Error("User ID missing");

      if (data.accessToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        dispatch({ type: "LOGOUT" });
      } else if (status === 429) {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: {
            code: "RATE_LIMITED",
            message: "Too many requests. Please wait.",
          },
        });
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: {
            code: "NETWORK_ERROR",
            message: "Cannot connect to auth service.",
          },
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (state.loading) return;

    const path = location.pathname;
    const onLoginPage = path === "/login";

    if (!state.user && !onLoginPage) {
      sessionStorage.setItem("redirectAfterLogin", path);
      navigate("/login", { replace: true });
    }

    if (state.user && onLoginPage) {
      const redirectTo = sessionStorage.getItem("redirectAfterLogin") || "/";
      sessionStorage.removeItem("redirectAfterLogin");
      navigate(redirectTo, { replace: true });
    }
  }, [state.loading, state.user, location.pathname, navigate]);

  useEffect(() => {
    if (!state.error) return;
    const timer = setTimeout(() => dispatch({ type: "CLEAR_ERROR" }), 100);
    return () => clearTimeout(timer);
  }, [state.error]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
