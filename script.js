document.addEventListener('DOMContentLoaded', () => {
    const folderUpload = document.getElementById('folder-upload');
    const submitBtn = document.getElementById('submit-btn');
    const responseDisplay = document.getElementById('response-display');

    const API_URL = 'https://api-inference.huggingface.co/models/seena18/tier3_satellite_image_classification';
    const API_TOKEN = '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';

    async function detectTrash(imageFile, prompt) {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('prompt', prompt);

        try {
            const response = await fetch(API_URL, {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to classify image');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('An error occurred while processing the image.');
        }
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
            const prompt = 'Is there trash in this ocean satellite picture?';

            try {
                const result = await detectTrash(file, prompt);
                totalCount++;

                if (result.label === 'trash') {
                    trashCount++;
                }
            } catch (error) {
                console.error('Error:', error);
                responseDisplay.textContent = 'An error occurred while processing the images.';
                return;
            }
        }

        const trashPercentage = (trashCount / totalCount) * 100;
        responseDisplay.textContent = `Percentage of images with trash: ${trashPercentage.toFixed(2)}%`;
    });
});
