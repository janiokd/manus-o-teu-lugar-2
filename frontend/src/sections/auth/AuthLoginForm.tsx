import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Alert, IconButton, InputAdornment } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {
  const { t } = useLocales();
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(t(`email_required`)).email(t(`must_valid_email`)),
    password: Yup.string().required(t(`password_required`)),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.log(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          name="email"
          label={t('email')}
          variant="standard"
          placeholder="lorem@gmail.com"
        />

        <RHFTextField
          name="password"
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          variant="standard"
          placeholder="Digite sua senha"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link component={NextLink} href={'#'} variant="body2" color="inherit" underline="always">
          {`${translate('forgetPassword')}`}?
        </Link>
      </Stack> */}

      <LoadingButton
        fullWidth
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          mt: 2,
          borderRadius: '40px',
          textTransform: 'capitalize',
          backgroundColor: 'secondary.dark',
          color: 'text.primary',
          '&:hover': {
            color: 'text.secondary',
          },
        }}
      >
        {t('login_user')}
      </LoadingButton>
    </FormProvider>
  );
}
