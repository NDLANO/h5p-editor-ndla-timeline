/* eslint-disable react/prefer-stateless-function */
import * as React from "react";
import { hot } from "react-hot-loader/root";
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

const App: React.FC<AppProps> = ({
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

  return <div className="h5p-editor-topic-map">test</div>;
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

export default hot(App);
