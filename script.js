/* ---- Site configuration: fill these in before publishing ---- */
const CONFIG = {
  contactEmail: "muskannarora1203@gmail.com" // temporary V1 setup: enquiries are emailed here
};

(function () {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");

  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth > 900) setMenu(false); });

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });


  // Contact form: opens the visitor's email app with the enquiry pre-filled (no server needed).
  const form = document.getElementById("form");
  const note = document.getElementById("form-note");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    note.className = "form-note";
    if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email.trim())) {
      note.classList.add("err");
      note.textContent = "Please add your name and a valid work email so we can reply.";
      return;
    }
    if (!CONFIG.contactEmail) {
      note.classList.add("err");
      note.textContent = "The contact address is not set up yet.";
      return;
    }
    const body = `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company || "-"}\n\nHow we handle leads today:\n${d.message || "-"}`;
    window.location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("AI Sales Team enquiry — " + (d.company || d.name))}&body=${encodeURIComponent(body)}`;
    note.textContent = "Opening your email app now. Your enquiry has not been sent yet — please press send in your email app. If nothing opens, email " + CONFIG.contactEmail + " directly.";
  });
})();
