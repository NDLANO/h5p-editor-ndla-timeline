import { H5PField } from "../../src/types/H5P/H5PField";
import { H5PFieldType } from "../../src/types/H5P/H5PFieldType";
import { H5PForm } from "../../src/types/H5P/H5PForm";
import { layoutOptions } from "../../src/utils/layout.utils";

export const params = {
  eventItems: [
    {
      height: 100,
      width: 100,
      id: "1",
      label: "Label 1",
      links: ["https://example.com", "https://example.com/2"],
      x: 0,
      y: 0,
      backgroundImage: { path: "", alt: "" },
    },
    {
      height: 100,
      width: 100,
      id: "2",
      label: "Label 2",
      links: [],
      x: 0,
      y: 0,
      backgroundImage: { path: "", alt: "" },
    },
  ],
};

export const semantics: H5PField = {
  label: "NDLA Timeline editor",
  name: "ndlaTimeline",
  type: H5PFieldType.Group,
  importance: "high",
  fields: [
    {
      label: "Show title slide",
      name: "showTitleSlide",
      type: H5PFieldType.Boolean,
      default: true,
    },
    {
      label: "Title slide",
      name: "titleSlide",
      importance: "low",
      type: H5PFieldType.Group,
      fields: [
        {
          label: "Title",
          name: "label",
          type: H5PFieldType.Text,
        },
        {
          label: "Text content",
          name: "textContent",
          type: H5PFieldType.Text,
          widget: "html",
        },
        {
          label: "Layout",
          name: "layout",
          type: H5PFieldType.Select,
          default: layoutOptions.textOnRight.value,
          options: Object.values(layoutOptions),
        },
        {
          label: "Event content",
          name: "eventContent",
          type: H5PFieldType.Group,
          importance: "low",
          widget: "NDLATimelineEventLayout",
          fields: [
            {
              label: "Items",
              name: "items",
              type: H5PFieldType.Group,
              fields: [
                {
                  label: "Id",
                  name: "id",
                  type: H5PFieldType.Text,
                  widget: "none",
                },
                {
                  label: "X position",
                  name: "x",
                  type: H5PFieldType.Text,
                  widget: "none",
                },
                {
                  label: "Y position",
                  name: "y",
                  type: H5PFieldType.Text,
                  widget: "none",
                },
                {
                  label: "Width",
                  name: "width",
                  type: H5PFieldType.Text,
                  widget: "none",
                },
                {
                  label: "Height",
                  name: "height",
                  type: H5PFieldType.Text,
                  widget: "none",
                },
                {
                  label: "Type",
                  name: "type",
                  type: H5PFieldType.Text,
                  widget: "none",
                },
              ],
            },
          ],
        },
        {
          label: "Image",
          name: "image",
          type: H5PFieldType.Image,
        },
        {
          label: "Start date",
          description:
            "YYYY-MM-DD — only year is required. Years can be negative.",
          name: "startDate",
          type: H5PFieldType.Text,
        },
        {
          label: "End date",
          description:
            "YYYY-MM-DD — only year is required. Years can be negative.",
          name: "endDate",
          type: H5PFieldType.Text,
        },
      ],
      widget: "showWhen",
      showWhen: {
        rules: [
          {
            field: "showTitleSlide",
            equals: true,
          },
        ],
      },
    },
    {
      label: "Timeline items",
      name: "timelineItems",
      type: H5PFieldType.List,
      entity: "Timeline item",
      importance: "low",
      field: {
        label: "Item",
        name: "timelineItem",
        importance: "low",
        type: H5PFieldType.Group,
        fields: [
          {
            label: "Title",
            name: "label",
            type: H5PFieldType.Text,
          },
          {
            label: "Text content",
            name: "textContent",
            type: H5PFieldType.Text,
            widget: "html",
          },
          {
            label: "Layout",
            name: "layout",
            type: H5PFieldType.Select,
            default: layoutOptions.textOnRight.value,
            options: Object.values(layoutOptions),
          },
          {
            label: "Event content",
            name: "eventContent",
            type: H5PFieldType.Group,
            importance: "low",
            widget: "NDLATimelineEventLayout",
            fields: [
              {
                label: "Items",
                name: "items",
                type: H5PFieldType.Group,
                fields: [
                  {
                    label: "Id",
                    name: "id",
                    type: H5PFieldType.Text,
                    widget: "none",
                  },
                  {
                    label: "X position",
                    name: "x",
                    type: H5PFieldType.Text,
                    widget: "none",
                  },
                  {
                    label: "Y position",
                    name: "y",
                    type: H5PFieldType.Text,
                    widget: "none",
                  },
                  {
                    label: "Width",
                    name: "width",
                    type: H5PFieldType.Text,
                    widget: "none",
                  },
                  {
                    label: "Height",
                    name: "height",
                    type: H5PFieldType.Text,
                    widget: "none",
                  },
                  {
                    label: "Type",
                    name: "type",
                    type: H5PFieldType.Text,
                    widget: "none",
                  },
                ],
              },
            ],
          },
          {
            label: "Image",
            name: "image",
            type: H5PFieldType.Image,
          },
          {
            label: "Start date",
            description:
              "YYYY-MM-DD — only year is required. Years can be negative.",
            name: "startDate",
            type: H5PFieldType.Text,
          },
          {
            label: "End date",
            description:
              "YYYY-MM-DD — only year is required. Years can be negative.",
            name: "endDate",
            type: H5PFieldType.Text,
          },
        ],
      },
    },
    {
      label: "Categories",
      name: "categories",
      type: H5PFieldType.List,
      entity: "Category",
      importance: "low",
      field: {
        label: "Category",
        name: "category",
        importance: "low",
        type: H5PFieldType.Group,

        fields: [
          {
            label: "Name",
            name: "name",
            type: H5PFieldType.Text,
          },
          {
            label: "Color",
            name: "color",
            type: H5PFieldType.Text,
            widget: "colorSelector",
          },
        ],
      },
    },
    {
      label: "Eras",
      name: "eras",
      type: H5PFieldType.List,
      entity: "Era",
      importance: "low",
      field: {
        label: "Era",
        name: "era",
        importance: "low",
        type: H5PFieldType.Group,

        fields: [
          {
            label: "Name",
            name: "name",
            type: H5PFieldType.Text,
          },
          {
            label: "Color",
            name: "color",
            type: H5PFieldType.Text,
            widget: "colorSelector",
          },
          {
            label: "Start date",
            name: "startDate",
            type: H5PFieldType.Text,
          },
          {
            label: "End date",
            name: "endDate",
            type: H5PFieldType.Text,
          },
        ],
      },
    },
  ],
};

export const parent: H5PForm = {
  params: {
    categories: [],
    timeline: {
      showTitleSlide: false,
      categories: [],
      eras: [],
      timelineItems: [
        {
          id: "6133281e-7b52-408b-a66c-0878fd839ca4",
          mediaType: "image",
          startDate: "2000",
          endDate: "2010",
          title: "Dainty green tree frog",
          description:
            "The dainty green tree frog (Ranoidea gracilenta), also known as the graceful tree frog, is a tree frog native to eastern Queensland, and north-eastern New South Wales, Australia. (Wikipedia)",
          image: {
            path: "https://images.unsplash.com/photo-1502403421222-2ae1f0a65fe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1779&q=80",
            alt: "Dainty tree frog hiding in a waterlily flower",
            copyright: {
              author: "David Clode",
              source: "https://unsplash.com/photos/IY9bfJAM2zM",
              license: "Unsplash License",
              title: "Dainty tree frog hiding in a watelily flower",
              version: "1",
              year: "2017",
            },
            height: 1583,
            width: 2400,
            mime: "image/jpg",
          },
          eventContent: {
            items: [
              {
                id: "1",
                width: 50,
                height: 25,
                x: 3,
                y: 5,
                type: "media",
              },
              {
                id: "2",
                type: "title",
                width: 30,
                height: 10,
                x: 50,
                y: 20,
              },
              {
                id: "3",
                type: "textContent",
                width: 50,
                height: 10,
                x: 50,
                y: 30,
              },
            ],
          },
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
  addLanguages: langCode => {},
  removeLanguages: langCode => {},
};
