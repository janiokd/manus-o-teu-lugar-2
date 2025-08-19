import { useDropzone, DropzoneOptions } from 'react-dropzone';
// @mui
import { Box, Stack, Button, IconButton, Typography, StackProps, SxProps } from '@mui/material';
import { styled, alpha, Theme } from '@mui/material/styles';
//
import Iconify from 'src/components/iconify';
//
import RejectionFiles from 'src/components/upload/errors/RejectionFiles';
import MultiFilePreview from 'src/components/upload/preview/MultiFilePreview';
import SingleFilePreview from 'src/components/upload/preview/SingleFilePreview';
import SquareArrowUpIcon from 'src/assets/icons/SquareArrowUpIcon';
// @mui

// ----------------------------------------------------------------------
interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}
interface UploadProps extends DropzoneOptions {
  title?: string;
  error?: boolean;
  sx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  thumbnail?: boolean;
  placeholder?: React.ReactNode;
  helperText?: React.ReactNode;
  disableMultiple?: boolean;
  requirementTitle?: string;
  requirementDescription?: string;
  //
  file?: CustomFile | string | null;
  onDelete?: VoidFunction;
  //
  files?: (File | string)[];
  onUpload?: VoidFunction;
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: VoidFunction;
}

const StyledDropZone = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

export default function UploadFile({
  title,
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  titleSx,
  requirementTitle,
  requirementDescription,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = files && multiple && files.length > 0;

  const isError = isDragReject || !!error;

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <StyledDropZone
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(isError && {
            color: 'error.main',
            bgcolor: 'error.lighter',
            borderColor: 'error.light',
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasFile && {
            padding: '12% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        <Placeholder
          sx={{
            ...(hasFile && {
              opacity: 0,
            }),
            ...titleSx,
          }}
          title={title}
        />

        {hasFile && <SingleFilePreview file={file} />}
      </StyledDropZone>

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon="eva:close-fill" width={18} />
        </IconButton>
      )}

      {hasFiles && (
        <>
          <Box sx={{ my: 3 }}>
            <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
          </Box>

          <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
            {onRemoveAll && (
              <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
                Remove all
              </Button>
            )}

            {onUpload && (
              <Button size="small" variant="contained" onClick={onUpload}>
                Upload files
              </Button>
            )}
          </Stack>
        </>
      )}
      <Box sx={{ mt: 0.5 }}>
        {requirementTitle && <Typography textAlign="left" color="gray" fontSize={12}>{requirementTitle}</Typography>}
        {requirementDescription && <Typography textAlign="left" color="gray" fontSize={10}>{requirementDescription}</Typography>}
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Placeholder({ title, sx, ...other }: StackProps) {
  return (
    <Stack
      spacing={5}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        width: 1,
        textAlign: {
          xs: 'center',
          md: 'left',
        },
        ...sx,
      }}
      {...other}
    >
      {/* <UploadIllustration sx={{ width: 220 }} /> */}

      <Stack direction="column" spacing={2} justifyContent="center" textAlign="center">
        <Stack direction="row" justifyContent="center">
          <SquareArrowUpIcon />
        </Stack>
        <Typography
          variant="h5"
          color="primary"
          sx={{
            maxWidth: '430px',
          }}
        >
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
}
