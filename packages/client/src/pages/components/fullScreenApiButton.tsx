export const FullScreenButton = (e: any) => {

    let toggle = false;

    const fullScreen = () => {
            if (toggle == false) {
                if (document.body.requestFullscreen) {
                    document.body.requestFullscreen();
                } 
                else if (document.body.msRequestFullscreen) {
                    document.body.msRequestFullscreen();
                } 
                else if (document.body.mozRequestFullScreen) {
                    document.body.mozRequestFullScreen();
                }
                else if(document.body.webkitRequestFullscreen) {
                    document.body.webkitRequestFullscreen();
                }
                toggle = true;
            }
            else if (toggle == true) {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if(document.msexitFullscreen) {
                    document.msexitFullscreen();
                }
                else if(document.mozexitFullscreen) {
                    document.mozexitFullscreen();
                }
                else if(document.webkitexitFullscreen) {
                    document.webkitexitFullscreen();
                }
                toggle = false;
            }
    }

    return (<button className="game-btn" onClick={fullScreen} id="toggler"><p>Fullscreen</p></button>)

}