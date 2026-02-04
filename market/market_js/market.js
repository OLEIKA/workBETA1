document.querySelectorAll(".sort").forEach((sort) => {
  const summary = sort.querySelector(".sort_btn"); // summary
  const items = sort.querySelectorAll(".sort_items"); // кнопки

  items.forEach((item) => {
    item.addEventListener("click", () => {
      // 1) меняем текст в кнопке
      summary.textContent = item.textContent;

      // 2) закрываем dropdown
      sort.removeAttribute("open");
    });
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".sort[open]").forEach((sort) => {
    // если клик НЕ внутри этого dropdown — закрываем
    if (!sort.contains(e.target)) {
      sort.removeAttribute("open");
    }
  });
});

// ---------------------------------------------------

const btns = [...document.querySelectorAll(".market_con1_blockcon1_category")];
const btnAll = btns.find((b) => b.dataset.cat === "all");
const btnOther = btns.filter((b) => b.dataset.cat !== "all");

function setAllActive() {
  btns.forEach((b) => b.classList.remove("active_category"));
  btnAll?.classList.add("active_category");
}

function saveCats() {
  const active = btnOther
    .filter((b) => b.classList.contains("active_category"))
    .map((b) => b.dataset.cat);
  localStorage.setItem("wr_cats", JSON.stringify(active));
}

function loadCats() {
  const raw = localStorage.getItem("wr_cats");
  if (!raw) {
    setAllActive();
    return;
  }

  let activeCats = [];
  try {
    activeCats = JSON.parse(raw) || [];
  } catch {
    activeCats = [];
  }

  btns.forEach((b) => b.classList.remove("active_category"));

  // если пусто или выбраны все 4 — считаем как "Все"
  if (activeCats.length === 0 || activeCats.length === btnOther.length) {
    setAllActive();
    return;
  }

  // включаем сохраненные
  activeCats.forEach((cat) => {
    const btn = btnOther.find((b) => b.dataset.cat === cat);
    btn?.classList.add("active_category");
  });

  // "Все" выключено, если есть хоть одна категория
  btnAll?.classList.remove("active_category");
}

function syncAllLogicAndSave() {
  const activeCount = btnOther.filter((b) =>
    b.classList.contains("active_category"),
  ).length;

  if (activeCount === btnOther.length || activeCount === 0) {
    setAllActive();
    localStorage.removeItem("wr_cats"); // можно и сохранить [] — как хочешь
    return;
  }

  saveCats();
}

// восстановление при загрузке
loadCats();

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isAll = btn.dataset.cat === "all";

    if (isAll) {
      setAllActive();
      localStorage.removeItem("wr_cats");
      return;
    }

    btnAll?.classList.remove("active_category");
    btn.classList.toggle("active_category");
    syncAllLogicAndSave();
  });
});

// ---------------------------------------------------

// сохраняем выбор для выпадашек .sort (сортировка/тип)
document.querySelectorAll(".sort").forEach((drop) => {
  const key = drop.dataset.key; // sort или type
  if (!key) return;

  const summary = drop.querySelector(".sort_btn");
  const items = drop.querySelectorAll(".sort_items");

  // восстановление
  const saved = localStorage.getItem("wr_" + key);
  if (saved) {
    const found = [...items].find((i) => i.dataset.value === saved);
    if (found) summary.textContent = found.textContent;
  }

  // сохранение
  items.forEach((item) => {
    item.addEventListener("click", () => {
      summary.textContent = item.textContent;
      drop.removeAttribute("open");
      localStorage.setItem("wr_" + key, item.dataset.value);
    });
  });
});
