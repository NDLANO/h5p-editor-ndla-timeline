import chroma from 'chroma-js';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Select, { MultiValue, StylesConfig } from 'react-select';
import { H5PForm } from '../types/H5P/H5PForm';
import { PickerTagType } from '../types/PickerTagType';

type NDLATagsPickerAppProps = {
  storeTags: (tags: Array<PickerTagType>) => void;
  tags: Array<PickerTagType>;
  parent: H5PForm;
  fieldNameToWatch: string;
  label: string;
};

const getSemanticsParent = (h5pForm: H5PForm): H5PForm => {
  const { parent } = h5pForm;

  if (parent) {
    return getSemanticsParent(parent);
  }

  return h5pForm;
};

export const NDLATagsPickerApp: FC<NDLATagsPickerAppProps> = ({
  storeTags,
  tags: initialTags,
  parent,
  fieldNameToWatch,
  label,
}) => {
  const [selectedTags, setSelectedTags] = useState(initialTags);
  const [availableTags, setAvailableTags] = useState(initialTags);

  useEffect(() => {
    const eldestParent = getSemanticsParent(parent);

    const interval = window.setInterval(() => {
      const watchedField: Array<PickerTagType> | null =
        (eldestParent?.params as Record<string, Array<PickerTagType>>)?.[fieldNameToWatch];

      const noTagsYet = !watchedField;
      if (noTagsYet) {
        return;
      }

      const hasChanges =
        JSON.stringify([...watchedField]) !== JSON.stringify(availableTags);
      if (hasChanges) {
        setAvailableTags([...watchedField]);

        const updatedSelectedTags = selectedTags.filter(
          ({ id }) => !!watchedField.find((tag) => tag.id === id),
        );

        setSelectedTags(updatedSelectedTags);
        storeTags(updatedSelectedTags);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [availableTags, fieldNameToWatch, parent, selectedTags, storeTags]);

  const onChange = (newTags: MultiValue<PickerTagType>): void => {
    const updatedTags = newTags as Array<PickerTagType>;

    setSelectedTags(updatedTags);
    storeTags(updatedTags);
  };

  const colourStyles: StylesConfig<PickerTagType, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const tagColor = chroma(data.color);

      let backgroundColor: string | undefined;
      if (!isDisabled) {
        if (isSelected) {
          backgroundColor = data.color;
        }
        else if (isFocused) {
          backgroundColor = tagColor.alpha(0.1).css();
        }
      }

      let color: string | undefined;
      if (isDisabled) {
        color = '#ccc';
      }
      else if (isSelected) {
        const isDark = chroma.contrast(tagColor, 'white') > 2;
        if (isDark) {
          color = 'white';
        }
        else {
          color = 'black';
        }
      }
      else {
        color = data.color;
      }

      let activeBackgroundColor;
      if (!isDisabled) {
        if (isSelected) {
          activeBackgroundColor = data.color;
        }
        else {
          tagColor.alpha(0.3).css();
        }
      }

      return {
        ...styles,
        backgroundColor,
        color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: activeBackgroundColor,
        },
      };
    },

    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },

    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),

    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

  return (
    <>
      <div className="h5peditor-label-wrapper">
        <span className="h5peditor-label">{label}</span>
      </div>

      <Select
        options={availableTags}
        closeMenuOnSelect={false}
        defaultValue={selectedTags}
        isMulti
        styles={colourStyles}
        onChange={(newTags) => onChange(newTags)}
        getOptionLabel={(tag) => tag.name}
        getOptionValue={(tag) => tag.id}
      />
    </>
  );
};
