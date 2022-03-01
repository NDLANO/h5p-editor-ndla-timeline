import * as React from "react";
import { FC, useCallback } from "react";
import { TagType } from "../../types/TagType";
import { Tag } from "../Tag/Tag";
import styles from "./TagPicker.module.scss";

type TagPickerProps = {
  setActiveTags: (tags: Array<TagType>) => void;
  tags: Array<TagType>;
};

export const TagPicker: FC<TagPickerProps> = ({ setActiveTags, tags }) => {
  const toggleActiveTag = useCallback(
    (updatedTag: TagType): void => {
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
        <Tag key={tag.name} tag={tag} toggleActiveTag={toggleActiveTag} />
      ))}
    </ul>
  );
};
