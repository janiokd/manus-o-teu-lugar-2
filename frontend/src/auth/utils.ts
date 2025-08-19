import { jwtDecode, JwtPayload } from 'jwt-decode';
// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

interface CustomJwtPayload extends JwtPayload {
  role?: string; // Example: Custom claims
}

// ----------------------------------------------------------------------

// function jwtDecode(token: string) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split('')
//       .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//       .join('')
//   );

//   return JSON.parse(jsonPayload);
// }

// ----------------------------------------------------------------------

export const isValidToken = (access_token: string) => {
  if (!access_token) {
    return false;
  }
  const decoded: CustomJwtPayload = jwtDecode(access_token);

  const currentTime = Date.now() / 1000;

  return decoded.exp ? decoded.exp > currentTime : false;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;
  const currentTime = Date.now();
  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;
  clearTimeout(expiredTimer);
  expiredTimer = setTimeout(() => {
    alert('Token expired');
    localStorage.removeItem('access_token');
    const currentPath = window.location.pathname; // Store original path
    localStorage.setItem('redirectPath', currentPath);
    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (access_token: string | null) => {
  if (access_token) {
    localStorage.setItem('access_token', access_token);

    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

    // This function below will handle when token is expired
    const { exp } = jwtDecode<JwtPayload>(access_token); // ✅ Explicitly type as JwtPayload
    tokenExpired(exp || 0); // ✅ Ensures exp is always a number
  } else {
    localStorage.removeItem('access_token');

    delete axios.defaults.headers.common.Authorization;
  }
};