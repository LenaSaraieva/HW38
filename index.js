document.addEventListener('DOMContentLoaded', () => {
    const postIdInput = document.getElementById("postId");
    const searchButton = document.getElementById('searchButton');
    const postContainer = document.getElementById('postContainer');
    const postElement = document.getElementById('post');
    const loadCommentsBtn = document.getElementById('loadCommentsBtn');
    const commentsElement = document.getElementById('comments');

    searchButton.addEventListener('click', () => {
        const postId = postIdInput.value;

        if (postId >= 1 && postId <= 100) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Post not found');
                    }
                    return response.json();
                })
                .then(data => {
                    postElement.innerHTML = `
                        <p><strong>Title:</strong> ${data.title}</p>
                        <p><strong>Body:</strong> ${data.body}</p>
                    `;
                    postContainer.style.display = 'block';
                })
                .catch(error => {
                    console.error(error);
                    alert('Post not found.');
                });
        } else {
            alert('Please enter a valid ID between 1 and 100.');
        }
    });

    loadCommentsBtn.addEventListener('click', () => {
        const postId = postIdInput.value;
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(comments => {
                let commentsHTML = '<h2>Comments:</h2>';
                comments.forEach(comment => {
                    commentsHTML += `
                        <div>
                            <p><strong>Name:</strong> ${comment.name}</p>
                            <p><strong>Email:</strong> ${comment.email}</p>
                            <p><strong>Body:</strong> ${comment.body}</p>
                        </div>
                    `;
                });
                commentsElement.innerHTML = commentsHTML;
            })
            .catch(error => {
                console.error(error);
                alert('Failed to load comments.');
            });
    });
});
