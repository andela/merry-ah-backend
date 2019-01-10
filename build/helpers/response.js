"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function Response(status, code, messages, data) {
  _classCallCheck(this, Response);

  this.status = status;
  this.code = code;
  this.messages = messages;
  this.data = data;
};

exports.default = Response;