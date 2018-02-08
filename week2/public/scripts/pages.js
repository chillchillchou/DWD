var pages = document.getElementsByClassName("page");

for (i = 0; i < pages.length; i++) {
  pages[i].onclick = function(e) {
    e.target.parentElement.classList.add("paged");
  };
  var j = i - 1;
  if (j > 0) {
    pages[j].onclick = function(e) {
      e.target.classList.add("previous");
    }
  }
}
