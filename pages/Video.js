import styled from "styled-components";

export default function Video({ currentVideo, setModal }) {
  return (
    <StyledVideo onClick={() => setModal(false)}>
      <video controls autoPlay onClick={(e) => e.stopPropagation()}>
        <source src={currentVideo} />
      </video>
    </StyledVideo>
  );
}

const StyledVideo = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  display: flex;
  video {
    height: 720px;
    width: 1280px;
  }
`;
