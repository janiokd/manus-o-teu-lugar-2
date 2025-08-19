import { useState } from 'react';
// @mui
import { Box, MenuItem, Stack, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// assets
import { ArrowBottom } from 'src/assets/icons';
// components
import Image from 'src/components/image';
import MenuPopover from 'src/components/menu-popover';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const { allLangs, currentLang, onChangeLang, t } = useLocales();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (newLang: string) => {
    onChangeLang(newLang);
    handleClosePopover();
  };

  return (
    <>
      <Box
        onClick={handleOpenPopover}
        sx={{
          height: 40,
          display: 'flex',
          direction: 'row',
          alignItems: 'center',
          ...(openPopover && {
            bgcolor: 'action.selected',
          }),
          cursor: 'pointer',
        }}
      >
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Image
            disabledEffect
            src={currentLang.icon}
            alt={currentLang.label}
            sx={{ width: 20, mr: 0.5 }}
          />
          <Typography variant="body2" sx={{ color: 'common.white' }}>
            {t(currentLang.label)}
          </Typography>
          <ArrowBottom />
        </Stack>
      </Box>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 180 }}>
        <Stack spacing={0.75}>
          {allLangs.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => handleChangeLang(option.value)}
            >
              <Image
                disabledEffect
                alt={option.label}
                src={option.icon}
                sx={{ width: 20, mr: 2 }}
              />

              {t(option.label)}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
