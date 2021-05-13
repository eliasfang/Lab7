// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let count = 1;
      entries.forEach(entry => {
        const num = count;
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener('click', () => {
          setState({state: 'entry', entryNum: num, entry: newPost.entry}, false);
        });
        count += 1;
      });
    });
});

window.addEventListener('popstate', (e) => {
  setState(e.state, true);
});

const settingsIcon = document.querySelector('header').querySelector('img');
settingsIcon.addEventListener('click', () => {
  setState({state: 'settings'}, false);
});

const pageTitle = document.getElementsByTagName('header')[0].getElementsByTagName('h1')[0];
pageTitle.addEventListener('click', () => {
  setState({state: 'home'}, false);
});