/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
electron_1.contextBridge.exposeInMainWorld('api', {
    ipcRenderer: {
        getSettings() {
            electron_1.ipcRenderer.send('settings/get', 'settings');
        },
        trayUpdate(data) {
            electron_1.ipcRenderer.send('tray-update', data);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        on(channel, func) {
            const validChannels = ['ipc-example', 'settings'];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                electron_1.ipcRenderer.on(channel, (_event, ...args) => func(...args));
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        once(channel, func) {
            const validChannels = ['ipc-example', 'settings'];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                electron_1.ipcRenderer.once(channel, (_event, ...args) => func(...args));
            }
        },
    },
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSxtRUFBc0Q7QUFFdEQsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7SUFDckMsV0FBVyxFQUFFO1FBQ1gsV0FBVztZQUNULHNCQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsVUFBVSxDQUFDLElBQVM7WUFDbEIsc0JBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRCw4REFBOEQ7UUFDOUQsRUFBRSxDQUFDLE9BQWUsRUFBRSxJQUE4QjtZQUNoRCxNQUFNLGFBQWEsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNsRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ25DLG1EQUFtRDtnQkFDbkQsc0JBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQzdEO1FBQ0gsQ0FBQztRQUNELDhEQUE4RDtRQUM5RCxJQUFJLENBQUMsT0FBZSxFQUFFLElBQThCO1lBQ2xELE1BQU0sYUFBYSxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbkMsbURBQW1EO2dCQUNuRCxzQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDL0Q7UUFDSCxDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2lud2F0Y2gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vY29pbndhdGNoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvaW53YXRjaC8uL3NyYy9tYWluL3ByZWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCB7IGNvbnRleHRCcmlkZ2UsIGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKCdhcGknLCB7XG4gIGlwY1JlbmRlcmVyOiB7XG4gICAgZ2V0U2V0dGluZ3MoKSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdzZXR0aW5ncy9nZXQnLCAnc2V0dGluZ3MnKTtcbiAgICB9LFxuICAgIHRyYXlVcGRhdGUoZGF0YTogYW55KSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCd0cmF5LXVwZGF0ZScsIGRhdGEpO1xuICAgIH0sXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBvbihjaGFubmVsOiBzdHJpbmcsIGZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCkge1xuICAgICAgY29uc3QgdmFsaWRDaGFubmVscyA9IFsnaXBjLWV4YW1wbGUnLCAnc2V0dGluZ3MnXTtcbiAgICAgIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBzdHJpcCBldmVudCBhcyBpdCBpbmNsdWRlcyBgc2VuZGVyYFxuICAgICAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCAoX2V2ZW50LCAuLi5hcmdzKSA9PiBmdW5jKC4uLmFyZ3MpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgb25jZShjaGFubmVsOiBzdHJpbmcsIGZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCkge1xuICAgICAgY29uc3QgdmFsaWRDaGFubmVscyA9IFsnaXBjLWV4YW1wbGUnLCAnc2V0dGluZ3MnXTtcbiAgICAgIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBzdHJpcCBldmVudCBhcyBpdCBpbmNsdWRlcyBgc2VuZGVyYFxuICAgICAgICBpcGNSZW5kZXJlci5vbmNlKGNoYW5uZWwsIChfZXZlbnQsIC4uLmFyZ3MpID0+IGZ1bmMoLi4uYXJncykpO1xuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==