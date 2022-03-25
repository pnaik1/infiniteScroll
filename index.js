const container = document.getElementById('container');
const loading = document.querySelector('.load');

getPost();
getPost();
getPost();
getPost();


window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	
	
	if(clientHeight + scrollTop >= scrollHeight - 5) {
	
		showLoading();
	}
});

function showLoading() {
	loading.classList.add('show');
	
	setTimeout(getPost, 100)
}

async function getPost() {
	const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNumber()}`);
	const postData = await postResponse.json();
	
	const userResponse = await fetch('https://randomuser.me/api');
	const userData = await userResponse.json();
	
	const data = { post: postData, user: userData.results[0] };
	
	addDataToDOM(data);
}

function getRandomNumber() {
	return Math.floor(Math.random()*10) + 1;
}

function addDataToDOM(data) {
	const postElement = document.createElement('div');
	postElement.classList.add('post');
	postElement.innerHTML = `
		<h2 class="title">${data.user.name.first} ${data.user.name.last}</h2>
        <div class="user">
			<img src="${data.user.picture.large}" alt="${data.user.name.first}" />
		</div>
        <p>${data.user.phone}</p>
        <p>${data.user.email}</p>
		<p class="text">${data.post.body}</p>
		
	`;
	container.appendChild(postElement);
	
	loading.classList.remove('show');
}