/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import {
  params,
  parent,
  semantics,
} from "../../../.storybook/helpers/h5p.utils";
import { EventItemForm, EventItemFormProps } from "./EventItemForm";

export default {
  title: "Organisms/Event Item Form",
  component: EventItemForm,
} as ComponentMeta<typeof EventItemForm>;

const Template: ComponentStory<typeof EventItemForm> = (args) => {
  return <EventItemForm {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  itemId: "1",
  params,
  semantics,
  parent,
} as unknown as EventItemFormProps;
