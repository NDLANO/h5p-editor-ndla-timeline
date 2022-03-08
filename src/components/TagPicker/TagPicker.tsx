import * as React from "react";
import { FC, useCallback } from "react";
import { PickerTagType } from "../../types/PickerTagType";
import { PickerTag } from "../PickerTag/PickerTag";
import styles from "./TagPicker.module.scss";

type TagPickerProps = {
  setActiveTags: (tags: Array<PickerTagType>) => void;
  tags: Array<PickerTagType>;
};

export const TagPicker: FC<TagPickerProps> = ({ setActiveTags, tags }) => {
  const toggleActiveTag = useCallback(
    (updatedTag: PickerTagType): void => {
      const updatedTags = tags.map(tag =>
        tag.name === updatedTag.name ? updatedTag : tag,
      );

      setActiveTags(updatedTags);
    },
    [setActiveTags, tags],
  );

  return (
    <ul className={styles.tags}>
      {tags.map(tag => (
        <PickerTag key={tag.name} tag={tag} toggleActiveTag={toggleActiveTag} />
      ))}
    </ul>
  );
};
