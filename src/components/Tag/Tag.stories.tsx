/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tag } from "./Tag";

type TagProps = React.ComponentPropsWithoutRef<typeof Tag>;

export default {
  title: "Atoms/Tag",
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const DarkBackground: ComponentStory<typeof Tag> = () => {
  const args: TagProps = {
    tag: {
      color: "darkgreen",
      name: "Dark green tag",
      isActive: true,
    },
    toggleActiveTag: tag => console.info("Updated tag", { tag }),
  };
  return <Tag {...args} />;
};

export const LightBackground: ComponentStory<typeof Tag> = () => {
  const args: TagProps = {
    tag: {
      color: "lightgreen",
      name: "Light green tag",
      isActive: false,
    },
    toggleActiveTag: tag => console.info("Updated tag", { tag }),
  };
  return <Tag {...args} />;
};