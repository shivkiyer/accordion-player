import { useSelector } from 'react-redux';

import SelectionTable from './selection-table/selection-table';
import ContinueButton from './continue-button/continue-button';
import {
  SELECT_PANEL_HEADING_HEIGHT_LARGE,
  SELECT_PANEL_HEADING_HEIGHT_SMALL,
  SELECT_PANEL_SIDE_MARGIN_LARGE,
  SELECT_PANEL_SIDE_MARGIN_SMALL,
  SELECT_PANEL_HEADING_FONT_LARGE,
  SELECT_PANEL_HEADING_FONT_SMALL,
  SELECT_TABLE_TOP_MARGIN_LARGE,
  SELECT_TABLE_TOP_MARGIN_SMALL,
  SELECT_TABLE_PADDING_LARGE,
  SELECT_TABLE_PADDING_SMALL,
  SELECT_PANEL_ROW_HEIGHT_LARGE,
  SELECT_PANEL_ROW_HEIGHT_SMALL,
  SELECT_PANEL_ROW_MARGIN_LARGE,
  SELECT_PANEL_ROW_MARGIN_SMALL,
  CONTROL_BAR_HEIGHT_LARGE,
  CONTROL_BAR_HEIGHT_SMALL,
} from '../../common/constants';
import {
  selectVideoWidth,
  selectVideoHeight,
  selectVideoData,
  selectIsFullScreen,
} from './../../app/videoReducer';
import getScaledDimension from './../../common/utils/getScaledDimension';
import styles from './selection-panel.module.css';

/**
 * Returns a panel for user to select videos
 *
 * @returns {ReactNode} Custom heading text and table contents
 */
export default function SelectionPanel() {
  const videoWidth = useSelector(selectVideoWidth);
  const videoHeight = useSelector(selectVideoHeight);
  const videoData = useSelector(selectVideoData);
  const isFullscreen = useSelector(selectIsFullScreen);

  const selectPanelHeadingHeight = getScaledDimension({
    smallDim: SELECT_PANEL_HEADING_HEIGHT_SMALL,
    largeDim: SELECT_PANEL_HEADING_HEIGHT_LARGE,
    videoWidth,
  });

  const selectPanelHeadingFont = getScaledDimension({
    smallDim: SELECT_PANEL_HEADING_FONT_SMALL,
    largeDim: SELECT_PANEL_HEADING_FONT_LARGE,
    videoWidth,
  });

  let selectPanelSideMargin = getScaledDimension({
    smallDim: SELECT_PANEL_SIDE_MARGIN_SMALL,
    largeDim: SELECT_PANEL_SIDE_MARGIN_LARGE,
    videoWidth,
  });

  if (videoWidth < 1000) {
    selectPanelSideMargin = selectPanelSideMargin / 2;
  }

  const largeSpace =
    SELECT_PANEL_HEADING_HEIGHT_LARGE +
    SELECT_TABLE_TOP_MARGIN_LARGE +
    SELECT_TABLE_PADDING_LARGE +
    videoData?.videoOptions.length *
      (SELECT_PANEL_ROW_HEIGHT_LARGE + SELECT_PANEL_ROW_MARGIN_LARGE) +
    CONTROL_BAR_HEIGHT_LARGE;

  const smallSpace =
    SELECT_PANEL_HEADING_HEIGHT_SMALL +
    SELECT_TABLE_TOP_MARGIN_SMALL +
    SELECT_TABLE_PADDING_SMALL +
    videoData?.videoOptions.length *
      (SELECT_PANEL_ROW_HEIGHT_SMALL + SELECT_PANEL_ROW_MARGIN_SMALL) +
    CONTROL_BAR_HEIGHT_SMALL;

  const scaledSpace = getScaledDimension({
    smallDim: smallSpace,
    largeDim: largeSpace,
    videoWidth,
  });

  let calcMarginTop = (videoHeight - scaledSpace) / 2;
  if (isFullscreen) {
    if (window.screen.height > window.screen.width) {
      calcMarginTop =
        ((videoWidth * 9) / 16 - scaledSpace) / 2 +
        (window.screen.height - (window.screen.width * 9) / 16) / 2;
    }
  }

  const selectPanelStyle = {
    marginTop: `${calcMarginTop}px`,
    width: `${videoWidth - 2 * selectPanelSideMargin}px`,
  };

  const headingStyle = {
    paddingTop: `${(selectPanelHeadingHeight - selectPanelHeadingFont) / 2}px`,
    paddingBottom: `${
      (selectPanelHeadingHeight - selectPanelHeadingFont) / 2
    }px`,
    fontSize: `${selectPanelHeadingFont}px`,
  };

  const tableHeading = videoData?.selectInfo?.selectText;

  return (
    <>
      <div className={styles.SelectionPanel} style={selectPanelStyle}>
        <h1 className={styles.SelectionPanelHeading} style={headingStyle}>
          {tableHeading}
        </h1>

        <SelectionTable />
      </div>
      <ContinueButton />
    </>
  );
}
