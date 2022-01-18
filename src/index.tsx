import { H5PEditor } from "./h5p/H5P.util";
import { H5PWrapper } from "./h5p/H5PWrapper";
import "./styles.css";
import "./styles.scss";

// eslint-disable-next-line no-console
console.log("H5PEditor.init");

H5PEditor.widgets.timeline = H5PWrapper;
H5PEditor.Timeline = H5PWrapper;
