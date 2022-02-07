import { H5PEditor } from "./H5P/H5P.util";
import { H5PTimelineTagsWrapper } from "./H5P/H5PTimelineTagsWrapper";
import { H5PWrapper } from "./H5P/H5PWrapper";
import "./styles.css";
import "./styles.scss";

// eslint-disable-next-line no-console
console.log("H5PEditor.init");

H5PEditor.widgets.NDLATimelineEventLayout = H5PWrapper;
H5PEditor.NDLATimelineEventLayout = H5PWrapper;

H5PEditor.widgets.NDLATimelineTags = H5PTimelineTagsWrapper;
H5PEditor.NDLATimelineTags = H5PTimelineTagsWrapper;