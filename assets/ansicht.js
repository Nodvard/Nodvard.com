// Umschalter für die Ansichten im Kopf der Startseite. Ohne JavaScript bleibt die Übersicht stehen.
document.querySelectorAll("[data-ansicht]").forEach(function (box) {
  var tabs = box.querySelector("[role=tablist]");
  var knoepfe = Array.prototype.slice.call(box.querySelectorAll("[role=tab]"));
  if (!tabs || !knoepfe.length) return;
  tabs.hidden = false;
  function zeige(k, fokus) {
    knoepfe.forEach(function (b) {
      var an = b === k;
      b.setAttribute("aria-selected", an ? "true" : "false");
      b.tabIndex = an ? 0 : -1;
      document.getElementById(b.getAttribute("aria-controls")).hidden = !an;
    });
    if (fokus) k.focus();
  }
  knoepfe.forEach(function (b, i) {
    b.addEventListener("click", function () { zeige(b, false); });
    b.addEventListener("keydown", function (e) {
      var j = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? knoepfe.length - 1 : null;
      if (j === null) return;
      e.preventDefault();
      zeige(knoepfe[(j + knoepfe.length) % knoepfe.length], true);
    });
  });
});
