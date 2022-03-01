import * as React from "react";
import { FC } from "react";
import fontColorContrast from "font-color-contrast";
import { TagType } from "../../types/TagType";
import styles from "./Tag.module.scss";

type TagProps = {
  toggleActiveTag: (tag: TagType) => void;
  tag: TagType;
};

export const Tag: FC<TagProps> = ({ toggleActiveTag, tag }) => {
  const { name, color: backgroundColor } = tag;
  const textColor = fontColorContrast(backgroundColor);

  return (
    // role="listitem" is added because the element's `display` property
    // changes the role.
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li
      role="listitem"
      className={styles.tag}
      style={{ backgroundColor, color: textColor }}
    >
      <button
        type="button"
        onClick={() =>
          toggleActiveTag({
            ...tag,
            isActive: !tag.isActive,
          })
        }
      >
        {name}
      </button>
    </li>
  );
};
