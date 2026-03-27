// Initial book data
const initialBooks = [
    {
        title: "General College Chemistry",
        author: "Matt Haig",
        image: "images/chem1.png",
        category: "Science",
        price: 29.99
    },
    {
        title: "Release - Award Winning Novel",
        author: "Lucy Christopher",
        image: "images/book-novel.jpg",
        category: "Non-Fiction",
        price: 19.99
    },
    {
        title: "Shuri - A Black Panther Novel",
        author: "Nic Stone",
        image: "images/book-sci-fi.jpg",
        category: "Fiction",
        price: 14.99
    }
];

// Function to add book cards to the page
const addCards = (items) => {
    items.forEach(item => {
        let price = item.price.toFixed(2);
        let itemToAppend = `
            <div class="col s12 m6 l4 center-align">
                <div class="card medium hoverable">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">
                            ${item.title}
                            <i class="material-icons right">more_vert</i>
                        </span>
                        <p><strong>${item.author}</strong></p>
                        <p><strong>Category: ${item.category}</strong></p>
                        <div class="price">Price: $${item.price.toFixed(2)}</div>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">
                            ${item.title}
                            <i class="material-icons right">close</i>
                        </span>
                        <p><strong>Author: ${item.author}</strong></p>
                        <p><strong>Category: ${item.category}</strong></p>
                        <div class="price">Price: $${item.price.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `;
        $("#card-section").append(itemToAppend);
    });
};

// Function to handle form submission
const submitForm = () => {
    let formData = {};
    formData.title = $('#book_title').val();
    formData.author = $('#book_author').val();
    formData.image = $('#book_image_url').val();
    formData.category = $('#book_category').val();
    formData.price = parseFloat($('#book_price').val()) || 0;
    
    console.log("Form Data Submitted: ", formData);
    
    // Add newly submitted book to the page
    addCards([formData]);
    
    // Show success message
    M.toast({html: 'Book added successfully!', classes: 'green'});
    
    // Clear form and close modal
    $('#bookForm')[0].reset();
    $('.modal').modal('close');
};

// Function to fetch book list
const fetchBooks = async () => {
    try {
        const response = await fetch('/api/books');
        const books = await response.json();
        addCards(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        addCards(initialBooks);
    }
};

// Document ready main function
$(document).ready(function(){
    // Initialize Materialize components
    $('.materialboxed').materialbox();
    $('.modal').modal();
    $('select').formSelect();
    
    // Load initial book data
    fetchBooks();
    
    // Handle form submission
    $('#formSubmit').click(() => {
        if ($('#bookForm')[0].checkValidity()) {
            submitForm();
        } else {
            M.toast({html: 'Please fill all required fields', classes: 'red'});
            $('#bookForm')[0].reportValidity();
        }
    });
    
    // Event delegation for view details links
    $(document).on('click', '.view-details', function(e) {
        e.preventDefault();
        const title = $(this).data('title');
        M.toast({html: `Showing details for "${title}"`, classes: 'blue'});
    });
});