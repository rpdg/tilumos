define('ts/util/utils.ts', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function hasOwnProperty(obj, prop) {
      return !!obj && obj.hasOwnProperty(prop);
  }
  function setParamsObject(obj, param, value, castBoolean) {
      var reg = /^(.+?)(\[.*\])$/, paramIsArray, match, allKeys, key, k;
      if (match = param.match(reg)) {
          key = match[1];
          allKeys = match[2].replace(/^\[|\]$/g, '').split('][');
          for (var i = 0; k = allKeys[i]; i++) {
              paramIsArray = !k || k.match(/^\d+$/);
              if (!key && is.Array(obj))
                  key = obj.length;
              if (!hasOwnProperty(obj, key)) {
                  obj[key] = paramIsArray ? [] : {};
              }
              obj = obj[key];
              key = k;
          }
          if (!key && paramIsArray)
              key = obj.length.toString();
          setParamsObject(obj, key, value, castBoolean);
      }
      else if (castBoolean && value === 'true') {
          obj[param] = true;
      }
      else if (castBoolean && value === 'false') {
          obj[param] = false;
      }
      else if (castBoolean && is.Number(value)) {
          obj[param] = parseFloat(value);
      }
      else {
          obj[param] = value;
      }
  }
  var request = (function (str, castBoolean) {
      var result = {}, split;
      str = (str && str.toString) ? str.toString() : '';
      var arr = str.replace(/^.*?\?/, '').split('&'), p;
      for (var i = 0; p = arr[i]; i++) {
          split = p.split('=');
          if (split.length !== 2)
              continue;
          setParamsObject(result, split[0], decodeURIComponent(split[1]), castBoolean);
      }
      return result;
  })(window.location.search, false);
  exports.request = request;
  var is = {
      Array: $.noop,
      RegExp: $.noop,
      Date: $.noop,
      Number: $.noop,
      String: $.noop,
      Object: $.noop,
      HTMLDocument: $.noop,
      UsingIE: $.detectIE(),
  };
  exports.is = is;
  var isTypes = ['Array', 'RegExp', 'Date', 'Number', 'String', 'Object', 'HTMLDocument'];
  for (var i = 0, c = void 0; c = isTypes[i++];) {
      is[c] = (function (type) {
          return function (obj) {
              return Object.prototype.toString.call(obj) == '[object ' + type + ']';
          };
      })(c);
  }
  function objectToQueryString(base, obj) {
      var tmp;
      // If a custom toString exists bail here and use that instead
      if (is.Array(obj) || is.Object(obj)) {
          tmp = [];
          iterateOverObject(obj, function (key, value) {
              if (base)
                  key = base + '[' + key + ']';
              tmp.push(objectToQueryString(key, value));
          });
          return tmp.join('&');
      }
      else {
          if (!base)
              return '';
          return sanitizeURIComponent(base) + '=' + (is.Date(obj) ? obj.getTime() : sanitizeURIComponent(obj));
      }
  }
  function sanitizeURIComponent(obj) {
      // undefined, null, and NaN are represented as a blank string,
      // while false and 0 are stringified. "+" is allowed in query string
      return !obj && obj !== false && obj !== 0 ? '' : encodeURIComponent(obj).replace(/%20/g, '+').replace(/%5B/g, '[').replace(/%5D/g, ']');
  }
  function iterateOverObject(obj, fn) {
      var key;
      for (key in obj) {
          if (!hasOwnProperty(obj, key))
              continue;
          if (fn.call(obj, key, obj[key], obj) === false)
              break;
      }
  }
  var url = {
      addSearch: function (url, pm1, pm2) {
          for (var i = 1, len = arguments.length; i < len; i++) {
              var p = arguments[i];
              if (p !== undefined && p !== null) {
                  if (p.indexOf('?') === 0 || p.indexOf('&') === 0)
                      p = p.substr(1);
                  var prefix = i > 1 ? '&' : (url.indexOf('?') > -1 ? '&' : '?');
                  url += (prefix + p);
              }
          }
          return url;
      },
      //opg.url.setParam('http://127.0.0.1:8080/page/home/' , {name:'Bob'}, 'user' );
      //opg.url.setParam('http://127.0.0.1:8080/page/home/' , {name:'Bob'} );
      setParam: function (url, obj, namespace) {
          return url.addSearch(url, objectToQueryString(namespace, obj));
      },
      getParam: function (url, name) {
          name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
          var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(url.substr(url.indexOf('?')));
          return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      },
  };
  exports.url = url;
  var string = {
      _str_pad_repeater: function (s, len) {
          var collect = '';
          while (collect.length < len) {
              collect += s;
          }
          collect = collect.substr(0, len);
          return collect;
      },
      pad: function (input, result_full_length, pad_string, pad_type) {
          //   example 1: str.pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
          //   returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
          //   example 2: str.pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
          //   returns 2: '------Kevin van Zonneveld-----'
          if (pad_string === void 0) { pad_string = '0'; }
          if (pad_type === void 0) { pad_type = 'STR_PAD_RIGHT'; }
          var half = '', pad_to_go;
          input += '';
          pad_string = pad_string !== undefined ? pad_string : ' ';
          if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
              pad_type = 'STR_PAD_RIGHT';
          }
          if ((pad_to_go = result_full_length - input.length) > 0) {
              if (pad_type === 'STR_PAD_LEFT') {
                  input = string._str_pad_repeater(pad_string, pad_to_go) + input;
              }
              else if (pad_type === 'STR_PAD_RIGHT') {
                  input = input + string._str_pad_repeater(pad_string, pad_to_go);
              }
              else if (pad_type === 'STR_PAD_BOTH') {
                  half = string._str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
                  input = half + input + half;
                  input = input.substr(0, result_full_length);
              }
          }
          return input;
      },
      padLeft: function (oStr, result_full_length, pad_string) {
          if (pad_string === void 0) { pad_string = '0'; }
          return string.pad(oStr, result_full_length, pad_string, 'STR_PAD_LEFT');
      },
      padRight: function (oStr, result_full_length, pad_string) {
          if (pad_string === void 0) { pad_string = '0'; }
          return string.pad(oStr, result_full_length, pad_string || 0, 'STR_PAD_RIGHT');
      },
  };
  exports.string = string;
  var dateTime = {
      addSeconds: function (d, s) {
          return new Date(d.getTime() + s * 1000);
      },
      addDays: function (d, s) {
          return new Date(d.getTime() + s * 24 * 3600 * 1000);
      },
      daySpan: function (dateFrom, dateTo) {
          return Math.round((dateTo.valueOf() - dateFrom.valueOf()) / 86400000);
      },
      weekSpan: function (dateFrom, dateTo) {
          var d = dateTime.daySpan(dateFrom, dateTo);
          return Math.ceil((d + dateFrom.getDay()) / 7);
      },
  };
  exports.dateTime = dateTime;
  var convert = {
      hashKeysToArray: function (obj) {
          if (Object.keys) {
              return Object.keys(obj);
          }
          else {
              var arr = [];
              for (arr[arr.length] in obj)
                  ;
              return arr;
          }
      },
      hashToArray: function (obj, convertor) {
          var arr = [];
          for (var key in obj) {
              var val = obj[key];
              if (convertor)
                  val = convertor(val, key);
              arr.push(val);
          }
          return arr;
      },
      arrayToHash: function (arr, key) {
          var obj = {}, i = 0, l = arr.length;
          for (; i < l; i++) {
              var item = arr[i];
              if (!(item[key] in obj)) {
                  obj[item[key]] = item;
              }
          }
          return obj;
      },
      stringToDate: function (str, formater) {
          var format = formater || 'yyyy-MM-dd HH:mm:ss'; // default format
          var parts = str.match(/(\d+)/g), i = 0, fmt = {};
          // extract date-part indexes from the format
          format.replace(/(yyyy|dd|MM|HH|hh|mm|ss)/g, function (part) {
              fmt[part] = i++;
          });
          //
          if (!fmt['HH'] && fmt['hh'])
              fmt['HH'] = fmt['hh'];
          return new Date(parts[fmt['yyyy']] || 0, (parts[fmt['MM']] || 1) - 1, parts[fmt['dd']] || 0, parts[fmt['HH']] || 0, parts[fmt['mm']] || 0, parts[fmt['ss']] || 0);
      },
      jsonToDate: function (isoString) {
          return new Date(Date.parse(isoString));
      },
      /**
       * Convert seconds to hh:mm:ss format.
       * @param {number} totalSeconds - the total seconds to convert to hh- mm-ss
       **/
      secondsToTimecode: function (totalSeconds) {
          var hours = Math.floor(totalSeconds / 3600);
          var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
          var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
          // round seconds
          seconds = Math.round(seconds * 100) / 100;
          var result = (hours < 10 ? '0' + hours : hours);
          result += ':' + (minutes < 10 ? '0' + minutes : minutes);
          result += ':' + (seconds < 10 ? '0' + seconds : seconds);
          return result;
      },
  };
  exports.convert = convert;
  var format = {
      date: function (date, format) {
          if (format === void 0) { format = 'yyyy-MM-dd'; }
          var o = {
              'M+': date.getMonth() + 1,
              'd+': date.getDate(),
              'h+': (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()),
              'H+': date.getHours(),
              'm+': date.getMinutes(),
              's+': date.getSeconds(),
              'q+': Math.floor((date.getMonth() + 3) / 3),
              'S': date.getMilliseconds() //millisecond
          };
          if (/(y+)/.test(format))
              format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
          for (var k in o)
              if (new RegExp('(' + k + ')').test(format))
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
          return format;
      },
      toFixed: function (input) {
          var n = Math.round(+input * 100);
          return format.toNFixed(n * .01);
      },
      toNFixed: function (input) {
          var s = (+input).toString(), i = s.indexOf('.');
          if (i < 0)
              return s + '.00';
          s += '00';
          return s.substr(0, i + 3);
      },
      number: function (number, decimals, dec_point, thousands_sep) {
          //   example 1: number_format(1234.56);
          //   returns 1: '1,235'
          //   example 2: number_format(1234.56, 2, ',', ' ');
          //   returns 2: '1 234,56'
          //   example 3: number_format(1234.5678, 2, '.', '');
          //   returns 3: '1234.57'
          //   example 4: number_format(67, 2, ',', '.');
          //   returns 4: '67,00'
          //   example 5: number_format(1000);
          //   returns 5: '1,000'
          //   example 6: number_format(67.311, 2);
          //   returns 6: '67.31'
          //   example 7: number_format(1000.55, 1);
          //   returns 7: '1,000.6'
          //   example 8: number_format(67000, 5, ',', '.');
          //   returns 8: '67.000,00000'
          //   example 9: number_format(0.9, 0);
          //   returns 9: '1'
          //  example 10: number_format('1.20', 2);
          //  returns 10: '1.20'
          //  example 11: number_format('1.20', 4);
          //  returns 11: '1.2000'
          //  example 12: number_format('1.2000', 3);
          //  returns 12: '1.200'
          //  example 13: number_format('1 000,50', 2, '.', ' ');
          //  returns 13: '100 050.00'
          //  example 14: number_format(1e-8, 8, '.', '');
          //  returns 14: '0.00000001'
          number = (number + '')
              .replace(/[^0-9+\-Ee.]/g, '');
          var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, dec = (typeof dec_point === 'undefined') ? '.' : dec_point, s = '', toFixedFix = function (n, prec) {
              var k = Math.pow(10, prec);
              return '' + (Math.round(n * k) / k)
                  .toFixed(prec);
          };
          // Fix forar IE parseFloat(0.55).toFixed(0) = 0;
          var s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
              .split('.');
          if (s[0].length > 3) {
              s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
          }
          if ((s[1] || '')
              .length < prec) {
              s[1] = s[1] || '';
              s[1] += new Array(prec - s[1].length + 1)
                  .join('0');
          }
          return s.join(dec);
      },
      fileSize: function (filesize) {
          if (filesize >= 1073741824) {
              filesize = format.number(filesize / 1073741824, 2, '.', ',') + ' GB';
          }
          else if (filesize >= 1048576) {
              filesize = format.number(filesize / 1048576, 2, '.', '') + ' MB';
          }
          else if (filesize >= 1024) {
              filesize = format.number(filesize / 1024, 0) + ' KB';
          }
          else {
              //filesize = '< 1KB';
              filesize = format.number(filesize, 0) + ' bytes';
          }
          return filesize;
      },
      json: (function () {
          var pattern = /\${(\w+[.]*\w*)\}(?!})/g;
          return function (template, json) {
              return template.replace(pattern, function (match, key, value) {
                  return json[key];
              });
          };
      })(),
      timeLength: function (seconds) {
          if (seconds === void 0) { seconds = 0; }
          return string.padLeft(Math.floor(seconds / 3600), 2) + ':' + string.padLeft(Math.floor((seconds % 3600) / 60), 2) + ':' + string.padLeft(Math.floor(seconds % 60), 2);
      },
  };
  exports.format = format;
  var cleanValueObject = function (vo) {
      for (var key in vo)
          if (key.indexOf(':') > -1)
              delete vo[key];
      return vo;
  };
  exports.cleanValueObject = cleanValueObject;
  var array = {
      unique: function (arr) {
          var tmpArr = [], hash = {};
          for (var i = 0, l = arr.length; i < l; i++) {
              if (!hash[arr[i]]) {
                  hash[arr[i]] = true;
                  tmpArr.push(arr[i]);
              }
          }
          return tmpArr;
      },
      combine: function () {
          var needles = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              needles[_i] = arguments[_i];
          }
          var arr = [];
          for (var i = 0, l = needles.length; i < l; i++) {
              var a = needles[i], len = a.length;
              for (var k = 0; k < len; k = k + 5000) {
                  arr.push.apply(arr, a.slice(k, k + 5000));
              }
          }
          return arr;
      },
      sort: function (arr, propName, sortCompareFunction) {
          if (sortCompareFunction && typeof sortCompareFunction === 'function')
              return arr.sort(sortCompareFunction);
          else {
              var dup = Array.prototype.slice.call(arr, 0);
              //let dup = arr.slice(0);
              if (!arguments.length)
                  return dup.sort();
              //let args = Array.prototype.slice.call(arguments);
              return dup.sort(function (a, b) {
                  var A = a[propName], nA = isNaN(A), B = b[propName], nB = isNaN(B);
                  //两者皆非number
                  if (nA && nB) {
                      if (A === '')
                          return -1;
                      if (B === '')
                          return 1;
                      return (A === B ? 0 : A > B ? 1 : -1);
                  }
                  else if (nA)
                      return -1;
                  else if (nB)
                      return 1;
                  //a[prop], b[prop]  均是 number
                  return A === B ? 0 : A > B ? 1 : -1;
              });
          }
      },
  };
  exports.array = array;
  //# sourceMappingURL=/ts/util/utils.js.map
  

});
