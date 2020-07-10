'use strict';

class FetchFormSubmit {
  constructor({
    form,
    mail,
    success,
    successClass, 
    callback = null
  }) {
    this.form = document.querySelector(form);
    this.mail = mail;
    this.success = document.querySelector(success);
    this.successClass = successClass;
    this.callback = callback;
  }

  init() {
    this.submitForm();
  }

  doFetch(e) {
    e.preventDefault();

    const thisSuccess = this.success;
    const thisSuccessClass = this.successClass;
    const thisCallback = this.callback;

    const formData = new FormData(this.form);

    fetch(this.mail, {
      method: 'post',
      body: formData
    }).then(function(response) {
      thisSuccess.classList.add(thisSuccessClass);
      
      if (thisCallback !== null && thisSuccess.classList.contains(thisSuccessClass)) {
        thisCallback();
      }
    }).catch(function(error) {
      console.error(error);
    })
  
    this.form.reset();
  }

  submitForm() {
    this.form.addEventListener('submit', this.doFetch.bind(this));
  }
}

/* 

Usage example:

const fetchForm = new FetchFormSubmit({
  form: '#main-form',
  mail: 'mail.php',
  success: '.modal_success',
  successClass: 'modal-open',
  callback: function() {
    const icon = document.querySelector('.modal__icon-success');
    icon.style.display = 'block';
  }
});

fetchForm.init();

*/