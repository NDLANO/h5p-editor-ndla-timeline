import chroma from "chroma-js";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { EditorTagType } from "../types/EditorTagType";
import { H5PForm } from "../types/H5P/H5PForm";
import { PickerTagType } from "../types/PickerTagType";

type NDLATagsPickerAppProps = {
  updateTags: (tags: Array<PickerTagType>) => void;
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
  updateTags,
  tags: initialTags,
  parent,
  fieldNameToWatch,
  label,
}) => {
  const [tags, setTags] = useState<Array<PickerTagType>>(initialTags);

  useEffect(() => {
    const eldestParent = getSemanticsParent(parent);

    const interval = window.setInterval(() => {
      const watchedField = eldestParent?.params?.[
        fieldNameToWatch
      ] as Array<EditorTagType> | null;

      const noTagsYet = !watchedField;
      if (noTagsYet) {
        return;
      }

      const editorTags = watchedField.map(tag => ({
        ...tag,
        isActive: false,
      }));

      const updatedTags = tags.filter(tag =>
        editorTags.find(t => tag.id === t.id),
      );

      for (const tag of editorTags) {
        if (!tags.find(t => t.id === tag.id)) {
          updatedTags.push(tag);
        }
      }

      setTags(updatedTags);
      updateTags(updatedTags);
    }, 1000);

    return () => clearInterval(interval);
  }, [fieldNameToWatch, parent, tags, updateTags]);

  const colourStyles: StylesConfig<PickerTagType, true> = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const tagColor = chroma(data.color);

      let backgroundColor: string | undefined;
      if (!isDisabled) {
        if (isSelected) {
          backgroundColor = data.color;
        } else if (isFocused) {
          backgroundColor = tagColor.alpha(0.1).css();
        }
      }

      let color: string | undefined;
      if (isDisabled) {
        color = "#ccc";
      } else if (isSelected) {
        const isDark = chroma.contrast(tagColor, "white") > 2;
        if (isDark) {
          color = "white";
        } else {
          color = "black";
        }
      } else {
        color = data.color;
      }

      let activeBackgroundColor;
      if (!isDisabled) {
        if (isSelected) {
          activeBackgroundColor = data.color;
        } else {
          tagColor.alpha(0.3).css();
        }
      }

      return {
        ...styles,
        backgroundColor,
        color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
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
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  return (
    <>
      <div className="h5peditor-label-wrapper">
        <span className="h5peditor-label">{label}</span>
      </div>

      <Select
        options={tags
          .filter(tag => tag.name?.trim().length > 0)
          .map(tag => ({ ...tag, label: tag.name }))}
        closeMenuOnSelect={false}
        defaultValue={tags.filter(tag => tag.isActive)}
        isMulti
        styles={colourStyles}
      />
    </>
  );
};
