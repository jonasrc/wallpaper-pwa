const modalBackground = document.getElementById('modal_background');
const acceptBtn = document.getElementById('accept_app_installation');
const refuseBtn = document.getElementById('refuse_app_installation');

window.onload = function() {
  refuseBtn.addEventListener('click', () => {
    closeModal();
  })
};

function openModal() {
  document.body.style.overflow = 'hidden';
  modalBackground.classList.add('active');
}

function closeModal() {
  document.body.style.overflow = '';
  modalBackground.classList.remove('active');
}

function initializeModal() {
  openModal();
  acceptBtn.addEventListener("click", () => {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choice) => {
      if(choice.outcome === 'accepted') {
        console.log('The user has accepted the app installation.')
      }
    });
  });
}