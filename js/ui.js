const installBtnContainer = document.getElementById("install_app_btn_container");
const installBtn = document.getElementById("install_app_btn");
let deferredInstallPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  console.log("Entered beforeinstallprompt event!");
  deferredInstallPrompt = event;
  installBtnContainer.style.display = "flex";
});

window.addEventListener('appinstalled', (evt) => {
  installBtnContainer.style.display = "none";
});

function initializeUI() {
  installBtn.addEventListener("click", () => {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choice) => {
      if(choice.outcome === 'accepted') {
        console.log('The user has accepted the app installation.')
      }
      else {
        console.log('The user has refused the app installation.')
      }
    });
  });
}
