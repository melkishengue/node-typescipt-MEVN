export default class DOMElementNotFoundException extends Error {
  constructor(selector) {
    super(`DOM element with selector ${selector} not found.`);
  }
}
