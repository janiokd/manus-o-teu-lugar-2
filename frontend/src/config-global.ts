// routes
// import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.HOST_API || '';

export const MAP_API = process.env.MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = '/'; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 40,

  H_MAIN_NAV: 70,
  H_MAIN_HEADER: 40,
  H_MAIN_SPACING: 50,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_MINI: 22,
  NAV_ITEM_HORIZONTAL: 22,
};
