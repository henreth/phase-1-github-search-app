//1. The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
//2. Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
//3. Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
//4. Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
const gitURL = 'https://api.github.com/search/users?q=';

document.addEventListener('DOMContentLoaded',()=> {
    const form = document.getElementById('github-form');
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        const searchTerm = document.getElementById('search')
        fetchUserSearch(searchTerm.value);
        form.reset()
    
})
})

//1.
const fetchUserSearch = (term) => {
    const newURL= `https://api.github.com/search/users?q=${term}`;
      const configurationObject = {
        headers: {
            Accept: 'application/vnd.github.v3+json',
        }
      };
      
      fetch(newURL,configurationObject)
        .then(response => response.json())
        .then(json =>{ displaySearchResults(json)
        })
        .catch(function (error) {
            alert("ERROR");
        });
  }
  

//2. Display Results

const displaySearchResults = (res) => {
    const userList = document.getElementById('user-list');
    res.items.forEach(user=>{
        const li = document.createElement('li');
        li.className='user'
        userList.appendChild(li);

        const p = document.createElement('h2');
        p.textContent=user.login;
        p.href=user.html_url
        li.appendChild(p);

        const p2 = document.createElement('a');
        p2.textContent='Profile Page'
        p2.href=user.html_url
        li.appendChild(p2)

        const userAvatar = document.createElement('img');
        userAvatar.src = user.avatar_url;
        userAvatar.style.width='100px';
        userAvatar.style.height='100px';
        // add event listener to image
        userAvatar.addEventListener('click',()=>{
            fetchRepoSearch(p.textContent);
            //remove search list
            const newUsers = document.querySelectorAll('.user');
            // for (newUser of newUsers){
            //     newUser.remove()
            // }
        })
        li.appendChild(userAvatar);
    })
}

// full_name
// html_url
const fetchRepoSearch = (userName) => {
    const repoURL = `https://api.github.com/users/${userName}/repos`;
    const configurationObject = {
    headers: {
        Accept: 'application/vnd.github.v3+json',
    }
    };
    fetch(repoURL,configurationObject)
    .then(response => response.json())
    .then(json =>{ 
        // console.log(json)
        displayRepos(json);
    })
    };


// display repos

const displayRepos = (repos) => {
    const repoList = document.getElementById('repos-list');
    for (repo of repos){
        const newP = document.createElement('p');
        newP.textContent=repo.full_name;
        repoList.appendChild(newP)
    }
}