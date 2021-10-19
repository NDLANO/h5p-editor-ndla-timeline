/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { EventItem } from "./EventItem";

export default {
  title: "Molecules/Event Item",
  component: EventItem,
  args: {
    item: {
      id: "1",
      label: "",
      description: "",
      links: [],
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80",
        alt: "",
      },
    },
  },
} as ComponentMeta<typeof EventItem>;

const Template: ComponentStory<typeof EventItem> = args => (
  <EventItem {...args} />
);

export const NoDescription = Template.bind({});
NoDescription.args = {};

export const WithDescription = Template.bind({});
WithDescription.args = {
  item: {
    id: "1",
    label: "Label",
    description:
      "Automatically, all of these beautiful, beautiful things will happen. These things happen automatically. All you have to do is just let them happen. A happy cloud. I get carried away with this brush cleaning.",
    links: [],
    backgroundImage: {
      path: "https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80",
      alt: "",
    },
  },
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  item: {
    id: "1",
    label: "Label",
    description:
      "Automatically, all of these beautiful, beautiful things will happen. These things happen automatically. All you have to do is just let them happen. A happy cloud. I get carried away with this brush cleaning.",
    links: [],
  },
};
