import { H5PField } from "../../src/types/h5p/H5PField";
import { H5PFieldType } from "../../src/types/h5p/H5PFieldType";
import { H5PForm } from "../../src/types/h5p/H5PForm";

export const params = {
  eventItems: [
    {
      heightPercentage: 100,
      widthPercentage: 100,
      id: "1",
      label: "Label 1",
      links: ["https://example.com", "https://example.com/2"],
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      backgroundImage: { path: "", alt: "" },
    },
    {
      heightPercentage: 100,
      widthPercentage: 100,
      id: "2",
      label: "Label 2",
      links: [],
      xPercentagePosition: 0,
      yPercentagePosition: 0,
      backgroundImage: { path: "", alt: "" },
    },
  ],
};

export const semantics: H5PField = {
  label: "Timeline editor",
  name: "timeline",
  type: H5PFieldType.Group,
  widget: "timeline",
  importance: "high",
  fields: [
    {
      label: "Timeline editor",
      name: "eventItems",
      type: H5PFieldType.List,
      entity: "Timeline item",
      field: {
        name: "eventItem",
        type: H5PFieldType.Group,
        fields: [
          { name: "id", type: H5PFieldType.Text, widget: "hidden" },
          {
            label: "Start Date",
            name: "start_date",
            type: H5PFieldType.Text,
          },
          {
            label: "End Date",
            name: "end_date",
            type: H5PFieldType.Text,
          },
          {
            label: "Display Date",
            name: "display_date",
            type: H5PFieldType.Text,
          },
          {
            label: "Slide Unique Id",
            name: "slide_unique_id",
            type: H5PFieldType.Text,
            widget: "none",
          },

          {
            label: "Slide Type",
            name: "slide_type",
            type: H5PFieldType.Select,
            description: "Select how the slide for this slide will be rendered",
            options: [
              {
                value: "timelineJS",
                label: "TimelineJS",
              },
              {
                value: "grid",
                label: "Grid",
              },
            ],
            default: "grid",
          },
          {
            label: "Timeline Slide Classic",
            name: "timeline_slide",
            type: H5PFieldType.Group,
            widget: "showWhen",
            showWhen: {
              rules: [
                {
                  field: "slide_type",
                  equals: "timelineJS",
                },
              ],
            },
            fields: [
              {
                label: "Text",
                description: "Text for the event",
                name: "text",
                type: H5PFieldType.Text,
              },
              {
                label: "Group",
                description:
                  "Timeline will organize events with the same value for group to be in the same row or adjacent rows,",
                name: "group",
                type: H5PFieldType.Text,
              },
              {
                label: "Media",
                description: "media",
                name: "media",
                type: H5PFieldType.Group,
                fields: [
                  {
                    label: "Url",
                    description: "Url",
                    name: "url",
                    type: H5PFieldType.Text,
                  },
                  {
                    label: "Caption",
                    description: "Caption",
                    name: "caption",
                    type: H5PFieldType.Text,
                  },
                  {
                    label: "credit",
                    description: "credit",
                    name: "credit",
                    type: H5PFieldType.Text,
                  },
                  {
                    label: "thumbnail",
                    description: "thumbnail",
                    name: "thumbnail",
                    type: H5PFieldType.Text,
                  },
                  {
                    label: "alt",
                    description: "alt",
                    name: "alt",
                    type: H5PFieldType.Text,
                  },
                  {
                    label: "title",
                    description: "title",
                    name: "title",
                    type: H5PFieldType.Text,
                  },
                  {
                    label: "link",
                    description: "link",
                    name: "link",
                    type: H5PFieldType.Text,
                  },
                  {
                    label: "link_target",
                    description: "link_target",
                    name: "link_target",
                    type: H5PFieldType.Text,
                  },
                ],
              },
            ],
          },
          {
            label: "Timeline Slide Grid",
            name: "timeline_grid_slide",
            type: H5PFieldType.Group,
            widget: "showWhen",
            showWhen: {
              rules: [
                {
                  field: "slide_type",
                  equals: "grid",
                },
              ],
            },
            fields: [
              {
                label: "Items",
                description: "items",
                name: "items",
                type: H5PFieldType.List,
                field: {
                  label: "item_spec",
                  description: "item_spec",
                  name: "item_spec",
                  type: H5PFieldType.Text,
                },
              },
              {
                label: "Label",
                description:
                  "The label is shown on top of the background image",
                name: "label",
                type: H5PFieldType.Text,
              },

              {
                label: "Background image",
                name: "backgroundImage",
                type: H5PFieldType.Image,
              },
              {
                name: "xPercentagePosition",
                type: H5PFieldType.Number,
                widget: "none",
              },
              {
                name: "yPercentagePosition",
                type: H5PFieldType.Number,
                widget: "none",
              },
              {
                name: "widthPercentage",
                type: H5PFieldType.Number,
                widget: "none",
              },
              {
                name: "heightPercentage",
                type: H5PFieldType.Number,
                widget: "none",
              },
            ],
          },
        ],
      },
    },
    {
      label: "Arrows",
      name: "arrows",
      type: H5PFieldType.List,
      entity: "Arrow",
      field: {
        name: "arrow",
        type: H5PFieldType.Group,
        fields: [
          { name: "showStartHead", type: H5PFieldType.Boolean, widget: "none" },
          { name: "showEndHead", type: H5PFieldType.Boolean, widget: "none" },
        ],
      },
    },
  ],
} as H5PField;

export const parent: H5PForm = {
  params: {
    timeline: {
      draggableItems: [],
      eventItems: [
        {
          id: "6133281e-7b52-408b-a66c-0878fd839ca4",
          xPercentagePosition: 15,
          yPercentagePosition: 8.333333333333332,
          widthPercentage: 20,
          heightPercentage: 33.33333333333335,
          backgroundImage: { path: "" },
          label: "",
        },
        {
          id: "461c2820-da07-43bb-8d14-a798c396fd7a",
          xPercentagePosition: 45,
          yPercentagePosition: 8.333333333333332,
          widthPercentage: 45,
          heightPercentage: 83.33333333333331,
          backgroundImage: { path: "" },
          label: "",
        },
        {
          id: "8123ecbf-d416-42a5-8106-47b440de51ec",
          xPercentagePosition: 15,
          yPercentagePosition: 50,
          widthPercentage: 20,
          heightPercentage: 25,
          backgroundImage: { path: "" },
          label: "",
        },
      ],
    },
  },
  passReadies: false,
  commonFields: {},
  $form: null,
  $common: null,
  $commonButton: null,
  zebra: "odd",
  offset: { top: 59.234375, left: 0 },
  currentLibrary: "H5P.TopicMap 0.1",
  metadata: {
    license: "U",
    title: "Topic Map 3",
    authors: [],
    changes: [],
    extraTitle: "Topic Map 3",
  },
  metadataForm: null,
  children: [],
  readies: [],
  ready: (callback: () => void) => callback(),
  parent: null,
  addLanguages: (langCode) => {},
  removeLanguages: (langCode) => {},
};
