const baseUrl = 'https://61ea82407bc0550017bc67cb.mockapi.io/api/v1/form-users';
const formElem = document.querySelector('.login-form');
const submitBtn = document.querySelector('.submit-button');

[...document.querySelectorAll('.form-input')].forEach((inputElem) => {
  inputElem.addEventListener('change', () => {
    const isAllFilled = formElem.reportValidity();
    if (isAllFilled) {
      submitBtn.disabled = false;
    }
  });
});

const createUser = (userData) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(userData),
  }).then((response) => response.json());
};

const onFormSubmit = (event) => {
  event.preventDefault();
  submitBtn.disabled = true;

  const userData = [...new FormData(formElem)].reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value,
    };
  }, {});

  createUser(userData).then((response) => {
    alert(JSON.stringify(response));
    formElem.reset();
  });
};

formElem.addEventListener('submit', onFormSubmit);
