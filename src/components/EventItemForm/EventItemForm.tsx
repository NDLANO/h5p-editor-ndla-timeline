import * as React from "react";
import { H5PField } from "../../types/H5P/H5PField";
import { H5PForm } from "../../types/H5P/H5PForm";
import { Params } from "../../types/H5P/Params";
import { getEventsField } from "../../utils/H5P/form.utils";
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
    const field = getEventsField(semantics);
    setTopicMapField(field);

    setFormParams({
      ...params,
      timelineItems: params.timelineItems?.filter(item => item.id === itemId),
    });
  }, [itemId, params, semantics]);

  const onUpdate = React.useCallback(
    (newParams: Params) => {
      const updatedItem = newParams.timelineItems?.[0];

      if (!updatedItem) {
        return;
      }

      onSave({
        ...newParams,
        timelineItems: newParams.timelineItems?.map(item => {
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
