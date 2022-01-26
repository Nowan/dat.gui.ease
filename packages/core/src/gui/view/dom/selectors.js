export function easePanel(rootDomElement) {
    return rootDomElement.querySelector(".ease-selector");
}

export function curveSelector(rootDomElement) {
    return rootDomElement.querySelector(".curve-selector");
}

export function orientationSelector(rootDomElement) {
    return rootDomElement.querySelector(".orientation-selector");
}

export function cornerCurveCanvas(rootDomElement) {
    return rootDomElement.querySelector("canvas.corner-curve");
}

export function editButton(rootDomElement) {
    return rootDomElement.querySelector(".edit-button");
}

export function propertiesContainer(rootDomElement) {
    return rootDomElement.querySelector(".properties-container");
}

export function editorCanvas(rootDomElement) {
    return rootDomElement.querySelector("canvas.editor");
}

export function editorSvgPathInspector(rootDomElement) {
    return rootDomElement.querySelector(".path-selector");
}

export function editorSvgPathCopyButton(rootDomElement) {
    return rootDomElement.querySelector(".copy-button");
}

export function editorAcceptButton(rootDomElement) {
    return rootDomElement.querySelector(".accept-button");
}

export function editorDeclineButton(rootDomElement) {
    return rootDomElement.querySelector(".decline-button");
}