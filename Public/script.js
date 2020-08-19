if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}
const handleClick = async event => {
  const whatGotClicked = event.target.outerHTML;
  const pageX = Math.round(event.pageX);
  const pageY = Math.round(event.pageY);
  const dataId = event.path.find(item => item.dataset.trackingid != undefined);
  const trackingId = dataId.dataset.trackingid;
  const timestamp = Math.round(event.timeStamp);
  const userId = Number(localStorage.getItem('userId'));

  fetch('/clicks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      whatGotClicked,
      pageX,
      pageY,
      dataId: trackingId,
      timestamp,
      userId,
    }),
  });
};

window.addEventListener('click', handleClick);
