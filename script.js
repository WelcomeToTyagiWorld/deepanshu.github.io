(function () {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  
    const btn = document.getElementById("themeBtn");
    btn?.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  })();
  