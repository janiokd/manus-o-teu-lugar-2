import { useEffect, useState } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Checkbox, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// assets
import { Character, CharacterItem, characters } from 'src/assets/data';
import { RHFNumberField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function FeaturesForm() {
  const { t } = useLocales();

  const { watch } = useFormContext();

  const [data, setData] = useState<Character[]>([]);

  const values = watch();

  useEffect(() => {
    const _data = values.categories.map((category: string) =>
      characters.find((character: { name: string }) => character.name === category)
    );

    if (_data) {
      setData(_data);
    } else setData([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.categories]);

  return (
    <Stack spacing={2}>
      {data.map((item) => (
        <>
          <Typography typography="subtitle2" sx={{ pt: 1 }}>
            {t(item.name)}
          </Typography>
          <Stack justifyContent="space-between" sx={{ width: 1, pl: 2 }}>
            {item.options.map((option: CharacterItem) => {
              const renderContent = (
                <>
                  <Typography typography="subtitle2" sx={{ pt: 1 }}>
                    {t(option.name)}
                  </Typography>

                  <Stack spacing={0.5}>
                    {option.options.map((o) => (
                      <Stack direction="row" alignItems="center">
                        {o.type === 'number' ? (
                          <Stack sx={{ px: 1 }}>
                            <RHFNumberField
                              name={`features.${item.name}.${option.name}.${o.value}`}
                              size="small"
                              variant="outlined"
                              sx={{ width: '80px' }}
                              format={false}
                            />
                          </Stack>
                        ) : (
                          <Checkbox />
                        )}
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {t(o.value)}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </>
              );
              return <>{renderContent}</>;
            })}
          </Stack>
        </>
      ))}
    </Stack>
    // </Stack>
  );
}
