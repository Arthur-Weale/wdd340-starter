document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    const inputs = form.querySelectorAll("input, textarea, select");

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        validateField(input);
      });

      input.addEventListener("blur", () => {
        validateField(input);
      });
    });

    form.addEventListener("submit", (e) => {
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  function validateField(field) {
    // Find the error-message span *within the same parent* (not next sibling blindly)
    const parent = field.parentElement;
    const errorMessage = parent.querySelector(".error-message");

    if (!field.checkValidity()) {
      field.classList.add("invalid");
      field.classList.remove("valid");
      if (errorMessage) errorMessage.classList.add("visible");
      return false;
    } else {
      field.classList.remove("invalid");
      field.classList.add("valid");
      if (errorMessage) errorMessage.classList.remove("visible");
      return true;
    }
  }
});
