if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
}
const handleClick = async event => {
  console.log(event, 'This is a button click');
  const pageX = Math.round(event.pageX);
  const pageY = Math.round(event.pageY);
  const dataId = event.path.find(item => item.dataset.trackingid !=undefined);
  const timestamp = Math.round(event.timeStamp);
  const userId = localStorage.getItem('userId');

  fetch('/clicks',{
    method: 'POST',
    headers{
      'Content-type': 'application/json',
      Accept: 'application/json',
    }
    body: JSON.stringify({
      pageX, 
      pageY,
      dataId
      timestamp
      userId,}),
  })
};

window.addEventListener('click', handleClick);
