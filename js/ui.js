let deferredInstallPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  console.log("Entered beforeinstallprompt event!");
  deferredInstallPrompt = event;
});

function initializeUI() {
  const installBtn = document.getElementById("install_app_btn");

  installBtn.removeAttribute("hidden");
  installBtn.removeAttribute("disabled");
  installBtn.addEventListener("click", () => {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choice) => {
      if(choice.outcome === 'accepted') {
        console.log('The user has accepted the app installation.')
      }
    });
  });
}
