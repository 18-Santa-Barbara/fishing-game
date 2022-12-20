export const FullScreenButton = () => {
  let toggle = false;

  const fullScreen = () => {
    if (toggle == false) {
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen();
      }
      // @ts-ignore
      else if (document.body.msRequestFullscreen) {
        // @ts-ignore
        document.body.msRequestFullscreen();
      }
      // @ts-ignore
      else if (document.body.mozRequestFullScreen) {
        // @ts-ignore
        document.body.mozRequestFullScreen();
        // @ts-ignore
      } else if (document.body.webkitRequestFullscreen) {
        // @ts-ignore
        document.body.webkitRequestFullscreen();
      }
      toggle = true;
    } else if (toggle == true) {
      if (document.exitFullscreen) {
        // @ts-ignore
        document.exitFullscreen();
        // @ts-ignore
      } else if (document.msexitFullscreen) {
        // @ts-ignore
        document.msexitFullscreen();
        // @ts-ignore
      } else if (document.mozexitFullscreen) {
        // @ts-ignore
        document.mozexitFullscreen();
        // @ts-ignore
      } else if (document.webkitexitFullscreen) {
        // @ts-ignore
        document.webkitexitFullscreen();
      }
      toggle = false;
    }
  };

  return (
    <button className="game-btn" onClick={fullScreen} id="toggler">
      <p>Fullscreen</p>
    </button>
  );
};
