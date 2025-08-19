// assets
import BedIcon from 'src/assets/icons/BedIcon';
import CarIcon from 'src/assets/icons/CarIcon';
import BathIcon from 'src/assets/icons/BathIcon';

export const ICONS: Record<string, React.ElementType> = {
  bedrooms: BedIcon,
  bathroom: BathIcon,
  livingroom: BedIcon,
  vacancies: CarIcon,
  kitchen: BedIcon,
  swimmingpool: BedIcon,
  sauna: BedIcon,
  gym: BedIcon,
  courts: BedIcon,
  cinema: BedIcon,
  gamesroom: BedIcon,
  eventsroom: BedIcon,
  barbecuegrills: BedIcon,
};

export const categories = [
  {
    label: 'apart',
    value: 'apart',
  },
  {
    label: 'house',
    value: 'house',
  },
  {
    label: 'room',
    value: 'room',
  },
  {
    label: 'commercial',
    value: 'commercial',
  },
  {
    label: 'farm',
    value: 'farm',
  },
  {
    label: 'sitesFarm',
    value: 'sitesFarm',
  },
  {
    label: 'plot',
    value: 'plot',
  },
  {
    label: 'land',
    value: 'land',
  },
  {
    label: 'garagesParking',
    value: 'garagesParking',
  },
  {
    label: 'billboard',
    value: 'billboard',
  },
];

export const negotiations = [
  { label: 'sale', value: 'sale' },
  { label: 'rental', value: 'rental' },
  { label: 'leasePartnership', value: 'leasePartnership' },
  { label: 'builtToSuit', value: 'builtToSuit' },
];

export const locations = [
  { label: 'write_location', value: 'write_location' },
  { label: 'draw_location', value: 'draw_location' },
];

export const owners = [
  { label: 'owner', value: 'owner' },
  { label: 'broker', value: 'broker' },
];

export const rentalPeriodOptions = [
  { value: 'days', label: 'days' },
  { value: 'weeks', label: 'weeks' },
  { value: 'months', label: 'months' },
];

export const securities = [
  { label: 'by_phone_and_chat', value: 'phone_and_chart' },
  { label: 'only_by_chat', value: 'chat' },
  { label: 'only_by_phone', value: 'phone' },
];

type CharacterOption = {
  value: string;
  type: string;
};

export type CharacterItem = {
  name: string;
  options: CharacterOption[];
};

export type Character = {
  name: string;
  options: CharacterItem[];
};

export const characters: Character[] = [
  {
    name: 'apart',
    options: [
      {
        name: 'private_area',
        options: [
          { value: 'area', type: 'number' },
          { value: 'number_of_bedrooms', type: 'number' },
          { value: 'number_of_bathrooms', type: 'number' },
          { value: 'number_of_living_rooms', type: 'number' },
          { value: 'number_of_car_in_garage', type: 'number' },
          { value: 'number_of_kichens', type: 'number' },
        ],
      },
      {
        name: 'common_area',
        options: [
          { value: 'area', type: 'number' },
          { value: 'swimming_pool', type: 'boolean' },
          { value: 'sauna', type: 'boolean' },
          { value: 'gym', type: 'boolean' },
          { value: 'multi_sports_court', type: 'boolean' },
          { value: 'cinema', type: 'boolean' },
          { value: 'games_room', type: 'boolean' },
          { value: 'events_room', type: 'boolean' },
          { value: 'barbecue_grills', type: 'boolean' },
        ],
      },
    ],
  },
  {
    name: 'house',
    options: [
      {
        name: '',
        options: [
          { value: 'area', type: 'number' },
          { value: 'number_of_bedrooms', type: 'number' },
          { value: 'number_of_bathrooms', type: 'number' },
          { value: 'number_of_living_rooms', type: 'number' },
          { value: 'number_of_kichens', type: 'number' },
          { value: 'number_of_car_in_garage', type: 'number' },
          { value: 'swimming_pool', type: 'boolean' },
          { value: 'sauna', type: 'boolean' },
          { value: 'gym', type: 'boolean' },
          { value: 'multi_sports_court', type: 'boolean' },
          { value: 'cinema', type: 'boolean' },
          { value: 'games_room', type: 'boolean' },
          { value: 'events_room', type: 'boolean' },
          { value: 'barbecue_grills', type: 'boolean' },
          //
        ],
      },
    ],
  },
  {
    name: 'room',
    options: [
      {
        name: '',
        options: [
          { value: 'area', type: 'number' },
          { value: 'number_of_bedrooms_in_house_apart', type: 'number' },
          { value: 'maximum_number_of_people_in_house', type: 'number' },
          { value: 'individual', type: 'boolean' },
          { value: 'shared_between_how_many_people', type: 'boolean' },
          { value: 'private_bathroom', type: 'boolean' },
          { value: 'shared_bathroom_between_how_many_bedrooms', type: 'boolean' },
          { value: 'bills_included', type: 'boolean' },
          { value: 'wi_fi', type: 'boolean' },
          { value: 'common_room', type: 'boolean' },
        ],
      },
    ],
  },
  {
    name: 'commercial',
    options: [
      {
        name: '',
        options: [
          { value: 'area', type: 'number' },
          { value: 'stores', type: 'number' },
          { value: 'offices', type: 'number' },
          { value: 'internal_divisions', type: 'number' },
          { value: 'number_of_bathrooms', type: 'number' },
          { value: 'number_of_car_in_garage', type: 'number' },
          { value: 'kitchen_pantry', type: 'boolean' },
          { value: 'meeting_rooms', type: 'boolean' },
          { value: 'open_space_for_coworking', type: 'boolean' },
        ],
      },
    ],
  },
  {
    name: 'farm',
    options: [
      {
        name: '',
        options: [
          { value: 'area', type: 'number' },
          { value: 'swimming_pool', type: 'boolean' },
          { value: 'sauna', type: 'boolean' },
          { value: 'gym', type: 'boolean' },
          { value: 'multi_sports_court', type: 'boolean' },
          { value: 'cinema', type: 'boolean' },
          { value: 'games_room', type: 'boolean' },
          { value: 'events_room', type: 'boolean' },
          { value: 'barbecue_grills', type: 'boolean' },
          { value: 'lake', type: 'boolean' },
          { value: 'river', type: 'boolean' },
          { value: 'beach', type: 'boolean' },
          { value: 'marina', type: 'boolean' },
          { value: 'greenhouses', type: 'boolean' },
          { value: 'pasture', type: 'boolean' },
          { value: 'farms', type: 'boolean' },
          { value: 'orchard', type: 'boolean' },
          { value: 'forest', type: 'boolean' },
        ],
      },
    ],
  },
  {
    name: 'sitesFarm',
    options: [
      {
        name: '',
        options: [
          { value: 'area', type: 'number' },
          { value: 'buildings', type: 'boolean' },
          { value: 'type_of_land_use', type: '' }, // Insert words
          { value: 'activities_carried_out_land', type: '' }, // Insert words (Agriculture or other activities)
          { value: 'greenhouses', type: 'boolean' },
          { value: 'pasture', type: 'boolean' },
          { value: 'farms', type: 'boolean' },
          { value: 'orchard', type: 'boolean' },
          { value: 'forest', type: 'boolean' },
          { value: 'native_forest', type: 'boolean' },
          { value: 'river', type: 'boolean' },
          { value: 'lake', type: 'boolean' },
          { value: 'beach', type: 'boolean' },
          { value: 'swimming_pool', type: 'boolean' },
          { value: 'sauna', type: 'boolean' },
          { value: 'gym', type: 'boolean' },
          { value: 'multi_sports_court', type: 'boolean' },
          { value: 'cinema', type: 'boolean' },
          { value: 'games_room', type: 'boolean' },
          { value: 'events_room', type: 'boolean' },
          { value: 'barbecue_grills', type: 'boolean' },
        ],
      },
    ],
  },
  {
    name: 'plot',
    options: [
      {
        name: 'private_area',
        options: [
          { value: 'area', type: 'number' },
          { value: 'urban', type: 'boolean' },
          { value: 'rural', type: 'boolean' },
          { value: 'subdivision', type: 'boolean' },
          { value: 'condominium', type: 'boolean' },
        ],
      },
      {
        name: 'common_area',
        options: [
          { value: 'area', type: 'number' },
          { value: 'swimming_pool', type: 'boolean' },
          { value: 'sauna', type: 'boolean' },
          { value: 'gym', type: 'boolean' },
          { value: 'multi_sports_court', type: 'boolean' },
          { value: 'cinema', type: 'boolean' },
          { value: 'games_room', type: 'boolean' },
          { value: 'events_room', type: 'boolean' },
          { value: 'barbecue_grills', type: 'boolean' },
        ],
      },
    ],
  },
  {
    name: 'land',
    options: [
      {
        name: '',
        options: [
          { value: 'area', type: 'number' },
          { value: 'urban', type: 'boolean' },
          { value: 'rural', type: 'boolean' },
          { value: 'buildig_authorization', type: 'boolean' },
        ],
      },
    ],
  },
  {
    name: 'garagesParking',
    options: [
      {
        name: '',
        options: [
          { value: 'area', type: 'number' },
          { value: 'urban', type: 'boolean' },
          { value: 'rural', type: 'boolean' },
          { value: 'hangar', type: 'boolean' },
          { value: 'marina', type: 'boolean' },
        ],
      },
    ],
  },
  {
    name: 'billboard',
    options: [
      {
        name: '',
        options: [
          { value: 'area', type: 'number' },
          { value: 'urban', type: 'boolean' },
          { value: 'rural', type: 'boolean' },
          { value: 'sports_media', type: 'boolean' },
          { value: 'hanger', type: 'boolean' },
          { value: 'marina', type: 'boolean' },
        ],
      },
    ],
  },
];

type FeaturesType = {
  [category: string]: {
    [group: string]: {};
  };
};

// eslint-disable-next-line import/no-mutable-exports
let features: FeaturesType = {};
characters.map((category) => {
  features[category.name] = {};
  category.options.map((group) => {
    if (group.name) {
      group.options.map((option) => {
        let value;

        if (option.type === 'number') {
          value = 0;
        } else if (option.type === 'boolean') {
          value = 'no';
        } else {
          value = '';
        }

        features = {
          ...features,
          [category.name]: {
            ...features[category.name],
            [group.name]: {
              ...features[category.name][group.name],
              [option.value]: value,
            },
          },
        };
        return option;
      });
    } else {
      group.options.map((option) => {
        let value;

        if (option.type === 'number') {
          value = 0;
        } else if (option.type === 'boolean') {
          value = 'no';
        } else {
          value = '';
        }

        features = {
          ...features,
          [category.name]: {
            ...features[category.name],
            [option.value]: value,
          },
        };
        return option;
      });
    }

    return group;
  });

  return category;
});

export { features };
