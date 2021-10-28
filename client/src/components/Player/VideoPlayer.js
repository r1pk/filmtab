import ReactPlayer from 'react-player';
import styled from 'styled-components';

const VideoPlayer = styled(ReactPlayer).attrs({
  width: '100%',
  height: '100%',
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  & video,
  & iframe {
    display: block;
  }
`;

export default VideoPlayer;
