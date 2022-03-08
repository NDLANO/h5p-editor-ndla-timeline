import { FC, useState } from "react";
import * as React from "react";
import { SemanticsForm } from "../SemanticsForm/SemanticsForm";
import { EditorTagType } from "../../types/EditorTagType";
import { H5PField, H5PFieldGroup } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { NDLATagsEditorParams } from "../../widgets/NDLATagsEditor.widget";
import { getTagColorField, getTagNameField } from "../../utils/H5P/form.utils";

type EditorFormProps = {
  updateTags: (tags: Array<EditorTagType>) => void;
  tagsField: H5PFieldGroup;
  params: NDLATagsEditorParams;
  parent: H5PForm;
  tagId: string;
};

export const EditorForm: FC<EditorFormProps> = ({
  updateTags,
  tagsField,
  params,
  parent,
  tagId: itemId,
}) => {
  const [tagFields, setTagFields] = useState<Array<H5PField>>();
  const [formParams, setFormParams] = useState<NDLATagsEditorParams>();

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

    if (!params.tags) {
      return;
    }

    setFormParams({
      ...params,
      tags: params.tags.filter(item => item.id === itemId),
    });
  }, [itemId, params, tagsField]);

  const onUpdate = React.useCallback(
    (newParams: NDLATagsEditorParams) => {
      if (!newParams.tags) {
        return;
      }

      const updatedItem = newParams.tags[0];
      const updatedItems =
        params.tags?.map(item =>
          item.id === updatedItem.id ? updatedItem : item,
        ) ?? [];

      updateTags(updatedItems);
    },
    [params.tags, updateTags],
  );

  return formParams && tagFields ? (
    <SemanticsForm
      fields={tagFields}
      params={formParams}
      parent={parent}
      onSave={onUpdate}
    />
  ) : null;
};
