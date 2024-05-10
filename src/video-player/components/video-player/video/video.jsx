import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectVideoUrl,
  selectIsPlaying,
  selectVolume,
  selectCurrentTime,
  selectIsVideoPositionChanging,
  selectBackgroundImageUrl,
  selectVideoData,
  selectCurrentVideoLabel,
  setCurrentTime,
  setDuration,
  playPauseVideo,
  setControlBarVisible,
  setCurrentVideoLabel,
  setVideoUrl,
  setCurrentVideoName,
} from '../../../app/videoReducer';
import styles from './video.module.scss';

/**
 * The video element
 *
 * @returns {ReactNode} video element with controls
 *
 */
export default function Video() {
  const videoRef = useRef();
  const dispatch = useDispatch();
  const videoUrl = useSelector(selectVideoUrl);
  const isPlaying = useSelector(selectIsPlaying);
  const volumeLevel = useSelector(selectVolume);
  const currentTime = useSelector(selectCurrentTime);
  const backgroundImageUrl = useSelector(selectBackgroundImageUrl);
  const isVideoPositionChanging = useSelector(selectIsVideoPositionChanging);
  const videoData = useSelector(selectVideoData);
  const currentVideoLabel = useSelector(selectCurrentVideoLabel);
  const [isMouseMoving, setMouseMoving] = useState(false);
  const [mouseMoveTimer, setMouseMoveTimer] = useState(null);

  /**
   * Handling pause/play from user control action
   */
  useEffect(() => {
    if (isPlaying && videoRef.current.paused) {
      videoRef.current.play();
    } else if (!isPlaying && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  /**
   * Changing volume of video from user control action
   */
  useEffect(() => {
    videoRef.current.volume = volumeLevel;
  }, [volumeLevel]);

  /**
   * Changing video position from user action on progress bar
   */
  useEffect(() => {
    if (isVideoPositionChanging) {
      videoRef.current.currentTime = currentTime;
    }
  }, [isVideoPositionChanging, dispatch, currentTime]);

  /**
   * Updates progress bar on video
   *
   * @param {object} event Time update event object
   */
  const timeUpdateHandler = (event) => {
    dispatch(setCurrentTime(event.target.currentTime));
    dispatch(setDuration(event.target.duration));
  };

  /**
   * Updates the video duration when video loads
   *
   * @param {object} event Video load event
   */
  const loadedDataHandler = (event) => {
    dispatch(setDuration(event.target.duration));
    // TO CHECK
    // This may be removed if videos should not autoplay
    dispatch(playPauseVideo('playing'));
  };

  /**
   * Play/pause video by clicking on the video
   */
  const clickHandler = () => {
    dispatch(playPauseVideo());
  };

  /**
   * Sets isMouseMoving flag when mouse moves inside video
   */
  const mouseMoveHandler = () => {
    setMouseMoving(true);
    dispatch(setControlBarVisible(true));
    clearTimeout(mouseMoveTimer);
    setMouseMoveTimer(
      setTimeout(() => {
        setMouseMoving(false);
      }, 3000)
    );
  };

  /**
   * Video end handler
   * Plays next video in the sequence
   */
  const endHandler = () => {
    dispatch(playPauseVideo('paused'));
    videoRef.current.pause();
    if (videoData !== null && currentVideoLabel !== null) {
      const videoIndex = videoData['videoSequence'].indexOf(currentVideoLabel);
      if (videoIndex > -1) {
        const nextVideoIndex = videoIndex + 1;
        const nextVideoLabel = videoData['videoSequence'][nextVideoIndex];
        dispatch(setCurrentVideoLabel(nextVideoLabel));
        let nextVideoUrl = null;
        let nextVideoName = null;
        if (nextVideoLabel.includes('_')) {
          const videoLabelParts = nextVideoLabel.split('_');
          if (videoLabelParts.length === 2) {
            nextVideoUrl =
              videoData[videoLabelParts[0]][parseInt(videoLabelParts[1])][
                'longVideoUrl'
              ];
            nextVideoName =
              videoData[videoLabelParts[0]][parseInt(videoLabelParts[1])][
                'name'
              ];
          }
        } else {
          nextVideoUrl = videoData[nextVideoLabel]['url'];
          nextVideoName = videoData[nextVideoLabel]['title'];
        }
        if (nextVideoUrl !== null) {
          dispatch(setVideoUrl(nextVideoUrl));
          dispatch(setCurrentVideoName(nextVideoName));
        }
      }
    }
  };

  /**
   * Starts 3s timer after displaying control bar after
   * which all mouse event flags are reset to false
   */
  useEffect(() => {
    if (!isMouseMoving) {
      clearTimeout(mouseMoveTimer);
      dispatch(setControlBarVisible(false));
    }
  }, [isMouseMoving, mouseMoveTimer, dispatch]);

  /**
   * Load new video when video Url changes
   */
  useEffect(() => {
    videoRef.current.load();
  }, [videoUrl]);

  return (
    <video
      nocontrols='true'
      muted={false}
      controlsList='nodownload'
      disablePictureInPicture={true}
      autoPlay={false}
      className={styles.Video}
      ref={videoRef}
      onTimeUpdate={timeUpdateHandler}
      onLoadedData={loadedDataHandler}
      onEnded={endHandler}
      onClick={clickHandler}
      onMouseMove={mouseMoveHandler}
      data-testid='test-video'
      poster={backgroundImageUrl}
    >
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
