import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, Grid, Link, Modal, Stack, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// routes
import { PATH_PAGE } from 'src/routes/paths';
// assets
import { categories } from 'src/assets/data';
import AdvancedIcon from 'src/assets/icons/AdvancedIcon';
import backgroundImage from 'src/assets/images/background.png';
// config-global
import { HEADER } from 'src/config-global';
// components
import RoundButton from 'src/components/customs/RoundButton';
import ActivateButtonGroup from 'src/components/customs/ActiveButtonGroup';
import { RHFMultiSelect, RHFPlaceAutoComplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const BackgroundImageBox = styled(Box)(() => ({
  width: '100%',
  height: `calc(100vh - ${HEADER.H_MAIN_HEADER + HEADER.H_MAIN_NAV}px)`, // Full height
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '60px',
  backgroundImage: `url(${backgroundImage.src}), radial-gradient(circle, #000000E5, #00000000),radial-gradient(circle, #00000000, #00000080)`,
  backgroundBlendMode: 'overlay',
  backgroundSize: 'cover', // Scale the image to cover the box
  backgroundRepeat: 'no-repeat', // Prevent repeating the background
  backgroundPosition: 'center', // Center the background image
}));

interface HomeHeroProps {
  setLocation: (location: google.maps.places.PlaceResult) => void;
}

export default function HomeHero({ setLocation }: HomeHeroProps) {
  const { t } = useLocales();
  const [searchQuery, setSearchQuery] = useState('');
  const [locations, setLocations] = useState<google.maps.places.PlaceResult[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  console.log(setIsSearching)

  const moveScreenToMap = () => {
    const mapElement = document.getElementById('mapWithDrawing');
    if (mapElement?.offsetTop) {
      window.scrollTo({
        behavior: 'smooth',
        top: (mapElement?.offsetTop || 0) - 300,
      });
    }
  };

  const getSimilarLocations = async (query: string) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      query,
      fields: ['formatted_address', 'geometry', 'name'],
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setLocations(results); // Set locations to the results
        if (results.length > 1) {
          setModalOpen(true);
        } else {
          setSearchQuery(results?.[0]?.formatted_address || '');
          setLocation(results[0]);
          moveScreenToMap();
        }
      } else {
        console.error('Places search failed: ', status);
      }
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectPlace = (place: google.maps.places.PlaceResult) => {
    setSearchQuery(place.formatted_address || '');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <BackgroundImageBox>
      <Stack maxWidth="lg" alignItems="center" sx={{ width: 1 }}>
        <Typography
          textAlign="center"
          sx={{
            maxWidth: '799px',
            color: 'common.white',
            fontWeight: 700,
            fontSize: '64px',
            lineHeight: '64px',
            mt: '103px',
          }}
        >
          {`${t('homePage.title')}`}
        </Typography>

        <Stack spacing={1.5} sx={{ width: 1, mt: '80px' }}>
          <ActivateButtonGroup name="services" color="secondary" />

          <Stack
            direction="row"
            sx={{
              mt: 1,
              width: 1,
              height: '80px',
              borderRadius: '90px',
              alignItems: 'center',
              bgcolor: 'common.white',
              justifyContent: 'space-between',
              padding: '10px 20px 10px 40px',
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ width: 1 }}
            >
              <Grid container>
                <Grid item xs={5.8}>
                  <RHFMultiSelect
                    // chip
                    checkbox
                    name="categories"
                    label={t(`category`)}
                    placeholder={t(`select`)}
                    variant="standard"
                    options={categories.map((category) => ({
                      ...category,
                      label: t(category.label),
                    }))}
                    sx={{
                      '& .MuiInputBase-root': { borderBottom: 'none' }, // ✅ Ensures no bottom border
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // ✅ Removes border for "outlined" variant
                      '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' }, // ✅ No border on hover
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }, // ✅ No border on focus
                      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                        display: 'none',
                      }, // ✅ Completely removes underline
                    }}
                  />
                </Grid>
                <Grid item xs={0.4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Divider orientation="vertical" />
                </Grid>
                <Grid item xs={5.8}>
                  <RHFPlaceAutoComplete
                    fullWidth
                    name="location"
                    label={t(`location`)}
                    sx={{
                      '& .MuiInputBase-root': { borderBottom: 'none' }, // ✅ Ensures no bottom border
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // ✅ Removes border for "outlined" variant
                      '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' }, // ✅ No border on hover
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' }, // ✅ No border on focus
                      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
                        display: 'none',
                      }, // ✅ Completely removes underline
                    }}
                    value={searchQuery}
                    onChange={handleSearchInput}
                    onSelectPlace={handleSelectPlace}
                  />
                </Grid>
              </Grid>
              <Stack direction="row" spacing={1}>
                <Link
                  component={NextLink}
                  href={PATH_PAGE.properties}
                  underline="none"
                  color="inherit"
                >
                  <RoundButton
                    size="large"
                    variant="outlined"
                    startIcon={<AdvancedIcon />}
                    sx={{ whiteSpace: 'nowrap' }}
                  >
                    {t(`homePage.advanced_search`)}
                  </RoundButton>
                </Link>
                <RoundButton
                  size="large"
                  color="secondary"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{ whiteSpace: 'nowrap' }}
                  // onClick={() => getLocations(searchQuery)}
                  onClick={() => getSimilarLocations(searchQuery)}
                >
                  {isSearching ? t(`homePage.searching`) : t(`homePage.search_for_property`)}
                </RoundButton>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            padding: 3,
            backgroundColor: 'white',
            borderRadius: '8px',
            maxWidth: '500px',
            margin: 'auto',
            marginTop: '100px',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Similar Locations:
          </Typography>

          {locations.length > 0 ? (
            <Stack spacing={2}>
              {locations.map((location, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: 2,
                    borderRadius: '8px',
                    cursor: 'pointer', // Indicate that it's clickable
                    transition: 'background-color 0.3s', // Smooth transition for hover effect
                    '&:hover': {
                      backgroundColor: '#f0f0f0', // Light gray background on hover
                    },
                  }}
                  onClick={() => {
                    setLocation(location);
                    moveScreenToMap();
                    handleCloseModal();
                  }}
                >
                  <Typography variant="body1">{location.formatted_address}</Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography>No locations found</Typography>
          )}
        </Box>
      </Modal>
    </BackgroundImageBox>
  );
}
