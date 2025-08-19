import { useCallback } from 'react';
// @mui
import { Box, Stack, Typography } from '@mui/material';
// form
import { useFormContext } from 'react-hook-form';
// locales
import { useLocales } from 'src/locales';
// assets
import LockIcon from 'src/assets/icons/LockIcon';
// components
import { RHFUpload } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function SecurityImageForm() {
  const { t } = useLocales();

  const { setValue, watch } = useFormContext();
  const values = watch();

  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('docImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveSingleFile = () => {
    setValue('docImage', null);
  };

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.docImages || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('docImages', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.docImages]
  );

  const handleRemoveMultiFile = (inputFile: File | string) => {
    const filtered =
      values.docImages && values.docImages?.filter((file: string | File) => file !== inputFile);
    setValue('docImages', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('docImages', []);
  };

  return (
    <Stack spacing={2} sx={{ my: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ pr: 2 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary', textTransform: 'uppercase' }}>
          {`${t(`advertisePage.security_addition`)}(${t(`advertisePage.optional`)})`}
        </Typography>
        <LockIcon />
      </Stack>

      <Stack direction="row" spacing={5} justifyContent="space-between">
        <Stack spacing={2}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {t(`advertisePage.attach_proof_property_registration`)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t(`advertisePage.added_by_owner`)}
          </Typography>
          <Stack>
            <RHFUpload
              name="docImage"
              title={t(`advertisePage.upload_title_document`)}
              maxSize={3145728}
              onDrop={handleDropSingleFile}
              onDelete={handleRemoveSingleFile}
            />
            <Box sx={{ mt: 0.5 }}>
              <Typography textAlign="left" color="gray" fontSize={12}>
                {t('advertisePage.image_requirement_title')}
              </Typography>
              <Typography textAlign="left" color="gray" fontSize={10}>
                {t('advertisePage.image_requirement_description')}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {`${t(`advertisePage.attach_sales`)}/${t(`advertisePage.rental_authorization`)} (${t(
              `advertisePage.if_you_broker`
            )})`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t(`advertisePage.added_by_owner`)}
          </Typography>
          <Stack>
            <RHFUpload
              multiple
              name="docImages"
              title={t(`advertisePage.upload_title_document`)}
              maxSize={3145728}
              onDrop={handleDropMultiFile}
              onRemove={handleRemoveMultiFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.log('ON UPLOAD')}
            />
            <Box sx={{ mt: 0.5 }}>
              <Typography textAlign="left" color="gray" fontSize={12}>
                {t('advertisePage.image_requirement_title')}
              </Typography>
              <Typography textAlign="left" color="gray" fontSize={10}>
                {t('advertisePage.image_requirement_description')}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
