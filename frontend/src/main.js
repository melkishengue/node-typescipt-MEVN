import '../assets/styles.scss';

const source = new EventSource('/stream');

source.addEventListener('data', (response) => {
  console.log(response.data);

  let container = document.querySelector('#container');
  let div = document.createElement('div');
  div.innerHTML = response.data;
  div.className = 'data-element';
  container.prepend(div);
})