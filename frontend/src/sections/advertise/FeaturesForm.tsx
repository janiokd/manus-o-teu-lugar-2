import { useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Typography, IconButton } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// components
import { RHFTextField } from 'src/components/hook-form';
import RoundButton from 'src/components/customs/RoundButton';
// assets
import TickIcon from 'src/assets/icons/TickIcon';
import TrashIcon from 'src/assets/icons/TrashIcon';
import { Character, CharacterItem, characters } from 'src/assets/data';
//
import FeatureElement from './FeatureElement';

// ----------------------------------------------------------------------

export default function FeaturesForm() {
  const { t } = useLocales();

  const { watch, setValue } = useFormContext();

  const [data, setData] = useState<Character>();
  const [features, setFeatures] = useState<string[]>([]);
  const [commonFeatures, setCommonFeatures] = useState<string[]>([]);
  const [privateFeatures, setPrivateFeatures] = useState<string[]>([]);

  const values = watch();

  useEffect(() => {
    if (values.type) {
      const character = characters.find((item: Character) => item.name === values.type);

      if (character) {
        setFeatures([]);
        setCommonFeatures([]);
        setPrivateFeatures([]);

        setData(character);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.type]);

  const addFeature = (prefix: string, groupName: string) => {
    if (groupName === 'private_area') {
      setPrivateFeatures([...privateFeatures, values.newFeature]);
    } else if (groupName === 'common_area') {
      setCommonFeatures([...commonFeatures, values.newFeature]);
    } else {
      setFeatures([...features, values.newFeature]);
    }
    setValue(`${prefix}.${values.newFeature}`, 'yes');
    setValue('newFeature', '');
  };

  const removeFeature = (id: number, groupName: string) => {
    if (groupName === 'private_area') {
      setPrivateFeatures([...privateFeatures.filter((_: string, index: number) => index !== id)]);
    } else if (groupName === 'common_area') {
      setCommonFeatures([...commonFeatures.filter((_: string, index: number) => index !== id)]);
    } else {
      setFeatures([...features.filter((_: string, index: number) => index !== id)]);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    prefix: string,
    groupName: string
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      addFeature(prefix, groupName);
    }
  };

  const changeDescribe = (type: string) => {
    if (type === 'house' || type === 'farm' || type === 'garagesParking') {
      return t(`describe_other_feature`);
    }
    return t(`describe_all_features`);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {t(`advertisePage.property_features`)} ({t('optional')})
      </Typography>
      {values.type && (
        <Stack direction="row" spacing={2} alignItems="center">
          <TickIcon />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {changeDescribe(values.type)} {t(values.type)} {t(`accurate_complete`)}
          </Typography>
        </Stack>
      )}
      <Stack spacing={2}>
        <Typography typography="subtitle2" sx={{ pt: 1 }}>
          {t(values.type)}
        </Typography>
        <Stack justifyContent="space-between" sx={{ width: 1, pl: 2 }}>
          {data?.options.map((group: CharacterItem, index: number) => {
            let prefix = '';
            let newFeatures: string[] = [];

            if (group.name === '') {
              prefix = `features.${data.name}`;
            } else {
              prefix = `features.${data.name}.${group.name}`;
            }

            if (group.name === 'private_area') {
              newFeatures = [...privateFeatures];
            } else if (group.name === 'common_area') {
              newFeatures = [...commonFeatures];
            } else {
              newFeatures = [...features];
            }

            const renderContent = (
              <div key={data.name}>
                <Typography key={index} typography="subtitle2" sx={{ py: 1 }}>
                  {t(group.name)}
                </Typography>

                <Stack spacing={0.5}>
                  {group.options.map((item, gIndex) => (
                    <FeatureElement
                      key={gIndex}
                      prefix={prefix}
                      type={item.type}
                      name={item.value}
                    />
                  ))}
                  {newFeatures?.map((fieldName, fIndex: number) => (
                    <Stack key={fIndex} direction="row">
                      <FeatureElement prefix={prefix} type="boolean" name={fieldName} />
                      <IconButton onClick={() => removeFeature(fIndex, group.name)} sx={{ p: 0 }}>
                        <TrashIcon />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>

                <Stack direction="row" spacing={1} sx={{ width: 1 }}>
                  <RHFTextField
                    name="newFeature"
                    variant="standard"
                    placeholder={t(`advertisePage.enter_feature`)}
                    onKeyDown={(e) => handleKeyDown(e, prefix, group.name)}
                  />
                  <Box>
                    <RoundButton
                      variant="outlined"
                      startIcon={<CiCirclePlus />}
                      onClick={() => addFeature(prefix, group.name)}
                    >
                      <span style={{ whiteSpace: 'nowrap' }}>
                        {t(`advertisePage.add_new_feature`)}
                      </span>
                    </RoundButton>
                  </Box>
                </Stack>
              </div>
            );
            return <>{renderContent}</>;
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
