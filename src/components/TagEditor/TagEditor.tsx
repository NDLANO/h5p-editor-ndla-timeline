import * as React from "react";
import { FC, useCallback, useState } from "react";
import { H5P, t } from "../../H5P/H5P.util";
import { EditorTagType } from "../../types/EditorTagType";
import { H5PFieldGroup } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { NDLATagsEditorParams } from "../../widgets/NDLATagsEditor.widget";
import { Dialog } from "../Dialog/Dialog";
import { EditorForm } from "../EditorForm/EditorForm";
import { EditorTag } from "../EditorTag/EditorTag";
import styles from "./TagEditor.module.scss";

type TagEditorProps = {
  tags: Array<EditorTagType>;
  updateTags: (tags: Array<EditorTagType>) => void;
  tagsField: H5PFieldGroup;
  params: NDLATagsEditorParams;
  parent: H5PForm;
};

export const TagEditor: FC<TagEditorProps> = ({
  tags: initialTags,
  updateTags,
  tagsField,
  params,
  parent,
}) => {
  const [tags, setTags] = useState(initialTags);
  const [editedTag, setEditedTag] = useState<EditorTagType | null>(null);

  const editTag = useCallback(
    (updatedTag: EditorTagType) => {
      const updatedTags = tags.map(tag =>
        tag.id === updatedTag.id ? updatedTag : tag,
      );

      setTags(updatedTags);
      updateTags(updatedTags);
    },
    [tags, updateTags],
  );

  const deleteTag = useCallback(
    (updatedTag: EditorTagType) => {
      const updatedTags = tags.filter(tag => tag.id === updatedTag.id);

      setTags(updatedTags);
      updateTags(updatedTags);
    },
    [tags, updateTags],
  );

  const createNewTag = useCallback(() => {
    const emptyTag: EditorTagType = {
      id: H5P.createUUID(),
      color: "#000000",
      name: "",
    };

    setEditedTag(emptyTag);
  }, []);

  const updateTag = useCallback(
    (updatedTag: EditorTagType) => {
      let updatedTags: Array<EditorTagType>;

      const isNew = tags.find(tag => tag.id === updatedTag.id) == null;
      if (isNew) {
        updatedTags = [...tags, updatedTag];
      } else {
        updatedTags = tags.map(tag =>
          tag.id === updatedTag.id ? updatedTag : tag,
        );
      }

      updateTags(updatedTags);
      setTags(updatedTags);

      setEditedTag(null);
    },
    [tags, updateTags],
  );

  return (
    <>
      <ul className={styles.tagList}>
        {tags.map(tag => (
          <EditorTag
            key={tag.id}
            tag={tag}
            editTag={editTag}
            deleteTag={deleteTag}
          />
        ))}
      </ul>
      <button
        type="button"
        className="h5peditor-button h5peditor-button-textual"
        onClick={createNewTag}
      >
        {t("tag_add")}
      </button>
      {editedTag ? (
        <Dialog
          isOpen={!!editedTag}
          onOpenChange={isOpen => {
            if (!isOpen) {
              setEditedTag(null);
            }
          }}
          size="medium"
        >
          <EditorForm
            editedTag={editedTag}
            params={params}
            parent={parent}
            tagsField={tagsField}
            updateTag={updateTag}
          />
        </Dialog>
      ) : null}
    </>
  );
};
