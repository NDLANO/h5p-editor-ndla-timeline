import { H5PEditor } from "../../H5P/H5P.util";
import { H5PField } from "../../types/H5P/H5PField";
import { NDLATagsEditorParams } from "../../widgets/NDLATagsEditor.widget";

const getSingleField = <Type extends H5PField>(
  fieldName: string,
  semantics: H5PField,
): Type | null => {
  if (!H5PEditor.findSemanticsField) {
    return null;
  }

  const field = H5PEditor.findSemanticsField(
    fieldName,
    semantics,
  ) as Type | null;

  if (!field) {
    throw new Error(`Could not find the \`${fieldName}\` field`);
  }

  if (Array.isArray(field)) {
    console.error(
      `\`${fieldName}\` is an array, which means that more than one field with the name was found.`,
      field,
    );
    return field[0];
  }

  return field;
};

export const getTagNameField = (tagsField: H5PField): H5PField | null =>
  getSingleField("name", tagsField);

export const getTagColorField = (tagsField: H5PField): H5PField | null =>
  getSingleField("color", tagsField);

const getEmptyTagEditorParams = (): NDLATagsEditorParams => ({
  tags: [],
});

export const fillInMissingTagEditorParamsProperties = (
  partialParams: Partial<NDLATagsEditorParams> | undefined,
): NDLATagsEditorParams => {
  return {
    ...getEmptyTagEditorParams(),
    ...(partialParams ?? {}),
  };
};
