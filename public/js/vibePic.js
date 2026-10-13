document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const star = document.getElementById('vibePicStar');

    if (!mainImage || !star) return;
    
    let vibePicFilename = mainImage.dataset.vibePic;

    window.updateVibePicStar = function() {
        const isVibePic = mainImage.dataset.filename === vibePicFilename;

        star.textContent = isVibePic ? '★' : '☆';
        star.classList.toggle('text-warning', isVibePic);
        star.classList.toggle('text-white', !isVibePic);
    }

    updateVibePicStar();

    star.addEventListener('click', async () => {
        const filename = mainImage.dataset.filename;

        try {
            const response = await fetch(`/motels/${mainImage.dataset.motelId}/vibe-pic`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filename })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save Vibe Pic');
            }

            vibePicFilename = data.vibePic;
            mainImage.dataset.vibePic = data.vibePic;
            updateVibePicStar();

        }
        catch (error) {
            console.error('Error updating Vibe Pic:', error);
        }
    });


    const deleteButton = document.querySelector('.delete-pic-btn');

    if (deleteButton) {
        deleteButton.addEventListener('click', async () => {
            const confirmed = confirm('Are you sure you want to delete this photo?');

            if (!confirmed) return;

            const filename = mainImage.dataset.filename;
            const motelId = mainImage.dataset.motelId;

            try {
                const response = await fetch(`/motels/${motelId}/images`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ filename })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to delete image');
                }

                window.location.reload();
                    
            } catch (error) {
                console.error('Error deleting image:', error)
                alert(error.message);
            }
        });
    } 
});