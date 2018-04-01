import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalButton = $('.open-modal');
    this.modal = $('.modal');
    this.closeModalButton = $('.modal__close');
    this.events();
  }

  events() {
    // clicking the open modal button
    this.openModalButton.click(this.openModal.bind(this));
    // clicking the x close modal button
    this.closeModalButton.click(this.closeModal.bind(this));
    // pushes any key
    $(document).keyup(this.keyPressHandler.bind(this));
  }

  keyPressHandler(e) {
    // Im using event.key instead of the deprecated event.keyCode used in tutorial
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
    if(e.key == 'Escape') {
      this.closeModal();
    }
  }

  openModal() {
    this.modal.addClass('modal--is-visible');
    return false;
  }

  closeModal() {
    this.modal.removeClass('modal--is-visible');
  }

}

export default Modal;