// Roskilde B&B prototype 04: menu, gallery strip, photo viewer, click-to-load map/videos.
// Nothing external loads until the visitor asks for it.
(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  const strip = document.getElementById("strip");
  const step = () => strip.querySelector("li").getBoundingClientRect().width + 12;
  document.querySelector(".gallery-prev")?.addEventListener("click", () => strip.scrollBy({ left: -step(), behavior: "smooth" }));
  document.querySelector(".gallery-next")?.addEventListener("click", () => strip.scrollBy({ left: step(), behavior: "smooth" }));

  const viewer = document.querySelector(".viewer");
  const links = [...document.querySelectorAll("a[data-viewer]")];
  const vImg = viewer.querySelector("img");
  const vCap = viewer.querySelector("figcaption");
  let at = 0;
  const show = (i) => {
    at = (i + links.length) % links.length;
    vImg.src = links[at].href;
    vImg.alt = links[at].dataset.viewer;
    vCap.textContent = `${links[at].dataset.viewer} · ${at + 1} / ${links.length}`;
  };
  links.forEach((a, i) => a.addEventListener("click", (e) => {
    e.preventDefault();
    show(i);
    viewer.showModal();
  }));
  const single = links.length < 2;
  viewer.querySelector(".viewer-prev").hidden = single;
  viewer.querySelector(".viewer-next").hidden = single;
  viewer.querySelector(".viewer-prev").addEventListener("click", () => show(at - 1));
  viewer.querySelector(".viewer-next").addEventListener("click", () => show(at + 1));
  viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });
  viewer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(at - 1);
    if (e.key === "ArrowRight") show(at + 1);
  });

  document.querySelector(".map-load")?.addEventListener("click", (e) => {
    const box = e.currentTarget.closest(".map");
    box.innerHTML = `<iframe src="${box.dataset.mapSrc}" title="Map: Søgårdsvej 2, Snoldelev" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    box.classList.add("loaded");
  });

  document.querySelectorAll(".video-load").forEach((btn) => btn.addEventListener("click", () => {
    const box = btn.closest(".video");
    box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${box.dataset.video}?autoplay=1" title="${btn.textContent.trim()}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }));
})();
