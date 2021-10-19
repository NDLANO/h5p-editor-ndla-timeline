import * as React from "react";
import { H5PField } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import { getTopicMapField } from "../../utils/H5P/form.utils";
import { SemanticsForm } from "../SemanticsForm/SemanticsForm";
import "./EventItemForm.scss";

export type EventItemFormProps = {
  semantics: H5PField;
  params: Params;
  parent: H5PForm;
  itemId: string;
  onSave: (params: Params) => void;
};

export const EventItemForm: React.FC<EventItemFormProps> = ({
  semantics,
  params,
  parent,
  itemId,
  onSave,
}) => {
  const [topicMapField, setTopicMapField] = React.useState<H5PField | null>();
  const [formParams, setFormParams] = React.useState<Params>();

  React.useEffect(() => {
    console.log("semantics", semantics);
    const field = getTopicMapField(semantics);
    setTopicMapField(field);

    setFormParams({
      ...params,
      eventItems: params.eventItems.filter(item => item.id === itemId),
    });
  }, [itemId, params, semantics]);

  const onUpdate = React.useCallback(
    (newParams: Params) => {
      const updatedItem = newParams.eventItems[0];
      onSave({
        ...newParams,
        eventItems: newParams.eventItems.map(item => {
          const isUpdatedItem = item.id === itemId;
          if (isUpdatedItem) {
            return updatedItem;
          }

          return item;
        }),
      });
    },
    [itemId, onSave],
  );
  console.log("formParams", formParams);
  console.log("topicMapField", topicMapField);
  return formParams && topicMapField ? (
    <SemanticsForm
      fields={[topicMapField]}
      params={formParams}
      parent={parent}
      onSave={onUpdate}
      formClassName="event-item-form"
    />
  ) : null;
};
