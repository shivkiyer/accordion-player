import { useSelector, useDispatch } from 'react-redux';

import {
  selectVideoData,
  setVideoUrl,
  setCurrentVideoLabel,
  setCurrentVideoName,
  playPauseVideo,
  setUserSelection,
  setReadyForEnding,
  setRestartVideo,
} from '../../../app/videoReducer';
import rewindBtn from './../../../assets/images/rewind.svg';
import {
  REWIND_BTN_HEIGHT_LARGE,
  REWIND_BTN_HEIGHT_SMALL,
  REWIND_BTN_WIDTH_LARGE,
  REWIND_BTN_WIDTH_SMALL,
} from '../../../common/constants';
import ControlButton from '../control-button/control-button';

/**
 * Rewind control button
 *
 * @returns {ReactNode} Control button of type Rewind
 *
 * @example
 * <RewindButton />
 *
 */
export default function RewindButton() {
  const dispatch = useDispatch();
  const videoData = useSelector(selectVideoData);

  const rewindHandler = () => {
    if (videoData !== null) {
      const introVideo = videoData['introVideo'];
      dispatch(playPauseVideo('paused'));
      dispatch(setVideoUrl(introVideo['url']));
      dispatch(setCurrentVideoLabel('introVideo'));
      dispatch(setCurrentVideoName(introVideo['title']));
      dispatch(
        setUserSelection(Array(videoData['videoOptions'].length).fill(null))
      );
      dispatch(setReadyForEnding(false));
    } else {
      dispatch(setRestartVideo(true));
    }
  };

  return (
    <ControlButton
      btnHeightSmall={REWIND_BTN_HEIGHT_SMALL}
      btnHeightLarge={REWIND_BTN_HEIGHT_LARGE}
      btnWidthSmall={REWIND_BTN_WIDTH_SMALL}
      btnWidthLarge={REWIND_BTN_WIDTH_LARGE}
      btnImage={rewindBtn}
      btnAltText='rewind'
      btnClickHandler={rewindHandler}
    />
  );
}
