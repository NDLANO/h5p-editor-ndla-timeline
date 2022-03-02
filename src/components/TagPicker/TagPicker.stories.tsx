/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TagPicker } from "./TagPicker";

type TagPickerProps = React.ComponentPropsWithoutRef<typeof TagPicker>;

export default {
  title: "Molecules/Tag picker",
  component: TagPicker,
} as ComponentMeta<typeof TagPicker>;

export const Default: ComponentStory<typeof TagPicker> = () => {
  const args: TagPickerProps = {
    tags: [
      {
        id: "tag-1",
        color: "#93c0a4",
        name: "Eton blue tag",
        isActive: true,
      },
      {
        id: "tag-2",
        color: "#eabda8",
        name: "Desert sand tag",
        isActive: false,
      },
      {
        id: "tag-3",
        color: "#5f00ba",
        name: "Purple tag",
        isActive: false,
      },
    ],
    setActiveTags: tags => console.info("Updated tags", { tags }),
  };
  return <TagPicker {...args} />;
};
