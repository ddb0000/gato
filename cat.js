document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cataas.com/cat?json=true')
    .then(response => response.json())
    .then(data => {
      // prefer class selector but fall back to the id-based gallery
      const gallery = document.querySelector('.gallery') || document.getElementById('gallery');
      if (!gallery) {
        console.error('Gallery element not found in DOM');
        return;
      }

      // API sometimes returns _id or id; accept either. Also accept a direct url field.
      const catId = data && (data.id || data._id);
      let catImgUrl = null;
      if (catId) {
        catImgUrl = `https://cataas.com/cat/${catId}`;
      } else if (data && data.url) {
        // if API returned a path like "/cat/abc", make it absolute
        catImgUrl = data.url.startsWith('http') ? data.url : `https://cataas.com${data.url}`;
      }

      if (catImgUrl) {
        const catDiv = document.createElement('div');
        const img = document.createElement('img');
        img.src = catImgUrl;
        img.alt = data && data.tags ? `Cat (${data.tags.join(', ')})` : 'Random Cat';
        catDiv.appendChild(img);
        gallery.appendChild(catDiv);
      } else {
        console.error('Invalid data from cataas API — expected id/_id or url:', data);
      }
    })
    .catch(error => console.error('Error fetching cat image:', error));
  });
