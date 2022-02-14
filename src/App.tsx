/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prefer-stateless-function */
import * as React from "react";
import { Grid } from "./components/Grid/Grid";
import { EventItemType } from "./types/EventItemType";
import { H5PField } from "./types/H5P/H5PField";
import { H5PForm } from "./types/H5P/H5PForm";
import { Params } from "./types/H5P/Params";
import {
  fillInMissingParamsProperties,
  getEmptyParams,
} from "./utils/H5P/form.utils";

type AppProps = {
  setValue: (params: Params) => void;
  semantics: H5PField;
  initialParams: Partial<Params> | undefined;
  parent: H5PForm;
};

export const App: React.FC<AppProps> = ({
  setValue,
  semantics,
  initialParams,
  parent,
}) => {
  const [params, setParams] = React.useState<Params>(
    initialParams
      ? fillInMissingParamsProperties(initialParams)
      : getEmptyParams(),
  );

  const eventItem: EventItemType = {
    id: "1",
    title: "Dainty green tree frog",
    description:
      "The dainty green tree frog (Ranoidea gracilenta), also known as the graceful tree frog, is a tree frog native to eastern Queensland, and north-eastern New South Wales, Australia. (Wikipedia)",
    mediaType: "image",
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
  };

  return (
    <div className="h5p-editor-timeline-content">
      test
      <Grid
        numberOfColumns={50}
        numberOfRows={50}
        params={params}
        updateItems={items => {
          eventItem.eventContent = { ...eventItem.eventContent, items };
        }}
        gapSize={10}
        setActiveTool={() => {}}
        activeTool={null}
        semantics={semantics}
        parent={parent}
        eventItem={eventItem}
      />
    </div>
  );
};

// class App extends React.Component<Props> {
//   render(): JSX.Element {
//     const { adjective } = this.props;
//     return (
//       <>
//         <h1>Hi, you&apos;re {adjective}</h1>
//       </>
//     );
//   }
// }
