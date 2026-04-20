const imageData = {
    'Business Event': [
        '1-14.jpg', '1-15.jpg', '1-17.jpg', '1-18.jpg', '1-19.jpg', '1-20.jpg', '1-23.jpg', 
        '1-25.jpg', '1-26.jpg', '1-27.jpg', '1-28.jpg', '1-29.jpg', '1-45.jpg', '1-46.jpg', 
        '1-47.jpg', '1-52.jpg', '1-53.jpg', '1-54.jpg', '1-55.jpg', '1-56.jpg', '1-57.jpg', 
        '1-58.jpg', '1-59.jpg', '1-60.jpg', '1-61.jpg', '1-62.jpg', '1-63.jpg', '1-64.jpg', 
        '1-65.jpg', '1-66.jpg', '1-67.jpg', '1-68.jpg', '1-69.jpg', '1-70.jpg', '1-71.jpg', 
        '1-72.jpg', '1-73.jpg', '1-74.jpg', '1-77.jpg', '1-78.jpg'
    ],
    'Company': [
        '1-10.jpg', '1-11.jpg', '1-12.jpg', '1-13.jpg', '1-16.jpg', '1-2.jpg', '1-21.jpg', 
        '1-22.jpg', '1-24.jpg', '1-3.jpg', '1-30.jpg', '1-31.jpg', '1-32.jpg', '1-34.jpg', 
        '1-4.jpg', '1-40.jpg', '1-42.jpg', '1-43.jpg', '1-44.jpg', '1-48.jpg', '1-49.jpg', 
        '1-5.jpg', '1-50.jpg', '1-51.jpg', '1-6.jpg', '1-7.jpg', '1-75.jpg', '1-76.jpg', 
        '1-9.jpg', '1.jpg'
    ],
    'People': [
        '1-33.jpg', '1-35.jpg', '1-36.jpg', '1-37.jpg', '1-41.jpg'
    ],
    '& Other': [
        '1-8.jpg'
    ]
};

const categoryDescriptions = {
    'Business Event': 'CORPORATE & CONFERENCE',
    'Company': 'OFFICE & BRANDING',
    'People': 'PORTRAIT & HEADSHOT',
    '& Other': 'CREATIVE & MISC'
};

function openCategory(category) {
    const mainView = document.getElementById('mainView');
    const detailView = document.getElementById('detailView');
    const imageGrid = document.getElementById('imageGrid');
    const titleEl = document.getElementById('currentCategoryTitle');
    const descEl = document.getElementById('currentCategoryDesc');

    // Set content
    titleEl.innerText = category;
    descEl.innerText = categoryDescriptions[category] || 'PHOTOGRAPHY';
    
    // Clear and populate grid
    imageGrid.innerHTML = '';
    const images = imageData[category] || [];
    
    images.forEach(imgName => {
        const item = document.createElement('div');
        item.className = 'image-item';
        
        // Revised path for images moved into public/images/
        const imgPath = `./images/${category}/${imgName}`; 
        
        item.innerHTML = `
            <img src="${imgPath}" alt="${imgName}" loading="lazy">
            <div class="image-overlay">
                <span class="image-name">${imgName}</span>
            </div>
        `;
        
        item.onclick = (e) => {
            e.stopPropagation();
            openLightbox(imgPath);
        };
        
        imageGrid.appendChild(item);
    });

    // Animate
    mainView.classList.add('scaled');
    detailView.classList.add('active');
    
    // Show Back Button
    document.getElementById('closeBtn').style.display = 'block';
    
    // Scroll to top of detail view
    detailView.scrollTo(0, 0);
}

function closeCategory() {
    const mainView = document.getElementById('mainView');
    const detailView = document.getElementById('detailView');

    mainView.classList.remove('scaled');
    detailView.classList.remove('active');
    
    // Hide Back Button
    document.getElementById('closeBtn').style.display = 'none';
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// Close sub-view on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        } else {
            closeCategory();
        }
    }
});
