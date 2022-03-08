import * as React from "react";
import { FC } from "react";
import styles from "./EditorTag.module.scss";
import { EditorTagType } from "../../types/EditorTagType";
import { t } from "../../H5P/H5P.util";
import { EditIcon, DeleteIcon } from "../Icons/Icons";

type TagProps = {
  deleteTag: (tag: EditorTagType) => void;
  editTag: (tag: EditorTagType) => void;
  tag: EditorTagType;
};

export const EditorTag: FC<TagProps> = ({ deleteTag, editTag, tag }) => {
  const { name, color: backgroundColor } = tag;

  const editText = t("tag_edit");
  const deleteText = t("tag_delete");

  return (
    // role="listitem" is added because the element's `display` property
    // changes the role.
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <li role="listitem" className={styles.tag}>
      <div className={styles.tagColorPreview} style={{ backgroundColor }} />

      <span className={styles.tagContent}>{name}</span>

      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => editTag(tag)}
        >
          <span className="sr-only">
            {editText} {name}
          </span>
          <EditIcon />
        </button>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => deleteTag(tag)}
        >
          <span className="sr-only">
            {deleteText} {name}
          </span>
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};
