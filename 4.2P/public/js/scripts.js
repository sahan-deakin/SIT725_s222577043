$(document).ready(function () {
  $(".modal").modal();
  fetchBooks();

  $("#saveBook").click(async () => {
    const book = {
      title: $("#title").val(),
      author: $("#author").val(),
      category: $("#category").val(),
      price: parseFloat($("#price").val()),
      coverUrl: $("#image").val(),
      rating: 4.5
    };

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      const result = await response.json();

      addCard(result.data);

      M.toast({ html: "Book added!", classes: "green" });

      $(".modal").modal("close");

    } catch (err) {
      console.error(err);
    }
  });
});

// Fetch books
async function fetchBooks() {
  const res = await fetch("/api/books");
  const data = await res.json();

  data.forEach(addCard);
}

// Add card UI
function addCard(book) {
  const card = `
  <div class="col s12 m6 l4">
    <div class="card">
      <div class="card-image">
        <img src="${book.coverUrl}">
      </div>
      <div class="card-content">
        <span class="card-title">${book.title}</span>
        <p>${book.author}</p>
        <p>${book.category}</p>
        <p>⭐ ${book.rating}</p>
        <p>$${book.price}</p>
      </div>
    </div>
  </div>
  `;

  $("#card-section").append(card);
}