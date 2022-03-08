import * as React from "react";
import { FC, useEffect, useState } from "react";
import { TagPicker } from "../components/TagPicker/TagPicker";
import { EditorTagType } from "../types/EditorTagType";
import { H5PForm } from "../types/H5P/H5PForm";
import { PickerTagType } from "../types/PickerTagType";

type NDLATagsPickerAppProps = {
  updateTags: (tags: Array<PickerTagType>) => void;
  tags: Array<PickerTagType>;
  parent: H5PForm;
  fieldNameToWatch: string;
};

const getSemanticsParent = (h5pForm: H5PForm): H5PForm => {
  const { parent } = h5pForm;
  const grandParent = parent?.parent;

  const isSecondToTop = !grandParent;
  if (!isSecondToTop) {
    return getSemanticsParent(parent);
  }

  return h5pForm;
};

export const NDLATagsPickerApp: FC<NDLATagsPickerAppProps> = ({
  updateTags,
  tags: initialTags,
  parent,
  fieldNameToWatch,
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

  return <TagPicker setActiveTags={updateTags} tags={tags} />;
};
