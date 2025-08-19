import MuiPhoneNumber from 'mui-phone-number';
// next
import NextLink from 'next/link';
// @mui
import {
  Link,
  Radio,
  Stack,
  Divider,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// form
import { useFormContext, Controller } from 'react-hook-form';
// locales
import { useLocales } from 'src/locales';
// components
import { RHFCheckbox } from 'src/components/hook-form';
import RoundButton from 'src/components/customs/RoundButton';

// ----------------------------------------------------------------------

export default function PrivacyPolicyForm() {
  const { t } = useLocales();

  const { control, watch, setValue } = useFormContext();
  const values = watch();

  const handleChange = (value: string) => {
    setValue('phoneNumber', value);
  };

  return (
    <Stack>
      <Stack spacing={1}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {`${t('advertisePage.how_prefer_contact')}`}
        </Typography>

        <Controller
          name="contactMethod"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup {...field}>
                <Stack spacing={0.5}>
                  <Stack>
                    <FormControlLabel
                      value="phone_and_chart"
                      control={<Radio />}
                      onChange={() => setValue('contactMethod', 'phone&chat')}
                      label={t(`advertisePage.by_phone_and_chat`)}
                    />
                    <RHFCheckbox
                      name="tenantProfile"
                      label={t(`advertisePage.receive_message_via_tenant_profile`)}
                      sx={{ pl: 4 }}
                    />
                    <Link component={NextLink} href="#" underline="none">
                      <Typography variant="subtitle2" sx={{ pl: 8 }}>
                        {t(`advertisePage.what_receive_message_via_tenant_profile`)}
                      </Typography>
                    </Link>

                    <Typography variant="body2" sx={{ color: 'text.secondary', pl: 4 }}>
                      {t(`advertisePage.receive_message_via_email_and_app`)}
                    </Typography>
                  </Stack>

                  <Stack>
                    <FormControlLabel
                      value="chat"
                      control={<Radio />}
                      onChange={() => setValue('contactMethod', 'chat')}
                      label={t(`advertisePage.only_by_chat`)}
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary', pl: 4 }}>
                      {t(`advertisePage.want_receive_message_via_tenant_profile`)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', pl: 4 }}>
                      {t(`advertisePage.want_receive_message_via_email_and_app`)}
                    </Typography>
                  </Stack>

                  <Stack>
                    <FormControlLabel
                      value="phone"
                      onChange={() => setValue('contactMethod', 'phone')}
                      control={<Radio />}
                      label={t(`advertisePage.only_by_phone`)}
                    />
                  </Stack>

                  {(values.contactMethod === 'phone&chat' || values.contactMethod === 'phone') && (
                    <Stack>
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
                        onChange={(e) => handleChange(e.toString())}
                      />
                    </Stack>
                  )}
                </Stack>
              </RadioGroup>
              {fieldState.error && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {fieldState.error.message}
                </Typography>
              )}
            </>
          )}
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={-2}>
          <RHFCheckbox name="privacyPolicy" label={t(`advertisePage.privacyPolicy`)} />
        </Stack>
        <Stack direction="row" sx={{ width: '260px', justifyContent: 'flex-end', flex: 'none' }}>
          <RoundButton type="submit" color="secondary" variant="contained" size="large">
            {t(`advertisePage.register_property`)}
          </RoundButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
