import { useDispatch } from 'react-redux';

import { clearVideoSubtitles } from '../redux/actions';

import ClearSubtitlesButton from '../components/ClearSubtitlesButton';

const ClearSubtitlesButtonContainer = (props) => {
  const dispatch = useDispatch();

  const handleClearSubtitles = () => {
    dispatch(clearVideoSubtitles());
  };

  return <ClearSubtitlesButton onClearSubtitles={handleClearSubtitles} {...props} />;
};

export default ClearSubtitlesButtonContainer;
