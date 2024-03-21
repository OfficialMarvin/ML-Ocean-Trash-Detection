document.addEventListener('DOMContentLoaded', () => {
    const folderUpload = document.getElementById('folder-upload');
    const submitBtn = document.getElementById('submit-btn');
    const responseDisplay = document.getElementById('response-display');

    async function loadModel() {
        const modelUrl = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
        const model = await tf.loadGraphModel(modelUrl);
        return model;
    }

    async function classifyImage(model, imageElement, prompt) {
        const tensor = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
        const predictions = await model.predict(tensor).data();
        const top5 = Array.from(predictions)
            .map((p, i) => ({ probability: p, className: IMAGENET_CLASSES[i] }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 5);

        const trashKeywords = ['plastic', 'trash', 'waste', 'garbage', 'litter'];
        const isTrash = top5.some(item => trashKeywords.some(keyword => item.className.toLowerCase().includes(keyword)));

        return { prompt, isTrash };
    }

    submitBtn.addEventListener('click', async () => {
        const files = folderUpload.files;

        if (!files.length) {
            alert('Please select a folder containing ocean satellite images.');
            return;
        }

        let trashCount = 0;
        let totalCount = 0;

        const model = await loadModel();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const prompt = 'Is there trash in this ocean satellite image?';

            const imageElement = await createImageElement(file);
            const result = await classifyImage(model, imageElement, prompt);
            totalCount++;

            if (result.isTrash) {
                trashCount++;
            }
        }

        const trashPercentage = (trashCount / totalCount) * 100;
        responseDisplay.textContent = `Prompt: Is there trash in this ocean satellite image?\nPercentage of images with trash: ${trashPercentage.toFixed(2)}%`;
    });

    async function createImageElement(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }
});
