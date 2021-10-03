const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const image = document.querySelector('.user-picture__img');
const username = document.querySelector('.user-info__name');
const login = document.querySelector('.user-info__login');
const bio = document.querySelector('.user-info__bio');
const joinDate = document.querySelector('.user-info__register');
const numberRepos = document.querySelector('#no-repos');
const numberGists = document.querySelector('#no-gists');
const numberFollowers = document.querySelector('#no-followers');
const organization = document.querySelector('#data-org');
const place = document.querySelector('#data-loc');
const link = document.querySelector('#data-blog');
const twitter = document.querySelector('#data-twitter');
/* the ones that toggle between show & hide */
const loader = document.querySelector(".results-load");
const error = document.querySelector('.results-error');
const found = document.querySelector('.results-found');

//ARROW FUNCTIONS

const fetchData = async (user) => {
  //return (await fetch('https://api.github.com/users/' + user)).json();
  try {
    const response = await fetch('https://api.github.com/users/' + user);
    if (!response.ok) {
      return '';
    } else {
      return response.json();
    }
  } catch (e) {
    console.log('error: ', e);
  }
} 

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString('en-GB', options)
}

const setUserInfo = (data, element, aux) => {
  if (data) {
    element.innerText = data;
    element.classList.remove('opacity-50');
  } else {
    element.innerText = aux;
    element.classList.add('opacity-50');
  }
}

const setLink = (data, element, link) => {
  if (data) {
    element.target = '_blank';
    element.href = link;
    element.classList.add('hover:bg-stats')
  } else {
    element.target = '_self';
    element.href = '#';
    element.classList.remove('hover:bg-stats')
  }
}

const loadData = (data) => {
  image.src = data.avatar_url;
  username.innerText = data.name;
  login.innerText = data.login;
  
  setUserInfo(data.bio, bio, 'no bio available');
  joinDate.innerText = 'Joined on ' + formatDate(data.created_at);
  numberRepos.innerText = data.public_repos;
  numberGists.innerText = data.public_gists;
  numberFollowers.innerText = data.followers;
  setUserInfo(data.company, organization, 'not available');
  setUserInfo(data.location, place, 'not available');
  setUserInfo(data.blog, link, 'not available');
  setUserInfo(data.twitter_username, twitter, 'not available');

  /*set the links*/
  setLink(data.login, login, data.html_url);
  setLink(data.blog, link, data.blog);
  setLink(data.twitter_username, twitter, 'https://twitter.com/' + data.twitter_username);
}

const searchUser = async (user) => {
  let data = [];
  try {
    data = await fetchData(user);

    loader.classList.add('hidden');

    if (data) {
      error.classList.add('hidden');
      found.classList.remove('hidden');
      loadData(data);
    } else {
      error.classList.remove('hidden');
      found.classList.add('hidden');
    }

    // console.log(data);
    
  } catch (e) {
    console.log('catched error in searchUser: ', e);
  }
}

//EVENT LISTENER

form.addEventListener('submit', (e) => {
  e.preventDefault();
  found.classList.add('hidden');
  loader.classList.remove('hidden');
  
  if (input.value !== '') {
    /*delete possible spaces*/
    const user = input.value.split(' ').join('')
    searchUser(user);
  }

});

//START

searchUser('octocat');