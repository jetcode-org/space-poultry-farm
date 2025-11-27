/**
 * Обычное модальное окно
 */
const modalWrapper = document.querySelector('[data-modal]');
const overlayWrapper = document.querySelector('[data-modal-overlay]');
const modalHeader = document.querySelector('[data-modal-header]');
const modalContent = document.querySelector('[data-modal-content]');
const button = modalWrapper.querySelector('button');

let onCloseCallback;

button.addEventListener('click', () => {
    modalWrapper.classList.remove('active');
    overlayWrapper.classList.remove('active');

    if (onCloseCallback) {
        onCloseCallback();
    }
});

function showModal(header, text, onShow, onClose) {
    modalWrapper.classList.add('active');
    overlayWrapper.classList.add('active');
    modalHeader.innerHTML = header;
    modalContent.innerHTML = text;

    if (onShow) {
        onShow();
    }

    onCloseCallback = onClose;
}

/**
 * Модальное окно для событий
 */
const eventModalWrapper = document.querySelector('[data-event-modal]');
const eventOverlayWrapper = document.querySelector('[data-event-modal-overlay]');
const eventModalHeader = document.querySelector('[data-event-modal-header]');
const eventModalContent = document.querySelector('[data-event-modal-content]');
const eventModalImage = document.querySelector('[data-event-modal-image]');
const answerButtons = eventModalWrapper.querySelectorAll('[data-answer-button]');

let onEventCloseCallback;

for (const answerButton of answerButtons) {
    answerButton.addEventListener('click', (event) => {
        eventModalWrapper.classList.remove('active');
        eventOverlayWrapper.classList.remove('active');
        const answer = event.target.dataset.answerButton;

        if (onEventCloseCallback) {
            onEventCloseCallback(answer);
        }
    });
}

function showEventModal(header, text, image, answers, onShow, onClose) {
    eventModalWrapper.classList.add('active');
    eventOverlayWrapper.classList.add('active');
    eventModalImage.querySelector('img').src = image;
    eventModalHeader.innerHTML = header;
    eventModalContent.innerHTML = text;

    for (const answerButton of answerButtons) {
        answerButton.classList.add('hidden');
    }

    for (const [answerId, answer] of answers.entries()) {
        const answerButton = eventModalWrapper.querySelector('[data-answer-button="' + answerId + '"]');

        if (answerButton) {
            answerButton.textContent = answer;
            answerButton.classList.remove('hidden');
        }
    }

    if (onShow) {
        onShow();
    }

    onEventCloseCallback = onClose;
}

