const modalWrapper = document.querySelector('[data-modal]');
const overlayWrapper = document.querySelector('[data-modal-overlay]');
const modalContent = document.querySelector('[data-modal-content]');
const button = modalWrapper.querySelector('button');

let onCloseCallback

button.addEventListener('click', () => {
    modalWrapper.classList.remove('active');
    overlayWrapper.classList.remove('active');

    if (onCloseCallback) {
        onCloseCallback();
    }
});

function showModal(text, onShow, onClose) {
    modalWrapper.classList.add('active');
    overlayWrapper.classList.add('active');
    modalContent.innerHTML = text;

    if (onShow) {
        onShow();
    }

    onCloseCallback = onClose;
}
