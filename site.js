Array.from(document.forms).forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const login = String(formData.get("login") || "").trim();
    const password = String(formData.get("password") || "");
    const emailInput = form.elements.namedItem("email");
    const isRegistration = emailInput !== null;

    if (!login || !password) {
      Swal.fire({
        icon: "error",
        title: "Проверьте форму",
        text: "Заполните все обязательные поля."
      });
      return;
    }

    if (isRegistration && (!emailInput.value.trim() || !emailInput.checkValidity())) {
      Swal.fire({
        icon: "error",
        title: "Некорректная почта",
        text: "Введите корректный адрес электронной почты."
      });
      return;
    }

    if (isRegistration && password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Слишком короткий пароль",
        text: "Пароль должен содержать не менее 8 символов."
      });
      return;
    }

    const loggedData = Object.fromEntries(formData.entries());
    if ("password" in loggedData) {
      loggedData.password = "[скрыт]";
    }
    console.log("Данные формы:", loggedData);

    Swal.fire({
      icon: "success",
      title: isRegistration ? "Регистрация прошла успешно" : "Вход выполнен",
      text: isRegistration ? "Данные регистрации записаны." : "Данные входа записаны."
    });
  });

});