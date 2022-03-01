import * as React from "react";
import { FC, useEffect, useState } from "react";
import { TagPicker } from "../components/TagPicker/TagPicker";
import { H5PForm } from "../types/H5P/H5PForm";
import { TagType } from "../types/TagType";

type NDLATagsPickerAppProps = {
  updateTags: (tags: Array<TagType>) => void;
  tags: Array<TagType>;
  parent: H5PForm;
  fieldNameToWatch: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTagsField = (field: any): field is Array<Omit<TagType, "isActive">> => {
  return (
    ("length" in field && field.length === 0) ||
    (field[Symbol.iterator] && "name" in field[0] && "color" in field[0])
  );
};

export const NDLATagsPickerApp: FC<NDLATagsPickerAppProps> = ({
  updateTags,
  tags: initialTags,
  parent,
  fieldNameToWatch,
}) => {
  const [tags, setTags] = useState<Array<TagType>>(initialTags);

  useEffect(() => {
    const watchedField = parent.parent?.parent?.params?.[
      fieldNameToWatch
    ] as unknown;

    if (!isTagsField(watchedField)) {
      throw new Error(
        `Field with name \`${fieldNameToWatch}\` is not an array of type \`TagType\`.`,
      );
    }

    const interval = window.setInterval(() => {
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
  }, [fieldNameToWatch, parent.parent?.parent?.params, tags, updateTags]);

  return <TagPicker setActiveTags={updateTags} tags={tags} />;
};
