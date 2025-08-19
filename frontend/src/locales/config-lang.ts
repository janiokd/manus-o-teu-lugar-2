// @mui
import { enUS, esES, ptBR } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'Portugal',
    value: 'br',
    systemValue: ptBR,
    icon: '/assets/icons/flags/ic_flag_br.svg',
  },
  {
    label: 'english',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'spanish',
    value: 'es',
    systemValue: esES,
    icon: '/assets/icons/flags/ic_flag_es.svg',
  },
  // {
  //   label: 'Portuguese',
  //   value: 'pt',
  //   systemValue: ptPT,
  //   icon: '/assets/icons/flags/ic_flag_pt.svg',
  // },
];

export const defaultLang = allLangs[0]; // English
