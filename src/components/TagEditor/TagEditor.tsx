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
      color: "",
      name: "",
    };

    setEditedTag(emptyTag);
  }, []);

  return (
    <>
      <ul>
        {tags.map(tag => (
          <EditorTag tag={tag} editTag={editTag} deleteTag={deleteTag} />
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
          onOpenChange={isOpen => !isOpen && setEditedTag(null)}
          size="medium"
        >
          <EditorForm
            tagId={editedTag.id}
            params={params}
            parent={parent}
            tagsField={tagsField}
            updateTags={updatedTags => {
              updateTags(updatedTags);
              setTags(updatedTags);
              setEditedTag(null);
            }}
          />
        </Dialog>
      ) : null}
    </>
  );
};
