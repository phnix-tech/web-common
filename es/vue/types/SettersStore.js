var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Store } from "vuex";
var SettersStore = /** @class */ (function (_super) {
    __extends(SettersStore, _super);
    function SettersStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__hasSetters = false;
        return _this;
    }
    return SettersStore;
}(Store));
export default SettersStore;
