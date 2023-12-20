/**
 * A callback method to build the shadow root of a custom component.
 * @name ElementBuilder
 * @function
 * @param {HTMLElement} element The custom component instance.
 */

/**
 * Defines a custom component.
 * @param {string} elementName The element name of the custom component.
 * @param {string} cssStyle The CSS style to attach to the component.
 * @param {ElementBuilder} elementBuilder The element builder callback.
 */
export function defineComponent(elementName, cssStyle, elementBuilder) {
    customElements.define(elementName, class extends HTMLElement {
        constructor() {
            super();
        }
    
        connectedCallback() {
            // Create a shadow root
            const shadow = this.attachShadow({ mode: "open" });
    
            const style = document.createElement("style");
            style.textContent = cssStyle;
            shadow.appendChild(style);
    
            const content = elementBuilder(this);
            shadow.appendChild(content);
        }
    });
}
