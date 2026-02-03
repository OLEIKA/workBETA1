// 1. Основные элементы интерфейса
const profile = document.querySelector(".header_profile");
const profileBlock = document.querySelector(".header_profile_block");
const register = document.querySelector(".header_register");
const glav = document.getElementById("glav");

// 2. Модальные окна
const modalReg = document.querySelector(".modal_con");
const modalLogin = document.querySelector(".modal_con_rg");

// Явная функция: Показать Профиль и скрыть Регистрацию
function showProfile() {
   profile.classList.remove("displaynone");
   profile.classList.add("displayopen");
   register.classList.remove("displayopen");
   register.classList.add("displaynone");
   if (glav) {
      glav.classList.remove("displayopen");
      glav.classList.add("displaynone");
   }
}

// Явная функция: Показать Регистрацию и скрыть Профиль
function showRegister() {
   profile.classList.remove("displayopen");
   profile.classList.add("displaynone");
   register.classList.remove("displaynone");
   register.classList.add("displayopen");
   if (glav) {
      glav.classList.remove("displaynone");
      glav.classList.add("displayopen");
   }
}

// --- ЛОГИКА ВЫПАДАЮЩЕГО МЕНЮ ПРОФИЛЯ ---

profile.addEventListener("click", (e) => {
   if (
      e.target.closest(".header_profile") &&
      !e.target.closest(".header_profile_block")
   ) {
      const isHidden = getComputedStyle(profileBlock).display === "none";
      profileBlock.style.display = isHidden ? "flex" : "none";
   }
});

// Кнопка "Выйти" (внутри выпадающего меню)
const logoutBtn = document.querySelector(".header_profile_block_butt");
if (logoutBtn) {
   logoutBtn.onclick = (e) => {
      e.preventDefault();
      profileBlock.style.display = "none";
      showRegister(); // Явно показываем регистрацию
   };
}

// Кнопка Create Offer (с проверкой состояния гостя)
const btnCreateOffer = document.getElementById("create_offer");
if (btnCreateOffer) {
   btnCreateOffer.onclick = (e) => {
      e.preventDefault();
      if (register.classList.contains("displayopen")) {
         modalReg.style.display = "flex";
      }
   };
}

// --- ЛОГИКА МОДАЛОК (ОТКРЫТИЕ, ПЕРЕКЛЮЧЕНИЕ, ЗАКРЫТИЕ) ---

// Открытие из хедера
document.querySelector(".header_register_a_rg").onclick = () =>
   (modalReg.style.display = "flex");
document.querySelector(".header_register_a_vh").onclick = () =>
   (modalLogin.style.display = "flex");

// Завершение авторизации (клик внутри модалок)
const btnFinishLogin = document.querySelector(".modal_con_rg_block_vh_vhod");
const btnFinishReg = document.querySelector(".modal_rg_rg");

const handleAuthSuccess = (e) => {
   e.preventDefault();
   modalReg.style.display = "none";
   modalLogin.style.display = "none";
   showProfile(); // Явно показываем профиль
};

if (btnFinishLogin) btnFinishLogin.onclick = handleAuthSuccess;
if (btnFinishReg) btnFinishReg.onclick = handleAuthSuccess;

// Переходы внутри модалок (ссылки внутри окон)
document.querySelector(".modal_rg_vh").onclick = () => {
   modalReg.style.display = "none";
   modalLogin.style.display = "flex";
};
document.querySelector(".modal_con_rg_block_vh_vv").onclick = () => {
   modalLogin.style.display = "none";
   modalReg.style.display = "flex";
};

// Закрытие на крестики
document.querySelector(".modal_block_h1").onclick = () =>
   (modalReg.style.display = "none");
document.querySelector(".modal_con_rg_block_conh1_x").onclick = () =>
   (modalLogin.style.display = "none");

// --- ГЛОБАЛЬНЫЙ КЛИК (ЗАКРЫТИЕ ПО ФОНУ) ---
document.addEventListener("click", (e) => {
   if (!profile.contains(e.target)) profileBlock.style.display = "none";
   if (e.target === modalReg) modalReg.style.display = "none";
   if (e.target === modalLogin) modalLogin.style.display = "none";
});
