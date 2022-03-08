/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PickerTag } from "./PickerTag";

type TagProps = React.ComponentPropsWithoutRef<typeof PickerTag>;

export default {
  title: "Atoms/Picker tag",
  component: PickerTag,
} as ComponentMeta<typeof PickerTag>;

export const DarkBackground: ComponentStory<typeof PickerTag> = () => {
  const args: TagProps = {
    tag: {
      id: "tag-1",
      color: "darkgreen",
      name: "Dark green tag",
      isActive: true,
    },
    toggleActiveTag: tag => console.info("Updated tag", { tag }),
  };
  return <PickerTag {...args} />;
};

export const LightBackground: ComponentStory<typeof PickerTag> = () => {
  const args: TagProps = {
    tag: {
      id: "tag-1",
      color: "lightgreen",
      name: "Light green tag",
      isActive: false,
    },
    toggleActiveTag: tag => console.info("Updated tag", { tag }),
  };
  return <PickerTag {...args} />;
};
