import { useDispatch } from 'react-redux';

import { setVideoSubtitles } from '../redux/actions';

import SetSubtitlesButton from '../components/SetSubtitlesButton';

const SetSubtitlesButtonContainer = (props) => {
  const dispatch = useDispatch();

  const handleSetSubtitles = (subtitles) => {
    dispatch(setVideoSubtitles(subtitles));
  };

  return <SetSubtitlesButton onSetSubtitles={handleSetSubtitles} {...props} />;
};

export default SetSubtitlesButtonContainer;
