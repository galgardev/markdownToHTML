// Manejo de detección y cambio de tema claro/oscuro
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

function setTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.className = isDarkMode ? 'dark' : 'light';
}

function toggleTheme() {
    body.classList.toggle('dark');
    body.classList.toggle('light');
}

setTheme();

themeToggle.addEventListener('click', toggleTheme);

// Manejo de detección de archivos subidos
const inputFile = document.getElementById('uploadedFile');
const uploadIcon = document.getElementById('uploadIcon');
const uploadStatus = document.getElementById('uploadStatus');
const fileName = document.getElementById('fileName');
const renderButton = document.getElementById('renderButton');

function fileDetection() {
    if (inputFile.files.length > 0) {
        const file = inputFile.files[0];
        const fileExtension = getFileExtension(file.name);

        if (fileExtension.toLowerCase() === 'md') {
            uploadIcon.textContent = 'done';
            uploadStatus.textContent = 'Archivo subido correctamente';
            fileName.textContent = `${file.name}`;
            renderButton.disabled = false;
        } else {
            // Restablecer el input file si el archivo no tiene la extensión .md
            inputFile.value = '';
            uploadIcon.textContent = 'close';
            uploadStatus.textContent = 'Solo puedes subir archivos Markdown';
            fileName.textContent = 'Arrastra y suelta aquí un archivo o haz clic para seleccionarlo.';
            renderButton.disabled = true;
        }
    } else {
        uploadIcon.textContent = 'upload';
        uploadStatus.textContent = 'Sube tu archivo Markdown';
        fileName.textContent = 'Arrastra y suelta aquí un archivo o haz clic para seleccionarlo.';
        renderButton.disabled = true;
    }
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

inputFile.addEventListener('change', fileDetection);

inputFile.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

inputFile.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    inputFile.files = e.dataTransfer.files;
    fileDetection();
});
