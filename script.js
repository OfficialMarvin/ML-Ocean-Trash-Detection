document.addEventListener('DOMContentLoaded', () => {
    const folderUpload = document.getElementById('folder-upload');
    const submitBtn = document.getElementById('submit-btn');
    const responseDisplay = document.getElementById('response-display');

    async function detectTrash(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await fetch(
            'https://api-inference.huggingface.co/models/seena18/tier3_satellite_image_classification',
            {
                headers: { Authorization: 'Bearer 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' },
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Failed to classify image');
        }

        const result = await response.json();
        return result;
    }

    submitBtn.addEventListener('click', async () => {
        const files = folderUpload.files;

        if (!files.length) {
            alert('Please select a folder containing ocean satellite images.');
            return;
        }

        let trashCount = 0;
        let totalCount = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            try {
                const result = await detectTrash(file);
                totalCount++;

                if (result.label === 'trash') {
                    trashCount++;
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while processing the images.');
                return;
            }
        }

        const trashPercentage = (trashCount / totalCount) * 100;
        responseDisplay.textContent = `Percentage of images with trash: ${trashPercentage.toFixed(2)}%`;
    });
});