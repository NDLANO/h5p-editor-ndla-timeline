import * as React from "react";
import { FC } from "react";
import fontColorContrast from "font-color-contrast";
import { PickerTagType } from "../../types/PickerTagType";
import styles from "./PickerTag.module.scss";

type TagProps = {
  toggleActiveTag: (tag: PickerTagType) => void;
  tag: PickerTagType;
};

export const PickerTag: FC<TagProps> = ({ toggleActiveTag, tag }) => {
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
