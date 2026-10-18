// Kopier-Knopf für Befehle. Ohne JavaScript bleibt der Befehl normal markierbar.
document.querySelectorAll("[data-copy]").forEach(function (button) {
  button.hidden = false;
  var label = button.textContent;
  var done = button.getAttribute("data-done") || "Kopiert";
  var status = button.parentElement.querySelector("[role=status]");
  button.addEventListener("click", function () {
    var code = document.getElementById(button.getAttribute("data-copy"));
    var text = code.textContent.replace(/\n$/, "");
    function show(ok) {
      button.textContent = ok ? done : label;
      button.classList.toggle("copied", ok);
      if (status) status.textContent = ok ? done : "";
      if (ok) setTimeout(function () { button.textContent = label; button.classList.remove("copied"); if (status) status.textContent = ""; }, 2000);
    }
    function select() {
      var range = document.createRange();
      range.selectNodeContents(code);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      show(false);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { show(true); }, select);
    } else {
      select();
    }
  });
});
