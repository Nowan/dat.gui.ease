import Middleware from "./middleware/Middleware";

export default class EaseManager {
    constructor() {
        this._middlewares = [];
    }

    /**
     * Checks whether a compatible middleware for ease was provided
     * @param {Ease} ease - Ease instance of animation library of your choice
     * @return {boolean}
     */
    supports(ease) {
        return this._middlewares.some(middleware => middleware.isFormatSupported(ease));
    }

    /**
     * Returns a compatible middleware for ease
     * @param {Ease} ease - Ease instance of animation library of your choice
     * @return {Middleware | null}
     */
    getCompatibleMiddleware(ease) {
        return this._middlewares.find(middleware => middleware.isFormatSupported(ease)) || null;
    }

     /**
     * Register middleware to handle Ease objects of animation library of your choice
     * @param {Middleware} middleware - Middleware instance
     * @return {this} self reference for chaining.
     */
    use(middleware) {
        // TODO: fix transpilation problem to use "instanceof" here
        if (middleware.toString() === `[object ${Middleware.CLASS_NAME}]`) {
            this._middlewares.push(middleware);
        }
        else {
            console.warn("Middleware instance expected");
        }
    }
}