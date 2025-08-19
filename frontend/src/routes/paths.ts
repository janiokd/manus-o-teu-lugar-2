// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_PAGE = {
  buy: '/buy',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  about: '/about-us',
  services: '/services',
  properties: '/properties',
  investment: '/investment',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  advertise: path(ROOTS_DASHBOARD, '/advertise'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
  },
};
