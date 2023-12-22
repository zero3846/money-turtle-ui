import * as state from './state.js'

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
            this._updatedListener = null;
        }
    
        connectedCallback() {
            // Create a shadow root
            const shadow = this.attachShadow({ mode: "open" });
    
            const style = document.createElement("style");
            style.textContent = cssStyle;
            shadow.appendChild(style);
    
            const content = elementBuilder(this);
            shadow.appendChild(content);

            if (this.hasAttribute("model-id")) {
                const modelId = this.getAttribute("model-id").trim();

                state.useModel(modelId);
                this._updatedListener = state.listen(modelId, 'updated', e => {
                    const newContent = elementBuilder(this);
                    shadow.replaceChild(newContent, content);
                });
            }
        }

        disconnectedCallback() {
            if (this._updatedListener) {
                state.unlisten(this._modelId, this._updatedListener);
                this._updatedListener = null;
            }
        }
    });
}
