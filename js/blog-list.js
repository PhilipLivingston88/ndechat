const articles = [
  { title: "心理学视角下的濒死体验", file: "blog/psychological-perspectives-on-nde.html" },
  { title: "量子意识与濒死体验", file: "blog/quantum-consciousness-and-nde.html" },
  { title: "濒死体验的科学解释", file: "blog/scientific-explanation-of-nde.html" }
];

const list = document.getElementById('article-list');
articles.forEach((article) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = "#";
  a.textContent = article.title;
  a.onclick = function() {
    fetch(article.file)
      .then(res => res.text())
      .then(html => {
        document.getElementById('modal-body').innerHTML = html;
        document.getElementById('modal').style.display = 'block';
      });
    return false;
  };
  li.appendChild(a);
  list.appendChild(li);
});

document.getElementById('close-modal').onclick = function() {
  document.getElementById('modal').style.display = 'none';
};