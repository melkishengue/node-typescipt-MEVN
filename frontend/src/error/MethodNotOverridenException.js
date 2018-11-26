export default class MethodNotOverridenException extends Error {
  constructor(message) {
    let _message = message || 'Abstract method. Please override this method';
    super(_message);
  }
}
