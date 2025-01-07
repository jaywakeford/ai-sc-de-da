"use strict";
exports.id = 115;
exports.ids = [115];
exports.modules = {

/***/ 2115:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ AudioPlayer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_h5_audio_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6679);
/* harmony import */ var _utils_paths__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2703);
/* harmony import */ var react_h5_audio_player_lib_styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2438);
/* harmony import */ var react_h5_audio_player_lib_styles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_h5_audio_player_lib_styles_css__WEBPACK_IMPORTED_MODULE_3__);
/* __next_internal_client_entry_do_not_use__ default auto */ 




function AudioPlayer({ src, title }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "w-full",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_h5_audio_player__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP, {
            src: (0,_utils_paths__WEBPACK_IMPORTED_MODULE_4__/* .getAudioPath */ .lq)(src),
            autoPlay: false,
            showJumpControls: true,
            layout: "horizontal",
            customProgressBarSection: [
                react_h5_audio_player__WEBPACK_IMPORTED_MODULE_2__/* .RHAP_UI */ .s2.CURRENT_TIME,
                react_h5_audio_player__WEBPACK_IMPORTED_MODULE_2__/* .RHAP_UI */ .s2.PROGRESS_BAR,
                react_h5_audio_player__WEBPACK_IMPORTED_MODULE_2__/* .RHAP_UI */ .s2.DURATION
            ],
            customControlsSection: [
                react_h5_audio_player__WEBPACK_IMPORTED_MODULE_2__/* .RHAP_UI */ .s2.MAIN_CONTROLS,
                react_h5_audio_player__WEBPACK_IMPORTED_MODULE_2__/* .RHAP_UI */ .s2.VOLUME_CONTROLS
            ]
        })
    });
}


/***/ }),

/***/ 2703:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PA: () => (/* binding */ getPdfPath),
/* harmony export */   Yo: () => (/* binding */ getVideoPath),
/* harmony export */   al: () => (/* binding */ getImagePath),
/* harmony export */   lq: () => (/* binding */ getAudioPath)
/* harmony export */ });
/* unused harmony exports getBasePath, getMediaPath */
const getBasePath = ()=>{
    return "/ai-research-sc-analytics-v2" || 0;
};
const getMediaPath = (path)=>{
    const basePath = getBasePath();
    const cleanPath = path.replace(/^\/+/, "");
    return `${basePath}/media/${cleanPath}`;
};
const getImagePath = (path)=>{
    const basePath = getBasePath();
    const cleanPath = path.replace(/^\/+/, "");
    return `${basePath}/images/${cleanPath}`;
};
const getPdfPath = (path)=>{
    const basePath = getBasePath();
    const cleanPath = path.replace(/^\/+/, "");
    return `${basePath}/media/pdfs/${cleanPath}`;
};
const getAudioPath = (path)=>{
    const basePath = getBasePath();
    const cleanPath = path.replace(/^\/+/, "");
    return `${basePath}/media/audio/${cleanPath}`;
};
const getVideoPath = (path)=>{
    const basePath = getBasePath();
    const cleanPath = path.replace(/^\/+/, "");
    return `${basePath}/media/videos/${cleanPath}`;
};


/***/ })

};
;