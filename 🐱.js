document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cataas.com/cat?json=true')
    .then(response => response.json())
    .then(data => {
      const gallery = document.querySelector('.gallery');
      if (data && data._id) {
        const catImgUrl = `https://cataas.com/cat/${data._id}`;
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `<img src="${catImgUrl}" alt="Random Cat">`;
        gallery.appendChild(catDiv);
      } else {
        console.error('Invalid data:', data);
      }
    })
    .catch(error => console.error('Error fetching cat image:', error));
  });
  