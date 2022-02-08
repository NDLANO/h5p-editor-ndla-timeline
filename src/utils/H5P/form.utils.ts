import { H5PEditor } from "../../H5P/H5P.util";
import { H5PField } from "../../types/H5P/H5PField";
import { H5PFieldType } from "../../types/H5P/H5PFieldType";
import { Params } from "../../types/H5P/Params";

const getSubfieldByName = (
  name: string,
  semantics: H5PField,
): H5PField | null => {
  if (semantics.name === name) {
    return semantics;
  }

  if (semantics.type === H5PFieldType.Group) {
    return (
      semantics.fields
        .map(field => getSubfieldByName(name, field))
        .find(field => field !== null) ?? null
    );
  }
  return null;
};

export const getEventsField = (semantics: H5PField): H5PField | null => {
  if (!H5PEditor.findSemanticsField) {
    console.error("no H5PEditor.findSemanticsField, finding it manually");
    return getSubfieldByName("eventItems", semantics);
  }

  const eventsField = H5PEditor.findSemanticsField("eventItems", semantics);

  if (!eventsField) {
    throw new Error("Could not find the `eventItems` field");
  }

  if (Array.isArray(eventsField)) {
    console.error("`topicMapField` is an array", eventsField);
    return eventsField[0];
  }

  return eventsField;
};

export const getEmptyParams = (): Params => {
  const params: Params = {
    eventItems: [],
    draggableItems: [],
  };

  return params;
};

export const fillInMissingParamsProperties = (
  partialParams: Partial<Params>,
): Params => {
  const params: Params = {
    ...getEmptyParams(),
    ...partialParams,
  };

  return params;
};