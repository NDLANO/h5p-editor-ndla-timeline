/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prefer-stateless-function */
import * as React from "react";
import { Grid } from "./components/Grid/Grid";
import { H5PField } from "./types/h5p/H5PField";
import { H5PForm } from "./types/h5p/H5PForm";
import { Params } from "./types/h5p/Params";
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
      : getEmptyParams()
  );

  const textRightLayout = [
    {
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 10,
      heightPercentage: 10,
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1633498103165-98bcbed526ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
        alt: "",
      },
      label: "Label 1",
      description: "",
      links: [],
    },

    {
      id: "2",
      xPercentagePosition: 25,
      yPercentagePosition: 60,
      widthPercentage: 65,
      heightPercentage: 32,
      backgroundImage: {
        path: "https://images.unsplash.com/photo-1601242454027-baa1bcf7ec1f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "",
      },
      label: "Label 2",
      description:
        "Let's put a touch more of the magic here. If it's not what you want - stop and change it.",
      links: [],
    },
  ];

  return (
    <div className="h5p-editor-timeline-content">
      test
      <Grid
        numberOfColumns={50}
        numberOfRows={50}
        params={params}
        initialItems={textRightLayout}
        updateItems={(items) => {}}
        gapSize={10}
        setActiveTool={() => {}}
        activeTool={null}
        semantics={semantics}
        parent={parent}
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

