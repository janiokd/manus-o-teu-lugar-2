import * as Yup from 'yup';
import 'react-phone-number-input/style.css';
import { useCallback, useState } from 'react';
import MuiPhoneNumber from 'mui-phone-number';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Stack,
  Alert,
  Divider,
  useTheme,
  MenuItem,
  IconButton,
  Typography,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// locales
import { useLocales } from 'src/locales';
// auth
import { useAuthContext } from 'src/auth/useAuthContext';
// utils
import { uploadFileToS3 } from 'src/utils/actions';
// components
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { CustomFile } from 'src/components/upload';
import FormProvider, {
  RHFUpload,
  RHFSelect,
  RHFCheckbox,
  RHFTextField,
} from '../../components/hook-form';

// ----------------------------------------------------------------------

type FormValuesProps = {
  type: string;
  name: string;
  email: string;
  agree: boolean;
  photoURL: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
  cover: CustomFile | string | null;
  afterSubmit?: string;
};

export default function AuthRegisterForm() {
  const theme = useTheme();
  const { t } = useLocales();
  // const { push } = useRouter();
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    type: Yup.string().required(t(`field_required`)),
    name: Yup.string().required(t(`name_required`)),
    // cover: Yup.mixed().required('Cover is required'),
    email: Yup.string().required(t(`email_required`)).email(t(`must_valid_email`)),
    phoneNumber: Yup.string()
      .test('phoneNumber', t(`phone_required`), (val, ctx) => {
        if (!val) return false;
        const numberPartCount = val.split(' ').length;
        if (numberPartCount === 1) return false;
        return true;
      })
      .required(t(`phone_required`)),
    password: Yup.string().required(t(`password_required`)),
    confirmPassword: Yup.string()
      .required(t(`password_required`))
      .oneOf([Yup.ref('password')], t(`no_match_password`)),
  });

  const defaultValues = {
    type: '',
    name: '',
    email: '',
    cover: null,
    agree: false,
    photoID: '',
    password: '',
    phoneNumber: '',
    confirmPassword: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      let photoURL = '';
      if (data.cover && typeof data.cover !== 'string') photoURL = await uploadFileToS3(data.cover);
      await register(
        data.type,
        data.name,
        data.email,
        data.agree,
        photoURL,
        data.password,
        data.phoneNumber
      );
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  const handleChange = (value: string) => {
    setValue('phoneNumber', value);
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('cover', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('cover', null);
  };

  const values = getValues();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFSelect name="type" label={t(`user_type`)} placeholder={t(`select`)} variant="standard">
          <MenuItem disabled sx={{ color: 'text.disabled' }} value="">
            {t(`select`)}
          </MenuItem>
          <MenuItem value="individual">{t(`individual`)}</MenuItem>
          <MenuItem value="legal">{t(`legal`)}</MenuItem>
        </RHFSelect>

        <RHFTextField
          name="email"
          label="Email"
          placeholder="lorem@gmail.com"
          variant="standard"
          inputProps={{
            sx: {
              fontSize: '14px',
            },
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              color: theme.palette.common.black,
              fontSize: '18px',
              fontWeight: 600,
            },
          }}
        />

        <RHFTextField
          name="name"
          label={t(`full_name`)}
          placeholder={t(`enter_name`)}
          variant="standard"
        />

        <MuiPhoneNumber
          name="phoneNumber"
          label={t(`phone_whatsapp`)}
          placeholder="(XX) 9999-9999"
          defaultCountry="br"
          inputProps={{
            sx: {
              fontWeight: 400,
              fontSize: '14px',
              color: 'text.secondary',
            },
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              fontWeight: 600,
              fontSize: '19px',
              color: 'text.primary',
            },
          }}
          value={values.phoneNumber}
          onChange={(value) => handleChange(value.toString())}
          error={!!errors.phoneNumber}
        />
        {errors.phoneNumber && (
          <FormHelperText sx={{ marginTop: '6px!important', color: '#FF5630' }}>
            {errors.phoneNumber?.message || 'Phone number is required'}
          </FormHelperText>
        )}
        <RHFTextField
          name="password"
          label={t(`password`)}
          placeholder={t(`enter_password`)}
          type={showPassword ? 'text' : 'password'}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              color: theme.palette.common.black,
              fontSize: '18px',
              fontWeight: 600,
            },
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label={t(`confirm_password`)}
          placeholder={t(`enter_password`)}
          type={showPassword ? 'text' : 'password'}
          variant="standard"
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

        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              color="black"
              fontSize="14px"
              fontWeight={600}
              sx={{ textTransform: 'uppercase' }}
            >
              {t(`additional_security`)}
            </Typography>
            <SvgColor src="/assets/icons/key.svg" sx={{ width: '14.08px', height: '16px' }} />
          </Stack>

          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography color="black" fontSize="14px" fontWeight={600}>
              {t(`photo_id`)}
            </Typography>
            <Typography color={theme.palette.text.disabled} fontSize="14px">
              {t(`register_description`)}
            </Typography>
          </Box>
          <RHFUpload
            name="cover"
            title={t(`upload_title`)}
            maxSize={3145728}
            onDrop={handleDrop}
            onDelete={handleRemoveFile}
          />
        </Box>

        <Divider />

        <Box sx={{ mt: 1 }}>
          <Stack direction="column" gap={2}>
            <RHFCheckbox
              name="agree_privacy"
              label={t(`terms_and_conditions`)}
              sx={{ alignItems: 'start', color: '#454545' }}
              inputProps={{
                p: 0,
                mr: 1,
              }}
            />
            <RHFCheckbox
              checked
              disabled
              name="agree_terms_of_policy"
              label={t(`privacyPolicy`)}
              sx={{ alignItems: 'start', color: '#454545' }}
              inputProps={{
                p: 0,
                mr: 1,
              }}
            />
          </Stack>
        </Box>

        <LoadingButton
          fullWidth
          color="secondary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isSubmitSuccessful}
          sx={{
            backgroundColor: 'secondary.dark',
            borderRadius: '40px',
            textTransform: 'capitalize',
            color: 'text.primary',
            '&:hover': {
              opacity: 0.8,
              color: 'text.primary',
            },
          }}
        >
          {t('register_user')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
