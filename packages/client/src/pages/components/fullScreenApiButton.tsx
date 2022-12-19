export const FullScreenButton = (e: any) => {
  let toggle = false;

  const fullScreen = () => {
    if (toggle == false) {
      if (document.body.requestFullscreen) {
        
        console.log(document.documentElement, "DOCUMENTEL")
        document.body.requestFullscreen();
      } else if (document.body.msRequestFullscreen) {
        console.log(document.documentElement, "DOCUMENTEL")
        document.body.msRequestFullscreen();
      } else if (document.body.mozRequestFullScreen) {
        console.log(document.documentElement, "DOCUMENTEL")
        document.body.mozRequestFullScreen();
      } else if (document.body.webkitRequestFullscreen) {
        console.log(document.documentElement, "DOCUMENTEL")
        document.body.webkitRequestFullscreen();
      }
      toggle = true;
    } else if (toggle == true) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msexitFullscreen) {
        document.msexitFullscreen();
      } else if (document.mozexitFullscreen) {
        document.mozexitFullscreen();
      } else if (document.webkitexitFullscreen) {
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
