const CSS_PATH = "./assets/css/style.min.css";
const FIRST_UL_SELECTOR = "ul:first-of-type";

function addTargetBlankToLinks(document) {
    const firstUl = document.querySelector(FIRST_UL_SELECTOR);
    const links = document.querySelectorAll(`a:not(${FIRST_UL_SELECTOR} a)`);

    links.forEach((link) => {
        link.target = "_blank";
    });
}

function renderMarkdown() {
    const uploadedFile = document.getElementById("uploadedFile").files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const content = event.target.result;
        const html = marked(content);

        // Create a temporary element to hold the HTML generated by marked
        const tmpElement = document.createElement("div");
        tmpElement.innerHTML = html;

        // Find all code blocks and highlight them with Prism
        const codeBlocks = tmpElement.querySelectorAll("code");
        codeBlocks.forEach((block) => {
            const language = block.className.replace(/^language-/, "");
            // Checks if the language is defined
            if (language && Prism.languages[language]) {
                block.innerHTML = Prism.highlight(block.textContent, Prism.languages[language], language);
            }
        });

        const newTab = window.open("");
        newTab.document.write(tmpElement.innerHTML);
        newTab.addEventListener("load", function () {
            // Add target="_blank" attribute to links outside the first ul
            addTargetBlankToLinks(newTab.document);

            // Load the style sheet
            const styleSheet = newTab.document.createElement("link");
            styleSheet.rel = "stylesheet";
            styleSheet.type = "text/css";
            styleSheet.href = CSS_PATH;
            newTab.document.body.appendChild(styleSheet);

            // Set the title of the new tab
            const docTitle = newTab.document.querySelector("h1")?.innerText;
            newTab.document.title = docTitle || "Result";
        });

        newTab.document.close();
    };

    reader.readAsText(uploadedFile);
}
