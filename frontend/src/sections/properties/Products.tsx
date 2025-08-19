import { useEffect, useState } from 'react';
// @mui
import { Stack, Grid, Pagination } from '@mui/material';
// @types
import { IProduct } from 'src/@types/product';
// redux
import { useSelector } from 'src/redux/store';
// components
import EstateCard from 'src/components/customs/EstateCard';

// ----------------------------------------------------------------------

export default function Products() {
  const { products } = useSelector((state) => state.product);

  const [data, setData] = useState<IProduct[]>([]);

  useEffect(() => {
    if (products.length) {
      setData(products);
    }
  }, [products]);

  return (
    <Grid item xs={6} md={9}>
      <Grid container spacing={1}>
        {data.map((product: IProduct) => (
          <Grid item lg={4} md={6} xs={12}>
            <EstateCard product={product} />
          </Grid>
        ))}

        <Grid item xs={12} md={12}>
          <Stack alignItems="center" sx={{ mt: 4 }}>
            <Pagination
              color="primary"
              count={10}
              sx={{
                '& .MuiPaginationItem-root': {
                  height: '32px',
                  border: '1px solid #D9D9D9',
                },
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
