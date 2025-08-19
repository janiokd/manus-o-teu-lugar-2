import { useCallback } from 'react';
// @mui
import { Box, Stack, Typography } from '@mui/material';
// form
import { useFormContext } from 'react-hook-form';
// locales
import { useLocales } from 'src/locales';
// components
import { RHFUpload } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ImageForm() {
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
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveSingleFile = () => {
    setValue('image', null);
  };

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveMultiFile = (inputFile: File | string) => {
    const filtered = values.images && values.images?.filter((file: string | File) => file !== inputFile);
    setValue('images', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };

  return (
    <Stack direction="row" spacing={5} justifyContent="space-between">
      <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {t(`advertisePage.main_page`)}
        </Typography>
        <Stack>
          <RHFUpload
            name="image"
            title={t(`advertisePage.upload_title_image`)}
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
      <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {t(`advertisePage.property_photos`)}
        </Typography>
        <Stack>
          <RHFUpload
            multiple
            name="images"
            title={t(`advertisePage.upload_title_multi_image`)}
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
  );
}
