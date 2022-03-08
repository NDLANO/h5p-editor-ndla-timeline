import { FC, useState } from "react";
import * as React from "react";
import { SemanticsForm } from "../SemanticsForm/SemanticsForm";
import { EditorTagType } from "../../types/EditorTagType";
import { H5PField, H5PFieldGroup } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { NDLATagsEditorParams } from "../../widgets/NDLATagsEditor.widget";
import { getTagColorField, getTagNameField } from "../../utils/H5P/form.utils";

type EditorFormProps = {
  updateTag: (tag: EditorTagType) => void;
  tagsField: H5PFieldGroup;
  params: NDLATagsEditorParams;
  parent: H5PForm;
  editedTag: EditorTagType;
};

export const EditorForm: FC<EditorFormProps> = ({
  updateTag,
  tagsField,
  params,
  parent,
  editedTag,
}) => {
  const [tagFields, setTagFields] = useState<Array<H5PField>>();

  React.useEffect(() => {
    const nameField = getTagNameField(tagsField);
    const colorField = getTagColorField(tagsField);

    if (!nameField) {
      console.error("Could not find tag name field");
      return;
    }

    if (!colorField) {
      console.error("Could not find tag color field");
      return;
    }

    setTagFields([nameField, colorField]);
  }, [params, tagsField]);

  const onUpdate = React.useCallback(
    (newTag: EditorTagType) => {
      if (!newTag) {
        return;
      }

      updateTag(newTag);
    },
    [updateTag],
  );

  return tagFields ? (
    <SemanticsForm
      fields={tagFields}
      params={editedTag}
      parent={parent}
      onSave={updatedTag => onUpdate(updatedTag as EditorTagType)}
    />
  ) : null;
};
