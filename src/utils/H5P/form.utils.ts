import { H5PEditor } from "../../H5P/H5P.util";
import { H5PField } from "../../types/H5P/H5PField";
import { H5PFieldType } from "../../types/H5P/H5PFieldType";

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
    return getSubfieldByName("timelineItems", semantics);
  }

  const eventsField = H5PEditor.findSemanticsField("timelineItems", semantics);

  if (!eventsField) {
    throw new Error("Could not find the `timelineItems` field");
  }

  if (Array.isArray(eventsField)) {
    console.error("`topicMapField` is an array", eventsField);
    return eventsField[0];
  }

  return eventsField;
};
