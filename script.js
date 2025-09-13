// Sample data for listings
const listingsData = [
	{id:1,title:'Central Apartment',location:'Lisbon',type:'apartment',price:80,rating:4.8, image:''},
	{id:2,title:'Cozy Room near Canal',location:'Amsterdam',type:'room',price:45,rating:4.2, image:''},
	{id:3,title:'Seaside House',location:'Nice',type:'house',price:120,rating:4.9, image:''},
	{id:4,title:'Compact Studio',location:'Barcelona',type:'apartment',price:60,rating:3.9, image:''},
	{id:5,title:'Mountain Cabin',location:'Granada',type:'house',price:150,rating:4.7, image:''}
];

// Simple placeholder image generator (uses data URI with SVG)
function placeholderImage(title){
	const bg = encodeURIComponent('#AE75DA');
	const txt = encodeURIComponent(title);
	return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='%23fff'>${txt}</text></svg>`;
}

// Resolve a raster photo for a listing: prefer local PNG/JPG, otherwise use a remote photo placeholder
function photoForListing(id){
	// Try local files (PNG, JPG, JPEG)
	const base = `images/listing${id}`;
	const candidates = [`${base}.png`, `${base}.jpg`, `${base}.jpeg`, `${base}.webp`, `${base}.svg`];
	// We'll attempt to use the first candidate that loads — in browsers this would require runtime image checking.
	// For simplicity, prefer raster types first; return the first path and let browser handle 404s.
	for(const p of candidates){
		if(/\.(png|jpg|jpeg|webp)$/.test(p)) return p; // prefer raster if named locally
	}
	// If no local raster expected, use a remote photo placeholder (picsum) seeded by id
	return `https://picsum.photos/seed/listing${id}/600/400`;
}

function renderListings(list){
	const container = document.getElementById('listings');
	container.innerHTML = '';
	if(list.length === 0){
		container.innerHTML = '<p>No results found.</p>';
		return;
	}
	list.forEach(item=>{
		const el = document.createElement('div');
		el.className = 'card';
			const imgSrc = photoForListing(item.id) || placeholderImage(item.title);
			el.innerHTML = `
				<img src="${imgSrc}" alt="${item.title}" />
			<h3>${item.title}</h3>
			<div class="muted">${item.location} • ${item.type}</div>
			<div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
				<strong>€${item.price}</strong>
				<span class="muted">${item.rating} ★</span>
			</div>
		`;
		container.appendChild(el);
	})
}

function applyFilters(){
	const q = document.getElementById('search').value.toLowerCase();
	const type = document.getElementById('typeFilter').value;
	const rating = Number(document.getElementById('ratingFilter').value);
	const minP = Number(document.getElementById('minPrice').value || 0);
	const maxP = Number(document.getElementById('maxPrice').value || 9999);

	const filtered = listingsData.filter(item=>{
		if(type !== 'any' && item.type !== type) return false;
		if(item.rating < rating) return false;
		if(item.price < minP || item.price > maxP) return false;
		if(q){
			return item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
		}
		return true;
	});

	renderListings(filtered);
}

// Wire up controls
document.addEventListener('DOMContentLoaded', ()=>{
	// Only wire listing controls on pages that include them
	if(document.getElementById('listings')){
		renderListings(listingsData);

		['search','typeFilter','ratingFilter','minPrice','maxPrice'].forEach(id=>{
			const el = document.getElementById(id);
			if(el) el.addEventListener('input', applyFilters);
		});

		const reset = document.getElementById('resetFilters');
		if(reset){
			reset.addEventListener('click', ()=>{
				document.getElementById('search').value = '';
				document.getElementById('typeFilter').value = 'any';
				document.getElementById('ratingFilter').value = '0';
				document.getElementById('minPrice').value = 0;
				document.getElementById('maxPrice').value = 500;
				applyFilters();
			});
		}
	}

	// Photo upload handling for traveler and host pages
	function wirePhotoInput(inputId, previewId, storageKey){
		const input = document.getElementById(inputId);
		const preview = document.getElementById(previewId);
		const removeBtn = document.getElementById(previewId.replace('Preview','Remove'));
		if(!preview) return;

		// load existing from localStorage
		const saved = localStorage.getItem(storageKey);
		if(saved){ preview.src = saved; }

		if(input){
			input.addEventListener('change', e=>{
				const file = e.target.files[0];
				if(!file) return;
				const reader = new FileReader();
				reader.onload = ()=>{
					preview.src = reader.result;
					try{ localStorage.setItem(storageKey, reader.result); }catch(err){}
				};
				reader.readAsDataURL(file);
			});
		}

		if(removeBtn){
			removeBtn.addEventListener('click', ()=>{
				const defaultSrc = preview.getAttribute('data-default');
				preview.src = defaultSrc;
				localStorage.removeItem(storageKey);
			});
		}
	}

	wirePhotoInput('travelerPhotoInput','travelerPhotoPreview','travelerPhoto');
	wirePhotoInput('hostPhotoInput','hostPhotoPreview','hostPhoto');
});
