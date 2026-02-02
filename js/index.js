// Контейнеры модалок
const modalReg = document.querySelector(".modal_con");
const modalLogin = document.querySelector(".modal_con_rg");

// Кнопки открытия из хедера
const btnOpenReg = document.querySelector(".header_register_a_rg"); // Откроет Регистрацию
const btnOpenLogin = document.querySelector(".header_register_a_vh"); // Откроет Вход

// Кнопки закрытия (крестики)
const closeBtnReg = document.querySelector(".modal_block_h1");
const closeBtnLogin = document.querySelector(".modal_con_rg_block_conh1_x");

// Кнопки переключения внутри модалок
const toLoginBtn = document.querySelector(".modal_rg_vh"); // "Есть аккаунт?"
const toRegBtn = document.querySelector(".modal_con_rg_block_vh_vh"); // "Нету акканта?"

// 1. Открытие модалок из хедера
if (btnOpenReg) {
  btnOpenReg.onclick = () => (modalReg.style.display = "flex");
}
if (btnOpenLogin) {
  btnOpenLogin.onclick = () => (modalLogin.style.display = "flex");
}

// 2. Переключение: из Регистрации во Вход
toLoginBtn.onclick = () => {
  modalReg.style.display = "none";
  modalLogin.style.display = "flex";
};

// 3. Переключение: из Входа в Регистрацию
toRegBtn.onclick = () => {
  modalLogin.style.display = "none";
  modalReg.style.display = "flex";
};

// 4. Закрытие на крестики
closeBtnReg.onclick = () => (modalReg.style.display = "none");
closeBtnLogin.onclick = () => (modalLogin.style.display = "none");

// 5. Закрытие по фону (на оба окна)
window.onclick = (e) => {
  if (e.target === modalReg) modalReg.style.display = "none";
  if (e.target === modalLogin) modalLogin.style.display = "none";
};

// ---------------------------------------------------------------------------