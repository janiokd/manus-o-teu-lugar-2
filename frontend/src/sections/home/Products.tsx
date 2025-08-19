import { useEffect, useState } from 'react';
// @mui
import { Box, Grid, Stack, Typography } from '@mui/material';
// @types
import { IProduct } from 'src/@types/product';
// locales
import { useLocales } from 'src/locales';
// redux
import { getProducts } from 'src/redux/slices/product';
import { dispatch, useSelector } from 'src/redux/store';
// components
import EstateCard from 'src/components/customs/EstateCard';
import ActivateButtonGroup from 'src/components/customs/ActiveButtonGroup';

// ----------------------------------------------------------------------

export default function HomePage() {
  const { t } = useLocales();

  const { products } = useSelector((state) => state.product);

  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    dispatch(getProducts({}));
  }, []);

  useEffect(() => {
    if (products.length) {
      setData(products);
    }
  }, [products]);

  return (
    <Stack alignItems="center" sx={{ width: 1 }}>
      <Stack spacing={2} alignItems="center" sx={{ mb: 5 }}>
        <Typography
          variant="h6"
          sx={{
            color: '#587792',
            textTransform: 'uppercase',
          }}
        >
          {t(`homePage.featured_properties`)}
        </Typography>
        <Typography variant="h1" color="primary">
          {t(`homePage.see_properties`)}
        </Typography>
      </Stack>

      <Box sx={{ mb: 4 }}>
        <ActivateButtonGroup name="services1" color="primary" />
      </Box>

      <Grid container>
        <Grid item xs={12} textAlign="center">
          <Grid container spacing={4}>
            {data.map((product: IProduct, index) => (
              <Grid key={index} item lg={4} md={6} xs={12}>
                <EstateCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
