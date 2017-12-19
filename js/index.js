
window.onload = () => {

  function createElement(elemType, className) {
    const elem = document.createElement(elemType);
    elem.classList.add(className);
    return elem;
  }

  let count = 1;
  const addBtn = document.getElementById('add');

  // building DOM elements and initializing event listner 
  addBtn.addEventListener('click', () => {
    let counter = count++

    const wrapper = createElement('div', 'chat-wrapper');
    wrapper.setAttribute('data-index', `${counter}`);
    const heading = document.createElement('h1');
    const title = document.createTextNode(`iFrame Chat ${counter}`);
    heading.appendChild(title);

    const close = createElement('div', 'close');

    const iframe = createElement('iframe', 'chat');
    iframe.setAttribute('name', `iFrame chat ${counter}`);
    iframe.src = './iframe.html';

    const iframeWrapper = createElement('div', 'iframe-wrapper');

    const iframeCover = createElement('div', 'iframe-events-cover');

    iframeWrapper.appendChild(iframe);

    wrapper.appendChild(heading);
    wrapper.appendChild(close);
    wrapper.appendChild(iframeWrapper);
    wrapper.appendChild(iframeCover);
    document.body.appendChild(wrapper);
  });

  let messages = [];
  // Push each message from a child window into an array then send the array back down to the children
  window.addEventListener(
    'message',
    event => {
      messages.push(event.data);
      const frames = document.getElementsByTagName('iframe');
      for (var i = 0; i < frames.length; i++) {
        frames[i].contentWindow.postMessage(messages, '*');
      }
    },
    false
  );
}
