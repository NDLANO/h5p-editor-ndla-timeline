/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EditorTag } from "./EditorTag";

type TagProps = React.ComponentPropsWithoutRef<typeof EditorTag>;

export default {
  title: "Atoms/Editor tag",
  component: EditorTag,
} as ComponentMeta<typeof EditorTag>;

export const DarkBackground: ComponentStory<typeof EditorTag> = () => {
  const args: TagProps = {
    tag: {
      id: "tag-1",
      color: "darkgreen",
      name: "Dark green tag",
    },
    deleteTag: tag => console.info("Updated tag", { tag }),
    editTag: tag => console.info("Updated tag", { tag }),
  };
  return <EditorTag {...args} />;
};

export const LightBackground: ComponentStory<typeof EditorTag> = () => {
  const args: TagProps = {
    tag: {
      id: "tag-1",
      color: "lightgreen",
      name: "Light green tag",
    },
    deleteTag: tag => console.info("Updated tag", { tag }),
    editTag: tag => console.info("Updated tag", { tag }),
  };
  return <EditorTag {...args} />;
};
