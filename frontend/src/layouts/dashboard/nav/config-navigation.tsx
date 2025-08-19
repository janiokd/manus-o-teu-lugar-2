import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';

const navConfig = [
  {
    subheader: 'general',
    items: [
      { title: 'advertise', path: PATH_DASHBOARD.advertise },
      {
        title: 'featured_properties',
        path: PATH_PAGE.properties,
      },
      { title: 'services', path: PATH_PAGE.services },
      {
        title: 'investment_simulations',
        path: PATH_PAGE.investment,
      },
      { title: 'about_us', path: PATH_PAGE.about },
    ],
  },
];

export default navConfig;
