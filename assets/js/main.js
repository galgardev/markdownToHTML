const STYLE_SHEET_PATH = "./assets/css/style.css";
const FIRST_UL_SELECTOR = "ul:first-of-type";

function addTargetBlank(document) {
    const firstUl = document.querySelector(FIRST_UL_SELECTOR);
    const anchors = document.querySelectorAll(`a:not(${FIRST_UL_SELECTOR} a)`);

    anchors.forEach((anchor) => {
        anchor.target = "_blank";
    });
}

function render() {
    const uploadedFile = document.getElementById("uploadedFile").files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const content = event.target.result;
        const html = marked(content);
        const newTab = window.open("");

        newTab.document.write(html);
        newTab.addEventListener("load", function () {
            // cargar el título
            const docTitle = newTab.document.querySelector("h1")?.innerText;

            newTab.document.title = docTitle || "Resultado";

            // cargar la hoja de estilos
            const loadStyles = newTab.document.createElement("link");

            loadStyles.rel = "stylesheet";
            loadStyles.type = "text/css";
            loadStyles.href = STYLE_SHEET_PATH;
            newTab.document.head.appendChild(loadStyles);
            // agregar el atributo target="_blank" a los enlaces fuera de la primera ul
            addTargetBlank(newTab.document);
        });

        newTab.document.close();
    };

    reader.readAsText(uploadedFile);
}
