/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@actions/core/lib/command.js":
/*!***************************************************!*\
  !*** ./node_modules/@actions/core/lib/command.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__webpack_require__(/*! os */ "os"));
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/@actions/core/lib/utils.js");
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
  const cmd = new Command(command, properties, message);
  process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
  issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
  constructor(command, properties, message) {
    if (!command) {
      command = 'missing.command';
    }
    this.command = command;
    this.properties = properties;
    this.message = message;
  }
  toString() {
    let cmdStr = CMD_STRING + this.command;
    if (this.properties && Object.keys(this.properties).length > 0) {
      cmdStr += ' ';
      let first = true;
      for (const key in this.properties) {
        if (this.properties.hasOwnProperty(key)) {
          const val = this.properties[key];
          if (val) {
            if (first) {
              first = false;
            } else {
              cmdStr += ',';
            }
            cmdStr += `${key}=${escapeProperty(val)}`;
          }
        }
      }
    }
    cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
    return cmdStr;
  }
}
function escapeData(s) {
  return utils_1.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function escapeProperty(s) {
  return utils_1.toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/:/g, '%3A').replace(/,/g, '%2C');
}

/***/ }),

/***/ "./node_modules/@actions/core/lib/core.js":
/*!************************************************!*\
  !*** ./node_modules/@actions/core/lib/core.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __webpack_require__(/*! ./command */ "./node_modules/@actions/core/lib/command.js");
const file_command_1 = __webpack_require__(/*! ./file-command */ "./node_modules/@actions/core/lib/file-command.js");
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/@actions/core/lib/utils.js");
const os = __importStar(__webpack_require__(/*! os */ "os"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const oidc_utils_1 = __webpack_require__(/*! ./oidc-utils */ "./node_modules/@actions/core/lib/oidc-utils.js");
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
  /**
   * A code indicating that the action was successful
   */
  ExitCode[ExitCode["Success"] = 0] = "Success";
  /**
   * A code indicating that the action was a failure
   */
  ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
  const convertedVal = utils_1.toCommandValue(val);
  process.env[name] = convertedVal;
  const filePath = process.env['GITHUB_ENV'] || '';
  if (filePath) {
    return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
  }
  command_1.issueCommand('set-env', {
    name
  }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
  command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
  const filePath = process.env['GITHUB_PATH'] || '';
  if (filePath) {
    file_command_1.issueFileCommand('PATH', inputPath);
  } else {
    command_1.issueCommand('add-path', {}, inputPath);
  }
  process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
  const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
  if (options && options.required && !val) {
    throw new Error(`Input required and not supplied: ${name}`);
  }
  if (options && options.trimWhitespace === false) {
    return val;
  }
  return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
  const inputs = getInput(name, options).split('\n').filter(x => x !== '');
  if (options && options.trimWhitespace === false) {
    return inputs;
  }
  return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
  const trueValue = ['true', 'True', 'TRUE'];
  const falseValue = ['false', 'False', 'FALSE'];
  const val = getInput(name, options);
  if (trueValue.includes(val)) return true;
  if (falseValue.includes(val)) return false;
  throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` + `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
  const filePath = process.env['GITHUB_OUTPUT'] || '';
  if (filePath) {
    return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
  }
  process.stdout.write(os.EOL);
  command_1.issueCommand('set-output', {
    name
  }, utils_1.toCommandValue(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
  command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
  process.exitCode = ExitCode.Failure;
  error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
  return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
  command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
  command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
  command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
  command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
  process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
  command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
  command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
  return __awaiter(this, void 0, void 0, function* () {
    startGroup(name);
    let result;
    try {
      result = yield fn();
    } finally {
      endGroup();
    }
    return result;
  });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
  const filePath = process.env['GITHUB_STATE'] || '';
  if (filePath) {
    return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
  }
  command_1.issueCommand('save-state', {
    name
  }, utils_1.toCommandValue(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
  return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
  return __awaiter(this, void 0, void 0, function* () {
    return yield oidc_utils_1.OidcClient.getIDToken(aud);
  });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __webpack_require__(/*! ./summary */ "./node_modules/@actions/core/lib/summary.js");
Object.defineProperty(exports, "summary", ({
  enumerable: true,
  get: function () {
    return summary_1.summary;
  }
}));
/**
 * @deprecated use core.summary
 */
var summary_2 = __webpack_require__(/*! ./summary */ "./node_modules/@actions/core/lib/summary.js");
Object.defineProperty(exports, "markdownSummary", ({
  enumerable: true,
  get: function () {
    return summary_2.markdownSummary;
  }
}));
/**
 * Path exports
 */
var path_utils_1 = __webpack_require__(/*! ./path-utils */ "./node_modules/@actions/core/lib/path-utils.js");
Object.defineProperty(exports, "toPosixPath", ({
  enumerable: true,
  get: function () {
    return path_utils_1.toPosixPath;
  }
}));
Object.defineProperty(exports, "toWin32Path", ({
  enumerable: true,
  get: function () {
    return path_utils_1.toWin32Path;
  }
}));
Object.defineProperty(exports, "toPlatformPath", ({
  enumerable: true,
  get: function () {
    return path_utils_1.toPlatformPath;
  }
}));

/***/ }),

/***/ "./node_modules/@actions/core/lib/file-command.js":
/*!********************************************************!*\
  !*** ./node_modules/@actions/core/lib/file-command.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


// For internal use, subject to change.
var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const os = __importStar(__webpack_require__(/*! os */ "os"));
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/@actions/core/node_modules/uuid/dist/esm-node/index.js");
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/@actions/core/lib/utils.js");
function issueFileCommand(command, message) {
  const filePath = process.env[`GITHUB_${command}`];
  if (!filePath) {
    throw new Error(`Unable to find environment variable for file command ${command}`);
  }
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file at path: ${filePath}`);
  }
  fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
    encoding: 'utf8'
  });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
  const delimiter = `ghadelimiter_${uuid_1.v4()}`;
  const convertedValue = utils_1.toCommandValue(value);
  // These should realistically never happen, but just in case someone finds a
  // way to exploit uuid generation let's not allow keys or values that contain
  // the delimiter.
  if (key.includes(delimiter)) {
    throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
  }
  if (convertedValue.includes(delimiter)) {
    throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
  }
  return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;

/***/ }),

/***/ "./node_modules/@actions/core/lib/oidc-utils.js":
/*!******************************************************!*\
  !*** ./node_modules/@actions/core/lib/oidc-utils.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OidcClient = void 0;
const http_client_1 = __webpack_require__(/*! @actions/http-client */ "./node_modules/@actions/core/node_modules/@actions/http-client/lib/index.js");
const auth_1 = __webpack_require__(/*! @actions/http-client/lib/auth */ "./node_modules/@actions/core/node_modules/@actions/http-client/lib/auth.js");
const core_1 = __webpack_require__(/*! ./core */ "./node_modules/@actions/core/lib/core.js");
class OidcClient {
  static createHttpClient(allowRetry = true, maxRetry = 10) {
    const requestOptions = {
      allowRetries: allowRetry,
      maxRetries: maxRetry
    };
    return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
  }
  static getRequestToken() {
    const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
    if (!token) {
      throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
    }
    return token;
  }
  static getIDTokenUrl() {
    const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
    if (!runtimeUrl) {
      throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
    }
    return runtimeUrl;
  }
  static getCall(id_token_url) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      const httpclient = OidcClient.createHttpClient();
      const res = yield httpclient.getJson(id_token_url).catch(error => {
        throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
      });
      const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
      if (!id_token) {
        throw new Error('Response json body do not have ID Token field');
      }
      return id_token;
    });
  }
  static getIDToken(audience) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        // New ID Token is requested from action service
        let id_token_url = OidcClient.getIDTokenUrl();
        if (audience) {
          const encodedAudience = encodeURIComponent(audience);
          id_token_url = `${id_token_url}&audience=${encodedAudience}`;
        }
        core_1.debug(`ID token url is ${id_token_url}`);
        const id_token = yield OidcClient.getCall(id_token_url);
        core_1.setSecret(id_token);
        return id_token;
      } catch (error) {
        throw new Error(`Error message: ${error.message}`);
      }
    });
  }
}
exports.OidcClient = OidcClient;

/***/ }),

/***/ "./node_modules/@actions/core/lib/path-utils.js":
/*!******************************************************!*\
  !*** ./node_modules/@actions/core/lib/path-utils.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__webpack_require__(/*! path */ "path"));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
  return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
  return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
  return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;

/***/ }),

/***/ "./node_modules/@actions/core/lib/summary.js":
/*!***************************************************!*\
  !*** ./node_modules/@actions/core/lib/summary.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __webpack_require__(/*! os */ "os");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const {
  access,
  appendFile,
  writeFile
} = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
  constructor() {
    this._buffer = '';
  }
  /**
   * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
   * Also checks r/w permissions.
   *
   * @returns step summary file path
   */
  filePath() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._filePath) {
        return this._filePath;
      }
      const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
      if (!pathFromEnv) {
        throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
      }
      try {
        yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
      } catch (_a) {
        throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
      }
      this._filePath = pathFromEnv;
      return this._filePath;
    });
  }
  /**
   * Wraps content in an HTML tag, adding any HTML attributes
   *
   * @param {string} tag HTML tag to wrap
   * @param {string | null} content content within the tag
   * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
   *
   * @returns {string} content wrapped in HTML element
   */
  wrap(tag, content, attrs = {}) {
    const htmlAttrs = Object.entries(attrs).map(([key, value]) => ` ${key}="${value}"`).join('');
    if (!content) {
      return `<${tag}${htmlAttrs}>`;
    }
    return `<${tag}${htmlAttrs}>${content}</${tag}>`;
  }
  /**
   * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
   *
   * @param {SummaryWriteOptions} [options] (optional) options for write operation
   *
   * @returns {Promise<Summary>} summary instance
   */
  write(options) {
    return __awaiter(this, void 0, void 0, function* () {
      const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
      const filePath = yield this.filePath();
      const writeFunc = overwrite ? writeFile : appendFile;
      yield writeFunc(filePath, this._buffer, {
        encoding: 'utf8'
      });
      return this.emptyBuffer();
    });
  }
  /**
   * Clears the summary buffer and wipes the summary file
   *
   * @returns {Summary} summary instance
   */
  clear() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.emptyBuffer().write({
        overwrite: true
      });
    });
  }
  /**
   * Returns the current summary buffer as a string
   *
   * @returns {string} string of summary buffer
   */
  stringify() {
    return this._buffer;
  }
  /**
   * If the summary buffer is empty
   *
   * @returns {boolen} true if the buffer is empty
   */
  isEmptyBuffer() {
    return this._buffer.length === 0;
  }
  /**
   * Resets the summary buffer without writing to summary file
   *
   * @returns {Summary} summary instance
   */
  emptyBuffer() {
    this._buffer = '';
    return this;
  }
  /**
   * Adds raw text to the summary buffer
   *
   * @param {string} text content to add
   * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
   *
   * @returns {Summary} summary instance
   */
  addRaw(text, addEOL = false) {
    this._buffer += text;
    return addEOL ? this.addEOL() : this;
  }
  /**
   * Adds the operating system-specific end-of-line marker to the buffer
   *
   * @returns {Summary} summary instance
   */
  addEOL() {
    return this.addRaw(os_1.EOL);
  }
  /**
   * Adds an HTML codeblock to the summary buffer
   *
   * @param {string} code content to render within fenced code block
   * @param {string} lang (optional) language to syntax highlight code
   *
   * @returns {Summary} summary instance
   */
  addCodeBlock(code, lang) {
    const attrs = Object.assign({}, lang && {
      lang
    });
    const element = this.wrap('pre', this.wrap('code', code), attrs);
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds an HTML list to the summary buffer
   *
   * @param {string[]} items list of items to render
   * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
   *
   * @returns {Summary} summary instance
   */
  addList(items, ordered = false) {
    const tag = ordered ? 'ol' : 'ul';
    const listItems = items.map(item => this.wrap('li', item)).join('');
    const element = this.wrap(tag, listItems);
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds an HTML table to the summary buffer
   *
   * @param {SummaryTableCell[]} rows table rows
   *
   * @returns {Summary} summary instance
   */
  addTable(rows) {
    const tableBody = rows.map(row => {
      const cells = row.map(cell => {
        if (typeof cell === 'string') {
          return this.wrap('td', cell);
        }
        const {
          header,
          data,
          colspan,
          rowspan
        } = cell;
        const tag = header ? 'th' : 'td';
        const attrs = Object.assign(Object.assign({}, colspan && {
          colspan
        }), rowspan && {
          rowspan
        });
        return this.wrap(tag, data, attrs);
      }).join('');
      return this.wrap('tr', cells);
    }).join('');
    const element = this.wrap('table', tableBody);
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds a collapsable HTML details element to the summary buffer
   *
   * @param {string} label text for the closed state
   * @param {string} content collapsable content
   *
   * @returns {Summary} summary instance
   */
  addDetails(label, content) {
    const element = this.wrap('details', this.wrap('summary', label) + content);
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds an HTML image tag to the summary buffer
   *
   * @param {string} src path to the image you to embed
   * @param {string} alt text description of the image
   * @param {SummaryImageOptions} options (optional) addition image attributes
   *
   * @returns {Summary} summary instance
   */
  addImage(src, alt, options) {
    const {
      width,
      height
    } = options || {};
    const attrs = Object.assign(Object.assign({}, width && {
      width
    }), height && {
      height
    });
    const element = this.wrap('img', null, Object.assign({
      src,
      alt
    }, attrs));
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds an HTML section heading element
   *
   * @param {string} text heading text
   * @param {number | string} [level=1] (optional) the heading level, default: 1
   *
   * @returns {Summary} summary instance
   */
  addHeading(text, level) {
    const tag = `h${level}`;
    const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) ? tag : 'h1';
    const element = this.wrap(allowedTag, text);
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds an HTML thematic break (<hr>) to the summary buffer
   *
   * @returns {Summary} summary instance
   */
  addSeparator() {
    const element = this.wrap('hr', null);
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds an HTML line break (<br>) to the summary buffer
   *
   * @returns {Summary} summary instance
   */
  addBreak() {
    const element = this.wrap('br', null);
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds an HTML blockquote to the summary buffer
   *
   * @param {string} text quote text
   * @param {string} cite (optional) citation url
   *
   * @returns {Summary} summary instance
   */
  addQuote(text, cite) {
    const attrs = Object.assign({}, cite && {
      cite
    });
    const element = this.wrap('blockquote', text, attrs);
    return this.addRaw(element).addEOL();
  }
  /**
   * Adds an HTML anchor tag to the summary buffer
   *
   * @param {string} text link text/content
   * @param {string} href hyperlink
   *
   * @returns {Summary} summary instance
   */
  addLink(text, href) {
    const element = this.wrap('a', text, {
      href
    });
    return this.addRaw(element).addEOL();
  }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;

/***/ }),

/***/ "./node_modules/@actions/core/lib/utils.js":
/*!*************************************************!*\
  !*** ./node_modules/@actions/core/lib/utils.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
  if (input === null || input === undefined) {
    return '';
  } else if (typeof input === 'string' || input instanceof String) {
    return input;
  }
  return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
  if (!Object.keys(annotationProperties).length) {
    return {};
  }
  return {
    title: annotationProperties.title,
    file: annotationProperties.file,
    line: annotationProperties.startLine,
    endLine: annotationProperties.endLine,
    col: annotationProperties.startColumn,
    endColumn: annotationProperties.endColumn
  };
}
exports.toCommandProperties = toCommandProperties;

/***/ }),

/***/ "./node_modules/@actions/core/node_modules/@actions/http-client/lib/auth.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@actions/core/node_modules/@actions/http-client/lib/auth.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  prepareRequest(options) {
    if (!options.headers) {
      throw Error('The request has no headers');
    }
    options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter(this, void 0, void 0, function* () {
      throw new Error('not implemented');
    });
  }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
  constructor(token) {
    this.token = token;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(options) {
    if (!options.headers) {
      throw Error('The request has no headers');
    }
    options.headers['Authorization'] = `Bearer ${this.token}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter(this, void 0, void 0, function* () {
      throw new Error('not implemented');
    });
  }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
  constructor(token) {
    this.token = token;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(options) {
    if (!options.headers) {
      throw Error('The request has no headers');
    }
    options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return false;
  }
  handleAuthentication() {
    return __awaiter(this, void 0, void 0, function* () {
      throw new Error('not implemented');
    });
  }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;

/***/ }),

/***/ "./node_modules/@actions/core/node_modules/@actions/http-client/lib/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@actions/core/node_modules/@actions/http-client/lib/index.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__webpack_require__(/*! http */ "http"));
const https = __importStar(__webpack_require__(/*! https */ "https"));
const pm = __importStar(__webpack_require__(/*! ./proxy */ "./node_modules/@actions/core/node_modules/@actions/http-client/lib/proxy.js"));
const tunnel = __importStar(__webpack_require__(/*! tunnel */ "./node_modules/tunnel/index.js"));
var HttpCodes;
(function (HttpCodes) {
  HttpCodes[HttpCodes["OK"] = 200] = "OK";
  HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
  HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
  HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
  HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
  HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
  HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
  HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
  HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
  HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
  HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
  HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
  HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
  HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
  HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
  HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
  HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
  HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
  HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
  HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
  HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
  HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
  HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
  Headers["Accept"] = "accept";
  Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
  MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
  const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
  return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'HttpClientError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpClientError.prototype);
  }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
  constructor(message) {
    this.message = message;
  }
  readBody() {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise(resolve => __awaiter(this, void 0, void 0, function* () {
        let output = Buffer.alloc(0);
        this.message.on('data', chunk => {
          output = Buffer.concat([output, chunk]);
        });
        this.message.on('end', () => {
          resolve(output.toString());
        });
      }));
    });
  }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
  const parsedUrl = new URL(requestUrl);
  return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
  constructor(userAgent, handlers, requestOptions) {
    this._ignoreSslError = false;
    this._allowRedirects = true;
    this._allowRedirectDowngrade = false;
    this._maxRedirects = 50;
    this._allowRetries = false;
    this._maxRetries = 1;
    this._keepAlive = false;
    this._disposed = false;
    this.userAgent = userAgent;
    this.handlers = handlers || [];
    this.requestOptions = requestOptions;
    if (requestOptions) {
      if (requestOptions.ignoreSslError != null) {
        this._ignoreSslError = requestOptions.ignoreSslError;
      }
      this._socketTimeout = requestOptions.socketTimeout;
      if (requestOptions.allowRedirects != null) {
        this._allowRedirects = requestOptions.allowRedirects;
      }
      if (requestOptions.allowRedirectDowngrade != null) {
        this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
      }
      if (requestOptions.maxRedirects != null) {
        this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
      }
      if (requestOptions.keepAlive != null) {
        this._keepAlive = requestOptions.keepAlive;
      }
      if (requestOptions.allowRetries != null) {
        this._allowRetries = requestOptions.allowRetries;
      }
      if (requestOptions.maxRetries != null) {
        this._maxRetries = requestOptions.maxRetries;
      }
    }
  }
  options(requestUrl, additionalHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    });
  }
  get(requestUrl, additionalHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.request('GET', requestUrl, null, additionalHeaders || {});
    });
  }
  del(requestUrl, additionalHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    });
  }
  post(requestUrl, data, additionalHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.request('POST', requestUrl, data, additionalHeaders || {});
    });
  }
  patch(requestUrl, data, additionalHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    });
  }
  put(requestUrl, data, additionalHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.request('PUT', requestUrl, data, additionalHeaders || {});
    });
  }
  head(requestUrl, additionalHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    });
  }
  sendStream(verb, requestUrl, stream, additionalHeaders) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.request(verb, requestUrl, stream, additionalHeaders);
    });
  }
  /**
   * Gets a typed object from an endpoint
   * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
   */
  getJson(requestUrl, additionalHeaders = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      const res = yield this.get(requestUrl, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    });
  }
  postJson(requestUrl, obj, additionalHeaders = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      const res = yield this.post(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    });
  }
  putJson(requestUrl, obj, additionalHeaders = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      const res = yield this.put(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    });
  }
  patchJson(requestUrl, obj, additionalHeaders = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      const data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      const res = yield this.patch(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    });
  }
  /**
   * Makes a raw http request.
   * All other methods such as get, post, patch, and request ultimately call this.
   * Prefer get, del, post and patch
   */
  request(verb, requestUrl, data, headers) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._disposed) {
        throw new Error('Client has already been disposed.');
      }
      const parsedUrl = new URL(requestUrl);
      let info = this._prepareRequest(verb, parsedUrl, headers);
      // Only perform retries on reads since writes may not be idempotent.
      const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
      let numTries = 0;
      let response;
      do {
        response = yield this.requestRaw(info, data);
        // Check if it's an authentication challenge
        if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
          let authenticationHandler;
          for (const handler of this.handlers) {
            if (handler.canHandleAuthentication(response)) {
              authenticationHandler = handler;
              break;
            }
          }
          if (authenticationHandler) {
            return authenticationHandler.handleAuthentication(this, info, data);
          } else {
            // We have received an unauthorized response but have no handlers to handle it.
            // Let the response return to the caller.
            return response;
          }
        }
        let redirectsRemaining = this._maxRedirects;
        while (response.message.statusCode && HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0) {
          const redirectUrl = response.message.headers['location'];
          if (!redirectUrl) {
            // if there's no location to redirect to, we won't
            break;
          }
          const parsedRedirectUrl = new URL(redirectUrl);
          if (parsedUrl.protocol === 'https:' && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
            throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
          }
          // we need to finish reading the response before reassigning response
          // which will leak the open socket.
          yield response.readBody();
          // strip authorization header if redirected to a different hostname
          if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
            for (const header in headers) {
              // header names are case insensitive
              if (header.toLowerCase() === 'authorization') {
                delete headers[header];
              }
            }
          }
          // let's make the request with the new redirectUrl
          info = this._prepareRequest(verb, parsedRedirectUrl, headers);
          response = yield this.requestRaw(info, data);
          redirectsRemaining--;
        }
        if (!response.message.statusCode || !HttpResponseRetryCodes.includes(response.message.statusCode)) {
          // If not a retry code, return immediately instead of retrying
          return response;
        }
        numTries += 1;
        if (numTries < maxTries) {
          yield response.readBody();
          yield this._performExponentialBackoff(numTries);
        }
      } while (numTries < maxTries);
      return response;
    });
  }
  /**
   * Needs to be called if keepAlive is set to true in request options.
   */
  dispose() {
    if (this._agent) {
      this._agent.destroy();
    }
    this._disposed = true;
  }
  /**
   * Raw request.
   * @param info
   * @param data
   */
  requestRaw(info, data) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        function callbackForResult(err, res) {
          if (err) {
            reject(err);
          } else if (!res) {
            // If `err` is not passed, then `res` must be passed.
            reject(new Error('Unknown error'));
          } else {
            resolve(res);
          }
        }
        this.requestRawWithCallback(info, data, callbackForResult);
      });
    });
  }
  /**
   * Raw request with callback.
   * @param info
   * @param data
   * @param onResult
   */
  requestRawWithCallback(info, data, onResult) {
    if (typeof data === 'string') {
      if (!info.options.headers) {
        info.options.headers = {};
      }
      info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
    }
    let callbackCalled = false;
    function handleResult(err, res) {
      if (!callbackCalled) {
        callbackCalled = true;
        onResult(err, res);
      }
    }
    const req = info.httpModule.request(info.options, msg => {
      const res = new HttpClientResponse(msg);
      handleResult(undefined, res);
    });
    let socket;
    req.on('socket', sock => {
      socket = sock;
    });
    // If we ever get disconnected, we want the socket to timeout eventually
    req.setTimeout(this._socketTimeout || 3 * 60000, () => {
      if (socket) {
        socket.end();
      }
      handleResult(new Error(`Request timeout: ${info.options.path}`));
    });
    req.on('error', function (err) {
      // err has statusCode property
      // res should have headers
      handleResult(err);
    });
    if (data && typeof data === 'string') {
      req.write(data, 'utf8');
    }
    if (data && typeof data !== 'string') {
      data.on('close', function () {
        req.end();
      });
      data.pipe(req);
    } else {
      req.end();
    }
  }
  /**
   * Gets an http agent. This function is useful when you need an http agent that handles
   * routing through a proxy server - depending upon the url and proxy environment variables.
   * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
   */
  getAgent(serverUrl) {
    const parsedUrl = new URL(serverUrl);
    return this._getAgent(parsedUrl);
  }
  _prepareRequest(method, requestUrl, headers) {
    const info = {};
    info.parsedUrl = requestUrl;
    const usingSsl = info.parsedUrl.protocol === 'https:';
    info.httpModule = usingSsl ? https : http;
    const defaultPort = usingSsl ? 443 : 80;
    info.options = {};
    info.options.host = info.parsedUrl.hostname;
    info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
    info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
    info.options.method = method;
    info.options.headers = this._mergeHeaders(headers);
    if (this.userAgent != null) {
      info.options.headers['user-agent'] = this.userAgent;
    }
    info.options.agent = this._getAgent(info.parsedUrl);
    // gives handlers an opportunity to participate
    if (this.handlers) {
      for (const handler of this.handlers) {
        handler.prepareRequest(info.options);
      }
    }
    return info;
  }
  _mergeHeaders(headers) {
    if (this.requestOptions && this.requestOptions.headers) {
      return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
    }
    return lowercaseKeys(headers || {});
  }
  _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
    let clientHeader;
    if (this.requestOptions && this.requestOptions.headers) {
      clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
    }
    return additionalHeaders[header] || clientHeader || _default;
  }
  _getAgent(parsedUrl) {
    let agent;
    const proxyUrl = pm.getProxyUrl(parsedUrl);
    const useProxy = proxyUrl && proxyUrl.hostname;
    if (this._keepAlive && useProxy) {
      agent = this._proxyAgent;
    }
    if (this._keepAlive && !useProxy) {
      agent = this._agent;
    }
    // if agent is already assigned use that agent.
    if (agent) {
      return agent;
    }
    const usingSsl = parsedUrl.protocol === 'https:';
    let maxSockets = 100;
    if (this.requestOptions) {
      maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
    }
    // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
    if (proxyUrl && proxyUrl.hostname) {
      const agentOptions = {
        maxSockets,
        keepAlive: this._keepAlive,
        proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
          proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
        }), {
          host: proxyUrl.hostname,
          port: proxyUrl.port
        })
      };
      let tunnelAgent;
      const overHttps = proxyUrl.protocol === 'https:';
      if (usingSsl) {
        tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
      } else {
        tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
      }
      agent = tunnelAgent(agentOptions);
      this._proxyAgent = agent;
    }
    // if reusing agent across request and tunneling agent isn't assigned create a new agent
    if (this._keepAlive && !agent) {
      const options = {
        keepAlive: this._keepAlive,
        maxSockets
      };
      agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
      this._agent = agent;
    }
    // if not using private agent and tunnel agent isn't setup then use global agent
    if (!agent) {
      agent = usingSsl ? https.globalAgent : http.globalAgent;
    }
    if (usingSsl && this._ignoreSslError) {
      // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
      // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
      // we have to cast it to any and change it directly
      agent.options = Object.assign(agent.options || {}, {
        rejectUnauthorized: false
      });
    }
    return agent;
  }
  _performExponentialBackoff(retryNumber) {
    return __awaiter(this, void 0, void 0, function* () {
      retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
      const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
      return new Promise(resolve => setTimeout(() => resolve(), ms));
    });
  }
  _processResponse(res, options) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const statusCode = res.message.statusCode || 0;
        const response = {
          statusCode,
          result: null,
          headers: {}
        };
        // not found leads to null obj returned
        if (statusCode === HttpCodes.NotFound) {
          resolve(response);
        }
        // get the result from the body
        function dateTimeDeserializer(key, value) {
          if (typeof value === 'string') {
            const a = new Date(value);
            if (!isNaN(a.valueOf())) {
              return a;
            }
          }
          return value;
        }
        let obj;
        let contents;
        try {
          contents = yield res.readBody();
          if (contents && contents.length > 0) {
            if (options && options.deserializeDates) {
              obj = JSON.parse(contents, dateTimeDeserializer);
            } else {
              obj = JSON.parse(contents);
            }
            response.result = obj;
          }
          response.headers = res.message.headers;
        } catch (err) {
          // Invalid resource (contents not json);  leaving result obj null
        }
        // note that 3xx redirects are handled by the http layer.
        if (statusCode > 299) {
          let msg;
          // if exception/error in body, attempt to get better error
          if (obj && obj.message) {
            msg = obj.message;
          } else if (contents && contents.length > 0) {
            // it may be the case that the exception is in the body message as string
            msg = contents;
          } else {
            msg = `Failed request: (${statusCode})`;
          }
          const err = new HttpClientError(msg, statusCode);
          err.result = response.result;
          reject(err);
        } else {
          resolve(response);
        }
      }));
    });
  }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});

/***/ }),

/***/ "./node_modules/@actions/core/node_modules/@actions/http-client/lib/proxy.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@actions/core/node_modules/@actions/http-client/lib/proxy.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
  const usingSsl = reqUrl.protocol === 'https:';
  if (checkBypass(reqUrl)) {
    return undefined;
  }
  const proxyVar = (() => {
    if (usingSsl) {
      return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    } else {
      return process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
  })();
  if (proxyVar) {
    return new URL(proxyVar);
  } else {
    return undefined;
  }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
  if (!reqUrl.hostname) {
    return false;
  }
  const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
  if (!noProxy) {
    return false;
  }
  // Determine the request port
  let reqPort;
  if (reqUrl.port) {
    reqPort = Number(reqUrl.port);
  } else if (reqUrl.protocol === 'http:') {
    reqPort = 80;
  } else if (reqUrl.protocol === 'https:') {
    reqPort = 443;
  }
  // Format the request hostname and hostname with port
  const upperReqHosts = [reqUrl.hostname.toUpperCase()];
  if (typeof reqPort === 'number') {
    upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
  }
  // Compare request host against noproxy
  for (const upperNoProxyItem of noProxy.split(',').map(x => x.trim().toUpperCase()).filter(x => x)) {
    if (upperReqHosts.some(x => x === upperNoProxyItem)) {
      return true;
    }
  }
  return false;
}
exports.checkBypass = checkBypass;

/***/ }),

/***/ "./node_modules/@actions/core/node_modules/uuid/dist/esm-node/index.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/index.js + 15 modules ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "NIL": () => (/* reexport */ nil),
  "parse": () => (/* reexport */ esm_node_parse),
  "stringify": () => (/* reexport */ esm_node_stringify),
  "v1": () => (/* reexport */ esm_node_v1),
  "v3": () => (/* reexport */ esm_node_v3),
  "v4": () => (/* reexport */ esm_node_v4),
  "v5": () => (/* reexport */ esm_node_v5),
  "validate": () => (/* reexport */ esm_node_validate),
  "version": () => (/* reexport */ esm_node_version)
});

;// CONCATENATED MODULE: external "crypto"
const external_crypto_namespaceObject = require("crypto");
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_namespaceObject);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/rng.js

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    external_crypto_default().randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/validate.js

function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}
/* harmony default export */ const esm_node_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}
function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_node_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }
  return uuid;
}
/* harmony default export */ const esm_node_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/v1.js

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

let _nodeId;
let _clockseq; // Previous uuid creation time

let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.

  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval

  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested

  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || esm_node_stringify(b);
}
/* harmony default export */ const esm_node_v1 = (v1);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/parse.js

function parse(uuid) {
  if (!esm_node_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }
  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}
/* harmony default export */ const esm_node_parse = (parse);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/v35.js


function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }
    if (typeof namespace === 'string') {
      namespace = esm_node_parse(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`

    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return esm_node_stringify(bytes);
  } // Function#name is not settable on some platforms (#270)

  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support

  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/md5.js

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }
  return external_crypto_default().createHash('md5').update(bytes).digest();
}
/* harmony default export */ const esm_node_md5 = (md5);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/v3.js


const v3 = v35('v3', 0x30, esm_node_md5);
/* harmony default export */ const esm_node_v3 = (v3);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/v4.js


function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return esm_node_stringify(rnds);
}
/* harmony default export */ const esm_node_v4 = (v4);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/sha1.js

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }
  return external_crypto_default().createHash('sha1').update(bytes).digest();
}
/* harmony default export */ const esm_node_sha1 = (sha1);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/v5.js


const v5 = v35('v5', 0x50, esm_node_sha1);
/* harmony default export */ const esm_node_v5 = (v5);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/nil.js
/* harmony default export */ const nil = ('00000000-0000-0000-0000-000000000000');
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/version.js

function version(uuid) {
  if (!esm_node_validate(uuid)) {
    throw TypeError('Invalid UUID');
  }
  return parseInt(uuid.substr(14, 1), 16);
}
/* harmony default export */ const esm_node_version = (version);
;// CONCATENATED MODULE: ./node_modules/@actions/core/node_modules/uuid/dist/esm-node/index.js










/***/ }),

/***/ "./node_modules/@actions/exec/lib/exec.js":
/*!************************************************!*\
  !*** ./node_modules/@actions/exec/lib/exec.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getExecOutput = exports.exec = void 0;
const string_decoder_1 = __webpack_require__(/*! string_decoder */ "string_decoder");
const tr = __importStar(__webpack_require__(/*! ./toolrunner */ "./node_modules/@actions/exec/lib/toolrunner.js"));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
  return __awaiter(this, void 0, void 0, function* () {
    const commandArgs = tr.argStringToArray(commandLine);
    if (commandArgs.length === 0) {
      throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
    }
    // Path to tool to execute should be first arg
    const toolPath = commandArgs[0];
    args = commandArgs.slice(1).concat(args || []);
    const runner = new tr.ToolRunner(toolPath, args, options);
    return runner.exec();
  });
}
exports.exec = exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */
function getExecOutput(commandLine, args, options) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function* () {
    let stdout = '';
    let stderr = '';
    //Using string decoder covers the case where a mult-byte character is split
    const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
    const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
    const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
    const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
    const stdErrListener = data => {
      stderr += stderrDecoder.write(data);
      if (originalStdErrListener) {
        originalStdErrListener(data);
      }
    };
    const stdOutListener = data => {
      stdout += stdoutDecoder.write(data);
      if (originalStdoutListener) {
        originalStdoutListener(data);
      }
    };
    const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), {
      stdout: stdOutListener,
      stderr: stdErrListener
    });
    const exitCode = yield exec(commandLine, args, Object.assign(Object.assign({}, options), {
      listeners
    }));
    //flush any remaining characters
    stdout += stdoutDecoder.end();
    stderr += stderrDecoder.end();
    return {
      exitCode,
      stdout,
      stderr
    };
  });
}
exports.getExecOutput = getExecOutput;

/***/ }),

/***/ "./node_modules/@actions/exec/lib/toolrunner.js":
/*!******************************************************!*\
  !*** ./node_modules/@actions/exec/lib/toolrunner.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.argStringToArray = exports.ToolRunner = void 0;
const os = __importStar(__webpack_require__(/*! os */ "os"));
const events = __importStar(__webpack_require__(/*! events */ "events"));
const child = __importStar(__webpack_require__(/*! child_process */ "child_process"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const io = __importStar(__webpack_require__(/*! @actions/io */ "./node_modules/@actions/io/lib/io.js"));
const ioUtil = __importStar(__webpack_require__(/*! @actions/io/lib/io-util */ "./node_modules/@actions/io/lib/io-util.js"));
const timers_1 = __webpack_require__(/*! timers */ "timers");
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
  constructor(toolPath, args, options) {
    super();
    if (!toolPath) {
      throw new Error("Parameter 'toolPath' cannot be null or empty.");
    }
    this.toolPath = toolPath;
    this.args = args || [];
    this.options = options || {};
  }
  _debug(message) {
    if (this.options.listeners && this.options.listeners.debug) {
      this.options.listeners.debug(message);
    }
  }
  _getCommandString(options, noPrefix) {
    const toolPath = this._getSpawnFileName();
    const args = this._getSpawnArgs(options);
    let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
    if (IS_WINDOWS) {
      // Windows + cmd file
      if (this._isCmdFile()) {
        cmd += toolPath;
        for (const a of args) {
          cmd += ` ${a}`;
        }
      }
      // Windows + verbatim
      else if (options.windowsVerbatimArguments) {
        cmd += `"${toolPath}"`;
        for (const a of args) {
          cmd += ` ${a}`;
        }
      }
      // Windows (regular)
      else {
        cmd += this._windowsQuoteCmdArg(toolPath);
        for (const a of args) {
          cmd += ` ${this._windowsQuoteCmdArg(a)}`;
        }
      }
    } else {
      // OSX/Linux - this can likely be improved with some form of quoting.
      // creating processes on Unix is fundamentally different than Windows.
      // on Unix, execvp() takes an arg array.
      cmd += toolPath;
      for (const a of args) {
        cmd += ` ${a}`;
      }
    }
    return cmd;
  }
  _processLineBuffer(data, strBuffer, onLine) {
    try {
      let s = strBuffer + data.toString();
      let n = s.indexOf(os.EOL);
      while (n > -1) {
        const line = s.substring(0, n);
        onLine(line);
        // the rest of the string ...
        s = s.substring(n + os.EOL.length);
        n = s.indexOf(os.EOL);
      }
      return s;
    } catch (err) {
      // streaming lines to console is best effort.  Don't fail a build.
      this._debug(`error processing line. Failed with error ${err}`);
      return '';
    }
  }
  _getSpawnFileName() {
    if (IS_WINDOWS) {
      if (this._isCmdFile()) {
        return process.env['COMSPEC'] || 'cmd.exe';
      }
    }
    return this.toolPath;
  }
  _getSpawnArgs(options) {
    if (IS_WINDOWS) {
      if (this._isCmdFile()) {
        let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
        for (const a of this.args) {
          argline += ' ';
          argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
        }
        argline += '"';
        return [argline];
      }
    }
    return this.args;
  }
  _endsWith(str, end) {
    return str.endsWith(end);
  }
  _isCmdFile() {
    const upperToolPath = this.toolPath.toUpperCase();
    return this._endsWith(upperToolPath, '.CMD') || this._endsWith(upperToolPath, '.BAT');
  }
  _windowsQuoteCmdArg(arg) {
    // for .exe, apply the normal quoting rules that libuv applies
    if (!this._isCmdFile()) {
      return this._uvQuoteCmdArg(arg);
    }
    // otherwise apply quoting rules specific to the cmd.exe command line parser.
    // the libuv rules are generic and are not designed specifically for cmd.exe
    // command line parser.
    //
    // for a detailed description of the cmd.exe command line parser, refer to
    // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
    // need quotes for empty arg
    if (!arg) {
      return '""';
    }
    // determine whether the arg needs to be quoted
    const cmdSpecialChars = [' ', '\t', '&', '(', ')', '[', ']', '{', '}', '^', '=', ';', '!', "'", '+', ',', '`', '~', '|', '<', '>', '"'];
    let needsQuotes = false;
    for (const char of arg) {
      if (cmdSpecialChars.some(x => x === char)) {
        needsQuotes = true;
        break;
      }
    }
    // short-circuit if quotes not needed
    if (!needsQuotes) {
      return arg;
    }
    // the following quoting rules are very similar to the rules that by libuv applies.
    //
    // 1) wrap the string in quotes
    //
    // 2) double-up quotes - i.e. " => ""
    //
    //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
    //    doesn't work well with a cmd.exe command line.
    //
    //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
    //    for example, the command line:
    //          foo.exe "myarg:""my val"""
    //    is parsed by a .NET console app into an arg array:
    //          [ "myarg:\"my val\"" ]
    //    which is the same end result when applying libuv quoting rules. although the actual
    //    command line from libuv quoting rules would look like:
    //          foo.exe "myarg:\"my val\""
    //
    // 3) double-up slashes that precede a quote,
    //    e.g.  hello \world    => "hello \world"
    //          hello\"world    => "hello\\""world"
    //          hello\\"world   => "hello\\\\""world"
    //          hello world\    => "hello world\\"
    //
    //    technically this is not required for a cmd.exe command line, or the batch argument parser.
    //    the reasons for including this as a .cmd quoting rule are:
    //
    //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
    //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
    //
    //    b) it's what we've been doing previously (by deferring to node default behavior) and we
    //       haven't heard any complaints about that aspect.
    //
    // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
    // escaped when used on the command line directly - even though within a .cmd file % can be escaped
    // by using %%.
    //
    // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
    // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
    //
    // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
    // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
    // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
    // to an external program.
    //
    // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
    // % can be escaped within a .cmd file.
    let reverse = '"';
    let quoteHit = true;
    for (let i = arg.length; i > 0; i--) {
      // walk the string in reverse
      reverse += arg[i - 1];
      if (quoteHit && arg[i - 1] === '\\') {
        reverse += '\\'; // double the slash
      } else if (arg[i - 1] === '"') {
        quoteHit = true;
        reverse += '"'; // double the quote
      } else {
        quoteHit = false;
      }
    }
    reverse += '"';
    return reverse.split('').reverse().join('');
  }
  _uvQuoteCmdArg(arg) {
    // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
    // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
    // is used.
    //
    // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
    // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
    // pasting copyright notice from Node within this function:
    //
    //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
    //
    //      Permission is hereby granted, free of charge, to any person obtaining a copy
    //      of this software and associated documentation files (the "Software"), to
    //      deal in the Software without restriction, including without limitation the
    //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
    //      sell copies of the Software, and to permit persons to whom the Software is
    //      furnished to do so, subject to the following conditions:
    //
    //      The above copyright notice and this permission notice shall be included in
    //      all copies or substantial portions of the Software.
    //
    //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    //      IN THE SOFTWARE.
    if (!arg) {
      // Need double quotation for empty argument
      return '""';
    }
    if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
      // No quotation needed
      return arg;
    }
    if (!arg.includes('"') && !arg.includes('\\')) {
      // No embedded double quotes or backslashes, so I can just wrap
      // quote marks around the whole thing.
      return `"${arg}"`;
    }
    // Expected input/output:
    //   input : hello"world
    //   output: "hello\"world"
    //   input : hello""world
    //   output: "hello\"\"world"
    //   input : hello\world
    //   output: hello\world
    //   input : hello\\world
    //   output: hello\\world
    //   input : hello\"world
    //   output: "hello\\\"world"
    //   input : hello\\"world
    //   output: "hello\\\\\"world"
    //   input : hello world\
    //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
    //                             but it appears the comment is wrong, it should be "hello world\\"
    let reverse = '"';
    let quoteHit = true;
    for (let i = arg.length; i > 0; i--) {
      // walk the string in reverse
      reverse += arg[i - 1];
      if (quoteHit && arg[i - 1] === '\\') {
        reverse += '\\';
      } else if (arg[i - 1] === '"') {
        quoteHit = true;
        reverse += '\\';
      } else {
        quoteHit = false;
      }
    }
    reverse += '"';
    return reverse.split('').reverse().join('');
  }
  _cloneExecOptions(options) {
    options = options || {};
    const result = {
      cwd: options.cwd || process.cwd(),
      env: options.env || process.env,
      silent: options.silent || false,
      windowsVerbatimArguments: options.windowsVerbatimArguments || false,
      failOnStdErr: options.failOnStdErr || false,
      ignoreReturnCode: options.ignoreReturnCode || false,
      delay: options.delay || 10000
    };
    result.outStream = options.outStream || process.stdout;
    result.errStream = options.errStream || process.stderr;
    return result;
  }
  _getSpawnOptions(options, toolPath) {
    options = options || {};
    const result = {};
    result.cwd = options.cwd;
    result.env = options.env;
    result['windowsVerbatimArguments'] = options.windowsVerbatimArguments || this._isCmdFile();
    if (options.windowsVerbatimArguments) {
      result.argv0 = `"${toolPath}"`;
    }
    return result;
  }
  /**
   * Exec a tool.
   * Output will be streamed to the live console.
   * Returns promise with return code
   *
   * @param     tool     path to tool to exec
   * @param     options  optional exec options.  See ExecOptions
   * @returns   number
   */
  exec() {
    return __awaiter(this, void 0, void 0, function* () {
      // root the tool path if it is unrooted and contains relative pathing
      if (!ioUtil.isRooted(this.toolPath) && (this.toolPath.includes('/') || IS_WINDOWS && this.toolPath.includes('\\'))) {
        // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
        this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
      }
      // if the tool is only a file name, then resolve it from the PATH
      // otherwise verify it exists (add extension on Windows if necessary)
      this.toolPath = yield io.which(this.toolPath, true);
      return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        this._debug(`exec tool: ${this.toolPath}`);
        this._debug('arguments:');
        for (const arg of this.args) {
          this._debug(`   ${arg}`);
        }
        const optionsNonNull = this._cloneExecOptions(this.options);
        if (!optionsNonNull.silent && optionsNonNull.outStream) {
          optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
        }
        const state = new ExecState(optionsNonNull, this.toolPath);
        state.on('debug', message => {
          this._debug(message);
        });
        if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
          return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
        }
        const fileName = this._getSpawnFileName();
        const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
        let stdbuffer = '';
        if (cp.stdout) {
          cp.stdout.on('data', data => {
            if (this.options.listeners && this.options.listeners.stdout) {
              this.options.listeners.stdout(data);
            }
            if (!optionsNonNull.silent && optionsNonNull.outStream) {
              optionsNonNull.outStream.write(data);
            }
            stdbuffer = this._processLineBuffer(data, stdbuffer, line => {
              if (this.options.listeners && this.options.listeners.stdline) {
                this.options.listeners.stdline(line);
              }
            });
          });
        }
        let errbuffer = '';
        if (cp.stderr) {
          cp.stderr.on('data', data => {
            state.processStderr = true;
            if (this.options.listeners && this.options.listeners.stderr) {
              this.options.listeners.stderr(data);
            }
            if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
              const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
              s.write(data);
            }
            errbuffer = this._processLineBuffer(data, errbuffer, line => {
              if (this.options.listeners && this.options.listeners.errline) {
                this.options.listeners.errline(line);
              }
            });
          });
        }
        cp.on('error', err => {
          state.processError = err.message;
          state.processExited = true;
          state.processClosed = true;
          state.CheckComplete();
        });
        cp.on('exit', code => {
          state.processExitCode = code;
          state.processExited = true;
          this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
          state.CheckComplete();
        });
        cp.on('close', code => {
          state.processExitCode = code;
          state.processExited = true;
          state.processClosed = true;
          this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
          state.CheckComplete();
        });
        state.on('done', (error, exitCode) => {
          if (stdbuffer.length > 0) {
            this.emit('stdline', stdbuffer);
          }
          if (errbuffer.length > 0) {
            this.emit('errline', errbuffer);
          }
          cp.removeAllListeners();
          if (error) {
            reject(error);
          } else {
            resolve(exitCode);
          }
        });
        if (this.options.input) {
          if (!cp.stdin) {
            throw new Error('child process missing stdin');
          }
          cp.stdin.end(this.options.input);
        }
      }));
    });
  }
}
exports.ToolRunner = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
  const args = [];
  let inQuotes = false;
  let escaped = false;
  let arg = '';
  function append(c) {
    // we only escape double quotes.
    if (escaped && c !== '"') {
      arg += '\\';
    }
    arg += c;
    escaped = false;
  }
  for (let i = 0; i < argString.length; i++) {
    const c = argString.charAt(i);
    if (c === '"') {
      if (!escaped) {
        inQuotes = !inQuotes;
      } else {
        append(c);
      }
      continue;
    }
    if (c === '\\' && escaped) {
      append(c);
      continue;
    }
    if (c === '\\' && inQuotes) {
      escaped = true;
      continue;
    }
    if (c === ' ' && !inQuotes) {
      if (arg.length > 0) {
        args.push(arg);
        arg = '';
      }
      continue;
    }
    append(c);
  }
  if (arg.length > 0) {
    args.push(arg.trim());
  }
  return args;
}
exports.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
  constructor(options, toolPath) {
    super();
    this.processClosed = false; // tracks whether the process has exited and stdio is closed
    this.processError = '';
    this.processExitCode = 0;
    this.processExited = false; // tracks whether the process has exited
    this.processStderr = false; // tracks whether stderr was written to
    this.delay = 10000; // 10 seconds
    this.done = false;
    this.timeout = null;
    if (!toolPath) {
      throw new Error('toolPath must not be empty');
    }
    this.options = options;
    this.toolPath = toolPath;
    if (options.delay) {
      this.delay = options.delay;
    }
  }
  CheckComplete() {
    if (this.done) {
      return;
    }
    if (this.processClosed) {
      this._setResult();
    } else if (this.processExited) {
      this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
    }
  }
  _debug(message) {
    this.emit('debug', message);
  }
  _setResult() {
    // determine whether there is an error
    let error;
    if (this.processExited) {
      if (this.processError) {
        error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
      } else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
        error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
      } else if (this.processStderr && this.options.failOnStdErr) {
        error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
      }
    }
    // clear the timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.done = true;
    this.emit('done', error, this.processExitCode);
  }
  static HandleTimeout(state) {
    if (state.done) {
      return;
    }
    if (!state.processClosed && state.processExited) {
      const message = `The STDIO streams did not close within ${state.delay / 1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
      state._debug(message);
    }
    state._setResult();
  }
}

/***/ }),

/***/ "./node_modules/@actions/github/lib/context.js":
/*!*****************************************************!*\
  !*** ./node_modules/@actions/github/lib/context.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Context = void 0;
const fs_1 = __webpack_require__(/*! fs */ "fs");
const os_1 = __webpack_require__(/*! os */ "os");
class Context {
  /**
   * Hydrate the context from the environment
   */
  constructor() {
    var _a, _b, _c;
    this.payload = {};
    if (process.env.GITHUB_EVENT_PATH) {
      if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
        this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, {
          encoding: 'utf8'
        }));
      } else {
        const path = process.env.GITHUB_EVENT_PATH;
        process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
      }
    }
    this.eventName = process.env.GITHUB_EVENT_NAME;
    this.sha = process.env.GITHUB_SHA;
    this.ref = process.env.GITHUB_REF;
    this.workflow = process.env.GITHUB_WORKFLOW;
    this.action = process.env.GITHUB_ACTION;
    this.actor = process.env.GITHUB_ACTOR;
    this.job = process.env.GITHUB_JOB;
    this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
    this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
    this.apiUrl = (_a = process.env.GITHUB_API_URL) !== null && _a !== void 0 ? _a : `https://api.github.com`;
    this.serverUrl = (_b = process.env.GITHUB_SERVER_URL) !== null && _b !== void 0 ? _b : `https://github.com`;
    this.graphqlUrl = (_c = process.env.GITHUB_GRAPHQL_URL) !== null && _c !== void 0 ? _c : `https://api.github.com/graphql`;
  }
  get issue() {
    const payload = this.payload;
    return Object.assign(Object.assign({}, this.repo), {
      number: (payload.issue || payload.pull_request || payload).number
    });
  }
  get repo() {
    if (process.env.GITHUB_REPOSITORY) {
      const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
      return {
        owner,
        repo
      };
    }
    if (this.payload.repository) {
      return {
        owner: this.payload.repository.owner.login,
        repo: this.payload.repository.name
      };
    }
    throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
  }
}
exports.Context = Context;

/***/ }),

/***/ "./node_modules/@actions/github/lib/github.js":
/*!****************************************************!*\
  !*** ./node_modules/@actions/github/lib/github.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getOctokit = exports.context = void 0;
const Context = __importStar(__webpack_require__(/*! ./context */ "./node_modules/@actions/github/lib/context.js"));
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/@actions/github/lib/utils.js");
exports.context = new Context.Context();
/**
 * Returns a hydrated octokit ready to use for GitHub Actions
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokit(token, options) {
  return new utils_1.GitHub(utils_1.getOctokitOptions(token, options));
}
exports.getOctokit = getOctokit;

/***/ }),

/***/ "./node_modules/@actions/github/lib/internal/utils.js":
/*!************************************************************!*\
  !*** ./node_modules/@actions/github/lib/internal/utils.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getApiBaseUrl = exports.getProxyAgent = exports.getAuthString = void 0;
const httpClient = __importStar(__webpack_require__(/*! @actions/http-client */ "./node_modules/@actions/http-client/index.js"));
function getAuthString(token, options) {
  if (!token && !options.auth) {
    throw new Error('Parameter token or opts.auth is required');
  } else if (token && options.auth) {
    throw new Error('Parameters token and opts.auth may not both be specified');
  }
  return typeof options.auth === 'string' ? options.auth : `token ${token}`;
}
exports.getAuthString = getAuthString;
function getProxyAgent(destinationUrl) {
  const hc = new httpClient.HttpClient();
  return hc.getAgent(destinationUrl);
}
exports.getProxyAgent = getProxyAgent;
function getApiBaseUrl() {
  return process.env['GITHUB_API_URL'] || 'https://api.github.com';
}
exports.getApiBaseUrl = getApiBaseUrl;

/***/ }),

/***/ "./node_modules/@actions/github/lib/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/@actions/github/lib/utils.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getOctokitOptions = exports.GitHub = exports.context = void 0;
const Context = __importStar(__webpack_require__(/*! ./context */ "./node_modules/@actions/github/lib/context.js"));
const Utils = __importStar(__webpack_require__(/*! ./internal/utils */ "./node_modules/@actions/github/lib/internal/utils.js"));
// octokit + plugins
const core_1 = __webpack_require__(/*! @octokit/core */ "./node_modules/@octokit/core/dist-web/index.js");
const plugin_rest_endpoint_methods_1 = __webpack_require__(/*! @octokit/plugin-rest-endpoint-methods */ "./node_modules/@octokit/plugin-rest-endpoint-methods/dist-web/index.js");
const plugin_paginate_rest_1 = __webpack_require__(/*! @octokit/plugin-paginate-rest */ "./node_modules/@octokit/plugin-paginate-rest/dist-web/index.js");
exports.context = new Context.Context();
const baseUrl = Utils.getApiBaseUrl();
const defaults = {
  baseUrl,
  request: {
    agent: Utils.getProxyAgent(baseUrl)
  }
};
exports.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(defaults);
/**
 * Convience function to correctly format Octokit Options to pass into the constructor.
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokitOptions(token, options) {
  const opts = Object.assign({}, options || {}); // Shallow clone - don't mutate the object provided by the caller
  // Auth
  const auth = Utils.getAuthString(token, opts);
  if (auth) {
    opts.auth = auth;
  }
  return opts;
}
exports.getOctokitOptions = getOctokitOptions;

/***/ }),

/***/ "./node_modules/@actions/http-client/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@actions/http-client/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
const pm = __webpack_require__(/*! ./proxy */ "./node_modules/@actions/http-client/proxy.js");
let tunnel;
var HttpCodes;
(function (HttpCodes) {
  HttpCodes[HttpCodes["OK"] = 200] = "OK";
  HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
  HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
  HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
  HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
  HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
  HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
  HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
  HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
  HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
  HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
  HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
  HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
  HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
  HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
  HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
  HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
  HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
  HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
  HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
  HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
  HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
  HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
  Headers["Accept"] = "accept";
  Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
  MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
  let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
  return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'HttpClientError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpClientError.prototype);
  }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
  constructor(message) {
    this.message = message;
  }
  readBody() {
    return new Promise(async (resolve, reject) => {
      let output = Buffer.alloc(0);
      this.message.on('data', chunk => {
        output = Buffer.concat([output, chunk]);
      });
      this.message.on('end', () => {
        resolve(output.toString());
      });
    });
  }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
  let parsedUrl = new URL(requestUrl);
  return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
  constructor(userAgent, handlers, requestOptions) {
    this._ignoreSslError = false;
    this._allowRedirects = true;
    this._allowRedirectDowngrade = false;
    this._maxRedirects = 50;
    this._allowRetries = false;
    this._maxRetries = 1;
    this._keepAlive = false;
    this._disposed = false;
    this.userAgent = userAgent;
    this.handlers = handlers || [];
    this.requestOptions = requestOptions;
    if (requestOptions) {
      if (requestOptions.ignoreSslError != null) {
        this._ignoreSslError = requestOptions.ignoreSslError;
      }
      this._socketTimeout = requestOptions.socketTimeout;
      if (requestOptions.allowRedirects != null) {
        this._allowRedirects = requestOptions.allowRedirects;
      }
      if (requestOptions.allowRedirectDowngrade != null) {
        this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
      }
      if (requestOptions.maxRedirects != null) {
        this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
      }
      if (requestOptions.keepAlive != null) {
        this._keepAlive = requestOptions.keepAlive;
      }
      if (requestOptions.allowRetries != null) {
        this._allowRetries = requestOptions.allowRetries;
      }
      if (requestOptions.maxRetries != null) {
        this._maxRetries = requestOptions.maxRetries;
      }
    }
  }
  options(requestUrl, additionalHeaders) {
    return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
  }
  get(requestUrl, additionalHeaders) {
    return this.request('GET', requestUrl, null, additionalHeaders || {});
  }
  del(requestUrl, additionalHeaders) {
    return this.request('DELETE', requestUrl, null, additionalHeaders || {});
  }
  post(requestUrl, data, additionalHeaders) {
    return this.request('POST', requestUrl, data, additionalHeaders || {});
  }
  patch(requestUrl, data, additionalHeaders) {
    return this.request('PATCH', requestUrl, data, additionalHeaders || {});
  }
  put(requestUrl, data, additionalHeaders) {
    return this.request('PUT', requestUrl, data, additionalHeaders || {});
  }
  head(requestUrl, additionalHeaders) {
    return this.request('HEAD', requestUrl, null, additionalHeaders || {});
  }
  sendStream(verb, requestUrl, stream, additionalHeaders) {
    return this.request(verb, requestUrl, stream, additionalHeaders);
  }
  /**
   * Gets a typed object from an endpoint
   * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
   */
  async getJson(requestUrl, additionalHeaders = {}) {
    additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
    let res = await this.get(requestUrl, additionalHeaders);
    return this._processResponse(res, this.requestOptions);
  }
  async postJson(requestUrl, obj, additionalHeaders = {}) {
    let data = JSON.stringify(obj, null, 2);
    additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
    additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
    let res = await this.post(requestUrl, data, additionalHeaders);
    return this._processResponse(res, this.requestOptions);
  }
  async putJson(requestUrl, obj, additionalHeaders = {}) {
    let data = JSON.stringify(obj, null, 2);
    additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
    additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
    let res = await this.put(requestUrl, data, additionalHeaders);
    return this._processResponse(res, this.requestOptions);
  }
  async patchJson(requestUrl, obj, additionalHeaders = {}) {
    let data = JSON.stringify(obj, null, 2);
    additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
    additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
    let res = await this.patch(requestUrl, data, additionalHeaders);
    return this._processResponse(res, this.requestOptions);
  }
  /**
   * Makes a raw http request.
   * All other methods such as get, post, patch, and request ultimately call this.
   * Prefer get, del, post and patch
   */
  async request(verb, requestUrl, data, headers) {
    if (this._disposed) {
      throw new Error('Client has already been disposed.');
    }
    let parsedUrl = new URL(requestUrl);
    let info = this._prepareRequest(verb, parsedUrl, headers);
    // Only perform retries on reads since writes may not be idempotent.
    let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
    let numTries = 0;
    let response;
    while (numTries < maxTries) {
      response = await this.requestRaw(info, data);
      // Check if it's an authentication challenge
      if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
        let authenticationHandler;
        for (let i = 0; i < this.handlers.length; i++) {
          if (this.handlers[i].canHandleAuthentication(response)) {
            authenticationHandler = this.handlers[i];
            break;
          }
        }
        if (authenticationHandler) {
          return authenticationHandler.handleAuthentication(this, info, data);
        } else {
          // We have received an unauthorized response but have no handlers to handle it.
          // Let the response return to the caller.
          return response;
        }
      }
      let redirectsRemaining = this._maxRedirects;
      while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
        const redirectUrl = response.message.headers['location'];
        if (!redirectUrl) {
          // if there's no location to redirect to, we won't
          break;
        }
        let parsedRedirectUrl = new URL(redirectUrl);
        if (parsedUrl.protocol == 'https:' && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
          throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
        }
        // we need to finish reading the response before reassigning response
        // which will leak the open socket.
        await response.readBody();
        // strip authorization header if redirected to a different hostname
        if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
          for (let header in headers) {
            // header names are case insensitive
            if (header.toLowerCase() === 'authorization') {
              delete headers[header];
            }
          }
        }
        // let's make the request with the new redirectUrl
        info = this._prepareRequest(verb, parsedRedirectUrl, headers);
        response = await this.requestRaw(info, data);
        redirectsRemaining--;
      }
      if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
        // If not a retry code, return immediately instead of retrying
        return response;
      }
      numTries += 1;
      if (numTries < maxTries) {
        await response.readBody();
        await this._performExponentialBackoff(numTries);
      }
    }
    return response;
  }
  /**
   * Needs to be called if keepAlive is set to true in request options.
   */
  dispose() {
    if (this._agent) {
      this._agent.destroy();
    }
    this._disposed = true;
  }
  /**
   * Raw request.
   * @param info
   * @param data
   */
  requestRaw(info, data) {
    return new Promise((resolve, reject) => {
      let callbackForResult = function (err, res) {
        if (err) {
          reject(err);
        }
        resolve(res);
      };
      this.requestRawWithCallback(info, data, callbackForResult);
    });
  }
  /**
   * Raw request with callback.
   * @param info
   * @param data
   * @param onResult
   */
  requestRawWithCallback(info, data, onResult) {
    let socket;
    if (typeof data === 'string') {
      info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
    }
    let callbackCalled = false;
    let handleResult = (err, res) => {
      if (!callbackCalled) {
        callbackCalled = true;
        onResult(err, res);
      }
    };
    let req = info.httpModule.request(info.options, msg => {
      let res = new HttpClientResponse(msg);
      handleResult(null, res);
    });
    req.on('socket', sock => {
      socket = sock;
    });
    // If we ever get disconnected, we want the socket to timeout eventually
    req.setTimeout(this._socketTimeout || 3 * 60000, () => {
      if (socket) {
        socket.end();
      }
      handleResult(new Error('Request timeout: ' + info.options.path), null);
    });
    req.on('error', function (err) {
      // err has statusCode property
      // res should have headers
      handleResult(err, null);
    });
    if (data && typeof data === 'string') {
      req.write(data, 'utf8');
    }
    if (data && typeof data !== 'string') {
      data.on('close', function () {
        req.end();
      });
      data.pipe(req);
    } else {
      req.end();
    }
  }
  /**
   * Gets an http agent. This function is useful when you need an http agent that handles
   * routing through a proxy server - depending upon the url and proxy environment variables.
   * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
   */
  getAgent(serverUrl) {
    let parsedUrl = new URL(serverUrl);
    return this._getAgent(parsedUrl);
  }
  _prepareRequest(method, requestUrl, headers) {
    const info = {};
    info.parsedUrl = requestUrl;
    const usingSsl = info.parsedUrl.protocol === 'https:';
    info.httpModule = usingSsl ? https : http;
    const defaultPort = usingSsl ? 443 : 80;
    info.options = {};
    info.options.host = info.parsedUrl.hostname;
    info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
    info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
    info.options.method = method;
    info.options.headers = this._mergeHeaders(headers);
    if (this.userAgent != null) {
      info.options.headers['user-agent'] = this.userAgent;
    }
    info.options.agent = this._getAgent(info.parsedUrl);
    // gives handlers an opportunity to participate
    if (this.handlers) {
      this.handlers.forEach(handler => {
        handler.prepareRequest(info.options);
      });
    }
    return info;
  }
  _mergeHeaders(headers) {
    const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
    if (this.requestOptions && this.requestOptions.headers) {
      return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
    }
    return lowercaseKeys(headers || {});
  }
  _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
    const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
    let clientHeader;
    if (this.requestOptions && this.requestOptions.headers) {
      clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
    }
    return additionalHeaders[header] || clientHeader || _default;
  }
  _getAgent(parsedUrl) {
    let agent;
    let proxyUrl = pm.getProxyUrl(parsedUrl);
    let useProxy = proxyUrl && proxyUrl.hostname;
    if (this._keepAlive && useProxy) {
      agent = this._proxyAgent;
    }
    if (this._keepAlive && !useProxy) {
      agent = this._agent;
    }
    // if agent is already assigned use that agent.
    if (!!agent) {
      return agent;
    }
    const usingSsl = parsedUrl.protocol === 'https:';
    let maxSockets = 100;
    if (!!this.requestOptions) {
      maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
    }
    if (useProxy) {
      // If using proxy, need tunnel
      if (!tunnel) {
        tunnel = __webpack_require__(/*! tunnel */ "./node_modules/tunnel/index.js");
      }
      const agentOptions = {
        maxSockets: maxSockets,
        keepAlive: this._keepAlive,
        proxy: {
          ...((proxyUrl.username || proxyUrl.password) && {
            proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
          }),
          host: proxyUrl.hostname,
          port: proxyUrl.port
        }
      };
      let tunnelAgent;
      const overHttps = proxyUrl.protocol === 'https:';
      if (usingSsl) {
        tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
      } else {
        tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
      }
      agent = tunnelAgent(agentOptions);
      this._proxyAgent = agent;
    }
    // if reusing agent across request and tunneling agent isn't assigned create a new agent
    if (this._keepAlive && !agent) {
      const options = {
        keepAlive: this._keepAlive,
        maxSockets: maxSockets
      };
      agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
      this._agent = agent;
    }
    // if not using private agent and tunnel agent isn't setup then use global agent
    if (!agent) {
      agent = usingSsl ? https.globalAgent : http.globalAgent;
    }
    if (usingSsl && this._ignoreSslError) {
      // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
      // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
      // we have to cast it to any and change it directly
      agent.options = Object.assign(agent.options || {}, {
        rejectUnauthorized: false
      });
    }
    return agent;
  }
  _performExponentialBackoff(retryNumber) {
    retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
    const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }
  static dateTimeDeserializer(key, value) {
    if (typeof value === 'string') {
      let a = new Date(value);
      if (!isNaN(a.valueOf())) {
        return a;
      }
    }
    return value;
  }
  async _processResponse(res, options) {
    return new Promise(async (resolve, reject) => {
      const statusCode = res.message.statusCode;
      const response = {
        statusCode: statusCode,
        result: null,
        headers: {}
      };
      // not found leads to null obj returned
      if (statusCode == HttpCodes.NotFound) {
        resolve(response);
      }
      let obj;
      let contents;
      // get the result from the body
      try {
        contents = await res.readBody();
        if (contents && contents.length > 0) {
          if (options && options.deserializeDates) {
            obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
          } else {
            obj = JSON.parse(contents);
          }
          response.result = obj;
        }
        response.headers = res.message.headers;
      } catch (err) {
        // Invalid resource (contents not json);  leaving result obj null
      }
      // note that 3xx redirects are handled by the http layer.
      if (statusCode > 299) {
        let msg;
        // if exception/error in body, attempt to get better error
        if (obj && obj.message) {
          msg = obj.message;
        } else if (contents && contents.length > 0) {
          // it may be the case that the exception is in the body message as string
          msg = contents;
        } else {
          msg = 'Failed request: (' + statusCode + ')';
        }
        let err = new HttpClientError(msg, statusCode);
        err.result = response.result;
        reject(err);
      } else {
        resolve(response);
      }
    });
  }
}
exports.HttpClient = HttpClient;

/***/ }),

/***/ "./node_modules/@actions/http-client/proxy.js":
/*!****************************************************!*\
  !*** ./node_modules/@actions/http-client/proxy.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
function getProxyUrl(reqUrl) {
  let usingSsl = reqUrl.protocol === 'https:';
  let proxyUrl;
  if (checkBypass(reqUrl)) {
    return proxyUrl;
  }
  let proxyVar;
  if (usingSsl) {
    proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
  } else {
    proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
  }
  if (proxyVar) {
    proxyUrl = new URL(proxyVar);
  }
  return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
  if (!reqUrl.hostname) {
    return false;
  }
  let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
  if (!noProxy) {
    return false;
  }
  // Determine the request port
  let reqPort;
  if (reqUrl.port) {
    reqPort = Number(reqUrl.port);
  } else if (reqUrl.protocol === 'http:') {
    reqPort = 80;
  } else if (reqUrl.protocol === 'https:') {
    reqPort = 443;
  }
  // Format the request hostname and hostname with port
  let upperReqHosts = [reqUrl.hostname.toUpperCase()];
  if (typeof reqPort === 'number') {
    upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
  }
  // Compare request host against noproxy
  for (let upperNoProxyItem of noProxy.split(',').map(x => x.trim().toUpperCase()).filter(x => x)) {
    if (upperReqHosts.some(x => x === upperNoProxyItem)) {
      return true;
    }
  }
  return false;
}
exports.checkBypass = checkBypass;

/***/ }),

/***/ "./node_modules/@actions/io/lib/io-util.js":
/*!*************************************************!*\
  !*** ./node_modules/@actions/io/lib/io-util.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var _a;
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rename = exports.readlink = exports.readdir = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
_a = fs.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
exports.IS_WINDOWS = process.platform === 'win32';
function exists(fsPath) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield exports.stat(fsPath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return false;
      }
      throw err;
    }
    return true;
  });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
  return __awaiter(this, void 0, void 0, function* () {
    const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
    return stats.isDirectory();
  });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
  p = normalizeSeparators(p);
  if (!p) {
    throw new Error('isRooted() parameter "p" cannot be empty');
  }
  if (exports.IS_WINDOWS) {
    return p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
    ; // e.g. C: or C:\hello
  }

  return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
  return __awaiter(this, void 0, void 0, function* () {
    let stats = undefined;
    try {
      // test file exists
      stats = yield exports.stat(filePath);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        // eslint-disable-next-line no-console
        console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
      }
    }
    if (stats && stats.isFile()) {
      if (exports.IS_WINDOWS) {
        // on Windows, test for valid extension
        const upperExt = path.extname(filePath).toUpperCase();
        if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
          return filePath;
        }
      } else {
        if (isUnixExecutable(stats)) {
          return filePath;
        }
      }
    }
    // try each extension
    const originalFilePath = filePath;
    for (const extension of extensions) {
      filePath = originalFilePath + extension;
      stats = undefined;
      try {
        stats = yield exports.stat(filePath);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          // eslint-disable-next-line no-console
          console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
      }
      if (stats && stats.isFile()) {
        if (exports.IS_WINDOWS) {
          // preserve the case of the actual file (since an extension was appended)
          try {
            const directory = path.dirname(filePath);
            const upperName = path.basename(filePath).toUpperCase();
            for (const actualName of yield exports.readdir(directory)) {
              if (upperName === actualName.toUpperCase()) {
                filePath = path.join(directory, actualName);
                break;
              }
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
          }
          return filePath;
        } else {
          if (isUnixExecutable(stats)) {
            return filePath;
          }
        }
      }
    }
    return '';
  });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
  p = p || '';
  if (exports.IS_WINDOWS) {
    // convert slashes on Windows
    p = p.replace(/\//g, '\\');
    // remove redundant slashes
    return p.replace(/\\\\+/g, '\\');
  }
  // remove redundant slashes
  return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
  return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
}
// Get the path of cmd.exe in windows
function getCmdPath() {
  var _a;
  return (_a = process.env['COMSPEC']) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
exports.getCmdPath = getCmdPath;

/***/ }),

/***/ "./node_modules/@actions/io/lib/io.js":
/*!********************************************!*\
  !*** ./node_modules/@actions/io/lib/io.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.findInPath = exports.which = exports.mkdirP = exports.rmRF = exports.mv = exports.cp = void 0;
const assert_1 = __webpack_require__(/*! assert */ "assert");
const childProcess = __importStar(__webpack_require__(/*! child_process */ "child_process"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const util_1 = __webpack_require__(/*! util */ "util");
const ioUtil = __importStar(__webpack_require__(/*! ./io-util */ "./node_modules/@actions/io/lib/io-util.js"));
const exec = util_1.promisify(childProcess.exec);
const execFile = util_1.promisify(childProcess.execFile);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
  return __awaiter(this, void 0, void 0, function* () {
    const {
      force,
      recursive,
      copySourceDirectory
    } = readCopyOptions(options);
    const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
    // Dest is an existing file, but not forcing
    if (destStat && destStat.isFile() && !force) {
      return;
    }
    // If dest is an existing directory, should copy inside.
    const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? path.join(dest, path.basename(source)) : dest;
    if (!(yield ioUtil.exists(source))) {
      throw new Error(`no such file or directory: ${source}`);
    }
    const sourceStat = yield ioUtil.stat(source);
    if (sourceStat.isDirectory()) {
      if (!recursive) {
        throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
      } else {
        yield cpDirRecursive(source, newDest, 0, force);
      }
    } else {
      if (path.relative(source, newDest) === '') {
        // a file cannot be copied to itself
        throw new Error(`'${newDest}' and '${source}' are the same file`);
      }
      yield copyFile(source, newDest, force);
    }
  });
}
exports.cp = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
  return __awaiter(this, void 0, void 0, function* () {
    if (yield ioUtil.exists(dest)) {
      let destExists = true;
      if (yield ioUtil.isDirectory(dest)) {
        // If dest is directory copy src into dest
        dest = path.join(dest, path.basename(source));
        destExists = yield ioUtil.exists(dest);
      }
      if (destExists) {
        if (options.force == null || options.force) {
          yield rmRF(dest);
        } else {
          throw new Error('Destination already exists');
        }
      }
    }
    yield mkdirP(path.dirname(dest));
    yield ioUtil.rename(source, dest);
  });
}
exports.mv = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
  return __awaiter(this, void 0, void 0, function* () {
    if (ioUtil.IS_WINDOWS) {
      // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
      // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
      // Check for invalid characters
      // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
      if (/[*"<>|]/.test(inputPath)) {
        throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
      }
      try {
        const cmdPath = ioUtil.getCmdPath();
        if (yield ioUtil.isDirectory(inputPath, true)) {
          yield exec(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
            env: {
              inputPath
            }
          });
        } else {
          yield exec(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
            env: {
              inputPath
            }
          });
        }
      } catch (err) {
        // if you try to delete a file that doesn't exist, desired result is achieved
        // other errors are valid
        if (err.code !== 'ENOENT') throw err;
      }
      // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
      try {
        yield ioUtil.unlink(inputPath);
      } catch (err) {
        // if you try to delete a file that doesn't exist, desired result is achieved
        // other errors are valid
        if (err.code !== 'ENOENT') throw err;
      }
    } else {
      let isDir = false;
      try {
        isDir = yield ioUtil.isDirectory(inputPath);
      } catch (err) {
        // if you try to delete a file that doesn't exist, desired result is achieved
        // other errors are valid
        if (err.code !== 'ENOENT') throw err;
        return;
      }
      if (isDir) {
        yield execFile(`rm`, [`-rf`, `${inputPath}`]);
      } else {
        yield ioUtil.unlink(inputPath);
      }
    }
  });
}
exports.rmRF = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
  return __awaiter(this, void 0, void 0, function* () {
    assert_1.ok(fsPath, 'a path argument must be provided');
    yield ioUtil.mkdir(fsPath, {
      recursive: true
    });
  });
}
exports.mkdirP = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!tool) {
      throw new Error("parameter 'tool' is required");
    }
    // recursive when check=true
    if (check) {
      const result = yield which(tool, false);
      if (!result) {
        if (ioUtil.IS_WINDOWS) {
          throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
        } else {
          throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
        }
      }
      return result;
    }
    const matches = yield findInPath(tool);
    if (matches && matches.length > 0) {
      return matches[0];
    }
    return '';
  });
}
exports.which = which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */
function findInPath(tool) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!tool) {
      throw new Error("parameter 'tool' is required");
    }
    // build the list of extensions to try
    const extensions = [];
    if (ioUtil.IS_WINDOWS && process.env['PATHEXT']) {
      for (const extension of process.env['PATHEXT'].split(path.delimiter)) {
        if (extension) {
          extensions.push(extension);
        }
      }
    }
    // if it's rooted, return it if exists. otherwise return empty.
    if (ioUtil.isRooted(tool)) {
      const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
      if (filePath) {
        return [filePath];
      }
      return [];
    }
    // if any path separators, return empty
    if (tool.includes(path.sep)) {
      return [];
    }
    // build the list of directories
    //
    // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
    // it feels like we should not do this. Checking the current directory seems like more of a use
    // case of a shell, and the which() function exposed by the toolkit should strive for consistency
    // across platforms.
    const directories = [];
    if (process.env.PATH) {
      for (const p of process.env.PATH.split(path.delimiter)) {
        if (p) {
          directories.push(p);
        }
      }
    }
    // find all matches
    const matches = [];
    for (const directory of directories) {
      const filePath = yield ioUtil.tryGetExecutablePath(path.join(directory, tool), extensions);
      if (filePath) {
        matches.push(filePath);
      }
    }
    return matches;
  });
}
exports.findInPath = findInPath;
function readCopyOptions(options) {
  const force = options.force == null ? true : options.force;
  const recursive = Boolean(options.recursive);
  const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
  return {
    force,
    recursive,
    copySourceDirectory
  };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
  return __awaiter(this, void 0, void 0, function* () {
    // Ensure there is not a run away recursive copy
    if (currentDepth >= 255) return;
    currentDepth++;
    yield mkdirP(destDir);
    const files = yield ioUtil.readdir(sourceDir);
    for (const fileName of files) {
      const srcFile = `${sourceDir}/${fileName}`;
      const destFile = `${destDir}/${fileName}`;
      const srcFileStat = yield ioUtil.lstat(srcFile);
      if (srcFileStat.isDirectory()) {
        // Recurse
        yield cpDirRecursive(srcFile, destFile, currentDepth, force);
      } else {
        yield copyFile(srcFile, destFile, force);
      }
    }
    // Change the mode for the newly created directory
    yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
  });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
  return __awaiter(this, void 0, void 0, function* () {
    if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
      // unlink/re-link it
      try {
        yield ioUtil.lstat(destFile);
        yield ioUtil.unlink(destFile);
      } catch (e) {
        // Try to override file permission
        if (e.code === 'EPERM') {
          yield ioUtil.chmod(destFile, '0666');
          yield ioUtil.unlink(destFile);
        }
        // other errors = it doesn't exist, no work to do
      }
      // Copy over symlink
      const symlinkFull = yield ioUtil.readlink(srcFile);
      yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? 'junction' : null);
    } else if (!(yield ioUtil.exists(destFile)) || force) {
      yield ioUtil.copyFile(srcFile, destFile);
    }
  });
}

/***/ }),

/***/ "./node_modules/@octokit/core/dist-web/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@octokit/core/dist-web/index.js + 12 modules ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Octokit": () => (/* binding */ Octokit)
});

;// CONCATENATED MODULE: ./node_modules/universal-user-agent/dist-web/index.js
function getUserAgent() {
  if (typeof navigator === "object" && "userAgent" in navigator) {
    return navigator.userAgent;
  }
  if (typeof process === "object" && "version" in process) {
    return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
  }
  return "<environment undetectable>";
}

// EXTERNAL MODULE: ./node_modules/before-after-hook/index.js
var before_after_hook = __webpack_require__("./node_modules/before-after-hook/index.js");
;// CONCATENATED MODULE: ./node_modules/is-plain-object/dist/is-plain-object.mjs
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}



;// CONCATENATED MODULE: ./node_modules/@octokit/endpoint/dist-web/index.js


function lowercaseKeys(object) {
  if (!object) {
    return {};
  }
  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}
function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach(key => {
    if (isPlainObject(options[key])) {
      if (!(key in defaults)) Object.assign(result, {
        [key]: options[key]
      });else result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, {
        [key]: options[key]
      });
    }
  });
  return result;
}
function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}
function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? {
      method,
      url
    } : {
      url: method
    }, options);
  } else {
    options = Object.assign({}, route);
  }
  // lowercase header names before merging with defaults to avoid duplicates
  options.headers = lowercaseKeys(options.headers);
  // remove properties with undefined values before merging
  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options);
  // mediaType.previews arrays are merged, instead of overwritten
  if (defaults && defaults.mediaType.previews.length) {
    mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(preview => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
  }
  mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map(preview => preview.replace(/-preview/, ""));
  return mergedOptions;
}
function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);
  if (names.length === 0) {
    return url;
  }
  return url + separator + names.map(name => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }
    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}
const urlVariableRegex = /\{[^}]+\}/g;
function removeNonChars(variableName) {
  return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
}
function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);
  if (!matches) {
    return [];
  }
  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
}
function omit(object, keysToOmit) {
  return Object.keys(object).filter(option => !keysToOmit.includes(option)).reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
}

// Based on https://github.com/bramstein/url-template, licensed under BSD
// TODO: create separate package.
//
// Copyright (c) 2012-2014, Bram Stein
// All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//  1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//  3. The name of the author may not be used to endorse or promote products
//     derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/* istanbul ignore file */
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }
    return part;
  }).join("");
}
function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}
function isDefined(value) {
  return value !== undefined && value !== null;
}
function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}
function getValues(context, operator, key, modifier) {
  var value = context[key],
    result = [];
  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();
      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }
      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            tmp.push(encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }
        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }
  return result;
}
function parseUrl(template) {
  return {
    expand: expand.bind(null, template)
  };
}
function expand(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
    if (expression) {
      let operator = "";
      const values = [];
      if (operators.indexOf(expression.charAt(0)) !== -1) {
        operator = expression.charAt(0);
        expression = expression.substr(1);
      }
      expression.split(/,/g).forEach(function (variable) {
        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
        values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
      });
      if (operator && operator !== "+") {
        var separator = ",";
        if (operator === "?") {
          separator = "&";
        } else if (operator !== "#") {
          separator = operator;
        }
        return (values.length !== 0 ? operator : "") + values.join(separator);
      } else {
        return values.join(",");
      }
    } else {
      return encodeReserved(literal);
    }
  });
}
function parse(options) {
  // https://fetch.spec.whatwg.org/#methods
  let method = options.method.toUpperCase();
  // replace :varname with {varname} to make it RFC 6570 compatible
  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]);
  // extract variable names from URL to calculate remaining variables later
  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);
  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }
  const omittedParameters = Object.keys(options).filter(option => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);
  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      // e.g. application/vnd.github.v3+json => application/vnd.github.v3.raw
      headers.accept = headers.accept.split(/,/).map(preview => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
    }
    if (options.mediaType.previews.length) {
      const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
      headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map(preview => {
        const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
        return `application/vnd.github.${preview}-preview${format}`;
      }).join(",");
    }
  }
  // for GET/HEAD requests, set URL query parameters from remaining parameters
  // for PATCH/POST/PUT/DELETE requests, set request body from remaining parameters
  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      } else {
        headers["content-length"] = 0;
      }
    }
  }
  // default content-type for JSON if body is set
  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  }
  // GitHub expects 'content-length: 0' header for PUT/PATCH requests without body.
  // fetch does not allow to set `content-length` header, but we can set body to an empty string
  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  }
  // Only return body/request keys if present
  return Object.assign({
    method,
    url,
    headers
  }, typeof body !== "undefined" ? {
    body
  } : null, options.request ? {
    request: options.request
  } : null);
}
function endpointWithDefaults(defaults, route, options) {
  return parse(merge(defaults, route, options));
}
function withDefaults(oldDefaults, newDefaults) {
  const DEFAULTS = merge(oldDefaults, newDefaults);
  const endpoint = endpointWithDefaults.bind(null, DEFAULTS);
  return Object.assign(endpoint, {
    DEFAULTS,
    defaults: withDefaults.bind(null, DEFAULTS),
    merge: merge.bind(null, DEFAULTS),
    parse
  });
}
const VERSION = "6.0.12";
const userAgent = `octokit-endpoint.js/${VERSION} ${getUserAgent()}`;
// DEFAULTS has all properties set that EndpointOptions has, except url.
// So we use RequestParameters and add method as additional required property.
const DEFAULTS = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": userAgent
  },
  mediaType: {
    format: "",
    previews: []
  }
};
const endpoint = withDefaults(null, DEFAULTS);

;// CONCATENATED MODULE: external "stream"
const external_stream_namespaceObject = require("stream");
// EXTERNAL MODULE: external "http"
var external_http_ = __webpack_require__("http");
;// CONCATENATED MODULE: external "url"
const external_url_namespaceObject = require("url");
// EXTERNAL MODULE: external "https"
var external_https_ = __webpack_require__("https");
;// CONCATENATED MODULE: external "zlib"
const external_zlib_namespaceObject = require("zlib");
;// CONCATENATED MODULE: ./node_modules/node-fetch/lib/index.mjs






// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = external_stream_namespaceObject.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = external_stream_namespaceObject.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof external_stream_namespaceObject) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof external_stream_namespaceObject) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof external_stream_namespaceObject)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof external_stream_namespaceObject && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof external_stream_namespaceObject) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = external_http_.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = external_url_namespaceObject.parse;
const format_url = external_url_namespaceObject.format;

const streamDestructionSupported = "destroy" in external_stream_namespaceObject.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof external_stream_namespaceObject.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = external_stream_namespaceObject.PassThrough;
const resolve_url = external_url_namespaceObject.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? external_https_ : external_http_).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof external_stream_namespaceObject.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: external_zlib_namespaceObject.Z_SYNC_FLUSH,
				finishFlush: external_zlib_namespaceObject.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(external_zlib_namespaceObject.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(external_zlib_namespaceObject.createInflate());
					} else {
						body = body.pipe(external_zlib_namespaceObject.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof external_zlib_namespaceObject.createBrotliDecompress === 'function') {
				body = body.pipe(external_zlib_namespaceObject.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

/* harmony default export */ const lib = (fetch);


;// CONCATENATED MODULE: ./node_modules/deprecation/dist-web/index.js
class Deprecation extends Error {
  constructor(message) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = 'Deprecation';
  }
}

// EXTERNAL MODULE: ./node_modules/once/once.js
var once = __webpack_require__("./node_modules/once/once.js");
var once_default = /*#__PURE__*/__webpack_require__.n(once);
;// CONCATENATED MODULE: ./node_modules/@octokit/request-error/dist-web/index.js


const logOnceCode = once_default()(deprecation => console.warn(deprecation));
const logOnceHeaders = once_default()(deprecation => console.warn(deprecation));
/**
 * Error with extra properties to help with debugging
 */
class RequestError extends Error {
  constructor(message, statusCode, options) {
    super(message);
    // Maintains proper stack trace (only available on V8)
    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "HttpError";
    this.status = statusCode;
    let headers;
    if ("headers" in options && typeof options.headers !== "undefined") {
      headers = options.headers;
    }
    if ("response" in options) {
      this.response = options.response;
      headers = options.response.headers;
    }
    // redact request credentials without mutating original request options
    const requestCopy = Object.assign({}, options.request);
    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
      });
    }
    requestCopy.url = requestCopy.url
    // client_id & client_secret can be passed as URL query parameters to increase rate limit
    // see https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications
    .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]")
    // OAuth tokens can be passed as URL query parameters, although it is not recommended
    // see https://developer.github.com/v3/#oauth2-token-sent-in-a-header
    .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy;
    // deprecations
    Object.defineProperty(this, "code", {
      get() {
        logOnceCode(new Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
        return statusCode;
      }
    });
    Object.defineProperty(this, "headers", {
      get() {
        logOnceHeaders(new Deprecation("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."));
        return headers || {};
      }
    });
  }
}

;// CONCATENATED MODULE: ./node_modules/@octokit/request/dist-web/index.js





const dist_web_VERSION = "5.6.0";
function getBufferResponse(response) {
  return response.arrayBuffer();
}
function fetchWrapper(requestOptions) {
  const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;
  if (isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }
  let headers = {};
  let status;
  let url;
  const fetch = requestOptions.request && requestOptions.request.fetch || lib;
  return fetch(requestOptions.url, Object.assign({
    method: requestOptions.method,
    body: requestOptions.body,
    headers: requestOptions.headers,
    redirect: requestOptions.redirect
  },
  // `requestOptions.request.agent` type is incompatible
  // see https://github.com/octokit/types.ts/pull/264
  requestOptions.request)).then(async response => {
    url = response.url;
    status = response.status;
    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }
    if ("deprecation" in headers) {
      const matches = headers.link && headers.link.match(/<([^>]+)>; rel="deprecation"/);
      const deprecationLink = matches && matches.pop();
      log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
    }
    if (status === 204 || status === 205) {
      return;
    }
    // GitHub API returns 200 for HEAD requests
    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }
      throw new RequestError(response.statusText, status, {
        response: {
          url,
          status,
          headers,
          data: undefined
        },
        request: requestOptions
      });
    }
    if (status === 304) {
      throw new RequestError("Not modified", status, {
        response: {
          url,
          status,
          headers,
          data: await getResponseData(response)
        },
        request: requestOptions
      });
    }
    if (status >= 400) {
      const data = await getResponseData(response);
      const error = new RequestError(toErrorMessage(data), status, {
        response: {
          url,
          status,
          headers,
          data
        },
        request: requestOptions
      });
      throw error;
    }
    return getResponseData(response);
  }).then(data => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch(error => {
    if (error instanceof RequestError) throw error;
    throw new RequestError(error.message, 500, {
      request: requestOptions
    });
  });
}
async function getResponseData(response) {
  const contentType = response.headers.get("content-type");
  if (/application\/json/.test(contentType)) {
    return response.json();
  }
  if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
    return response.text();
  }
  return getBufferResponse(response);
}
function toErrorMessage(data) {
  if (typeof data === "string") return data;
  // istanbul ignore else - just in case
  if ("message" in data) {
    if (Array.isArray(data.errors)) {
      return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}`;
    }
    return data.message;
  }
  // istanbul ignore next - just in case
  return `Unknown error: ${JSON.stringify(data)}`;
}
function dist_web_withDefaults(oldEndpoint, newDefaults) {
  const endpoint = oldEndpoint.defaults(newDefaults);
  const newApi = function (route, parameters) {
    const endpointOptions = endpoint.merge(route, parameters);
    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint.parse(endpointOptions));
    }
    const request = (route, parameters) => {
      return fetchWrapper(endpoint.parse(endpoint.merge(route, parameters)));
    };
    Object.assign(request, {
      endpoint,
      defaults: dist_web_withDefaults.bind(null, endpoint)
    });
    return endpointOptions.request.hook(request, endpointOptions);
  };
  return Object.assign(newApi, {
    endpoint,
    defaults: dist_web_withDefaults.bind(null, endpoint)
  });
}
const request = dist_web_withDefaults(endpoint, {
  headers: {
    "user-agent": `octokit-request.js/${dist_web_VERSION} ${getUserAgent()}`
  }
});

;// CONCATENATED MODULE: ./node_modules/@octokit/graphql/dist-web/index.js


const graphql_dist_web_VERSION = "4.6.4";
class GraphqlError extends Error {
  constructor(request, response) {
    const message = response.data.errors[0].message;
    super(message);
    Object.assign(this, response.data);
    Object.assign(this, {
      headers: response.headers
    });
    this.name = "GraphqlError";
    this.request = request;
    // Maintains proper stack trace (only available on V8)
    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
const NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"];
const FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
const GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql(request, query, options) {
  if (options) {
    if (typeof query === "string" && "query" in options) {
      return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
    }
    for (const key in options) {
      if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key)) continue;
      return Promise.reject(new Error(`[@octokit/graphql] "${key}" cannot be used as variable name`));
    }
  }
  const parsedOptions = typeof query === "string" ? Object.assign({
    query
  }, options) : query;
  const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }
    if (!result.variables) {
      result.variables = {};
    }
    result.variables[key] = parsedOptions[key];
    return result;
  }, {});
  // workaround for GitHub Enterprise baseUrl set with /api/v3 suffix
  // https://github.com/octokit/auth-app.js/issues/111#issuecomment-657610451
  const baseUrl = parsedOptions.baseUrl || request.endpoint.DEFAULTS.baseUrl;
  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }
  return request(requestOptions).then(response => {
    if (response.data.errors) {
      const headers = {};
      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }
      throw new GraphqlError(requestOptions, {
        headers,
        data: response.data
      });
    }
    return response.data.data;
  });
}
function graphql_dist_web_withDefaults(request$1, newDefaults) {
  const newRequest = request$1.defaults(newDefaults);
  const newApi = (query, options) => {
    return graphql(newRequest, query, options);
  };
  return Object.assign(newApi, {
    defaults: graphql_dist_web_withDefaults.bind(null, newRequest),
    endpoint: request.endpoint
  });
}
const graphql$1 = graphql_dist_web_withDefaults(request, {
  headers: {
    "user-agent": `octokit-graphql.js/${graphql_dist_web_VERSION} ${getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return graphql_dist_web_withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}

;// CONCATENATED MODULE: ./node_modules/@octokit/auth-token/dist-web/index.js
async function auth(token) {
  const tokenType = token.split(/\./).length === 3 ? "app" : /^v\d+\./.test(token) ? "installation" : "oauth";
  return {
    type: "token",
    token: token,
    tokenType
  };
}

/**
 * Prefix token for usage in the Authorization header
 *
 * @param token OAuth token or JSON Web Token
 */
function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }
  return `token ${token}`;
}
async function hook(token, request, route, parameters) {
  const endpoint = request.endpoint.merge(route, parameters);
  endpoint.headers.authorization = withAuthorizationPrefix(token);
  return request(endpoint);
}
const createTokenAuth = function createTokenAuth(token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }
  if (typeof token !== "string") {
    throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
  }
  token = token.replace(/^(token|bearer) +/i, "");
  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token)
  });
};

;// CONCATENATED MODULE: ./node_modules/@octokit/core/dist-web/index.js





const core_dist_web_VERSION = "3.5.1";
class Octokit {
  constructor(options = {}) {
    const hook = new before_after_hook.Collection();
    const requestDefaults = {
      baseUrl: request.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, options.request, {
        // @ts-ignore internal usage only, no need to type
        hook: hook.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    };
    // prepend default user agent with `options.userAgent` if set
    requestDefaults.headers["user-agent"] = [options.userAgent, `octokit-core.js/${core_dist_web_VERSION} ${getUserAgent()}`].filter(Boolean).join(" ");
    if (options.baseUrl) {
      requestDefaults.baseUrl = options.baseUrl;
    }
    if (options.previews) {
      requestDefaults.mediaType.previews = options.previews;
    }
    if (options.timeZone) {
      requestDefaults.headers["time-zone"] = options.timeZone;
    }
    this.request = request.defaults(requestDefaults);
    this.graphql = withCustomRequest(this.request).defaults(requestDefaults);
    this.log = Object.assign({
      debug: () => {},
      info: () => {},
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    }, options.log);
    this.hook = hook;
    // (1) If neither `options.authStrategy` nor `options.auth` are set, the `octokit` instance
    //     is unauthenticated. The `this.auth()` method is a no-op and no request hook is registered.
    // (2) If only `options.auth` is set, use the default token authentication strategy.
    // (3) If `options.authStrategy` is set then use it and pass in `options.auth`. Always pass own request as many strategies accept a custom request instance.
    // TODO: type `options.auth` based on `options.authStrategy`.
    if (!options.authStrategy) {
      if (!options.auth) {
        // (1)
        this.auth = async () => ({
          type: "unauthenticated"
        });
      } else {
        // (2)
        const auth = createTokenAuth(options.auth);
        // @ts-ignore  ¯\_(ツ)_/¯
        hook.wrap("request", auth.hook);
        this.auth = auth;
      }
    } else {
      const {
        authStrategy,
        ...otherOptions
      } = options;
      const auth = authStrategy(Object.assign({
        request: this.request,
        log: this.log,
        // we pass the current octokit instance as well as its constructor options
        // to allow for authentication strategies that return a new octokit instance
        // that shares the same internal state as the current one. The original
        // requirement for this was the "event-octokit" authentication strategy
        // of https://github.com/probot/octokit-auth-probot.
        octokit: this,
        octokitOptions: otherOptions
      }, options.auth));
      // @ts-ignore  ¯\_(ツ)_/¯
      hook.wrap("request", auth.hook);
      this.auth = auth;
    }
    // apply plugins
    // https://stackoverflow.com/a/16345172
    const classConstructor = this.constructor;
    classConstructor.plugins.forEach(plugin => {
      Object.assign(this, plugin(this, options));
    });
  }
  static defaults(defaults) {
    const OctokitWithDefaults = class extends this {
      constructor(...args) {
        const options = args[0] || {};
        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }
        super(Object.assign({}, defaults, options, options.userAgent && defaults.userAgent ? {
          userAgent: `${options.userAgent} ${defaults.userAgent}`
        } : null));
      }
    };
    return OctokitWithDefaults;
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */
  static plugin(...newPlugins) {
    var _a;
    const currentPlugins = this.plugins;
    const NewOctokit = (_a = class extends this {}, _a.plugins = currentPlugins.concat(newPlugins.filter(plugin => !currentPlugins.includes(plugin))), _a);
    return NewOctokit;
  }
}
Octokit.VERSION = core_dist_web_VERSION;
Octokit.plugins = [];


/***/ }),

/***/ "./node_modules/@octokit/plugin-paginate-rest/dist-web/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@octokit/plugin-paginate-rest/dist-web/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "composePaginateRest": () => (/* binding */ composePaginateRest),
/* harmony export */   "isPaginatingEndpoint": () => (/* binding */ isPaginatingEndpoint),
/* harmony export */   "paginateRest": () => (/* binding */ paginateRest),
/* harmony export */   "paginatingEndpoints": () => (/* binding */ paginatingEndpoints)
/* harmony export */ });
const VERSION = "2.13.5";

/**
 * Some “list” response that can be paginated have a different response structure
 *
 * They have a `total_count` key in the response (search also has `incomplete_results`,
 * /installation/repositories also has `repository_selection`), as well as a key with
 * the list of the items which name varies from endpoint to endpoint.
 *
 * Octokit normalizes these responses so that paginated results are always returned following
 * the same structure. One challenge is that if the list response has only one page, no Link
 * header is provided, so this header alone is not sufficient to check wether a response is
 * paginated or not.
 *
 * We check if a "total_count" key is present in the response data, but also make sure that
 * a "url" property is not, as the "Get the combined status for a specific ref" endpoint would
 * otherwise match: https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
 */
function normalizePaginatedListResponse(response) {
  // endpoints can respond with 204 if repository is empty
  if (!response.data) {
    return {
      ...response,
      data: []
    };
  }
  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization) return response;
  // keep the additional properties intact as there is currently no other way
  // to retrieve the same information.
  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;
  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }
  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }
  response.data.total_count = totalCount;
  return response;
}
function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url) return {
          done: true
        };
        try {
          const response = await requestMethod({
            method,
            url,
            headers
          });
          const normalizedResponse = normalizePaginatedListResponse(response);
          // `response.headers.link` format:
          // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
          // sets `url` to undefined if "next" URL is not present or `link` header is not set
          url = ((normalizedResponse.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
          return {
            value: normalizedResponse
          };
        } catch (error) {
          if (error.status !== 409) throw error;
          url = "";
          return {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }
    })
  };
}
function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = undefined;
  }
  return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
}
function gather(octokit, results, iterator, mapFn) {
  return iterator.next().then(result => {
    if (result.done) {
      return results;
    }
    let earlyExit = false;
    function done() {
      earlyExit = true;
    }
    results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);
    if (earlyExit) {
      return results;
    }
    return gather(octokit, results, iterator, mapFn);
  });
}
const composePaginateRest = Object.assign(paginate, {
  iterator
});
const paginatingEndpoints = ["GET /app/installations", "GET /applications/grants", "GET /authorizations", "GET /enterprises/{enterprise}/actions/permissions/organizations", "GET /enterprises/{enterprise}/actions/runner-groups", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners", "GET /enterprises/{enterprise}/actions/runners", "GET /enterprises/{enterprise}/actions/runners/downloads", "GET /events", "GET /gists", "GET /gists/public", "GET /gists/starred", "GET /gists/{gist_id}/comments", "GET /gists/{gist_id}/commits", "GET /gists/{gist_id}/forks", "GET /installation/repositories", "GET /issues", "GET /marketplace_listing/plans", "GET /marketplace_listing/plans/{plan_id}/accounts", "GET /marketplace_listing/stubbed/plans", "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts", "GET /networks/{owner}/{repo}/events", "GET /notifications", "GET /organizations", "GET /orgs/{org}/actions/permissions/repositories", "GET /orgs/{org}/actions/runner-groups", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners", "GET /orgs/{org}/actions/runners", "GET /orgs/{org}/actions/runners/downloads", "GET /orgs/{org}/actions/secrets", "GET /orgs/{org}/actions/secrets/{secret_name}/repositories", "GET /orgs/{org}/blocks", "GET /orgs/{org}/credential-authorizations", "GET /orgs/{org}/events", "GET /orgs/{org}/failed_invitations", "GET /orgs/{org}/hooks", "GET /orgs/{org}/installations", "GET /orgs/{org}/invitations", "GET /orgs/{org}/invitations/{invitation_id}/teams", "GET /orgs/{org}/issues", "GET /orgs/{org}/members", "GET /orgs/{org}/migrations", "GET /orgs/{org}/migrations/{migration_id}/repositories", "GET /orgs/{org}/outside_collaborators", "GET /orgs/{org}/projects", "GET /orgs/{org}/public_members", "GET /orgs/{org}/repos", "GET /orgs/{org}/team-sync/groups", "GET /orgs/{org}/teams", "GET /orgs/{org}/teams/{team_slug}/discussions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/invitations", "GET /orgs/{org}/teams/{team_slug}/members", "GET /orgs/{org}/teams/{team_slug}/projects", "GET /orgs/{org}/teams/{team_slug}/repos", "GET /orgs/{org}/teams/{team_slug}/team-sync/group-mappings", "GET /orgs/{org}/teams/{team_slug}/teams", "GET /projects/columns/{column_id}/cards", "GET /projects/{project_id}/collaborators", "GET /projects/{project_id}/columns", "GET /repos/{owner}/{repo}/actions/artifacts", "GET /repos/{owner}/{repo}/actions/runners", "GET /repos/{owner}/{repo}/actions/runners/downloads", "GET /repos/{owner}/{repo}/actions/runs", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs", "GET /repos/{owner}/{repo}/actions/secrets", "GET /repos/{owner}/{repo}/actions/workflows", "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs", "GET /repos/{owner}/{repo}/assignees", "GET /repos/{owner}/{repo}/branches", "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations", "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs", "GET /repos/{owner}/{repo}/code-scanning/alerts", "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", "GET /repos/{owner}/{repo}/code-scanning/analyses", "GET /repos/{owner}/{repo}/collaborators", "GET /repos/{owner}/{repo}/comments", "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/commits", "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments", "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", "GET /repos/{owner}/{repo}/commits/{ref}/check-runs", "GET /repos/{owner}/{repo}/commits/{ref}/check-suites", "GET /repos/{owner}/{repo}/commits/{ref}/statuses", "GET /repos/{owner}/{repo}/contributors", "GET /repos/{owner}/{repo}/deployments", "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses", "GET /repos/{owner}/{repo}/events", "GET /repos/{owner}/{repo}/forks", "GET /repos/{owner}/{repo}/git/matching-refs/{ref}", "GET /repos/{owner}/{repo}/hooks", "GET /repos/{owner}/{repo}/invitations", "GET /repos/{owner}/{repo}/issues", "GET /repos/{owner}/{repo}/issues/comments", "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/issues/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/comments", "GET /repos/{owner}/{repo}/issues/{issue_number}/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/labels", "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", "GET /repos/{owner}/{repo}/keys", "GET /repos/{owner}/{repo}/labels", "GET /repos/{owner}/{repo}/milestones", "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels", "GET /repos/{owner}/{repo}/notifications", "GET /repos/{owner}/{repo}/pages/builds", "GET /repos/{owner}/{repo}/projects", "GET /repos/{owner}/{repo}/pulls", "GET /repos/{owner}/{repo}/pulls/comments", "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments", "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits", "GET /repos/{owner}/{repo}/pulls/{pull_number}/files", "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments", "GET /repos/{owner}/{repo}/releases", "GET /repos/{owner}/{repo}/releases/{release_id}/assets", "GET /repos/{owner}/{repo}/secret-scanning/alerts", "GET /repos/{owner}/{repo}/stargazers", "GET /repos/{owner}/{repo}/subscribers", "GET /repos/{owner}/{repo}/tags", "GET /repos/{owner}/{repo}/teams", "GET /repositories", "GET /repositories/{repository_id}/environments/{environment_name}/secrets", "GET /scim/v2/enterprises/{enterprise}/Groups", "GET /scim/v2/enterprises/{enterprise}/Users", "GET /scim/v2/organizations/{org}/Users", "GET /search/code", "GET /search/commits", "GET /search/issues", "GET /search/labels", "GET /search/repositories", "GET /search/topics", "GET /search/users", "GET /teams/{team_id}/discussions", "GET /teams/{team_id}/discussions/{discussion_number}/comments", "GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /teams/{team_id}/discussions/{discussion_number}/reactions", "GET /teams/{team_id}/invitations", "GET /teams/{team_id}/members", "GET /teams/{team_id}/projects", "GET /teams/{team_id}/repos", "GET /teams/{team_id}/team-sync/group-mappings", "GET /teams/{team_id}/teams", "GET /user/blocks", "GET /user/emails", "GET /user/followers", "GET /user/following", "GET /user/gpg_keys", "GET /user/installations", "GET /user/installations/{installation_id}/repositories", "GET /user/issues", "GET /user/keys", "GET /user/marketplace_purchases", "GET /user/marketplace_purchases/stubbed", "GET /user/memberships/orgs", "GET /user/migrations", "GET /user/migrations/{migration_id}/repositories", "GET /user/orgs", "GET /user/public_emails", "GET /user/repos", "GET /user/repository_invitations", "GET /user/starred", "GET /user/subscriptions", "GET /user/teams", "GET /users", "GET /users/{username}/events", "GET /users/{username}/events/orgs/{org}", "GET /users/{username}/events/public", "GET /users/{username}/followers", "GET /users/{username}/following", "GET /users/{username}/gists", "GET /users/{username}/gpg_keys", "GET /users/{username}/keys", "GET /users/{username}/orgs", "GET /users/{username}/projects", "GET /users/{username}/received_events", "GET /users/{username}/received_events/public", "GET /users/{username}/repos", "GET /users/{username}/starred", "GET /users/{username}/subscriptions"];
function isPaginatingEndpoint(arg) {
  if (typeof arg === "string") {
    return paginatingEndpoints.includes(arg);
  } else {
    return false;
  }
}

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */
function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
paginateRest.VERSION = VERSION;


/***/ }),

/***/ "./node_modules/@octokit/plugin-rest-endpoint-methods/dist-web/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@octokit/plugin-rest-endpoint-methods/dist-web/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "legacyRestEndpointMethods": () => (/* binding */ legacyRestEndpointMethods),
/* harmony export */   "restEndpointMethods": () => (/* binding */ restEndpointMethods)
/* harmony export */ });
const Endpoints = {
  actions: {
    addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    approveWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"],
    cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
    createOrUpdateEnvironmentSecret: ["PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
    createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
    createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
    deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    deleteEnvironmentSecret: ["DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
    deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
    downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
    downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
    downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
    getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
    getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getEnvironmentPublicKey: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"],
    getEnvironmentSecret: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
    getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getPendingDeploymentsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    getRepoPermissions: ["GET /repos/{owner}/{repo}/actions/permissions", {}, {
      renamed: ["actions", "getGithubActionsPermissionsRepository"]
    }],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getReviewsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
    getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listEnvironmentSecrets: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets"],
    listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
    listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
    listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    reviewPendingDeploymentsForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
    setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
    setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
    setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
    checkToken: ["POST /applications/{client_id}/token"],
    createContentAttachment: ["POST /content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createContentAttachmentForRepo: ["POST /repos/{owner}/{repo}/content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
    getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
    listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
    removeRepoFromInstallation: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
    getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
    getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
    setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
    getAlert: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}", {}, {
      renamedParameters: {
        alert_id: "alert_number"
      }
    }],
    getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
    getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
    listAlertInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listAlertsInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", {}, {
      renamed: ["codeScanning", "listAlertInstances"]
    }],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getConductCode: ["GET /codes_of_conduct/{key}", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getForRepo: ["GET /repos/{owner}/{repo}/community/code_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }]
  },
  emojis: {
    get: ["GET /emojis"]
  },
  enterpriseAdmin: {
    disableSelectedOrganizationGithubActionsEnterprise: ["DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    enableSelectedOrganizationGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    getAllowedActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/selected-actions"],
    getGithubActionsPermissionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions"],
    listSelectedOrganizationsEnabledGithubActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/organizations"],
    setAllowedActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions"],
    setSelectedOrganizationsEnabledGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations"]
  },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: ["GET /user/interaction-limits", {}, {
      renamed: ["interactions", "getRestrictionsForAuthenticatedUser"]
    }],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
    removeRestrictionsForYourPublicRepos: ["DELETE /user/interaction-limits", {}, {
      renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"]
    }],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: ["PUT /user/interaction-limits", {}, {
      renamed: ["interactions", "setRestrictionsForAuthenticatedUser"]
    }]
  },
  issues: {
    addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", {
      mediaType: {
        previews: ["mockingbird"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: ["POST /markdown/raw", {
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    }]
  },
  meta: {
    get: ["GET /meta"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
    deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
    getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForUser: ["GET /user/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
    setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: ["PUT /repos/{owner}/{repo}/import"],
    unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    updateImport: ["PATCH /repos/{owner}/{repo}/import"]
  },
  orgs: {
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createWebhook: ["POST /orgs/{org}/hooks"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    get: ["GET /orgs/{org}"],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
    removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  packages: {
    deletePackageForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}"],
    deletePackageForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}"],
    deletePackageVersionForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    deletePackageVersionForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getAllPackageVersionsForAPackageOwnedByAnOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"]
    }],
    getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"]
    }],
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions"],
    getPackageForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}"],
    getPackageForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}"],
    getPackageForUser: ["GET /users/{username}/packages/{package_type}/{package_name}"],
    getPackageVersionForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    restorePackageForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageVersionForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
    restorePackageVersionForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createCard: ["POST /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createColumn: ["POST /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForAuthenticatedUser: ["POST /user/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForOrg: ["POST /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForRepo: ["POST /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    delete: ["DELETE /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteColumn: ["DELETE /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    get: ["GET /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getCard: ["GET /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getColumn: ["GET /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getPermissionForUser: ["GET /projects/{project_id}/collaborators/{username}/permission", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCards: ["GET /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCollaborators: ["GET /projects/{project_id}/collaborators", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listColumns: ["GET /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForRepo: ["GET /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForUser: ["GET /users/{username}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveColumn: ["POST /projects/columns/{column_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    removeCollaborator: ["DELETE /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    update: ["PATCH /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateCard: ["PATCH /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateColumn: ["PATCH /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch", {
      mediaType: {
        previews: ["lydian"]
      }
    }],
    updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
  },
  rateLimit: {
    get: ["GET /rate_limit"]
  },
  reactions: {
    createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForRelease: ["POST /repos/{owner}/{repo}/releases/{release_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteLegacy: ["DELETE /reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }, {
      deprecated: "octokit.rest.reactions.deleteLegacy() is deprecated, see https://docs.github.com/rest/reference/reactions/#delete-a-reaction-legacy"
    }],
    listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }]
  },
  repos: {
    acceptInvitation: ["PATCH /user/repository_invitations/{invitation_id}"],
    addAppAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    addTeamAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    addUserAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    compareCommitsWithBasehead: ["GET /repos/{owner}/{repo}/compare/{basehead}"],
    createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate", {
      mediaType: {
        previews: ["baptiste"]
      }
    }],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: ["DELETE /user/repository_invitations/{invitation_id}"],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    deleteAnEnvironment: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}"],
    deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    downloadArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}", {}, {
      renamed: ["repos", "downloadZipballArchive"]
    }],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
    getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
    getEnvironment: ["GET /repos/{owner}/{repo}/environments/{environment_name}"],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    removeAppAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
    removeStatusCheckContexts: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    removeTeamAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    removeUserAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    setAppAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    setStatusCheckContexts: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    setTeamAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    setUserAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
    updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    updateStatusCheckPotection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks", {}, {
      renamed: ["repos", "updateStatusCheckProtection"]
    }],
    updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", {
      baseUrl: "https://uploads.github.com"
    }]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits", {
      mediaType: {
        previews: ["cloak"]
      }
    }],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    addOrUpdateProjectPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    checkPermissionsForProjectInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    removeProjectInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
    removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: ["POST /user/emails"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: ["POST /user/keys"],
    deleteEmailForAuthenticated: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: ["DELETE /user/keys/{key_id}"],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: ["GET /user/keys/{key_id}"],
    list: ["GET /users"],
    listBlockedByAuthenticated: ["GET /user/blocks"],
    listEmailsForAuthenticated: ["GET /user/emails"],
    listFollowedByAuthenticated: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: ["GET /user/keys"],
    setPrimaryEmailVisibilityForAuthenticated: ["PATCH /user/email/visibility"],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
};
const VERSION = "5.3.1";
function endpointsToMethods(octokit, endpointsMap) {
  const newMethods = {};
  for (const [scope, endpoints] of Object.entries(endpointsMap)) {
    for (const [methodName, endpoint] of Object.entries(endpoints)) {
      const [route, defaults, decorations] = endpoint;
      const [method, url] = route.split(/ /);
      const endpointDefaults = Object.assign({
        method,
        url
      }, defaults);
      if (!newMethods[scope]) {
        newMethods[scope] = {};
      }
      const scopeMethods = newMethods[scope];
      if (decorations) {
        scopeMethods[methodName] = decorate(octokit, scope, methodName, endpointDefaults, decorations);
        continue;
      }
      scopeMethods[methodName] = octokit.request.defaults(endpointDefaults);
    }
  }
  return newMethods;
}
function decorate(octokit, scope, methodName, defaults, decorations) {
  const requestWithDefaults = octokit.request.defaults(defaults);
  /* istanbul ignore next */
  function withDecorations(...args) {
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
    let options = requestWithDefaults.endpoint.merge(...args);
    // There are currently no other decorations than `.mapToData`
    if (decorations.mapToData) {
      options = Object.assign({}, options, {
        data: options[decorations.mapToData],
        [decorations.mapToData]: undefined
      });
      return requestWithDefaults(options);
    }
    if (decorations.renamed) {
      const [newScope, newMethodName] = decorations.renamed;
      octokit.log.warn(`octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`);
    }
    if (decorations.deprecated) {
      octokit.log.warn(decorations.deprecated);
    }
    if (decorations.renamedParameters) {
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
      const options = requestWithDefaults.endpoint.merge(...args);
      for (const [name, alias] of Object.entries(decorations.renamedParameters)) {
        if (name in options) {
          octokit.log.warn(`"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`);
          if (!(alias in options)) {
            options[alias] = options[name];
          }
          delete options[name];
        }
      }
      return requestWithDefaults(options);
    }
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
    return requestWithDefaults(...args);
  }
  return Object.assign(withDecorations, requestWithDefaults);
}
function restEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return {
    rest: api
  };
}
restEndpointMethods.VERSION = VERSION;
function legacyRestEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return {
    ...api,
    rest: api
  };
}
legacyRestEndpointMethods.VERSION = VERSION;


/***/ }),

/***/ "./node_modules/before-after-hook/index.js":
/*!*************************************************!*\
  !*** ./node_modules/before-after-hook/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var register = __webpack_require__(/*! ./lib/register */ "./node_modules/before-after-hook/lib/register.js");
var addHook = __webpack_require__(/*! ./lib/add */ "./node_modules/before-after-hook/lib/add.js");
var removeHook = __webpack_require__(/*! ./lib/remove */ "./node_modules/before-after-hook/lib/remove.js");

// bind with array of arguments: https://stackoverflow.com/a/21792913
var bind = Function.bind;
var bindable = bind.bind(bind);
function bindApi(hook, state, name) {
  var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state]);
  hook.api = {
    remove: removeHookRef
  };
  hook.remove = removeHookRef;
  ['before', 'error', 'after', 'wrap'].forEach(function (kind) {
    var args = name ? [state, kind, name] : [state, kind];
    hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args);
  });
}
function HookSingular() {
  var singularHookName = 'h';
  var singularHookState = {
    registry: {}
  };
  var singularHook = register.bind(null, singularHookState, singularHookName);
  bindApi(singularHook, singularHookState, singularHookName);
  return singularHook;
}
function HookCollection() {
  var state = {
    registry: {}
  };
  var hook = register.bind(null, state);
  bindApi(hook, state);
  return hook;
}
var collectionHookDeprecationMessageDisplayed = false;
function Hook() {
  if (!collectionHookDeprecationMessageDisplayed) {
    console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4');
    collectionHookDeprecationMessageDisplayed = true;
  }
  return HookCollection();
}
Hook.Singular = HookSingular.bind();
Hook.Collection = HookCollection.bind();
module.exports = Hook;
// expose constructors as a named property for TypeScript
module.exports.Hook = Hook;
module.exports.Singular = Hook.Singular;
module.exports.Collection = Hook.Collection;

/***/ }),

/***/ "./node_modules/before-after-hook/lib/add.js":
/*!***************************************************!*\
  !*** ./node_modules/before-after-hook/lib/add.js ***!
  \***************************************************/
/***/ ((module) => {

module.exports = addHook;
function addHook(state, kind, name, hook) {
  var orig = hook;
  if (!state.registry[name]) {
    state.registry[name] = [];
  }
  if (kind === "before") {
    hook = function (method, options) {
      return Promise.resolve().then(orig.bind(null, options)).then(method.bind(null, options));
    };
  }
  if (kind === "after") {
    hook = function (method, options) {
      var result;
      return Promise.resolve().then(method.bind(null, options)).then(function (result_) {
        result = result_;
        return orig(result, options);
      }).then(function () {
        return result;
      });
    };
  }
  if (kind === "error") {
    hook = function (method, options) {
      return Promise.resolve().then(method.bind(null, options)).catch(function (error) {
        return orig(error, options);
      });
    };
  }
  state.registry[name].push({
    hook: hook,
    orig: orig
  });
}

/***/ }),

/***/ "./node_modules/before-after-hook/lib/register.js":
/*!********************************************************!*\
  !*** ./node_modules/before-after-hook/lib/register.js ***!
  \********************************************************/
/***/ ((module) => {

module.exports = register;
function register(state, name, method, options) {
  if (typeof method !== "function") {
    throw new Error("method for before hook must be a function");
  }
  if (!options) {
    options = {};
  }
  if (Array.isArray(name)) {
    return name.reverse().reduce(function (callback, name) {
      return register.bind(null, state, name, callback, options);
    }, method)();
  }
  return Promise.resolve().then(function () {
    if (!state.registry[name]) {
      return method(options);
    }
    return state.registry[name].reduce(function (method, registered) {
      return registered.hook.bind(null, method, options);
    }, method)();
  });
}

/***/ }),

/***/ "./node_modules/before-after-hook/lib/remove.js":
/*!******************************************************!*\
  !*** ./node_modules/before-after-hook/lib/remove.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = removeHook;
function removeHook(state, name, method) {
  if (!state.registry[name]) {
    return;
  }
  var index = state.registry[name].map(function (registered) {
    return registered.orig;
  }).indexOf(method);
  if (index === -1) {
    return;
  }
  state.registry[name].splice(index, 1);
}

/***/ }),

/***/ "./node_modules/once/once.js":
/*!***********************************!*\
  !*** ./node_modules/once/once.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wrappy = __webpack_require__(/*! wrappy */ "./node_modules/wrappy/wrappy.js");
module.exports = wrappy(once);
module.exports.strict = wrappy(onceStrict);
once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this);
    },
    configurable: true
  });
  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this);
    },
    configurable: true
  });
});
function once(fn) {
  var f = function () {
    if (f.called) return f.value;
    f.called = true;
    return f.value = fn.apply(this, arguments);
  };
  f.called = false;
  return f;
}
function onceStrict(fn) {
  var f = function () {
    if (f.called) throw new Error(f.onceError);
    f.called = true;
    return f.value = fn.apply(this, arguments);
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f;
}

/***/ }),

/***/ "./node_modules/tunnel/index.js":
/*!**************************************!*\
  !*** ./node_modules/tunnel/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/tunnel */ "./node_modules/tunnel/lib/tunnel.js");

/***/ }),

/***/ "./node_modules/tunnel/lib/tunnel.js":
/*!*******************************************!*\
  !*** ./node_modules/tunnel/lib/tunnel.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var net = __webpack_require__(/*! net */ "net");
var tls = __webpack_require__(/*! tls */ "tls");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var events = __webpack_require__(/*! events */ "events");
var assert = __webpack_require__(/*! assert */ "assert");
var util = __webpack_require__(/*! util */ "util");
exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;
function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}
function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}
function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}
function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}
function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];
  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);
TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({
    request: req
  }, self.options, toOptions(host, port, localAddress));
  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function (socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);
    function onFree() {
      self.emit('free', socket, options);
    }
    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};
TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);
  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64');
  }
  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade); // for v0.6
  connectReq.once('connect', onConnect); // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();
  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }
  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function () {
      onConnect(res, socket, head);
    });
  }
  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();
    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d', res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' + 'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }
  function onError(cause) {
    connectReq.removeAllListeners();
    debug('tunneling socket could not be established, cause=%s\n', cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' + 'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};
TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket);
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);
  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function (socket) {
      pending.request.onSocket(socket);
    });
  }
};
function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function (socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}
function toOptions(host, port, localAddress) {
  if (typeof host === 'string') {
    // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}
var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  };
} else {
  debug = function () {};
}
exports.debug = debug; // for test

/***/ }),

/***/ "./node_modules/wrappy/wrappy.js":
/*!***************************************!*\
  !*** ./node_modules/wrappy/wrappy.js ***!
  \***************************************/
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy;
function wrappy(fn, cb) {
  if (fn && cb) return wrappy(fn)(cb);
  if (typeof fn !== 'function') throw new TypeError('need wrapper function');
  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });
  return wrapper;
  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length - 1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret;
  }
}

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************************!*\
  !*** ./src/main.ts + 26 modules ***!
  \**********************************/
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@actions/core/lib/core.js
var core = __webpack_require__("./node_modules/@actions/core/lib/core.js");
// EXTERNAL MODULE: ./node_modules/@actions/github/lib/github.js
var github = __webpack_require__("./node_modules/@actions/github/lib/github.js");
// EXTERNAL MODULE: ./node_modules/@actions/exec/lib/exec.js
var exec = __webpack_require__("./node_modules/@actions/exec/lib/exec.js");
;// CONCATENATED MODULE: ./src/@types/github.ts
let MergeMethod;
(function (MergeMethod) {
  MergeMethod["Merge"] = "MERGE";
  MergeMethod["Squash"] = "SQUASH";
  MergeMethod["Rebase"] = "REBASE";
})(MergeMethod || (MergeMethod = {}));
;// CONCATENATED MODULE: ./src/@types/index.ts

;// CONCATENATED MODULE: ./node_modules/graphql-tag/node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || from);
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
    i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
;
var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
;// CONCATENATED MODULE: ./node_modules/graphql/jsutils/isObjectLike.mjs
/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */
function isObjectLike(value) {
  return typeof value == 'object' && value !== null;
}

;// CONCATENATED MODULE: ./node_modules/graphql/jsutils/invariant.mjs
function invariant(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(
      message != null ? message : 'Unexpected invariant triggered.',
    );
  }
}

;// CONCATENATED MODULE: ./node_modules/graphql/language/location.mjs

const LineRegExp = /\r\n|[\n\r]/g;
/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;

  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === 'number' || invariant(false);

    if (match.index >= position) {
      break;
    }

    lastLineStart = match.index + match[0].length;
    line += 1;
  }

  return {
    line,
    column: position + 1 - lastLineStart,
  };
}

;// CONCATENATED MODULE: ./node_modules/graphql/language/printLocation.mjs


/**
 * Render a helpful description of the location in the GraphQL Source document.
 */
function printLocation(location) {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start),
  );
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = ''.padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}\n`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];

    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return (
      locationStr +
      printPrefixedLines([
        [`${lineNum} |`, subLines[0]],
        ...subLines.slice(1, subLineIndex + 1).map((subLine) => ['|', subLine]),
        ['|', '^'.padStart(subLineColumnNum)],
        ['|', subLines[subLineIndex + 1]],
      ])
    );
  }

  return (
    locationStr +
    printPrefixedLines([
      // Lines specified like this: ["prefix", "string"],
      [`${lineNum - 1} |`, lines[lineIndex - 1]],
      [`${lineNum} |`, locationLine],
      ['|', '^'.padStart(columnNum)],
      [`${lineNum + 1} |`, lines[lineIndex + 1]],
    ])
  );
}

function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== undefined);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines
    .map(([prefix, line]) => prefix.padStart(padLen) + (line ? ' ' + line : ''))
    .join('\n');
}

;// CONCATENATED MODULE: ./node_modules/graphql/error/GraphQLError.mjs




function toNormalizedOptions(args) {
  const firstArg = args[0];

  if (firstArg == null || 'kind' in firstArg || 'length' in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5],
    };
  }

  return firstArg;
}
/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */

class GraphQLError extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */

  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;

    const { nodes, source, positions, path, originalError, extensions } =
      toNormalizedOptions(rawArgs);
    super(message);
    this.name = 'GraphQLError';
    this.path = path !== null && path !== void 0 ? path : undefined;
    this.originalError =
      originalError !== null && originalError !== void 0
        ? originalError
        : undefined; // Compute list of blame nodes.

    this.nodes = undefinedIfEmpty(
      Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined,
    );
    const nodeLocations = undefinedIfEmpty(
      (_this$nodes = this.nodes) === null || _this$nodes === void 0
        ? void 0
        : _this$nodes.map((node) => node.loc).filter((loc) => loc != null),
    ); // Compute locations in the source for the given nodes/positions.

    this.source =
      source !== null && source !== void 0
        ? source
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : (_nodeLocations$ = nodeLocations[0]) === null ||
          _nodeLocations$ === void 0
        ? void 0
        : _nodeLocations$.source;
    this.positions =
      positions !== null && positions !== void 0
        ? positions
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => loc.start);
    this.locations =
      positions && source
        ? positions.map((pos) => getLocation(source, pos))
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
    const originalExtensions = isObjectLike(
      originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions,
    )
      ? originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions
      : undefined;
    this.extensions =
      (_ref =
        extensions !== null && extensions !== void 0
          ? extensions
          : originalExtensions) !== null && _ref !== void 0
        ? _ref
        : Object.create(null); // Only properties prescribed by the spec should be enumerable.
    // Keep the rest as non-enumerable.

    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true,
      },
      name: {
        enumerable: false,
      },
      nodes: {
        enumerable: false,
      },
      source: {
        enumerable: false,
      },
      positions: {
        enumerable: false,
      },
      originalError: {
        enumerable: false,
      },
    }); // Include (non-enumerable) stack trace.

    /* c8 ignore start */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317

    if (
      originalError !== null &&
      originalError !== void 0 &&
      originalError.stack
    ) {
      Object.defineProperty(this, 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true,
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLError);
    } else {
      Object.defineProperty(this, 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true,
      });
    }
    /* c8 ignore stop */
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLError';
  }

  toString() {
    let output = this.message;

    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += '\n\n' + printLocation(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += '\n\n' + printSourceLocation(this.source, location);
      }
    }

    return output;
  }

  toJSON() {
    const formattedError = {
      message: this.message,
    };

    if (this.locations != null) {
      formattedError.locations = this.locations;
    }

    if (this.path != null) {
      formattedError.path = this.path;
    }

    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }

    return formattedError;
  }
}

function undefinedIfEmpty(array) {
  return array === undefined || array.length === 0 ? undefined : array;
}
/**
 * See: https://spec.graphql.org/draft/#sec-Errors
 */

/**
 * Prints a GraphQLError to a string, representing useful location information
 * about the error's position in the source.
 *
 * @deprecated Please use `error.toString` instead. Will be removed in v17
 */
function printError(error) {
  return error.toString();
}
/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 *
 * @deprecated Please use `error.toJSON` instead. Will be removed in v17
 */

function formatError(error) {
  return error.toJSON();
}

;// CONCATENATED MODULE: ./node_modules/graphql/error/syntaxError.mjs

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position],
  });
}

;// CONCATENATED MODULE: ./node_modules/graphql/language/ast.mjs
/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
class Location {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  get [Symbol.toStringTag]() {
    return 'Location';
  }

  toJSON() {
    return {
      start: this.start,
      end: this.end,
    };
  }
}
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

class Token {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    this.value = value;
    this.prev = null;
    this.next = null;
  }

  get [Symbol.toStringTag]() {
    return 'Token';
  }

  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column,
    };
  }
}
/**
 * The list of all possible AST node types.
 */

/**
 * @internal
 */
const QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: [
    'name',
    'variableDefinitions',
    'directives',
    'selectionSet',
  ],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: [
    'name', // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    'variableDefinitions',
    'typeCondition',
    'directives',
    'selectionSet',
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: [
    'description',
    'name',
    'type',
    'defaultValue',
    'directives',
  ],
  InterfaceTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields'],
};
const kindValues = new Set(Object.keys(QueryDocumentKeys));
/**
 * @internal
 */

function isNode(maybeNode) {
  const maybeKind =
    maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === 'string' && kindValues.has(maybeKind);
}
/** Name */

var OperationTypeNode;

(function (OperationTypeNode) {
  OperationTypeNode['QUERY'] = 'query';
  OperationTypeNode['MUTATION'] = 'mutation';
  OperationTypeNode['SUBSCRIPTION'] = 'subscription';
})(OperationTypeNode || (OperationTypeNode = {}));



;// CONCATENATED MODULE: ./node_modules/graphql/language/directiveLocation.mjs
/**
 * The set of allowed directive location values.
 */
var DirectiveLocation;

(function (DirectiveLocation) {
  DirectiveLocation['QUERY'] = 'QUERY';
  DirectiveLocation['MUTATION'] = 'MUTATION';
  DirectiveLocation['SUBSCRIPTION'] = 'SUBSCRIPTION';
  DirectiveLocation['FIELD'] = 'FIELD';
  DirectiveLocation['FRAGMENT_DEFINITION'] = 'FRAGMENT_DEFINITION';
  DirectiveLocation['FRAGMENT_SPREAD'] = 'FRAGMENT_SPREAD';
  DirectiveLocation['INLINE_FRAGMENT'] = 'INLINE_FRAGMENT';
  DirectiveLocation['VARIABLE_DEFINITION'] = 'VARIABLE_DEFINITION';
  DirectiveLocation['SCHEMA'] = 'SCHEMA';
  DirectiveLocation['SCALAR'] = 'SCALAR';
  DirectiveLocation['OBJECT'] = 'OBJECT';
  DirectiveLocation['FIELD_DEFINITION'] = 'FIELD_DEFINITION';
  DirectiveLocation['ARGUMENT_DEFINITION'] = 'ARGUMENT_DEFINITION';
  DirectiveLocation['INTERFACE'] = 'INTERFACE';
  DirectiveLocation['UNION'] = 'UNION';
  DirectiveLocation['ENUM'] = 'ENUM';
  DirectiveLocation['ENUM_VALUE'] = 'ENUM_VALUE';
  DirectiveLocation['INPUT_OBJECT'] = 'INPUT_OBJECT';
  DirectiveLocation['INPUT_FIELD_DEFINITION'] = 'INPUT_FIELD_DEFINITION';
})(DirectiveLocation || (DirectiveLocation = {}));


/**
 * The enum type representing the directive location values.
 *
 * @deprecated Please use `DirectiveLocation`. Will be remove in v17.
 */

;// CONCATENATED MODULE: ./node_modules/graphql/language/kinds.mjs
/**
 * The set of allowed kind values for AST nodes.
 */
var Kind;

(function (Kind) {
  Kind['NAME'] = 'Name';
  Kind['DOCUMENT'] = 'Document';
  Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
  Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
  Kind['SELECTION_SET'] = 'SelectionSet';
  Kind['FIELD'] = 'Field';
  Kind['ARGUMENT'] = 'Argument';
  Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
  Kind['INLINE_FRAGMENT'] = 'InlineFragment';
  Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
  Kind['VARIABLE'] = 'Variable';
  Kind['INT'] = 'IntValue';
  Kind['FLOAT'] = 'FloatValue';
  Kind['STRING'] = 'StringValue';
  Kind['BOOLEAN'] = 'BooleanValue';
  Kind['NULL'] = 'NullValue';
  Kind['ENUM'] = 'EnumValue';
  Kind['LIST'] = 'ListValue';
  Kind['OBJECT'] = 'ObjectValue';
  Kind['OBJECT_FIELD'] = 'ObjectField';
  Kind['DIRECTIVE'] = 'Directive';
  Kind['NAMED_TYPE'] = 'NamedType';
  Kind['LIST_TYPE'] = 'ListType';
  Kind['NON_NULL_TYPE'] = 'NonNullType';
  Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
  Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
  Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
  Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
  Kind['FIELD_DEFINITION'] = 'FieldDefinition';
  Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
  Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
  Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
  Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
  Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
  Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
  Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
  Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
  Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
  Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
  Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
  Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
  Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
  Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
})(Kind || (Kind = {}));


/**
 * The enum type representing the possible kind values of AST nodes.
 *
 * @deprecated Please use `Kind`. Will be remove in v17.
 */

;// CONCATENATED MODULE: ./node_modules/graphql/language/characterClasses.mjs
/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */
function isWhiteSpace(code) {
  return code === 0x0009 || code === 0x0020;
}
/**
 * ```
 * Digit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 * ```
 * @internal
 */

function isDigit(code) {
  return code >= 0x0030 && code <= 0x0039;
}
/**
 * ```
 * Letter :: one of
 *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
 *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
 *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
 *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
 * ```
 * @internal
 */

function isLetter(code) {
  return (
    (code >= 0x0061 && code <= 0x007a) || // A-Z
    (code >= 0x0041 && code <= 0x005a) // a-z
  );
}
/**
 * ```
 * NameStart ::
 *   - Letter
 *   - `_`
 * ```
 * @internal
 */

function isNameStart(code) {
  return isLetter(code) || code === 0x005f;
}
/**
 * ```
 * NameContinue ::
 *   - Letter
 *   - Digit
 *   - `_`
 * ```
 * @internal
 */

function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 0x005f;
}

;// CONCATENATED MODULE: ./node_modules/graphql/language/blockString.mjs

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */

function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;

  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;

  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;

    const line = lines[i];
    const indent = leadingWhitespace(line);

    if (indent === line.length) {
      continue; // skip empty lines
    }

    firstNonEmptyLine =
      (_firstNonEmptyLine = firstNonEmptyLine) !== null &&
      _firstNonEmptyLine !== void 0
        ? _firstNonEmptyLine
        : i;
    lastNonEmptyLine = i;

    if (i !== 0 && indent < commonIndent) {
      commonIndent = indent;
    }
  }

  return lines // Remove common indentation from all lines but first.
    .map((line, i) => (i === 0 ? line : line.slice(commonIndent))) // Remove leading and trailing blank lines.
    .slice(
      (_firstNonEmptyLine2 = firstNonEmptyLine) !== null &&
        _firstNonEmptyLine2 !== void 0
        ? _firstNonEmptyLine2
        : 0,
      lastNonEmptyLine + 1,
    );
}

function leadingWhitespace(str) {
  let i = 0;

  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }

  return i;
}
/**
 * @internal
 */

function isPrintableAsBlockString(value) {
  if (value === '') {
    return true; // empty string is printable
  }

  let isEmptyLine = true;
  let hasIndent = false;
  let hasCommonIndent = true;
  let seenNonEmptyLine = false;

  for (let i = 0; i < value.length; ++i) {
    switch (value.codePointAt(i)) {
      case 0x0000:
      case 0x0001:
      case 0x0002:
      case 0x0003:
      case 0x0004:
      case 0x0005:
      case 0x0006:
      case 0x0007:
      case 0x0008:
      case 0x000b:
      case 0x000c:
      case 0x000e:
      case 0x000f:
        return false;
      // Has non-printable characters

      case 0x000d:
        //  \r
        return false;
      // Has \r or \r\n which will be replaced as \n

      case 10:
        //  \n
        if (isEmptyLine && !seenNonEmptyLine) {
          return false; // Has leading new line
        }

        seenNonEmptyLine = true;
        isEmptyLine = true;
        hasIndent = false;
        break;

      case 9: //   \t

      case 32:
        //  <space>
        hasIndent || (hasIndent = isEmptyLine);
        break;

      default:
        hasCommonIndent && (hasCommonIndent = hasIndent);
        isEmptyLine = false;
    }
  }

  if (isEmptyLine) {
    return false; // Has trailing empty lines
  }

  if (hasCommonIndent && seenNonEmptyLine) {
    return false; // Has internal indent
  }

  return true;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */

function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.

  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line

  const forceLeadingNewLine =
    lines.length > 1 &&
    lines
      .slice(1)
      .every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0))); // Trailing triple quotes just looks confusing but doesn't force trailing new line

  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line

  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith('\\');
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines =
    !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
    (!isSingleLine ||
      value.length > 70 ||
      forceTrailingNewline ||
      forceLeadingNewLine ||
      hasTrailingTripleQuotes);
  let result = ''; // Format a multi-line block quote to account for leading space.

  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));

  if ((printAsMultipleLines && !skipLeadingNewLine) || forceLeadingNewLine) {
    result += '\n';
  }

  result += escapedValue;

  if (printAsMultipleLines || forceTrailingNewline) {
    result += '\n';
  }

  return '"""' + result + '"""';
}

;// CONCATENATED MODULE: ./node_modules/graphql/language/tokenKind.mjs
/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind;

(function (TokenKind) {
  TokenKind['SOF'] = '<SOF>';
  TokenKind['EOF'] = '<EOF>';
  TokenKind['BANG'] = '!';
  TokenKind['DOLLAR'] = '$';
  TokenKind['AMP'] = '&';
  TokenKind['PAREN_L'] = '(';
  TokenKind['PAREN_R'] = ')';
  TokenKind['SPREAD'] = '...';
  TokenKind['COLON'] = ':';
  TokenKind['EQUALS'] = '=';
  TokenKind['AT'] = '@';
  TokenKind['BRACKET_L'] = '[';
  TokenKind['BRACKET_R'] = ']';
  TokenKind['BRACE_L'] = '{';
  TokenKind['PIPE'] = '|';
  TokenKind['BRACE_R'] = '}';
  TokenKind['NAME'] = 'Name';
  TokenKind['INT'] = 'Int';
  TokenKind['FLOAT'] = 'Float';
  TokenKind['STRING'] = 'String';
  TokenKind['BLOCK_STRING'] = 'BlockString';
  TokenKind['COMMENT'] = 'Comment';
})(TokenKind || (TokenKind = {}));


/**
 * The enum type representing the token kinds values.
 *
 * @deprecated Please use `TokenKind`. Will be remove in v17.
 */

;// CONCATENATED MODULE: ./node_modules/graphql/language/lexer.mjs





/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */

class Lexer {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  constructor(source) {
    const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }

  get [Symbol.toStringTag]() {
    return 'Lexer';
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */

  advance() {
    this.lastToken = this.token;
    const token = (this.token = this.lookahead());
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */

  lookahead() {
    let token = this.token;

    if (token.kind !== TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          // Read the next token and form a link in the token linked-list.
          const nextToken = readNextToken(this, token.end); // @ts-expect-error next is only mutable during parsing.

          token.next = nextToken; // @ts-expect-error prev is only mutable during parsing.

          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === TokenKind.COMMENT);
    }

    return token;
  }
}
/**
 * @internal
 */

function isPunctuatorTokenKind(kind) {
  return (
    kind === TokenKind.BANG ||
    kind === TokenKind.DOLLAR ||
    kind === TokenKind.AMP ||
    kind === TokenKind.PAREN_L ||
    kind === TokenKind.PAREN_R ||
    kind === TokenKind.SPREAD ||
    kind === TokenKind.COLON ||
    kind === TokenKind.EQUALS ||
    kind === TokenKind.AT ||
    kind === TokenKind.BRACKET_L ||
    kind === TokenKind.BRACKET_R ||
    kind === TokenKind.BRACE_L ||
    kind === TokenKind.PIPE ||
    kind === TokenKind.BRACE_R
  );
}
/**
 * A Unicode scalar value is any Unicode code point except surrogate code
 * points. In other words, the inclusive ranges of values 0x0000 to 0xD7FF and
 * 0xE000 to 0x10FFFF.
 *
 * SourceCharacter ::
 *   - "Any Unicode scalar value"
 */

function isUnicodeScalarValue(code) {
  return (
    (code >= 0x0000 && code <= 0xd7ff) || (code >= 0xe000 && code <= 0x10ffff)
  );
}
/**
 * The GraphQL specification defines source text as a sequence of unicode scalar
 * values (which Unicode defines to exclude surrogate code points). However
 * JavaScript defines strings as a sequence of UTF-16 code units which may
 * include surrogates. A surrogate pair is a valid source character as it
 * encodes a supplementary code point (above U+FFFF), but unpaired surrogate
 * code points are not valid source characters.
 */

function isSupplementaryCodePoint(body, location) {
  return (
    isLeadingSurrogate(body.charCodeAt(location)) &&
    isTrailingSurrogate(body.charCodeAt(location + 1))
  );
}

function isLeadingSurrogate(code) {
  return code >= 0xd800 && code <= 0xdbff;
}

function isTrailingSurrogate(code) {
  return code >= 0xdc00 && code <= 0xdfff;
}
/**
 * Prints the code point (or end of file reference) at a given location in a
 * source for use in error messages.
 *
 * Printable ASCII is printed quoted, while other points are printed in Unicode
 * code point form (ie. U+1234).
 */

function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);

  if (code === undefined) {
    return TokenKind.EOF;
  } else if (code >= 0x0020 && code <= 0x007e) {
    // Printable ASCII
    const char = String.fromCodePoint(code);
    return char === '"' ? "'\"'" : `"${char}"`;
  } // Unicode code point

  return 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Create a token with line and column location information.
 */

function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */

function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // SourceCharacter

    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 0xfeff: // <BOM>

      case 0x0009: // \t

      case 0x0020: // <space>

      case 0x002c:
        // ,
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"

      case 0x000a:
        // \n
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;

      case 0x000d:
        // \r
        if (body.charCodeAt(position + 1) === 0x000a) {
          position += 2;
        } else {
          ++position;
        }

        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment

      case 0x0023:
        // #
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }

      case 0x0021:
        // !
        return createToken(lexer, TokenKind.BANG, position, position + 1);

      case 0x0024:
        // $
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);

      case 0x0026:
        // &
        return createToken(lexer, TokenKind.AMP, position, position + 1);

      case 0x0028:
        // (
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);

      case 0x0029:
        // )
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);

      case 0x002e:
        // .
        if (
          body.charCodeAt(position + 1) === 0x002e &&
          body.charCodeAt(position + 2) === 0x002e
        ) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }

        break;

      case 0x003a:
        // :
        return createToken(lexer, TokenKind.COLON, position, position + 1);

      case 0x003d:
        // =
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);

      case 0x0040:
        // @
        return createToken(lexer, TokenKind.AT, position, position + 1);

      case 0x005b:
        // [
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);

      case 0x005d:
        // ]
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);

      case 0x007b:
        // {
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);

      case 0x007c:
        // |
        return createToken(lexer, TokenKind.PIPE, position, position + 1);

      case 0x007d:
        // }
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      // StringValue

      case 0x0022:
        // "
        if (
          body.charCodeAt(position + 1) === 0x0022 &&
          body.charCodeAt(position + 2) === 0x0022
        ) {
          return readBlockString(lexer, position);
        }

        return readString(lexer, position);
    } // IntValue | FloatValue (Digit | -)

    if (isDigit(code) || code === 0x002d) {
      return readNumber(lexer, position, code);
    } // Name

    if (isNameStart(code)) {
      return readName(lexer, position);
    }

    throw syntaxError(
      lexer.source,
      position,
      code === 0x0027
        ? 'Unexpected single quote character (\'), did you mean to use a double quote (")?'
        : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position)
        ? `Unexpected character: ${printCodePointAt(lexer, position)}.`
        : `Invalid character: ${printCodePointAt(lexer, position)}.`,
    );
  }

  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
/**
 * Reads a comment token from the source file.
 *
 * ```
 * Comment :: # CommentChar* [lookahead != CommentChar]
 *
 * CommentChar :: SourceCharacter but not LineTerminator
 * ```
 */

function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position),
  );
}
/**
 * Reads a number token from the source file, either a FloatValue or an IntValue
 * depending on whether a FractionalPart or ExponentPart is encountered.
 *
 * ```
 * IntValue :: IntegerPart [lookahead != {Digit, `.`, NameStart}]
 *
 * IntegerPart ::
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit Digit*
 *
 * NegativeSign :: -
 *
 * NonZeroDigit :: Digit but not `0`
 *
 * FloatValue ::
 *   - IntegerPart FractionalPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart FractionalPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *
 * FractionalPart :: . Digit+
 *
 * ExponentPart :: ExponentIndicator Sign? Digit+
 *
 * ExponentIndicator :: one of `e` `E`
 *
 * Sign :: one of + -
 * ```
 */

function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false; // NegativeSign (-)

  if (code === 0x002d) {
    code = body.charCodeAt(++position);
  } // Zero (0)

  if (code === 0x0030) {
    code = body.charCodeAt(++position);

    if (isDigit(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Full stop (.)

  if (code === 0x002e) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // E e

  if (code === 0x0045 || code === 0x0065) {
    isFloat = true;
    code = body.charCodeAt(++position); // + -

    if (code === 0x002b || code === 0x002d) {
      code = body.charCodeAt(++position);
    }

    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart

  if (code === 0x002e || isNameStart(code)) {
    throw syntaxError(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position,
      )}.`,
    );
  }

  return createToken(
    lexer,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position),
  );
}
/**
 * Returns the new position in the source after reading one or more digits.
 */

function readDigits(lexer, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start,
      )}.`,
    );
  }

  const body = lexer.source.body;
  let position = start + 1; // +1 to skip first firstCode

  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }

  return position;
}
/**
 * Reads a single-quote string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `""` [lookahead != `"`]
 *   - `"` StringCharacter+ `"`
 *
 * StringCharacter ::
 *   - SourceCharacter but not `"` or `\` or LineTerminator
 *   - `\u` EscapedUnicode
 *   - `\` EscapedCharacter
 *
 * EscapedUnicode ::
 *   - `{` HexDigit+ `}`
 *   - HexDigit HexDigit HexDigit HexDigit
 *
 * EscapedCharacter :: one of `"` `\` `/` `b` `f` `n` `r` `t`
 * ```
 */

function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = '';

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Quote (")

    if (code === 0x0022) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    } // Escape Sequence (\)

    if (code === 0x005c) {
      value += body.slice(chunkStart, position);
      const escape =
        body.charCodeAt(position + 1) === 0x0075 // u
          ? body.charCodeAt(position + 2) === 0x007b // {
            ? readEscapedUnicodeVariableWidth(lexer, position)
            : readEscapedUnicodeFixedWidth(lexer, position)
          : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    } // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw syntaxError(lexer.source, position, 'Unterminated string.');
} // The string value and lexed size of an escape sequence.

function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3; // Cannot be larger than 12 chars (\u{00000000}).

  while (size < 12) {
    const code = body.charCodeAt(position + size++); // Closing Brace (})

    if (code === 0x007d) {
      // Must be at least 5 chars (\u{0}) and encode a Unicode scalar value.
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }

      return {
        value: String.fromCodePoint(point),
        size,
      };
    } // Append this hex digit to the code point.

    point = (point << 4) | readHexDigit(code);

    if (point < 0) {
      break;
    }
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size,
    )}".`,
  );
}

function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);

  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6,
    };
  } // GraphQL allows JSON-style surrogate pair escape sequences, but only when
  // a valid pair is formed.

  if (isLeadingSurrogate(code)) {
    // \u
    if (
      body.charCodeAt(position + 6) === 0x005c &&
      body.charCodeAt(position + 7) === 0x0075
    ) {
      const trailingCode = read16BitHexCode(body, position + 8);

      if (isTrailingSurrogate(trailingCode)) {
        // JavaScript defines strings as a sequence of UTF-16 code units and
        // encodes Unicode code points above U+FFFF using a surrogate pair of
        // code units. Since this is a surrogate pair escape sequence, just
        // include both codes into the JavaScript string value. Had JavaScript
        // not been internally based on UTF-16, then this surrogate pair would
        // be decoded to retrieve the supplementary code point.
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12,
        };
      }
    }
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`,
  );
}
/**
 * Reads four hexadecimal characters and returns the positive integer that 16bit
 * hexadecimal string represents. For example, "000f" will return 15, and "dead"
 * will return 57005.
 *
 * Returns a negative number if any char was not a valid hexadecimal digit.
 */

function read16BitHexCode(body, position) {
  // readHexDigit() returns -1 on error. ORing a negative value with any other
  // value always produces a negative value.
  return (
    (readHexDigit(body.charCodeAt(position)) << 12) |
    (readHexDigit(body.charCodeAt(position + 1)) << 8) |
    (readHexDigit(body.charCodeAt(position + 2)) << 4) |
    readHexDigit(body.charCodeAt(position + 3))
  );
}
/**
 * Reads a hexadecimal character and returns its positive integer value (0-15).
 *
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 if the provided character code was not a valid hexadecimal digit.
 *
 * HexDigit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 *   - `A` `B` `C` `D` `E` `F`
 *   - `a` `b` `c` `d` `e` `f`
 */

function readHexDigit(code) {
  return code >= 0x0030 && code <= 0x0039 // 0-9
    ? code - 0x0030
    : code >= 0x0041 && code <= 0x0046 // A-F
    ? code - 0x0037
    : code >= 0x0061 && code <= 0x0066 // a-f
    ? code - 0x0057
    : -1;
}
/**
 * | Escaped Character | Code Point | Character Name               |
 * | ----------------- | ---------- | ---------------------------- |
 * | `"`               | U+0022     | double quote                 |
 * | `\`               | U+005C     | reverse solidus (back slash) |
 * | `/`               | U+002F     | solidus (forward slash)      |
 * | `b`               | U+0008     | backspace                    |
 * | `f`               | U+000C     | form feed                    |
 * | `n`               | U+000A     | line feed (new line)         |
 * | `r`               | U+000D     | carriage return              |
 * | `t`               | U+0009     | horizontal tab               |
 */

function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);

  switch (code) {
    case 0x0022:
      // "
      return {
        value: '\u0022',
        size: 2,
      };

    case 0x005c:
      // \
      return {
        value: '\u005c',
        size: 2,
      };

    case 0x002f:
      // /
      return {
        value: '\u002f',
        size: 2,
      };

    case 0x0062:
      // b
      return {
        value: '\u0008',
        size: 2,
      };

    case 0x0066:
      // f
      return {
        value: '\u000c',
        size: 2,
      };

    case 0x006e:
      // n
      return {
        value: '\u000a',
        size: 2,
      };

    case 0x0072:
      // r
      return {
        value: '\u000d',
        size: 2,
      };

    case 0x0074:
      // t
      return {
        value: '\u0009',
        size: 2,
      };
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2,
    )}".`,
  );
}
/**
 * Reads a block string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `"""` BlockStringCharacter* `"""`
 *
 * BlockStringCharacter ::
 *   - SourceCharacter but not `"""` or `\"""`
 *   - `\"""`
 * ```
 */

function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = '';
  const blockLines = [];

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Triple-Quote (""")

    if (
      code === 0x0022 &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        TokenKind.BLOCK_STRING,
        start,
        position + 3, // Return a string of the lines joined with U+000A.
        dedentBlockStringLines(blockLines).join('\n'),
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    } // Escaped Triple-Quote (\""")

    if (
      code === 0x005c &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022 &&
      body.charCodeAt(position + 3) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1; // skip only slash

      position += 4;
      continue;
    } // LineTerminator

    if (code === 0x000a || code === 0x000d) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);

      if (code === 0x000d && body.charCodeAt(position + 1) === 0x000a) {
        position += 2;
      } else {
        ++position;
      }

      currentLine = '';
      chunkStart = position;
      lineStart = position;
      continue;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw syntaxError(lexer.source, position, 'Unterminated string.');
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * ```
 * Name ::
 *   - NameStart NameContinue* [lookahead != NameContinue]
 * ```
 */

function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position);

    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position),
  );
}

;// CONCATENATED MODULE: ./node_modules/graphql/jsutils/devAssert.mjs
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(message);
  }
}

;// CONCATENATED MODULE: ./node_modules/graphql/jsutils/inspect.mjs
const MAX_ARRAY_LENGTH = 10;
const MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? `[function ${value.name}]` : '[function]';

    case 'object':
      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return 'null';
  }

  if (previouslySeenValues.includes(value)) {
    return '[Circular]';
  }

  const seenValues = [...previouslySeenValues, value];

  if (isJSONable(value)) {
    const jsonValue = value.toJSON(); // check for infinite recursion

    if (jsonValue !== value) {
      return typeof jsonValue === 'string'
        ? jsonValue
        : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function isJSONable(value) {
  return typeof value.toJSON === 'function';
}

function formatObject(object, seenValues) {
  const entries = Object.entries(object);

  if (entries.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  const properties = entries.map(
    ([key, value]) => key + ': ' + formatValue(value, seenValues),
  );
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];

  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }

  return '[' + items.join(', ') + ']';
}

function getObjectTag(object) {
  const tag = Object.prototype.toString
    .call(object)
    .replace(/^\[object /, '')
    .replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    const name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}

;// CONCATENATED MODULE: ./node_modules/graphql/jsutils/instanceOf.mjs

/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 * See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
 * See: https://webpack.js.org/guides/production/
 */

const instanceOf =
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  // eslint-disable-next-line no-undef
   true
    ? function instanceOf(value, constructor) {
        return value instanceof constructor;
      }
    : 0;

;// CONCATENATED MODULE: ./node_modules/graphql/language/source.mjs




/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */
class Source {
  constructor(
    body,
    name = 'GraphQL request',
    locationOffset = {
      line: 1,
      column: 1,
    },
  ) {
    typeof body === 'string' ||
      devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 ||
      devAssert(
        false,
        'line in locationOffset is 1-indexed and must be positive.',
      );
    this.locationOffset.column > 0 ||
      devAssert(
        false,
        'column in locationOffset is 1-indexed and must be positive.',
      );
  }

  get [Symbol.toStringTag]() {
    return 'Source';
  }
}
/**
 * Test if the given value is a Source object.
 *
 * @internal
 */

function isSource(source) {
  return instanceOf(source, Source);
}

;// CONCATENATED MODULE: ./node_modules/graphql/language/parser.mjs







/**
 * Configuration options to control parser behavior
 */

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */
function parse(source, options) {
  const parser = new Parser(source, options);
  return parser.parseDocument();
}
/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */

function parseValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const value = parser.parseValueLiteral(false);
  parser.expectToken(TokenKind.EOF);
  return value;
}
/**
 * Similar to parseValue(), but raises a parse error if it encounters a
 * variable. The return type will be a constant value.
 */

function parseConstValue(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const value = parser.parseConstValueLiteral();
  parser.expectToken(TokenKind.EOF);
  return value;
}
/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */

function parseType(source, options) {
  const parser = new Parser(source, options);
  parser.expectToken(TokenKind.SOF);
  const type = parser.parseTypeReference();
  parser.expectToken(TokenKind.EOF);
  return type;
}
/**
 * This class is exported only to assist people in implementing their own parsers
 * without duplicating too much code and should be used only as last resort for cases
 * such as experimental syntax or if certain features could not be contributed upstream.
 *
 * It is still part of the internal API and is versioned, so any changes to it are never
 * considered breaking changes. If you still need to support multiple versions of the
 * library, please use the `versionInfo` variable for version detection.
 *
 * @internal
 */

class Parser {
  constructor(source, options = {}) {
    const sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
    this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */

  parseName() {
    const token = this.expectToken(TokenKind.NAME);
    return this.node(token, {
      kind: Kind.NAME,
      value: token.value,
    });
  } // Implements the parsing rules in the Document section.

  /**
   * Document : Definition+
   */

  parseDocument() {
    return this.node(this._lexer.token, {
      kind: Kind.DOCUMENT,
      definitions: this.many(
        TokenKind.SOF,
        this.parseDefinition,
        TokenKind.EOF,
      ),
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */

  parseDefinition() {
    if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } // Many definitions begin with a description and require a lookahead.

    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription
      ? this._lexer.lookahead()
      : this._lexer.token;

    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaDefinition();

        case 'scalar':
          return this.parseScalarTypeDefinition();

        case 'type':
          return this.parseObjectTypeDefinition();

        case 'interface':
          return this.parseInterfaceTypeDefinition();

        case 'union':
          return this.parseUnionTypeDefinition();

        case 'enum':
          return this.parseEnumTypeDefinition();

        case 'input':
          return this.parseInputObjectTypeDefinition();

        case 'directive':
          return this.parseDirectiveDefinition();
      }

      if (hasDescription) {
        throw syntaxError(
          this._lexer.source,
          this._lexer.token.start,
          'Unexpected description, descriptions are supported only on type definitions.',
        );
      }

      switch (keywordToken.value) {
        case 'query':
        case 'mutation':
        case 'subscription':
          return this.parseOperationDefinition();

        case 'fragment':
          return this.parseFragmentDefinition();

        case 'extend':
          return this.parseTypeSystemExtension();
      }
    }

    throw this.unexpected(keywordToken);
  } // Implements the parsing rules in the Operations section.

  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */

  parseOperationDefinition() {
    const start = this._lexer.token;

    if (this.peek(TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
      });
    }

    const operation = this.parseOperationType();
    let name;

    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }

    return this.node(start, {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */

  parseOperationType() {
    const operationToken = this.expectToken(TokenKind.NAME);

    switch (operationToken.value) {
      case 'query':
        return OperationTypeNode.QUERY;

      case 'mutation':
        return OperationTypeNode.MUTATION;

      case 'subscription':
        return OperationTypeNode.SUBSCRIPTION;
    }

    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */

  parseVariableDefinitions() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseVariableDefinition,
      TokenKind.PAREN_R,
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */

  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS)
        ? this.parseConstValueLiteral()
        : undefined,
      directives: this.parseConstDirectives(),
    });
  }
  /**
   * Variable : $ Name
   */

  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return this.node(start, {
      kind: Kind.VARIABLE,
      name: this.parseName(),
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */

  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: Kind.SELECTION_SET,
      selections: this.many(
        TokenKind.BRACE_L,
        this.parseSelection,
        TokenKind.BRACE_R,
      ),
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */

  parseSelection() {
    return this.peek(TokenKind.SPREAD)
      ? this.parseFragment()
      : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */

  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;

    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }

    return this.node(start, {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L)
        ? this.parseSelectionSet()
        : undefined,
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */

  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */

  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst),
    });
  }

  parseConstArgument() {
    return this.parseArgument(true);
  } // Implements the parsing rules in the Fragments section.

  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */

  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword('on');

    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return this.node(start, {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
      });
    }

    return this.node(start, {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */

  parseFragmentDefinition() {
    const start = this._lexer.token;
    this.expectKeyword('fragment'); // Legacy support for defining variables within fragments changes
    // the grammar of FragmentDefinition:
    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

    if (this._options.allowLegacyFragmentVariables === true) {
      return this.node(start, {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
      });
    }

    return this.node(start, {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentName : Name but not `on`
   */

  parseFragmentName() {
    if (this._lexer.token.value === 'on') {
      throw this.unexpected();
    }

    return this.parseName();
  } // Implements the parsing rules in the Values section.

  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseValueLiteral(isConst) {
    const token = this._lexer.token;

    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);

      case TokenKind.BRACE_L:
        return this.parseObject(isConst);

      case TokenKind.INT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.INT,
          value: token.value,
        });

      case TokenKind.FLOAT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.FLOAT,
          value: token.value,
        });

      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();

      case TokenKind.NAME:
        this.advanceLexer();

        switch (token.value) {
          case 'true':
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: true,
            });

          case 'false':
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: false,
            });

          case 'null':
            return this.node(token, {
              kind: Kind.NULL,
            });

          default:
            return this.node(token, {
              kind: Kind.ENUM,
              value: token.value,
            });
        }

      case TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(TokenKind.DOLLAR);

          if (this._lexer.token.kind === TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Unexpected variable "$${varName}" in constant value.`,
            );
          } else {
            throw this.unexpected(token);
          }
        }

        return this.parseVariable();

      default:
        throw this.unexpected();
    }
  }

  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }

  parseStringLiteral() {
    const token = this._lexer.token;
    this.advanceLexer();
    return this.node(token, {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */

  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);

    return this.node(this._lexer.token, {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */

  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);

    return this.node(this._lexer.token, {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */

  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
    });
  } // Implements the parsing rules in the Directives section.

  /**
   * Directives[Const] : Directive[?Const]+
   */

  parseDirectives(isConst) {
    const directives = [];

    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }

    return directives;
  }

  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */

  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return this.node(start, {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
    });
  } // Implements the parsing rules in the Types section.

  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */

  parseTypeReference() {
    const start = this._lexer.token;
    let type;

    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: Kind.LIST_TYPE,
        type: innerType,
      });
    } else {
      type = this.parseNamedType();
    }

    if (this.expectOptionalToken(TokenKind.BANG)) {
      return this.node(start, {
        kind: Kind.NON_NULL_TYPE,
        type,
      });
    }

    return type;
  }
  /**
   * NamedType : Name
   */

  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: Kind.NAMED_TYPE,
      name: this.parseName(),
    });
  } // Implements the parsing rules in the Type Definition section.

  peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */

  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */

  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R,
    );
    return this.node(start, {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */

  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */

  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */

  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */

  parseImplementsInterfaces() {
    return this.expectOptionalKeyword('implements')
      ? this.delimitedMany(TokenKind.AMP, this.parseNamedType)
      : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */

  parseFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseFieldDefinition,
      TokenKind.BRACE_R,
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */

  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */

  parseArgumentDefs() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseInputValueDef,
      TokenKind.PAREN_R,
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */

  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;

    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }

    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */

  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */

  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types,
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */

  parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS)
      ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType)
      : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */

  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */

  parseEnumValuesDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseEnumValueDefinition,
      TokenKind.BRACE_R,
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */

  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseEnumValueName() {
    if (
      this._lexer.token.value === 'true' ||
      this._lexer.token.value === 'false' ||
      this._lexer.token.value === 'null'
    ) {
      throw syntaxError(
        this._lexer.source,
        this._lexer.token.start,
        `${getTokenDesc(
          this._lexer.token,
        )} is reserved and cannot be used for an enum value.`,
      );
    }

    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */

  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */

  parseInputFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseInputValueDef,
      TokenKind.BRACE_R,
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */

  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();

    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaExtension();

        case 'scalar':
          return this.parseScalarTypeExtension();

        case 'type':
          return this.parseObjectTypeExtension();

        case 'interface':
          return this.parseInterfaceTypeExtension();

        case 'union':
          return this.parseUnionTypeExtension();

        case 'enum':
          return this.parseEnumTypeExtension();

        case 'input':
          return this.parseInputObjectTypeExtension();
      }
    }

    throw this.unexpected(keywordToken);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */

  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R,
    );

    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */

  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();

    if (directives.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */

  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */

  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */

  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();

    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types,
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */

  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();

    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */

  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();

    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */

  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('directive');
    this.expectToken(TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword('repeatable');
    this.expectKeyword('on');
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */

  parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */

  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();

    if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
      return name;
    }

    throw this.unexpected(start);
  } // Core parsing utility functions

  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */

  node(startToken, node) {
    if (this._options.noLocation !== true) {
      node.loc = new Location(
        startToken,
        this._lexer.lastToken,
        this._lexer.source,
      );
    }

    return node;
  }
  /**
   * Determines if the next token is of a given kind
   */

  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this.advanceLexer();
      return token;
    }

    throw syntaxError(
      this._lexer.source,
      token.start,
      `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`,
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this.advanceLexer();
      return true;
    }

    return false;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
    } else {
      throw syntaxError(
        this._lexer.source,
        token.start,
        `Expected "${value}", found ${getTokenDesc(token)}.`,
      );
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
      return true;
    }

    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */

  unexpected(atToken) {
    const token =
      atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(
      this._lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}.`,
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }

    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }

    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));

    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */

  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));

    return nodes;
  }

  advanceLexer() {
    const { maxTokens } = this._options;

    const token = this._lexer.advance();

    if (maxTokens !== undefined && token.kind !== TokenKind.EOF) {
      ++this._tokenCounter;

      if (this._tokenCounter > maxTokens) {
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Document contains more that ${maxTokens} tokens. Parsing aborted.`,
        );
      }
    }
  }
}
/**
 * A helper function to describe a token as a string for debugging.
 */

function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */

function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}

;// CONCATENATED MODULE: ./node_modules/graphql-tag/lib/index.js


var docCache = new Map();
var fragmentSourceMap = new Map();
var printFragmentWarnings = true;
var experimentalFragmentVariables = false;
function normalize(string) {
  return string.replace(/[\s,]+/g, ' ').trim();
}
function cacheKeyFromLoc(loc) {
  return normalize(loc.source.body.substring(loc.start, loc.end));
}
function processFragments(ast) {
  var seenKeys = new Set();
  var definitions = [];
  ast.definitions.forEach(function (fragmentDefinition) {
    if (fragmentDefinition.kind === 'FragmentDefinition') {
      var fragmentName = fragmentDefinition.name.value;
      var sourceKey = cacheKeyFromLoc(fragmentDefinition.loc);
      var sourceKeySet = fragmentSourceMap.get(fragmentName);
      if (sourceKeySet && !sourceKeySet.has(sourceKey)) {
        if (printFragmentWarnings) {
          console.warn("Warning: fragment with name " + fragmentName + " already exists.\n" + "graphql-tag enforces all fragment names across your application to be unique; read more about\n" + "this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names");
        }
      } else if (!sourceKeySet) {
        fragmentSourceMap.set(fragmentName, sourceKeySet = new Set());
      }
      sourceKeySet.add(sourceKey);
      if (!seenKeys.has(sourceKey)) {
        seenKeys.add(sourceKey);
        definitions.push(fragmentDefinition);
      }
    } else {
      definitions.push(fragmentDefinition);
    }
  });
  return __assign(__assign({}, ast), {
    definitions: definitions
  });
}
function stripLoc(doc) {
  var workSet = new Set(doc.definitions);
  workSet.forEach(function (node) {
    if (node.loc) delete node.loc;
    Object.keys(node).forEach(function (key) {
      var value = node[key];
      if (value && typeof value === 'object') {
        workSet.add(value);
      }
    });
  });
  var loc = doc.loc;
  if (loc) {
    delete loc.startToken;
    delete loc.endToken;
  }
  return doc;
}
function parseDocument(source) {
  var cacheKey = normalize(source);
  if (!docCache.has(cacheKey)) {
    var parsed = parse(source, {
      experimentalFragmentVariables: experimentalFragmentVariables
    });
    if (!parsed || parsed.kind !== 'Document') {
      throw new Error('Not a valid GraphQL document.');
    }
    docCache.set(cacheKey, stripLoc(processFragments(parsed)));
  }
  return docCache.get(cacheKey);
}
function gql(literals) {
  var args = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }
  if (typeof literals === 'string') {
    literals = [literals];
  }
  var result = literals[0];
  args.forEach(function (arg, i) {
    if (arg && arg.kind === 'Document') {
      result += arg.loc.source.body;
    } else {
      result += arg;
    }
    result += literals[i + 1];
  });
  return parseDocument(result);
}
function resetCaches() {
  docCache.clear();
  fragmentSourceMap.clear();
}
function disableFragmentWarnings() {
  printFragmentWarnings = false;
}
function enableExperimentalFragmentVariables() {
  experimentalFragmentVariables = true;
}
function disableExperimentalFragmentVariables() {
  experimentalFragmentVariables = false;
}
var extras = {
  gql: gql,
  resetCaches: resetCaches,
  disableFragmentWarnings: disableFragmentWarnings,
  enableExperimentalFragmentVariables: enableExperimentalFragmentVariables,
  disableExperimentalFragmentVariables: disableExperimentalFragmentVariables
};
(function (gql_1) {
  gql_1.gql = extras.gql, gql_1.resetCaches = extras.resetCaches, gql_1.disableFragmentWarnings = extras.disableFragmentWarnings, gql_1.enableExperimentalFragmentVariables = extras.enableExperimentalFragmentVariables, gql_1.disableExperimentalFragmentVariables = extras.disableExperimentalFragmentVariables;
})(gql || (gql = {}));
gql["default"] = gql;
/* harmony default export */ const lib = (gql);
;// CONCATENATED MODULE: ./src/generated/graphql.ts
/** The actor's type. */let ActorType;/** Autogenerated input type of AddAssigneesToAssignable */(function(ActorType){ActorType["Team"]="TEAM";ActorType["User"]="USER";})(ActorType||(ActorType={}));/** Properties by which Audit Log connections can be ordered. */let AuditLogOrderField;/** Represents a 'auto_merge_disabled' event on a given pull request. */(function(AuditLogOrderField){AuditLogOrderField["CreatedAt"]="CREATED_AT";})(AuditLogOrderField||(AuditLogOrderField={}));/** Represents an annotation's information level. */let CheckAnnotationLevel;/** A character position in a check annotation. */(function(CheckAnnotationLevel){CheckAnnotationLevel["Failure"]="FAILURE";CheckAnnotationLevel["Notice"]="NOTICE";CheckAnnotationLevel["Warning"]="WARNING";})(CheckAnnotationLevel||(CheckAnnotationLevel={}));/** The possible states for a check suite or run conclusion. */let CheckConclusionState;/** A check run. */(function(CheckConclusionState){CheckConclusionState["ActionRequired"]="ACTION_REQUIRED";CheckConclusionState["Cancelled"]="CANCELLED";CheckConclusionState["Failure"]="FAILURE";CheckConclusionState["Neutral"]="NEUTRAL";CheckConclusionState["Skipped"]="SKIPPED";CheckConclusionState["Stale"]="STALE";CheckConclusionState["StartupFailure"]="STARTUP_FAILURE";CheckConclusionState["Success"]="SUCCESS";CheckConclusionState["TimedOut"]="TIMED_OUT";})(CheckConclusionState||(CheckConclusionState={}));/** The possible states of a check run in a status rollup. */let CheckRunState;/** Represents a count of the state of a check run. */(function(CheckRunState){CheckRunState["ActionRequired"]="ACTION_REQUIRED";CheckRunState["Cancelled"]="CANCELLED";CheckRunState["Completed"]="COMPLETED";CheckRunState["Failure"]="FAILURE";CheckRunState["InProgress"]="IN_PROGRESS";CheckRunState["Neutral"]="NEUTRAL";CheckRunState["Pending"]="PENDING";CheckRunState["Queued"]="QUEUED";CheckRunState["Skipped"]="SKIPPED";CheckRunState["Stale"]="STALE";CheckRunState["StartupFailure"]="STARTUP_FAILURE";CheckRunState["Success"]="SUCCESS";CheckRunState["TimedOut"]="TIMED_OUT";CheckRunState["Waiting"]="WAITING";})(CheckRunState||(CheckRunState={}));/** The possible types of check runs. */let CheckRunType;/** The possible states for a check suite or run status. */(function(CheckRunType){CheckRunType["All"]="ALL";CheckRunType["Latest"]="LATEST";})(CheckRunType||(CheckRunType={}));let CheckStatusState;/** A single check step. */(function(CheckStatusState){CheckStatusState["Completed"]="COMPLETED";CheckStatusState["InProgress"]="IN_PROGRESS";CheckStatusState["Pending"]="PENDING";CheckStatusState["Queued"]="QUEUED";CheckStatusState["Requested"]="REQUESTED";CheckStatusState["Waiting"]="WAITING";})(CheckStatusState||(CheckStatusState={}));/** Collaborators affiliation level with a subject. */let CollaboratorAffiliation;/** Represents a comment. */(function(CollaboratorAffiliation){CollaboratorAffiliation["All"]="ALL";CollaboratorAffiliation["Direct"]="DIRECT";CollaboratorAffiliation["Outside"]="OUTSIDE";})(CollaboratorAffiliation||(CollaboratorAffiliation={}));/** A comment author association with repository. */let CommentAuthorAssociation;/** The possible errors that will prevent a user from updating a comment. */(function(CommentAuthorAssociation){CommentAuthorAssociation["Collaborator"]="COLLABORATOR";CommentAuthorAssociation["Contributor"]="CONTRIBUTOR";CommentAuthorAssociation["FirstTimer"]="FIRST_TIMER";CommentAuthorAssociation["FirstTimeContributor"]="FIRST_TIME_CONTRIBUTOR";CommentAuthorAssociation["Mannequin"]="MANNEQUIN";CommentAuthorAssociation["Member"]="MEMBER";CommentAuthorAssociation["None"]="NONE";CommentAuthorAssociation["Owner"]="OWNER";})(CommentAuthorAssociation||(CommentAuthorAssociation={}));let CommentCannotUpdateReason;/** Represents a 'comment_deleted' event on a given issue or pull request. */(function(CommentCannotUpdateReason){CommentCannotUpdateReason["Archived"]="ARCHIVED";CommentCannotUpdateReason["Denied"]="DENIED";CommentCannotUpdateReason["InsufficientAccess"]="INSUFFICIENT_ACCESS";CommentCannotUpdateReason["Locked"]="LOCKED";CommentCannotUpdateReason["LoginRequired"]="LOGIN_REQUIRED";CommentCannotUpdateReason["Maintenance"]="MAINTENANCE";CommentCannotUpdateReason["VerifiedEmailRequired"]="VERIFIED_EMAIL_REQUIRED";})(CommentCannotUpdateReason||(CommentCannotUpdateReason={}));/** Properties by which commit contribution connections can be ordered. */let CommitContributionOrderField;/** This aggregates commits made by a user within one repository. */(function(CommitContributionOrderField){CommitContributionOrderField["CommitCount"]="COMMIT_COUNT";CommitContributionOrderField["OccurredAt"]="OCCURRED_AT";})(CommitContributionOrderField||(CommitContributionOrderField={}));/** The status of a git comparison between two refs. */let ComparisonStatus;/** Represents a 'connected' event on a given issue or pull request. */(function(ComparisonStatus){ComparisonStatus["Ahead"]="AHEAD";ComparisonStatus["Behind"]="BEHIND";ComparisonStatus["Diverged"]="DIVERGED";ComparisonStatus["Identical"]="IDENTICAL";})(ComparisonStatus||(ComparisonStatus={}));/** Varying levels of contributions from none to many. */let ContributionLevel;/** Ordering options for contribution connections. */(function(ContributionLevel){ContributionLevel["FirstQuartile"]="FIRST_QUARTILE";ContributionLevel["FourthQuartile"]="FOURTH_QUARTILE";ContributionLevel["None"]="NONE";ContributionLevel["SecondQuartile"]="SECOND_QUARTILE";ContributionLevel["ThirdQuartile"]="THIRD_QUARTILE";})(ContributionLevel||(ContributionLevel={}));/** The possible base permissions for repositories. */let DefaultRepositoryPermissionField;/** Entities that can be deleted. */(function(DefaultRepositoryPermissionField){DefaultRepositoryPermissionField["Admin"]="ADMIN";DefaultRepositoryPermissionField["None"]="NONE";DefaultRepositoryPermissionField["Read"]="READ";DefaultRepositoryPermissionField["Write"]="WRITE";})(DefaultRepositoryPermissionField||(DefaultRepositoryPermissionField={}));/** The possible ecosystems of a dependency graph package. */let DependencyGraphEcosystem;/** A repository deploy key. */(function(DependencyGraphEcosystem){DependencyGraphEcosystem["Actions"]="ACTIONS";DependencyGraphEcosystem["Composer"]="COMPOSER";DependencyGraphEcosystem["Go"]="GO";DependencyGraphEcosystem["Maven"]="MAVEN";DependencyGraphEcosystem["Npm"]="NPM";DependencyGraphEcosystem["Nuget"]="NUGET";DependencyGraphEcosystem["Pip"]="PIP";DependencyGraphEcosystem["Pub"]="PUB";DependencyGraphEcosystem["Rubygems"]="RUBYGEMS";DependencyGraphEcosystem["Rust"]="RUST";})(DependencyGraphEcosystem||(DependencyGraphEcosystem={}));/** Properties by which deployment connections can be ordered. */let DeploymentOrderField;/** A protection rule. */(function(DeploymentOrderField){DeploymentOrderField["CreatedAt"]="CREATED_AT";})(DeploymentOrderField||(DeploymentOrderField={}));/** The possible protection rule types. */let DeploymentProtectionRuleType;/** A request to deploy a workflow run to an environment. */(function(DeploymentProtectionRuleType){DeploymentProtectionRuleType["RequiredReviewers"]="REQUIRED_REVIEWERS";DeploymentProtectionRuleType["WaitTimer"]="WAIT_TIMER";})(DeploymentProtectionRuleType||(DeploymentProtectionRuleType={}));/** The possible states for a deployment review. */let DeploymentReviewState;/** Users and teams. */(function(DeploymentReviewState){DeploymentReviewState["Approved"]="APPROVED";DeploymentReviewState["Rejected"]="REJECTED";})(DeploymentReviewState||(DeploymentReviewState={}));/** The possible states in which a deployment can be. */let DeploymentState;/** Describes the status of a given deployment attempt. */(function(DeploymentState){DeploymentState["Abandoned"]="ABANDONED";DeploymentState["Active"]="ACTIVE";DeploymentState["Destroyed"]="DESTROYED";DeploymentState["Error"]="ERROR";DeploymentState["Failure"]="FAILURE";DeploymentState["Inactive"]="INACTIVE";DeploymentState["InProgress"]="IN_PROGRESS";DeploymentState["Pending"]="PENDING";DeploymentState["Queued"]="QUEUED";DeploymentState["Waiting"]="WAITING";})(DeploymentState||(DeploymentState={}));/** The possible states for a deployment status. */let DeploymentStatusState;/** The possible sides of a diff. */(function(DeploymentStatusState){DeploymentStatusState["Error"]="ERROR";DeploymentStatusState["Failure"]="FAILURE";DeploymentStatusState["Inactive"]="INACTIVE";DeploymentStatusState["InProgress"]="IN_PROGRESS";DeploymentStatusState["Pending"]="PENDING";DeploymentStatusState["Queued"]="QUEUED";DeploymentStatusState["Success"]="SUCCESS";DeploymentStatusState["Waiting"]="WAITING";})(DeploymentStatusState||(DeploymentStatusState={}));let DiffSide;/** Autogenerated input type of DisablePullRequestAutoMerge */(function(DiffSide){DiffSide["Left"]="LEFT";DiffSide["Right"]="RIGHT";})(DiffSide||(DiffSide={}));/** Properties by which discussion connections can be ordered. */let DiscussionOrderField;/** A poll for a discussion. */(function(DiscussionOrderField){DiscussionOrderField["CreatedAt"]="CREATED_AT";DiscussionOrderField["UpdatedAt"]="UPDATED_AT";})(DiscussionOrderField||(DiscussionOrderField={}));/** Properties by which discussion poll option connections can be ordered. */let DiscussionPollOptionOrderField;/** Autogenerated input type of DismissPullRequestReview */(function(DiscussionPollOptionOrderField){DiscussionPollOptionOrderField["AuthoredOrder"]="AUTHORED_ORDER";DiscussionPollOptionOrderField["VoteCount"]="VOTE_COUNT";})(DiscussionPollOptionOrderField||(DiscussionPollOptionOrderField={}));/** The possible reasons that a Dependabot alert was dismissed. */let DismissReason;/** Autogenerated input type of DismissRepositoryVulnerabilityAlert */(function(DismissReason){DismissReason["FixStarted"]="FIX_STARTED";DismissReason["Inaccurate"]="INACCURATE";DismissReason["NotUsed"]="NOT_USED";DismissReason["NoBandwidth"]="NO_BANDWIDTH";DismissReason["TolerableRisk"]="TOLERABLE_RISK";})(DismissReason||(DismissReason={}));/** Properties by which enterprise administrator invitation connections can be ordered. */let EnterpriseAdministratorInvitationOrderField;/** The possible administrator roles in an enterprise account. */(function(EnterpriseAdministratorInvitationOrderField){EnterpriseAdministratorInvitationOrderField["CreatedAt"]="CREATED_AT";})(EnterpriseAdministratorInvitationOrderField||(EnterpriseAdministratorInvitationOrderField={}));let EnterpriseAdministratorRole;/** The possible values for the enterprise allow private repository forking policy value. */(function(EnterpriseAdministratorRole){EnterpriseAdministratorRole["BillingManager"]="BILLING_MANAGER";EnterpriseAdministratorRole["Owner"]="OWNER";})(EnterpriseAdministratorRole||(EnterpriseAdministratorRole={}));let EnterpriseAllowPrivateRepositoryForkingPolicyValue;/** Metadata for an audit entry containing enterprise account information. */(function(EnterpriseAllowPrivateRepositoryForkingPolicyValue){EnterpriseAllowPrivateRepositoryForkingPolicyValue["EnterpriseOrganizations"]="ENTERPRISE_ORGANIZATIONS";EnterpriseAllowPrivateRepositoryForkingPolicyValue["EnterpriseOrganizationsUserAccounts"]="ENTERPRISE_ORGANIZATIONS_USER_ACCOUNTS";EnterpriseAllowPrivateRepositoryForkingPolicyValue["Everywhere"]="EVERYWHERE";EnterpriseAllowPrivateRepositoryForkingPolicyValue["SameOrganization"]="SAME_ORGANIZATION";EnterpriseAllowPrivateRepositoryForkingPolicyValue["SameOrganizationUserAccounts"]="SAME_ORGANIZATION_USER_ACCOUNTS";EnterpriseAllowPrivateRepositoryForkingPolicyValue["UserAccounts"]="USER_ACCOUNTS";})(EnterpriseAllowPrivateRepositoryForkingPolicyValue||(EnterpriseAllowPrivateRepositoryForkingPolicyValue={}));/** The possible values for the enterprise base repository permission setting. */let EnterpriseDefaultRepositoryPermissionSettingValue;/** The possible values for an enabled/disabled enterprise setting. */(function(EnterpriseDefaultRepositoryPermissionSettingValue){EnterpriseDefaultRepositoryPermissionSettingValue["Admin"]="ADMIN";EnterpriseDefaultRepositoryPermissionSettingValue["None"]="NONE";EnterpriseDefaultRepositoryPermissionSettingValue["NoPolicy"]="NO_POLICY";EnterpriseDefaultRepositoryPermissionSettingValue["Read"]="READ";EnterpriseDefaultRepositoryPermissionSettingValue["Write"]="WRITE";})(EnterpriseDefaultRepositoryPermissionSettingValue||(EnterpriseDefaultRepositoryPermissionSettingValue={}));let EnterpriseEnabledDisabledSettingValue;/** The possible values for an enabled/no policy enterprise setting. */(function(EnterpriseEnabledDisabledSettingValue){EnterpriseEnabledDisabledSettingValue["Disabled"]="DISABLED";EnterpriseEnabledDisabledSettingValue["Enabled"]="ENABLED";EnterpriseEnabledDisabledSettingValue["NoPolicy"]="NO_POLICY";})(EnterpriseEnabledDisabledSettingValue||(EnterpriseEnabledDisabledSettingValue={}));let EnterpriseEnabledSettingValue;/** An identity provider configured to provision identities for an enterprise. */(function(EnterpriseEnabledSettingValue){EnterpriseEnabledSettingValue["Enabled"]="ENABLED";EnterpriseEnabledSettingValue["NoPolicy"]="NO_POLICY";})(EnterpriseEnabledSettingValue||(EnterpriseEnabledSettingValue={}));/** Properties by which enterprise member connections can be ordered. */let EnterpriseMemberOrderField;/** The possible values for the enterprise members can create repositories setting. */(function(EnterpriseMemberOrderField){EnterpriseMemberOrderField["CreatedAt"]="CREATED_AT";EnterpriseMemberOrderField["Login"]="LOGIN";})(EnterpriseMemberOrderField||(EnterpriseMemberOrderField={}));let EnterpriseMembersCanCreateRepositoriesSettingValue;/** The possible values for the members can make purchases setting. */(function(EnterpriseMembersCanCreateRepositoriesSettingValue){EnterpriseMembersCanCreateRepositoriesSettingValue["All"]="ALL";EnterpriseMembersCanCreateRepositoriesSettingValue["Disabled"]="DISABLED";EnterpriseMembersCanCreateRepositoriesSettingValue["NoPolicy"]="NO_POLICY";EnterpriseMembersCanCreateRepositoriesSettingValue["Private"]="PRIVATE";EnterpriseMembersCanCreateRepositoriesSettingValue["Public"]="PUBLIC";})(EnterpriseMembersCanCreateRepositoriesSettingValue||(EnterpriseMembersCanCreateRepositoriesSettingValue={}));let EnterpriseMembersCanMakePurchasesSettingValue;/** The connection type for Organization. */(function(EnterpriseMembersCanMakePurchasesSettingValue){EnterpriseMembersCanMakePurchasesSettingValue["Disabled"]="DISABLED";EnterpriseMembersCanMakePurchasesSettingValue["Enabled"]="ENABLED";})(EnterpriseMembersCanMakePurchasesSettingValue||(EnterpriseMembersCanMakePurchasesSettingValue={}));/** Properties by which Enterprise Server installation connections can be ordered. */let EnterpriseServerInstallationOrderField;/** A user account on an Enterprise Server installation. */(function(EnterpriseServerInstallationOrderField){EnterpriseServerInstallationOrderField["CreatedAt"]="CREATED_AT";EnterpriseServerInstallationOrderField["CustomerName"]="CUSTOMER_NAME";EnterpriseServerInstallationOrderField["HostName"]="HOST_NAME";})(EnterpriseServerInstallationOrderField||(EnterpriseServerInstallationOrderField={}));/** Properties by which Enterprise Server user account email connections can be ordered. */let EnterpriseServerUserAccountEmailOrderField;/** Ordering options for Enterprise Server user account connections. */(function(EnterpriseServerUserAccountEmailOrderField){EnterpriseServerUserAccountEmailOrderField["Email"]="EMAIL";})(EnterpriseServerUserAccountEmailOrderField||(EnterpriseServerUserAccountEmailOrderField={}));/** Properties by which Enterprise Server user account connections can be ordered. */let EnterpriseServerUserAccountOrderField;/** A user accounts upload from an Enterprise Server installation. */(function(EnterpriseServerUserAccountOrderField){EnterpriseServerUserAccountOrderField["Login"]="LOGIN";EnterpriseServerUserAccountOrderField["RemoteCreatedAt"]="REMOTE_CREATED_AT";})(EnterpriseServerUserAccountOrderField||(EnterpriseServerUserAccountOrderField={}));/** Properties by which Enterprise Server user accounts upload connections can be ordered. */let EnterpriseServerUserAccountsUploadOrderField;/** Synchronization state of the Enterprise Server user accounts upload */(function(EnterpriseServerUserAccountsUploadOrderField){EnterpriseServerUserAccountsUploadOrderField["CreatedAt"]="CREATED_AT";})(EnterpriseServerUserAccountsUploadOrderField||(EnterpriseServerUserAccountsUploadOrderField={}));let EnterpriseServerUserAccountsUploadSyncState;/** An account for a user who is an admin of an enterprise or a member of an enterprise through one or more organizations. */(function(EnterpriseServerUserAccountsUploadSyncState){EnterpriseServerUserAccountsUploadSyncState["Failure"]="FAILURE";EnterpriseServerUserAccountsUploadSyncState["Pending"]="PENDING";EnterpriseServerUserAccountsUploadSyncState["Success"]="SUCCESS";})(EnterpriseServerUserAccountsUploadSyncState||(EnterpriseServerUserAccountsUploadSyncState={}));/** The possible roles for enterprise membership. */let EnterpriseUserAccountMembershipRole;/** The possible GitHub Enterprise deployments where this user can exist. */(function(EnterpriseUserAccountMembershipRole){EnterpriseUserAccountMembershipRole["Member"]="MEMBER";EnterpriseUserAccountMembershipRole["Owner"]="OWNER";EnterpriseUserAccountMembershipRole["Unaffiliated"]="UNAFFILIATED";})(EnterpriseUserAccountMembershipRole||(EnterpriseUserAccountMembershipRole={}));let EnterpriseUserDeployment;/** An environment. */(function(EnterpriseUserDeployment){EnterpriseUserDeployment["Cloud"]="CLOUD";EnterpriseUserDeployment["Server"]="SERVER";})(EnterpriseUserDeployment||(EnterpriseUserDeployment={}));/** The possible viewed states of a file . */let FileViewedState;/** Autogenerated input type of FollowOrganization */(function(FileViewedState){FileViewedState["Dismissed"]="DISMISSED";FileViewedState["Unviewed"]="UNVIEWED";FileViewedState["Viewed"]="VIEWED";})(FileViewedState||(FileViewedState={}));/** The possible funding platforms for repository funding links. */let FundingPlatform;/** A generic hovercard context with a message and icon */(function(FundingPlatform){FundingPlatform["CommunityBridge"]="COMMUNITY_BRIDGE";FundingPlatform["Custom"]="CUSTOM";FundingPlatform["Github"]="GITHUB";FundingPlatform["Issuehunt"]="ISSUEHUNT";FundingPlatform["KoFi"]="KO_FI";FundingPlatform["LfxCrowdfunding"]="LFX_CROWDFUNDING";FundingPlatform["Liberapay"]="LIBERAPAY";FundingPlatform["OpenCollective"]="OPEN_COLLECTIVE";FundingPlatform["Otechie"]="OTECHIE";FundingPlatform["Patreon"]="PATREON";FundingPlatform["Tidelift"]="TIDELIFT";})(FundingPlatform||(FundingPlatform={}));/** Properties by which gist connections can be ordered. */let GistOrderField;/** The privacy of a Gist */(function(GistOrderField){GistOrderField["CreatedAt"]="CREATED_AT";GistOrderField["PushedAt"]="PUSHED_AT";GistOrderField["UpdatedAt"]="UPDATED_AT";})(GistOrderField||(GistOrderField={}));let GistPrivacy;/** Represents an actor in a Git commit (ie. an author or committer). */(function(GistPrivacy){GistPrivacy["All"]="ALL";GistPrivacy["Public"]="PUBLIC";GistPrivacy["Secret"]="SECRET";})(GistPrivacy||(GistPrivacy={}));/** The state of a Git signature. */let GitSignatureState;/** Represents a GPG signature on a Commit or Tag. */(function(GitSignatureState){GitSignatureState["BadCert"]="BAD_CERT";GitSignatureState["BadEmail"]="BAD_EMAIL";GitSignatureState["ExpiredKey"]="EXPIRED_KEY";GitSignatureState["GpgverifyError"]="GPGVERIFY_ERROR";GitSignatureState["GpgverifyUnavailable"]="GPGVERIFY_UNAVAILABLE";GitSignatureState["Invalid"]="INVALID";GitSignatureState["MalformedSig"]="MALFORMED_SIG";GitSignatureState["NotSigningKey"]="NOT_SIGNING_KEY";GitSignatureState["NoUser"]="NO_USER";GitSignatureState["OcspError"]="OCSP_ERROR";GitSignatureState["OcspPending"]="OCSP_PENDING";GitSignatureState["OcspRevoked"]="OCSP_REVOKED";GitSignatureState["UnknownKey"]="UNKNOWN_KEY";GitSignatureState["UnknownSigType"]="UNKNOWN_SIG_TYPE";GitSignatureState["Unsigned"]="UNSIGNED";GitSignatureState["UnverifiedEmail"]="UNVERIFIED_EMAIL";GitSignatureState["Valid"]="VALID";})(GitSignatureState||(GitSignatureState={}));/** The possible states in which authentication can be configured with an identity provider. */let IdentityProviderConfigurationState;/** Autogenerated input type of InviteEnterpriseAdmin */(function(IdentityProviderConfigurationState){IdentityProviderConfigurationState["Configured"]="CONFIGURED";IdentityProviderConfigurationState["Enforced"]="ENFORCED";IdentityProviderConfigurationState["Unconfigured"]="UNCONFIGURED";})(IdentityProviderConfigurationState||(IdentityProviderConfigurationState={}));/** The possible values for the IP allow list enabled setting. */let IpAllowListEnabledSettingValue;/** An IP address or range of addresses that is allowed to access an owner's resources. */(function(IpAllowListEnabledSettingValue){IpAllowListEnabledSettingValue["Disabled"]="DISABLED";IpAllowListEnabledSettingValue["Enabled"]="ENABLED";})(IpAllowListEnabledSettingValue||(IpAllowListEnabledSettingValue={}));/** Properties by which IP allow list entry connections can be ordered. */let IpAllowListEntryOrderField;/** The possible values for the IP allow list configuration for installed GitHub Apps setting. */(function(IpAllowListEntryOrderField){IpAllowListEntryOrderField["AllowListValue"]="ALLOW_LIST_VALUE";IpAllowListEntryOrderField["CreatedAt"]="CREATED_AT";})(IpAllowListEntryOrderField||(IpAllowListEntryOrderField={}));let IpAllowListForInstalledAppsEnabledSettingValue;/** Types that can own an IP allow list. */(function(IpAllowListForInstalledAppsEnabledSettingValue){IpAllowListForInstalledAppsEnabledSettingValue["Disabled"]="DISABLED";IpAllowListForInstalledAppsEnabledSettingValue["Enabled"]="ENABLED";})(IpAllowListForInstalledAppsEnabledSettingValue||(IpAllowListForInstalledAppsEnabledSettingValue={}));/** The possible state reasons of a closed issue. */let IssueClosedStateReason;/** Represents a comment on an Issue. */(function(IssueClosedStateReason){IssueClosedStateReason["Completed"]="COMPLETED";IssueClosedStateReason["NotPlanned"]="NOT_PLANNED";})(IssueClosedStateReason||(IssueClosedStateReason={}));/** Properties by which issue comment connections can be ordered. */let IssueCommentOrderField;/** The connection type for Issue. */(function(IssueCommentOrderField){IssueCommentOrderField["UpdatedAt"]="UPDATED_AT";})(IssueCommentOrderField||(IssueCommentOrderField={}));/** Properties by which issue connections can be ordered. */let IssueOrderField;/** The possible states of an issue. */(function(IssueOrderField){IssueOrderField["Comments"]="COMMENTS";IssueOrderField["CreatedAt"]="CREATED_AT";IssueOrderField["UpdatedAt"]="UPDATED_AT";})(IssueOrderField||(IssueOrderField={}));let IssueState;/** The possible state reasons of an issue. */(function(IssueState){IssueState["Closed"]="CLOSED";IssueState["Open"]="OPEN";})(IssueState||(IssueState={}));let IssueStateReason;/** A repository issue template. */(function(IssueStateReason){IssueStateReason["Completed"]="COMPLETED";IssueStateReason["NotPlanned"]="NOT_PLANNED";IssueStateReason["Reopened"]="REOPENED";})(IssueStateReason||(IssueStateReason={}));/** The possible item types found in a timeline. */let IssueTimelineItemsItemType;/** Represents a user signing up for a GitHub account. */(function(IssueTimelineItemsItemType){IssueTimelineItemsItemType["AddedToProjectEvent"]="ADDED_TO_PROJECT_EVENT";IssueTimelineItemsItemType["AssignedEvent"]="ASSIGNED_EVENT";IssueTimelineItemsItemType["ClosedEvent"]="CLOSED_EVENT";IssueTimelineItemsItemType["CommentDeletedEvent"]="COMMENT_DELETED_EVENT";IssueTimelineItemsItemType["ConnectedEvent"]="CONNECTED_EVENT";IssueTimelineItemsItemType["ConvertedNoteToIssueEvent"]="CONVERTED_NOTE_TO_ISSUE_EVENT";IssueTimelineItemsItemType["ConvertedToDiscussionEvent"]="CONVERTED_TO_DISCUSSION_EVENT";IssueTimelineItemsItemType["CrossReferencedEvent"]="CROSS_REFERENCED_EVENT";IssueTimelineItemsItemType["DemilestonedEvent"]="DEMILESTONED_EVENT";IssueTimelineItemsItemType["DisconnectedEvent"]="DISCONNECTED_EVENT";IssueTimelineItemsItemType["IssueComment"]="ISSUE_COMMENT";IssueTimelineItemsItemType["LabeledEvent"]="LABELED_EVENT";IssueTimelineItemsItemType["LockedEvent"]="LOCKED_EVENT";IssueTimelineItemsItemType["MarkedAsDuplicateEvent"]="MARKED_AS_DUPLICATE_EVENT";IssueTimelineItemsItemType["MentionedEvent"]="MENTIONED_EVENT";IssueTimelineItemsItemType["MilestonedEvent"]="MILESTONED_EVENT";IssueTimelineItemsItemType["MovedColumnsInProjectEvent"]="MOVED_COLUMNS_IN_PROJECT_EVENT";IssueTimelineItemsItemType["PinnedEvent"]="PINNED_EVENT";IssueTimelineItemsItemType["ReferencedEvent"]="REFERENCED_EVENT";IssueTimelineItemsItemType["RemovedFromProjectEvent"]="REMOVED_FROM_PROJECT_EVENT";IssueTimelineItemsItemType["RenamedTitleEvent"]="RENAMED_TITLE_EVENT";IssueTimelineItemsItemType["ReopenedEvent"]="REOPENED_EVENT";IssueTimelineItemsItemType["SubscribedEvent"]="SUBSCRIBED_EVENT";IssueTimelineItemsItemType["TransferredEvent"]="TRANSFERRED_EVENT";IssueTimelineItemsItemType["UnassignedEvent"]="UNASSIGNED_EVENT";IssueTimelineItemsItemType["UnlabeledEvent"]="UNLABELED_EVENT";IssueTimelineItemsItemType["UnlockedEvent"]="UNLOCKED_EVENT";IssueTimelineItemsItemType["UnmarkedAsDuplicateEvent"]="UNMARKED_AS_DUPLICATE_EVENT";IssueTimelineItemsItemType["UnpinnedEvent"]="UNPINNED_EVENT";IssueTimelineItemsItemType["UnsubscribedEvent"]="UNSUBSCRIBED_EVENT";IssueTimelineItemsItemType["UserBlockedEvent"]="USER_BLOCKED_EVENT";})(IssueTimelineItemsItemType||(IssueTimelineItemsItemType={}));/** Properties by which label connections can be ordered. */let LabelOrderField;/** An object that can have labels assigned to it. */(function(LabelOrderField){LabelOrderField["CreatedAt"]="CREATED_AT";LabelOrderField["Name"]="NAME";})(LabelOrderField||(LabelOrderField={}));/** Properties by which language connections can be ordered. */let LanguageOrderField;/** A repository's open source license */(function(LanguageOrderField){LanguageOrderField["Size"]="SIZE";})(LanguageOrderField||(LanguageOrderField={}));/** The possible reasons that an issue or pull request was locked. */let LockReason;/** An object that can be locked. */(function(LockReason){LockReason["OffTopic"]="OFF_TOPIC";LockReason["Resolved"]="RESOLVED";LockReason["Spam"]="SPAM";LockReason["TooHeated"]="TOO_HEATED";})(LockReason||(LockReason={}));/** Properties by which mannequins can be ordered. */let MannequinOrderField;/** Autogenerated input type of MarkDiscussionCommentAsAnswer */(function(MannequinOrderField){MannequinOrderField["CreatedAt"]="CREATED_AT";MannequinOrderField["Login"]="LOGIN";})(MannequinOrderField||(MannequinOrderField={}));/** The possible default commit messages for merges. */let MergeCommitMessage;/** The possible default commit titles for merges. */(function(MergeCommitMessage){MergeCommitMessage["Blank"]="BLANK";MergeCommitMessage["PrBody"]="PR_BODY";MergeCommitMessage["PrTitle"]="PR_TITLE";})(MergeCommitMessage||(MergeCommitMessage={}));let MergeCommitTitle;/** Autogenerated input type of MergePullRequest */(function(MergeCommitTitle){MergeCommitTitle["MergeMessage"]="MERGE_MESSAGE";MergeCommitTitle["PrTitle"]="PR_TITLE";})(MergeCommitTitle||(MergeCommitTitle={}));/** Whether or not a PullRequest can be merged. */let MergeableState;/** Represents a 'merged' event on a given pull request. */(function(MergeableState){MergeableState["Conflicting"]="CONFLICTING";MergeableState["Mergeable"]="MERGEABLE";MergeableState["Unknown"]="UNKNOWN";})(MergeableState||(MergeableState={}));/** Represents the different GitHub Enterprise Importer (GEI) migration sources. */let MigrationSourceType;/** The GitHub Enterprise Importer (GEI) migration state. */(function(MigrationSourceType){MigrationSourceType["AzureDevops"]="AZURE_DEVOPS";MigrationSourceType["BitbucketServer"]="BITBUCKET_SERVER";MigrationSourceType["GithubArchive"]="GITHUB_ARCHIVE";})(MigrationSourceType||(MigrationSourceType={}));let MigrationState;/** Represents a Milestone object on a given repository. */(function(MigrationState){MigrationState["Failed"]="FAILED";MigrationState["FailedValidation"]="FAILED_VALIDATION";MigrationState["InProgress"]="IN_PROGRESS";MigrationState["NotStarted"]="NOT_STARTED";MigrationState["PendingValidation"]="PENDING_VALIDATION";MigrationState["Queued"]="QUEUED";MigrationState["Succeeded"]="SUCCEEDED";})(MigrationState||(MigrationState={}));/** Properties by which milestone connections can be ordered. */let MilestoneOrderField;/** The possible states of a milestone. */(function(MilestoneOrderField){MilestoneOrderField["CreatedAt"]="CREATED_AT";MilestoneOrderField["DueDate"]="DUE_DATE";MilestoneOrderField["Number"]="NUMBER";MilestoneOrderField["UpdatedAt"]="UPDATED_AT";})(MilestoneOrderField||(MilestoneOrderField={}));let MilestoneState;/** Represents a 'milestoned' event on a given issue or pull request. */(function(MilestoneState){MilestoneState["Closed"]="CLOSED";MilestoneState["Open"]="OPEN";})(MilestoneState||(MilestoneState={}));/** The possible values for the notification restriction setting. */let NotificationRestrictionSettingValue;/** An OIDC identity provider configured to provision identities for an enterprise. */(function(NotificationRestrictionSettingValue){NotificationRestrictionSettingValue["Disabled"]="DISABLED";NotificationRestrictionSettingValue["Enabled"]="ENABLED";})(NotificationRestrictionSettingValue||(NotificationRestrictionSettingValue={}));/** The OIDC identity provider type */let OidcProviderType;/** Metadata for an audit entry with action oauth_application.* */(function(OidcProviderType){OidcProviderType["Aad"]="AAD";})(OidcProviderType||(OidcProviderType={}));/** The state of an OAuth Application when it was created. */let OauthApplicationCreateAuditEntryState;/** The corresponding operation type for the action */(function(OauthApplicationCreateAuditEntryState){OauthApplicationCreateAuditEntryState["Active"]="ACTIVE";OauthApplicationCreateAuditEntryState["PendingDeletion"]="PENDING_DELETION";OauthApplicationCreateAuditEntryState["Suspended"]="SUSPENDED";})(OauthApplicationCreateAuditEntryState||(OauthApplicationCreateAuditEntryState={}));let OperationType;/** Possible directions in which to order a list of items when provided an `orderBy` argument. */(function(OperationType){OperationType["Access"]="ACCESS";OperationType["Authentication"]="AUTHENTICATION";OperationType["Create"]="CREATE";OperationType["Modify"]="MODIFY";OperationType["Remove"]="REMOVE";OperationType["Restore"]="RESTORE";OperationType["Transfer"]="TRANSFER";})(OperationType||(OperationType={}));let OrderDirection;/** Audit log entry for a org.add_billing_manager */(function(OrderDirection){OrderDirection["Asc"]="ASC";OrderDirection["Desc"]="DESC";})(OrderDirection||(OrderDirection={}));/** The permissions available to members on an Organization. */let OrgAddMemberAuditEntryPermission;/** Audit log entry for a org.block_user */(function(OrgAddMemberAuditEntryPermission){OrgAddMemberAuditEntryPermission["Admin"]="ADMIN";OrgAddMemberAuditEntryPermission["Read"]="READ";})(OrgAddMemberAuditEntryPermission||(OrgAddMemberAuditEntryPermission={}));/** The billing plans available for organizations. */let OrgCreateAuditEntryBillingPlan;/** Audit log entry for a org.disable_oauth_app_restrictions event. */(function(OrgCreateAuditEntryBillingPlan){OrgCreateAuditEntryBillingPlan["Business"]="BUSINESS";OrgCreateAuditEntryBillingPlan["BusinessPlus"]="BUSINESS_PLUS";OrgCreateAuditEntryBillingPlan["Free"]="FREE";OrgCreateAuditEntryBillingPlan["TieredPerSeat"]="TIERED_PER_SEAT";OrgCreateAuditEntryBillingPlan["Unlimited"]="UNLIMITED";})(OrgCreateAuditEntryBillingPlan||(OrgCreateAuditEntryBillingPlan={}));/** Properties by which enterprise owners can be ordered. */let OrgEnterpriseOwnerOrderField;/** Audit log entry for a org.invite_member event. */(function(OrgEnterpriseOwnerOrderField){OrgEnterpriseOwnerOrderField["Login"]="LOGIN";})(OrgEnterpriseOwnerOrderField||(OrgEnterpriseOwnerOrderField={}));/** The reason a billing manager was removed from an Organization. */let OrgRemoveBillingManagerAuditEntryReason;/** Audit log entry for a org.remove_member event. */(function(OrgRemoveBillingManagerAuditEntryReason){OrgRemoveBillingManagerAuditEntryReason["SamlExternalIdentityMissing"]="SAML_EXTERNAL_IDENTITY_MISSING";OrgRemoveBillingManagerAuditEntryReason["SamlSsoEnforcementRequiresExternalIdentity"]="SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY";OrgRemoveBillingManagerAuditEntryReason["TwoFactorRequirementNonCompliance"]="TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE";})(OrgRemoveBillingManagerAuditEntryReason||(OrgRemoveBillingManagerAuditEntryReason={}));/** The type of membership a user has with an Organization. */let OrgRemoveMemberAuditEntryMembershipType;/** The reason a member was removed from an Organization. */(function(OrgRemoveMemberAuditEntryMembershipType){OrgRemoveMemberAuditEntryMembershipType["Admin"]="ADMIN";OrgRemoveMemberAuditEntryMembershipType["BillingManager"]="BILLING_MANAGER";OrgRemoveMemberAuditEntryMembershipType["DirectMember"]="DIRECT_MEMBER";OrgRemoveMemberAuditEntryMembershipType["OutsideCollaborator"]="OUTSIDE_COLLABORATOR";OrgRemoveMemberAuditEntryMembershipType["Suspended"]="SUSPENDED";OrgRemoveMemberAuditEntryMembershipType["Unaffiliated"]="UNAFFILIATED";})(OrgRemoveMemberAuditEntryMembershipType||(OrgRemoveMemberAuditEntryMembershipType={}));let OrgRemoveMemberAuditEntryReason;/** Audit log entry for a org.remove_outside_collaborator event. */(function(OrgRemoveMemberAuditEntryReason){OrgRemoveMemberAuditEntryReason["SamlExternalIdentityMissing"]="SAML_EXTERNAL_IDENTITY_MISSING";OrgRemoveMemberAuditEntryReason["SamlSsoEnforcementRequiresExternalIdentity"]="SAML_SSO_ENFORCEMENT_REQUIRES_EXTERNAL_IDENTITY";OrgRemoveMemberAuditEntryReason["TwoFactorAccountRecovery"]="TWO_FACTOR_ACCOUNT_RECOVERY";OrgRemoveMemberAuditEntryReason["TwoFactorRequirementNonCompliance"]="TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE";OrgRemoveMemberAuditEntryReason["UserAccountDeleted"]="USER_ACCOUNT_DELETED";})(OrgRemoveMemberAuditEntryReason||(OrgRemoveMemberAuditEntryReason={}));/** The type of membership a user has with an Organization. */let OrgRemoveOutsideCollaboratorAuditEntryMembershipType;/** The reason an outside collaborator was removed from an Organization. */(function(OrgRemoveOutsideCollaboratorAuditEntryMembershipType){OrgRemoveOutsideCollaboratorAuditEntryMembershipType["BillingManager"]="BILLING_MANAGER";OrgRemoveOutsideCollaboratorAuditEntryMembershipType["OutsideCollaborator"]="OUTSIDE_COLLABORATOR";OrgRemoveOutsideCollaboratorAuditEntryMembershipType["Unaffiliated"]="UNAFFILIATED";})(OrgRemoveOutsideCollaboratorAuditEntryMembershipType||(OrgRemoveOutsideCollaboratorAuditEntryMembershipType={}));let OrgRemoveOutsideCollaboratorAuditEntryReason;/** Audit log entry for a org.restore_member event. */(function(OrgRemoveOutsideCollaboratorAuditEntryReason){OrgRemoveOutsideCollaboratorAuditEntryReason["SamlExternalIdentityMissing"]="SAML_EXTERNAL_IDENTITY_MISSING";OrgRemoveOutsideCollaboratorAuditEntryReason["TwoFactorRequirementNonCompliance"]="TWO_FACTOR_REQUIREMENT_NON_COMPLIANCE";})(OrgRemoveOutsideCollaboratorAuditEntryReason||(OrgRemoveOutsideCollaboratorAuditEntryReason={}));/** The default permission a repository can have in an Organization. */let OrgUpdateDefaultRepositoryPermissionAuditEntryPermission;/** Audit log entry for a org.update_member event. */(function(OrgUpdateDefaultRepositoryPermissionAuditEntryPermission){OrgUpdateDefaultRepositoryPermissionAuditEntryPermission["Admin"]="ADMIN";OrgUpdateDefaultRepositoryPermissionAuditEntryPermission["None"]="NONE";OrgUpdateDefaultRepositoryPermissionAuditEntryPermission["Read"]="READ";OrgUpdateDefaultRepositoryPermissionAuditEntryPermission["Write"]="WRITE";})(OrgUpdateDefaultRepositoryPermissionAuditEntryPermission||(OrgUpdateDefaultRepositoryPermissionAuditEntryPermission={}));/** The permissions available to members on an Organization. */let OrgUpdateMemberAuditEntryPermission;/** Audit log entry for a org.update_member_repository_creation_permission event. */(function(OrgUpdateMemberAuditEntryPermission){OrgUpdateMemberAuditEntryPermission["Admin"]="ADMIN";OrgUpdateMemberAuditEntryPermission["Read"]="READ";})(OrgUpdateMemberAuditEntryPermission||(OrgUpdateMemberAuditEntryPermission={}));/** The permissions available for repository creation on an Organization. */let OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility;/** Audit log entry for a org.update_member_repository_invitation_permission event. */(function(OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility){OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["All"]="ALL";OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["Internal"]="INTERNAL";OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["None"]="NONE";OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["Private"]="PRIVATE";OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["PrivateInternal"]="PRIVATE_INTERNAL";OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["Public"]="PUBLIC";OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["PublicInternal"]="PUBLIC_INTERNAL";OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility["PublicPrivate"]="PUBLIC_PRIVATE";})(OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility||(OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility={}));/** The possible organization invitation roles. */let OrganizationInvitationRole;/** The possible organization invitation types. */(function(OrganizationInvitationRole){OrganizationInvitationRole["Admin"]="ADMIN";OrganizationInvitationRole["BillingManager"]="BILLING_MANAGER";OrganizationInvitationRole["DirectMember"]="DIRECT_MEMBER";OrganizationInvitationRole["Reinstate"]="REINSTATE";})(OrganizationInvitationRole||(OrganizationInvitationRole={}));let OrganizationInvitationType;/** The connection type for User. */(function(OrganizationInvitationType){OrganizationInvitationType["Email"]="EMAIL";OrganizationInvitationType["User"]="USER";})(OrganizationInvitationType||(OrganizationInvitationType={}));/** The possible roles within an organization for its members. */let OrganizationMemberRole;/** The possible values for the members can create repositories setting on an organization. */(function(OrganizationMemberRole){OrganizationMemberRole["Admin"]="ADMIN";OrganizationMemberRole["Member"]="MEMBER";})(OrganizationMemberRole||(OrganizationMemberRole={}));let OrganizationMembersCanCreateRepositoriesSettingValue;/** Used for argument of CreateProjectV2 mutation. */(function(OrganizationMembersCanCreateRepositoriesSettingValue){OrganizationMembersCanCreateRepositoriesSettingValue["All"]="ALL";OrganizationMembersCanCreateRepositoriesSettingValue["Disabled"]="DISABLED";OrganizationMembersCanCreateRepositoriesSettingValue["Internal"]="INTERNAL";OrganizationMembersCanCreateRepositoriesSettingValue["Private"]="PRIVATE";})(OrganizationMembersCanCreateRepositoriesSettingValue||(OrganizationMembersCanCreateRepositoriesSettingValue={}));/** Properties by which organization connections can be ordered. */let OrganizationOrderField;/** An organization teams hovercard context */(function(OrganizationOrderField){OrganizationOrderField["CreatedAt"]="CREATED_AT";OrganizationOrderField["Login"]="LOGIN";})(OrganizationOrderField||(OrganizationOrderField={}));/** Properties by which package file connections can be ordered. */let PackageFileOrderField;/** Ways in which lists of packages can be ordered upon return. */(function(PackageFileOrderField){PackageFileOrderField["CreatedAt"]="CREATED_AT";})(PackageFileOrderField||(PackageFileOrderField={}));/** Properties by which package connections can be ordered. */let PackageOrderField;/** Represents an owner of a package. */(function(PackageOrderField){PackageOrderField["CreatedAt"]="CREATED_AT";})(PackageOrderField||(PackageOrderField={}));/** The possible types of a package. */let PackageType;/** Information about a specific package version. */(function(PackageType){PackageType["Debian"]="DEBIAN";PackageType["Docker"]="DOCKER";PackageType["Maven"]="MAVEN";PackageType["Npm"]="NPM";PackageType["Nuget"]="NUGET";PackageType["Pypi"]="PYPI";PackageType["Rubygems"]="RUBYGEMS";})(PackageType||(PackageType={}));/** Properties by which package version connections can be ordered. */let PackageVersionOrderField;/** Represents a object that contains package version activity statistics such as downloads. */(function(PackageVersionOrderField){PackageVersionOrderField["CreatedAt"]="CREATED_AT";})(PackageVersionOrderField||(PackageVersionOrderField={}));/** The possible types of patch statuses. */let PatchStatus;/** Types that can grant permissions on a repository to a user */(function(PatchStatus){PatchStatus["Added"]="ADDED";PatchStatus["Changed"]="CHANGED";PatchStatus["Copied"]="COPIED";PatchStatus["Deleted"]="DELETED";PatchStatus["Modified"]="MODIFIED";PatchStatus["Renamed"]="RENAMED";})(PatchStatus||(PatchStatus={}));/** Represents items that can be pinned to a profile page or dashboard. */let PinnableItemType;/** A Pinned Discussion is a discussion pinned to a repository's index page. */(function(PinnableItemType){PinnableItemType["Gist"]="GIST";PinnableItemType["Issue"]="ISSUE";PinnableItemType["Organization"]="ORGANIZATION";PinnableItemType["Project"]="PROJECT";PinnableItemType["PullRequest"]="PULL_REQUEST";PinnableItemType["Repository"]="REPOSITORY";PinnableItemType["Team"]="TEAM";PinnableItemType["User"]="USER";})(PinnableItemType||(PinnableItemType={}));/** Preconfigured gradients that may be used to style discussions pinned within a repository. */let PinnedDiscussionGradient;/** Preconfigured background patterns that may be used to style discussions pinned within a repository. */(function(PinnedDiscussionGradient){PinnedDiscussionGradient["BlueMint"]="BLUE_MINT";PinnedDiscussionGradient["BluePurple"]="BLUE_PURPLE";PinnedDiscussionGradient["PinkBlue"]="PINK_BLUE";PinnedDiscussionGradient["PurpleCoral"]="PURPLE_CORAL";PinnedDiscussionGradient["RedOrange"]="RED_ORANGE";})(PinnedDiscussionGradient||(PinnedDiscussionGradient={}));let PinnedDiscussionPattern;/** Represents a 'pinned' event on a given issue or pull request. */(function(PinnedDiscussionPattern){PinnedDiscussionPattern["ChevronUp"]="CHEVRON_UP";PinnedDiscussionPattern["Dot"]="DOT";PinnedDiscussionPattern["DotFill"]="DOT_FILL";PinnedDiscussionPattern["HeartFill"]="HEART_FILL";PinnedDiscussionPattern["Plus"]="PLUS";PinnedDiscussionPattern["Zap"]="ZAP";})(PinnedDiscussionPattern||(PinnedDiscussionPattern={}));/** The possible archived states of a project card. */let ProjectCardArchivedState;/** The connection type for ProjectCard. */(function(ProjectCardArchivedState){ProjectCardArchivedState["Archived"]="ARCHIVED";ProjectCardArchivedState["NotArchived"]="NOT_ARCHIVED";})(ProjectCardArchivedState||(ProjectCardArchivedState={}));/** Various content states of a ProjectCard */let ProjectCardState;/** A column inside a project. */(function(ProjectCardState){ProjectCardState["ContentOnly"]="CONTENT_ONLY";ProjectCardState["NoteOnly"]="NOTE_ONLY";ProjectCardState["Redacted"]="REDACTED";})(ProjectCardState||(ProjectCardState={}));/** The semantic purpose of the column - todo, in progress, or done. */let ProjectColumnPurpose;/** A list of projects associated with the owner. */(function(ProjectColumnPurpose){ProjectColumnPurpose["Done"]="DONE";ProjectColumnPurpose["InProgress"]="IN_PROGRESS";ProjectColumnPurpose["Todo"]="TODO";})(ProjectColumnPurpose||(ProjectColumnPurpose={}));/** The type of a project item. */let ProjectItemType;/** New projects that manage issues, pull requests and drafts using tables and boards. */(function(ProjectItemType){ProjectItemType["DraftIssue"]="DRAFT_ISSUE";ProjectItemType["Issue"]="ISSUE";ProjectItemType["PullRequest"]="PULL_REQUEST";ProjectItemType["Redacted"]="REDACTED";})(ProjectItemType||(ProjectItemType={}));/** The type of a project next field. */let ProjectNextFieldType;/** An item within a new Project. */(function(ProjectNextFieldType){ProjectNextFieldType["Assignees"]="ASSIGNEES";ProjectNextFieldType["Date"]="DATE";ProjectNextFieldType["Iteration"]="ITERATION";ProjectNextFieldType["Labels"]="LABELS";ProjectNextFieldType["LinkedPullRequests"]="LINKED_PULL_REQUESTS";ProjectNextFieldType["Milestone"]="MILESTONE";ProjectNextFieldType["Number"]="NUMBER";ProjectNextFieldType["Repository"]="REPOSITORY";ProjectNextFieldType["Reviewers"]="REVIEWERS";ProjectNextFieldType["SingleSelect"]="SINGLE_SELECT";ProjectNextFieldType["Text"]="TEXT";ProjectNextFieldType["Title"]="TITLE";ProjectNextFieldType["TrackedBy"]="TRACKED_BY";ProjectNextFieldType["Tracks"]="TRACKS";})(ProjectNextFieldType||(ProjectNextFieldType={}));/** Properties by which the return project can be ordered. */let ProjectNextOrderField;/** Represents an owner of a project (beta). */(function(ProjectNextOrderField){ProjectNextOrderField["CreatedAt"]="CREATED_AT";ProjectNextOrderField["Number"]="NUMBER";ProjectNextOrderField["Title"]="TITLE";ProjectNextOrderField["UpdatedAt"]="UPDATED_AT";})(ProjectNextOrderField||(ProjectNextOrderField={}));/** Properties by which project connections can be ordered. */let ProjectOrderField;/** Represents an owner of a Project. */(function(ProjectOrderField){ProjectOrderField["CreatedAt"]="CREATED_AT";ProjectOrderField["Name"]="NAME";ProjectOrderField["UpdatedAt"]="UPDATED_AT";})(ProjectOrderField||(ProjectOrderField={}));/** State of the project; either 'open' or 'closed' */let ProjectState;/** GitHub-provided templates for Projects */(function(ProjectState){ProjectState["Closed"]="CLOSED";ProjectState["Open"]="OPEN";})(ProjectState||(ProjectState={}));let ProjectTemplate;/** New projects that manage issues, pull requests and drafts using tables and boards. */(function(ProjectTemplate){ProjectTemplate["AutomatedKanbanV2"]="AUTOMATED_KANBAN_V2";ProjectTemplate["AutomatedReviewsKanban"]="AUTOMATED_REVIEWS_KANBAN";ProjectTemplate["BasicKanban"]="BASIC_KANBAN";ProjectTemplate["BugTriage"]="BUG_TRIAGE";})(ProjectTemplate||(ProjectTemplate={}));/** Properties by which project v2 field connections can be ordered. */let ProjectV2FieldOrderField;/** The type of a project field. */(function(ProjectV2FieldOrderField){ProjectV2FieldOrderField["CreatedAt"]="CREATED_AT";ProjectV2FieldOrderField["Name"]="NAME";ProjectV2FieldOrderField["Position"]="POSITION";})(ProjectV2FieldOrderField||(ProjectV2FieldOrderField={}));let ProjectV2FieldType;/** The values that can be used to update a field of an item inside a Project. Only 1 value can be updated at a time. */(function(ProjectV2FieldType){ProjectV2FieldType["Assignees"]="ASSIGNEES";ProjectV2FieldType["Date"]="DATE";ProjectV2FieldType["Iteration"]="ITERATION";ProjectV2FieldType["Labels"]="LABELS";ProjectV2FieldType["LinkedPullRequests"]="LINKED_PULL_REQUESTS";ProjectV2FieldType["Milestone"]="MILESTONE";ProjectV2FieldType["Number"]="NUMBER";ProjectV2FieldType["Repository"]="REPOSITORY";ProjectV2FieldType["Reviewers"]="REVIEWERS";ProjectV2FieldType["SingleSelect"]="SINGLE_SELECT";ProjectV2FieldType["Text"]="TEXT";ProjectV2FieldType["Title"]="TITLE";ProjectV2FieldType["TrackedBy"]="TRACKED_BY";ProjectV2FieldType["Tracks"]="TRACKS";})(ProjectV2FieldType||(ProjectV2FieldType={}));/** Properties by which project v2 item field value connections can be ordered. */let ProjectV2ItemFieldValueOrderField;/** Ordering options for project v2 item connections */(function(ProjectV2ItemFieldValueOrderField){ProjectV2ItemFieldValueOrderField["Position"]="POSITION";})(ProjectV2ItemFieldValueOrderField||(ProjectV2ItemFieldValueOrderField={}));/** Properties by which project v2 item connections can be ordered. */let ProjectV2ItemOrderField;/** The type of a project item. */(function(ProjectV2ItemOrderField){ProjectV2ItemOrderField["Position"]="POSITION";})(ProjectV2ItemOrderField||(ProjectV2ItemOrderField={}));let ProjectV2ItemType;/** An iteration field inside a project. */(function(ProjectV2ItemType){ProjectV2ItemType["DraftIssue"]="DRAFT_ISSUE";ProjectV2ItemType["Issue"]="ISSUE";ProjectV2ItemType["PullRequest"]="PULL_REQUEST";ProjectV2ItemType["Redacted"]="REDACTED";})(ProjectV2ItemType||(ProjectV2ItemType={}));/** Properties by which projects can be ordered. */let ProjectV2OrderField;/** Represents an owner of a project (beta). */(function(ProjectV2OrderField){ProjectV2OrderField["CreatedAt"]="CREATED_AT";ProjectV2OrderField["Number"]="NUMBER";ProjectV2OrderField["Title"]="TITLE";ProjectV2OrderField["UpdatedAt"]="UPDATED_AT";})(ProjectV2OrderField||(ProjectV2OrderField={}));/** The possible states of a project v2. */let ProjectV2State;/** A view within a ProjectV2. */(function(ProjectV2State){ProjectV2State["Closed"]="CLOSED";ProjectV2State["Open"]="OPEN";})(ProjectV2State||(ProjectV2State={}));/** The layout of a project v2 view. */let ProjectV2ViewLayout;/** Ordering options for project v2 view connections */(function(ProjectV2ViewLayout){ProjectV2ViewLayout["BoardLayout"]="BOARD_LAYOUT";ProjectV2ViewLayout["TableLayout"]="TABLE_LAYOUT";})(ProjectV2ViewLayout||(ProjectV2ViewLayout={}));/** Properties by which project v2 view connections can be ordered. */let ProjectV2ViewOrderField;/** A view within a Project. */(function(ProjectV2ViewOrderField){ProjectV2ViewOrderField["CreatedAt"]="CREATED_AT";ProjectV2ViewOrderField["Name"]="NAME";ProjectV2ViewOrderField["Position"]="POSITION";})(ProjectV2ViewOrderField||(ProjectV2ViewOrderField={}));/** The layout of a project view. */let ProjectViewLayout;/** A user's public key. */(function(ProjectViewLayout){ProjectViewLayout["BoardLayout"]="BOARD_LAYOUT";ProjectViewLayout["TableLayout"]="TABLE_LAYOUT";})(ProjectViewLayout||(ProjectViewLayout={}));/** Represents available types of methods to use when merging a pull request. */let PullRequestMergeMethod;/** Ways in which lists of issues can be ordered upon return. */(function(PullRequestMergeMethod){PullRequestMergeMethod["Merge"]="MERGE";PullRequestMergeMethod["Rebase"]="REBASE";PullRequestMergeMethod["Squash"]="SQUASH";})(PullRequestMergeMethod||(PullRequestMergeMethod={}));/** Properties by which pull_requests connections can be ordered. */let PullRequestOrderField;/** A review object for a given pull request. */(function(PullRequestOrderField){PullRequestOrderField["CreatedAt"]="CREATED_AT";PullRequestOrderField["UpdatedAt"]="UPDATED_AT";})(PullRequestOrderField||(PullRequestOrderField={}));/** The possible states of a pull request review comment. */let PullRequestReviewCommentState;/** The connection type for PullRequestReview. */(function(PullRequestReviewCommentState){PullRequestReviewCommentState["Pending"]="PENDING";PullRequestReviewCommentState["Submitted"]="SUBMITTED";})(PullRequestReviewCommentState||(PullRequestReviewCommentState={}));/** The review status of a pull request. */let PullRequestReviewDecision;/** An edge in a connection. */(function(PullRequestReviewDecision){PullRequestReviewDecision["Approved"]="APPROVED";PullRequestReviewDecision["ChangesRequested"]="CHANGES_REQUESTED";PullRequestReviewDecision["ReviewRequired"]="REVIEW_REQUIRED";})(PullRequestReviewDecision||(PullRequestReviewDecision={}));/** The possible events to perform on a pull request review. */let PullRequestReviewEvent;/** The possible states of a pull request review. */(function(PullRequestReviewEvent){PullRequestReviewEvent["Approve"]="APPROVE";PullRequestReviewEvent["Comment"]="COMMENT";PullRequestReviewEvent["Dismiss"]="DISMISS";PullRequestReviewEvent["RequestChanges"]="REQUEST_CHANGES";})(PullRequestReviewEvent||(PullRequestReviewEvent={}));let PullRequestReviewState;/** A threaded list of comments for a given pull request. */(function(PullRequestReviewState){PullRequestReviewState["Approved"]="APPROVED";PullRequestReviewState["ChangesRequested"]="CHANGES_REQUESTED";PullRequestReviewState["Commented"]="COMMENTED";PullRequestReviewState["Dismissed"]="DISMISSED";PullRequestReviewState["Pending"]="PENDING";})(PullRequestReviewState||(PullRequestReviewState={}));/** The possible states of a pull request. */let PullRequestState;/** A repository pull request template. */(function(PullRequestState){PullRequestState["Closed"]="CLOSED";PullRequestState["Merged"]="MERGED";PullRequestState["Open"]="OPEN";})(PullRequestState||(PullRequestState={}));/** The possible item types found in a timeline. */let PullRequestTimelineItemsItemType;/** The possible target states when updating a pull request. */(function(PullRequestTimelineItemsItemType){PullRequestTimelineItemsItemType["AddedToMergeQueueEvent"]="ADDED_TO_MERGE_QUEUE_EVENT";PullRequestTimelineItemsItemType["AddedToProjectEvent"]="ADDED_TO_PROJECT_EVENT";PullRequestTimelineItemsItemType["AssignedEvent"]="ASSIGNED_EVENT";PullRequestTimelineItemsItemType["AutomaticBaseChangeFailedEvent"]="AUTOMATIC_BASE_CHANGE_FAILED_EVENT";PullRequestTimelineItemsItemType["AutomaticBaseChangeSucceededEvent"]="AUTOMATIC_BASE_CHANGE_SUCCEEDED_EVENT";PullRequestTimelineItemsItemType["AutoMergeDisabledEvent"]="AUTO_MERGE_DISABLED_EVENT";PullRequestTimelineItemsItemType["AutoMergeEnabledEvent"]="AUTO_MERGE_ENABLED_EVENT";PullRequestTimelineItemsItemType["AutoRebaseEnabledEvent"]="AUTO_REBASE_ENABLED_EVENT";PullRequestTimelineItemsItemType["AutoSquashEnabledEvent"]="AUTO_SQUASH_ENABLED_EVENT";PullRequestTimelineItemsItemType["BaseRefChangedEvent"]="BASE_REF_CHANGED_EVENT";PullRequestTimelineItemsItemType["BaseRefDeletedEvent"]="BASE_REF_DELETED_EVENT";PullRequestTimelineItemsItemType["BaseRefForcePushedEvent"]="BASE_REF_FORCE_PUSHED_EVENT";PullRequestTimelineItemsItemType["ClosedEvent"]="CLOSED_EVENT";PullRequestTimelineItemsItemType["CommentDeletedEvent"]="COMMENT_DELETED_EVENT";PullRequestTimelineItemsItemType["ConnectedEvent"]="CONNECTED_EVENT";PullRequestTimelineItemsItemType["ConvertedNoteToIssueEvent"]="CONVERTED_NOTE_TO_ISSUE_EVENT";PullRequestTimelineItemsItemType["ConvertedToDiscussionEvent"]="CONVERTED_TO_DISCUSSION_EVENT";PullRequestTimelineItemsItemType["ConvertToDraftEvent"]="CONVERT_TO_DRAFT_EVENT";PullRequestTimelineItemsItemType["CrossReferencedEvent"]="CROSS_REFERENCED_EVENT";PullRequestTimelineItemsItemType["DemilestonedEvent"]="DEMILESTONED_EVENT";PullRequestTimelineItemsItemType["DeployedEvent"]="DEPLOYED_EVENT";PullRequestTimelineItemsItemType["DeploymentEnvironmentChangedEvent"]="DEPLOYMENT_ENVIRONMENT_CHANGED_EVENT";PullRequestTimelineItemsItemType["DisconnectedEvent"]="DISCONNECTED_EVENT";PullRequestTimelineItemsItemType["HeadRefDeletedEvent"]="HEAD_REF_DELETED_EVENT";PullRequestTimelineItemsItemType["HeadRefForcePushedEvent"]="HEAD_REF_FORCE_PUSHED_EVENT";PullRequestTimelineItemsItemType["HeadRefRestoredEvent"]="HEAD_REF_RESTORED_EVENT";PullRequestTimelineItemsItemType["IssueComment"]="ISSUE_COMMENT";PullRequestTimelineItemsItemType["LabeledEvent"]="LABELED_EVENT";PullRequestTimelineItemsItemType["LockedEvent"]="LOCKED_EVENT";PullRequestTimelineItemsItemType["MarkedAsDuplicateEvent"]="MARKED_AS_DUPLICATE_EVENT";PullRequestTimelineItemsItemType["MentionedEvent"]="MENTIONED_EVENT";PullRequestTimelineItemsItemType["MergedEvent"]="MERGED_EVENT";PullRequestTimelineItemsItemType["MilestonedEvent"]="MILESTONED_EVENT";PullRequestTimelineItemsItemType["MovedColumnsInProjectEvent"]="MOVED_COLUMNS_IN_PROJECT_EVENT";PullRequestTimelineItemsItemType["PinnedEvent"]="PINNED_EVENT";PullRequestTimelineItemsItemType["PullRequestCommit"]="PULL_REQUEST_COMMIT";PullRequestTimelineItemsItemType["PullRequestCommitCommentThread"]="PULL_REQUEST_COMMIT_COMMENT_THREAD";PullRequestTimelineItemsItemType["PullRequestReview"]="PULL_REQUEST_REVIEW";PullRequestTimelineItemsItemType["PullRequestReviewThread"]="PULL_REQUEST_REVIEW_THREAD";PullRequestTimelineItemsItemType["PullRequestRevisionMarker"]="PULL_REQUEST_REVISION_MARKER";PullRequestTimelineItemsItemType["ReadyForReviewEvent"]="READY_FOR_REVIEW_EVENT";PullRequestTimelineItemsItemType["ReferencedEvent"]="REFERENCED_EVENT";PullRequestTimelineItemsItemType["RemovedFromMergeQueueEvent"]="REMOVED_FROM_MERGE_QUEUE_EVENT";PullRequestTimelineItemsItemType["RemovedFromProjectEvent"]="REMOVED_FROM_PROJECT_EVENT";PullRequestTimelineItemsItemType["RenamedTitleEvent"]="RENAMED_TITLE_EVENT";PullRequestTimelineItemsItemType["ReopenedEvent"]="REOPENED_EVENT";PullRequestTimelineItemsItemType["ReviewDismissedEvent"]="REVIEW_DISMISSED_EVENT";PullRequestTimelineItemsItemType["ReviewRequestedEvent"]="REVIEW_REQUESTED_EVENT";PullRequestTimelineItemsItemType["ReviewRequestRemovedEvent"]="REVIEW_REQUEST_REMOVED_EVENT";PullRequestTimelineItemsItemType["SubscribedEvent"]="SUBSCRIBED_EVENT";PullRequestTimelineItemsItemType["TransferredEvent"]="TRANSFERRED_EVENT";PullRequestTimelineItemsItemType["UnassignedEvent"]="UNASSIGNED_EVENT";PullRequestTimelineItemsItemType["UnlabeledEvent"]="UNLABELED_EVENT";PullRequestTimelineItemsItemType["UnlockedEvent"]="UNLOCKED_EVENT";PullRequestTimelineItemsItemType["UnmarkedAsDuplicateEvent"]="UNMARKED_AS_DUPLICATE_EVENT";PullRequestTimelineItemsItemType["UnpinnedEvent"]="UNPINNED_EVENT";PullRequestTimelineItemsItemType["UnsubscribedEvent"]="UNSUBSCRIBED_EVENT";PullRequestTimelineItemsItemType["UserBlockedEvent"]="USER_BLOCKED_EVENT";})(PullRequestTimelineItemsItemType||(PullRequestTimelineItemsItemType={}));let PullRequestUpdateState;/** A Git push. */(function(PullRequestUpdateState){PullRequestUpdateState["Closed"]="CLOSED";PullRequestUpdateState["Open"]="OPEN";})(PullRequestUpdateState||(PullRequestUpdateState={}));/** Emojis that can be attached to Issues, Pull Requests and Comments. */let ReactionContent;/** An edge in a connection. */(function(ReactionContent){ReactionContent["Confused"]="CONFUSED";ReactionContent["Eyes"]="EYES";ReactionContent["Heart"]="HEART";ReactionContent["Hooray"]="HOORAY";ReactionContent["Laugh"]="LAUGH";ReactionContent["Rocket"]="ROCKET";ReactionContent["ThumbsDown"]="THUMBS_DOWN";ReactionContent["ThumbsUp"]="THUMBS_UP";})(ReactionContent||(ReactionContent={}));/** A list of fields that reactions can be ordered by. */let ReactionOrderField;/** Types that can be assigned to reactions. */(function(ReactionOrderField){ReactionOrderField["CreatedAt"]="CREATED_AT";})(ReactionOrderField||(ReactionOrderField={}));/** Properties by which ref connections can be ordered. */let RefOrderField;/** A ref update rules for a viewer. */(function(RefOrderField){RefOrderField["Alphabetical"]="ALPHABETICAL";RefOrderField["TagCommitDate"]="TAG_COMMIT_DATE";})(RefOrderField||(RefOrderField={}));/** Properties by which release connections can be ordered. */let ReleaseOrderField;/** Autogenerated input type of RemoveAssigneesFromAssignable */(function(ReleaseOrderField){ReleaseOrderField["CreatedAt"]="CREATED_AT";ReleaseOrderField["Name"]="NAME";})(ReleaseOrderField||(ReleaseOrderField={}));/** The privacy of a repository */let RepoAccessAuditEntryVisibility;/** Audit log entry for a repo.add_member event. */(function(RepoAccessAuditEntryVisibility){RepoAccessAuditEntryVisibility["Internal"]="INTERNAL";RepoAccessAuditEntryVisibility["Private"]="PRIVATE";RepoAccessAuditEntryVisibility["Public"]="PUBLIC";})(RepoAccessAuditEntryVisibility||(RepoAccessAuditEntryVisibility={}));/** The privacy of a repository */let RepoAddMemberAuditEntryVisibility;/** Audit log entry for a repo.add_topic event. */(function(RepoAddMemberAuditEntryVisibility){RepoAddMemberAuditEntryVisibility["Internal"]="INTERNAL";RepoAddMemberAuditEntryVisibility["Private"]="PRIVATE";RepoAddMemberAuditEntryVisibility["Public"]="PUBLIC";})(RepoAddMemberAuditEntryVisibility||(RepoAddMemberAuditEntryVisibility={}));/** The privacy of a repository */let RepoArchivedAuditEntryVisibility;/** Audit log entry for a repo.change_merge_setting event. */(function(RepoArchivedAuditEntryVisibility){RepoArchivedAuditEntryVisibility["Internal"]="INTERNAL";RepoArchivedAuditEntryVisibility["Private"]="PRIVATE";RepoArchivedAuditEntryVisibility["Public"]="PUBLIC";})(RepoArchivedAuditEntryVisibility||(RepoArchivedAuditEntryVisibility={}));/** The merge options available for pull requests to this repository. */let RepoChangeMergeSettingAuditEntryMergeType;/** Audit log entry for a repo.config.disable_anonymous_git_access event. */(function(RepoChangeMergeSettingAuditEntryMergeType){RepoChangeMergeSettingAuditEntryMergeType["Merge"]="MERGE";RepoChangeMergeSettingAuditEntryMergeType["Rebase"]="REBASE";RepoChangeMergeSettingAuditEntryMergeType["Squash"]="SQUASH";})(RepoChangeMergeSettingAuditEntryMergeType||(RepoChangeMergeSettingAuditEntryMergeType={}));/** The privacy of a repository */let RepoCreateAuditEntryVisibility;/** Audit log entry for a repo.destroy event. */(function(RepoCreateAuditEntryVisibility){RepoCreateAuditEntryVisibility["Internal"]="INTERNAL";RepoCreateAuditEntryVisibility["Private"]="PRIVATE";RepoCreateAuditEntryVisibility["Public"]="PUBLIC";})(RepoCreateAuditEntryVisibility||(RepoCreateAuditEntryVisibility={}));/** The privacy of a repository */let RepoDestroyAuditEntryVisibility;/** Audit log entry for a repo.remove_member event. */(function(RepoDestroyAuditEntryVisibility){RepoDestroyAuditEntryVisibility["Internal"]="INTERNAL";RepoDestroyAuditEntryVisibility["Private"]="PRIVATE";RepoDestroyAuditEntryVisibility["Public"]="PUBLIC";})(RepoDestroyAuditEntryVisibility||(RepoDestroyAuditEntryVisibility={}));/** The privacy of a repository */let RepoRemoveMemberAuditEntryVisibility;/** Audit log entry for a repo.remove_topic event. */(function(RepoRemoveMemberAuditEntryVisibility){RepoRemoveMemberAuditEntryVisibility["Internal"]="INTERNAL";RepoRemoveMemberAuditEntryVisibility["Private"]="PRIVATE";RepoRemoveMemberAuditEntryVisibility["Public"]="PUBLIC";})(RepoRemoveMemberAuditEntryVisibility||(RepoRemoveMemberAuditEntryVisibility={}));/** The reasons a piece of content can be reported or minimized. */let ReportedContentClassifiers;/** A repository contains the content for a project. */(function(ReportedContentClassifiers){ReportedContentClassifiers["Abuse"]="ABUSE";ReportedContentClassifiers["Duplicate"]="DUPLICATE";ReportedContentClassifiers["OffTopic"]="OFF_TOPIC";ReportedContentClassifiers["Outdated"]="OUTDATED";ReportedContentClassifiers["Resolved"]="RESOLVED";ReportedContentClassifiers["Spam"]="SPAM";})(ReportedContentClassifiers||(ReportedContentClassifiers={}));/** The affiliation of a user to a repository */let RepositoryAffiliation;/** Metadata for an audit entry with action repo.* */(function(RepositoryAffiliation){RepositoryAffiliation["Collaborator"]="COLLABORATOR";RepositoryAffiliation["OrganizationMember"]="ORGANIZATION_MEMBER";RepositoryAffiliation["Owner"]="OWNER";})(RepositoryAffiliation||(RepositoryAffiliation={}));/** The reason a repository is listed as 'contributed'. */let RepositoryContributionType;/** Represents an author of discussions in repositories. */(function(RepositoryContributionType){RepositoryContributionType["Commit"]="COMMIT";RepositoryContributionType["Issue"]="ISSUE";RepositoryContributionType["PullRequest"]="PULL_REQUEST";RepositoryContributionType["PullRequestReview"]="PULL_REQUEST_REVIEW";RepositoryContributionType["Repository"]="REPOSITORY";})(RepositoryContributionType||(RepositoryContributionType={}));/** A repository interaction limit. */let RepositoryInteractionLimit;/** The length for a repository interaction limit to be enabled for. */(function(RepositoryInteractionLimit){RepositoryInteractionLimit["CollaboratorsOnly"]="COLLABORATORS_ONLY";RepositoryInteractionLimit["ContributorsOnly"]="CONTRIBUTORS_ONLY";RepositoryInteractionLimit["ExistingUsers"]="EXISTING_USERS";RepositoryInteractionLimit["NoLimit"]="NO_LIMIT";})(RepositoryInteractionLimit||(RepositoryInteractionLimit={}));let RepositoryInteractionLimitExpiry;/** Indicates where an interaction limit is configured. */(function(RepositoryInteractionLimitExpiry){RepositoryInteractionLimitExpiry["OneDay"]="ONE_DAY";RepositoryInteractionLimitExpiry["OneMonth"]="ONE_MONTH";RepositoryInteractionLimitExpiry["OneWeek"]="ONE_WEEK";RepositoryInteractionLimitExpiry["SixMonths"]="SIX_MONTHS";RepositoryInteractionLimitExpiry["ThreeDays"]="THREE_DAYS";})(RepositoryInteractionLimitExpiry||(RepositoryInteractionLimitExpiry={}));let RepositoryInteractionLimitOrigin;/** An invitation for a user to be added to a repository. */(function(RepositoryInteractionLimitOrigin){RepositoryInteractionLimitOrigin["Organization"]="ORGANIZATION";RepositoryInteractionLimitOrigin["Repository"]="REPOSITORY";RepositoryInteractionLimitOrigin["User"]="USER";})(RepositoryInteractionLimitOrigin||(RepositoryInteractionLimitOrigin={}));/** Properties by which repository invitation connections can be ordered. */let RepositoryInvitationOrderField;/** The possible reasons a given repository could be in a locked state. */(function(RepositoryInvitationOrderField){RepositoryInvitationOrderField["CreatedAt"]="CREATED_AT";})(RepositoryInvitationOrderField||(RepositoryInvitationOrderField={}));let RepositoryLockReason;/** A GitHub Enterprise Importer (GEI) repository migration. */(function(RepositoryLockReason){RepositoryLockReason["Billing"]="BILLING";RepositoryLockReason["Migrating"]="MIGRATING";RepositoryLockReason["Moving"]="MOVING";RepositoryLockReason["Rename"]="RENAME";RepositoryLockReason["TradeRestriction"]="TRADE_RESTRICTION";})(RepositoryLockReason||(RepositoryLockReason={}));/** Possible directions in which to order a list of repository migrations when provided an `orderBy` argument. */let RepositoryMigrationOrderDirection;/** Properties by which repository migrations can be ordered. */(function(RepositoryMigrationOrderDirection){RepositoryMigrationOrderDirection["Asc"]="ASC";RepositoryMigrationOrderDirection["Desc"]="DESC";})(RepositoryMigrationOrderDirection||(RepositoryMigrationOrderDirection={}));let RepositoryMigrationOrderField;/** Represents a object that belongs to a repository. */(function(RepositoryMigrationOrderField){RepositoryMigrationOrderField["CreatedAt"]="CREATED_AT";})(RepositoryMigrationOrderField||(RepositoryMigrationOrderField={}));/** Properties by which repository connections can be ordered. */let RepositoryOrderField;/** Represents an owner of a Repository. */(function(RepositoryOrderField){RepositoryOrderField["CreatedAt"]="CREATED_AT";RepositoryOrderField["Name"]="NAME";RepositoryOrderField["PushedAt"]="PUSHED_AT";RepositoryOrderField["Stargazers"]="STARGAZERS";RepositoryOrderField["UpdatedAt"]="UPDATED_AT";})(RepositoryOrderField||(RepositoryOrderField={}));/** The access level to a repository */let RepositoryPermission;/** The privacy of a repository */(function(RepositoryPermission){RepositoryPermission["Admin"]="ADMIN";RepositoryPermission["Maintain"]="MAINTAIN";RepositoryPermission["Read"]="READ";RepositoryPermission["Triage"]="TRIAGE";RepositoryPermission["Write"]="WRITE";})(RepositoryPermission||(RepositoryPermission={}));let RepositoryPrivacy;/** A repository-topic connects a repository to a topic. */(function(RepositoryPrivacy){RepositoryPrivacy["Private"]="PRIVATE";RepositoryPrivacy["Public"]="PUBLIC";})(RepositoryPrivacy||(RepositoryPrivacy={}));/** The repository's visibility level. */let RepositoryVisibility;/** Audit log entry for a repository_visibility_change.disable event. */(function(RepositoryVisibility){RepositoryVisibility["Internal"]="INTERNAL";RepositoryVisibility["Private"]="PRIVATE";RepositoryVisibility["Public"]="PUBLIC";})(RepositoryVisibility||(RepositoryVisibility={}));/** The possible scopes of an alert's dependency. */let RepositoryVulnerabilityAlertDependencyScope;/** An edge in a connection. */(function(RepositoryVulnerabilityAlertDependencyScope){RepositoryVulnerabilityAlertDependencyScope["Development"]="DEVELOPMENT";RepositoryVulnerabilityAlertDependencyScope["Runtime"]="RUNTIME";})(RepositoryVulnerabilityAlertDependencyScope||(RepositoryVulnerabilityAlertDependencyScope={}));/** The possible states of an alert */let RepositoryVulnerabilityAlertState;/** Autogenerated input type of RequestReviews */(function(RepositoryVulnerabilityAlertState){RepositoryVulnerabilityAlertState["Dismissed"]="DISMISSED";RepositoryVulnerabilityAlertState["Fixed"]="FIXED";RepositoryVulnerabilityAlertState["Open"]="OPEN";})(RepositoryVulnerabilityAlertState||(RepositoryVulnerabilityAlertState={}));/** The possible states that can be requested when creating a check run. */let RequestableCheckStatusState;/** Types that can be requested reviewers. */(function(RequestableCheckStatusState){RequestableCheckStatusState["Completed"]="COMPLETED";RequestableCheckStatusState["InProgress"]="IN_PROGRESS";RequestableCheckStatusState["Pending"]="PENDING";RequestableCheckStatusState["Queued"]="QUEUED";RequestableCheckStatusState["Waiting"]="WAITING";})(RequestableCheckStatusState||(RequestableCheckStatusState={}));/** Possible roles a user may have in relation to an organization. */let RoleInOrganization;/** The possible digest algorithms used to sign SAML requests for an identity provider. */(function(RoleInOrganization){RoleInOrganization["DirectMember"]="DIRECT_MEMBER";RoleInOrganization["Owner"]="OWNER";RoleInOrganization["Unaffiliated"]="UNAFFILIATED";})(RoleInOrganization||(RoleInOrganization={}));let SamlDigestAlgorithm;/** The possible signature algorithms used to sign SAML requests for a Identity Provider. */(function(SamlDigestAlgorithm){SamlDigestAlgorithm["Sha1"]="SHA1";SamlDigestAlgorithm["Sha256"]="SHA256";SamlDigestAlgorithm["Sha384"]="SHA384";SamlDigestAlgorithm["Sha512"]="SHA512";})(SamlDigestAlgorithm||(SamlDigestAlgorithm={}));let SamlSignatureAlgorithm;/** A Saved Reply is text a user can use to reply quickly. */(function(SamlSignatureAlgorithm){SamlSignatureAlgorithm["RsaSha1"]="RSA_SHA1";SamlSignatureAlgorithm["RsaSha256"]="RSA_SHA256";SamlSignatureAlgorithm["RsaSha384"]="RSA_SHA384";SamlSignatureAlgorithm["RsaSha512"]="RSA_SHA512";})(SamlSignatureAlgorithm||(SamlSignatureAlgorithm={}));/** Properties by which saved reply connections can be ordered. */let SavedReplyOrderField;/** The results of a search. */(function(SavedReplyOrderField){SavedReplyOrderField["UpdatedAt"]="UPDATED_AT";})(SavedReplyOrderField||(SavedReplyOrderField={}));/** Represents the individual results of a search. */let SearchType;/** A GitHub Security Advisory */(function(SearchType){SearchType["Discussion"]="DISCUSSION";SearchType["Issue"]="ISSUE";SearchType["Repository"]="REPOSITORY";SearchType["User"]="USER";})(SearchType||(SearchType={}));/** Classification of the advisory. */let SecurityAdvisoryClassification;/** The connection type for SecurityAdvisory. */(function(SecurityAdvisoryClassification){SecurityAdvisoryClassification["General"]="GENERAL";SecurityAdvisoryClassification["Malware"]="MALWARE";})(SecurityAdvisoryClassification||(SecurityAdvisoryClassification={}));/** The possible ecosystems of a security vulnerability's package. */let SecurityAdvisoryEcosystem;/** An edge in a connection. */(function(SecurityAdvisoryEcosystem){SecurityAdvisoryEcosystem["Actions"]="ACTIONS";SecurityAdvisoryEcosystem["Composer"]="COMPOSER";SecurityAdvisoryEcosystem["Erlang"]="ERLANG";SecurityAdvisoryEcosystem["Go"]="GO";SecurityAdvisoryEcosystem["Maven"]="MAVEN";SecurityAdvisoryEcosystem["Npm"]="NPM";SecurityAdvisoryEcosystem["Nuget"]="NUGET";SecurityAdvisoryEcosystem["Pip"]="PIP";SecurityAdvisoryEcosystem["Pub"]="PUB";SecurityAdvisoryEcosystem["Rubygems"]="RUBYGEMS";SecurityAdvisoryEcosystem["Rust"]="RUST";})(SecurityAdvisoryEcosystem||(SecurityAdvisoryEcosystem={}));/** Identifier formats available for advisories. */let SecurityAdvisoryIdentifierType;/** Ordering options for security advisory connections */(function(SecurityAdvisoryIdentifierType){SecurityAdvisoryIdentifierType["Cve"]="CVE";SecurityAdvisoryIdentifierType["Ghsa"]="GHSA";})(SecurityAdvisoryIdentifierType||(SecurityAdvisoryIdentifierType={}));/** Properties by which security advisory connections can be ordered. */let SecurityAdvisoryOrderField;/** An individual package */(function(SecurityAdvisoryOrderField){SecurityAdvisoryOrderField["PublishedAt"]="PUBLISHED_AT";SecurityAdvisoryOrderField["UpdatedAt"]="UPDATED_AT";})(SecurityAdvisoryOrderField||(SecurityAdvisoryOrderField={}));/** Severity of the vulnerability. */let SecurityAdvisorySeverity;/** An individual vulnerability within an Advisory */(function(SecurityAdvisorySeverity){SecurityAdvisorySeverity["Critical"]="CRITICAL";SecurityAdvisorySeverity["High"]="HIGH";SecurityAdvisorySeverity["Low"]="LOW";SecurityAdvisorySeverity["Moderate"]="MODERATE";})(SecurityAdvisorySeverity||(SecurityAdvisorySeverity={}));/** Properties by which security vulnerability connections can be ordered. */let SecurityVulnerabilityOrderField;/** Autogenerated input type of SetEnterpriseIdentityProvider */(function(SecurityVulnerabilityOrderField){SecurityVulnerabilityOrderField["UpdatedAt"]="UPDATED_AT";})(SecurityVulnerabilityOrderField||(SecurityVulnerabilityOrderField={}));/** Properties by which sponsor connections can be ordered. */let SponsorOrderField;/** Entities that can sponsor or be sponsored through GitHub Sponsors. */(function(SponsorOrderField){SponsorOrderField["Login"]="LOGIN";SponsorOrderField["Relevance"]="RELEVANCE";})(SponsorOrderField||(SponsorOrderField={}));/** Properties by which sponsorable connections can be ordered. */let SponsorableOrderField;/** An event related to sponsorship activity. */(function(SponsorableOrderField){SponsorableOrderField["Login"]="LOGIN";})(SponsorableOrderField||(SponsorableOrderField={}));/** The possible actions that GitHub Sponsors activities can represent. */let SponsorsActivityAction;/** The connection type for SponsorsActivity. */(function(SponsorsActivityAction){SponsorsActivityAction["CancelledSponsorship"]="CANCELLED_SPONSORSHIP";SponsorsActivityAction["NewSponsorship"]="NEW_SPONSORSHIP";SponsorsActivityAction["PendingChange"]="PENDING_CHANGE";SponsorsActivityAction["Refund"]="REFUND";SponsorsActivityAction["SponsorMatchDisabled"]="SPONSOR_MATCH_DISABLED";SponsorsActivityAction["TierChange"]="TIER_CHANGE";})(SponsorsActivityAction||(SponsorsActivityAction={}));/** Properties by which GitHub Sponsors activity connections can be ordered. */let SponsorsActivityOrderField;/** The possible time periods for which Sponsors activities can be requested. */(function(SponsorsActivityOrderField){SponsorsActivityOrderField["Timestamp"]="TIMESTAMP";})(SponsorsActivityOrderField||(SponsorsActivityOrderField={}));let SponsorsActivityPeriod;/** Represents countries or regions for billing and residence for a GitHub Sponsors profile. */(function(SponsorsActivityPeriod){SponsorsActivityPeriod["All"]="ALL";SponsorsActivityPeriod["Day"]="DAY";SponsorsActivityPeriod["Month"]="MONTH";SponsorsActivityPeriod["Week"]="WEEK";})(SponsorsActivityPeriod||(SponsorsActivityPeriod={}));let SponsorsCountryOrRegionCode;/** A goal associated with a GitHub Sponsors listing, representing a target the sponsored maintainer would like to attain. */(function(SponsorsCountryOrRegionCode){SponsorsCountryOrRegionCode["Ad"]="AD";SponsorsCountryOrRegionCode["Ae"]="AE";SponsorsCountryOrRegionCode["Af"]="AF";SponsorsCountryOrRegionCode["Ag"]="AG";SponsorsCountryOrRegionCode["Ai"]="AI";SponsorsCountryOrRegionCode["Al"]="AL";SponsorsCountryOrRegionCode["Am"]="AM";SponsorsCountryOrRegionCode["Ao"]="AO";SponsorsCountryOrRegionCode["Aq"]="AQ";SponsorsCountryOrRegionCode["Ar"]="AR";SponsorsCountryOrRegionCode["As"]="AS";SponsorsCountryOrRegionCode["At"]="AT";SponsorsCountryOrRegionCode["Au"]="AU";SponsorsCountryOrRegionCode["Aw"]="AW";SponsorsCountryOrRegionCode["Ax"]="AX";SponsorsCountryOrRegionCode["Az"]="AZ";SponsorsCountryOrRegionCode["Ba"]="BA";SponsorsCountryOrRegionCode["Bb"]="BB";SponsorsCountryOrRegionCode["Bd"]="BD";SponsorsCountryOrRegionCode["Be"]="BE";SponsorsCountryOrRegionCode["Bf"]="BF";SponsorsCountryOrRegionCode["Bg"]="BG";SponsorsCountryOrRegionCode["Bh"]="BH";SponsorsCountryOrRegionCode["Bi"]="BI";SponsorsCountryOrRegionCode["Bj"]="BJ";SponsorsCountryOrRegionCode["Bl"]="BL";SponsorsCountryOrRegionCode["Bm"]="BM";SponsorsCountryOrRegionCode["Bn"]="BN";SponsorsCountryOrRegionCode["Bo"]="BO";SponsorsCountryOrRegionCode["Bq"]="BQ";SponsorsCountryOrRegionCode["Br"]="BR";SponsorsCountryOrRegionCode["Bs"]="BS";SponsorsCountryOrRegionCode["Bt"]="BT";SponsorsCountryOrRegionCode["Bv"]="BV";SponsorsCountryOrRegionCode["Bw"]="BW";SponsorsCountryOrRegionCode["By"]="BY";SponsorsCountryOrRegionCode["Bz"]="BZ";SponsorsCountryOrRegionCode["Ca"]="CA";SponsorsCountryOrRegionCode["Cc"]="CC";SponsorsCountryOrRegionCode["Cd"]="CD";SponsorsCountryOrRegionCode["Cf"]="CF";SponsorsCountryOrRegionCode["Cg"]="CG";SponsorsCountryOrRegionCode["Ch"]="CH";SponsorsCountryOrRegionCode["Ci"]="CI";SponsorsCountryOrRegionCode["Ck"]="CK";SponsorsCountryOrRegionCode["Cl"]="CL";SponsorsCountryOrRegionCode["Cm"]="CM";SponsorsCountryOrRegionCode["Cn"]="CN";SponsorsCountryOrRegionCode["Co"]="CO";SponsorsCountryOrRegionCode["Cr"]="CR";SponsorsCountryOrRegionCode["Cv"]="CV";SponsorsCountryOrRegionCode["Cw"]="CW";SponsorsCountryOrRegionCode["Cx"]="CX";SponsorsCountryOrRegionCode["Cy"]="CY";SponsorsCountryOrRegionCode["Cz"]="CZ";SponsorsCountryOrRegionCode["De"]="DE";SponsorsCountryOrRegionCode["Dj"]="DJ";SponsorsCountryOrRegionCode["Dk"]="DK";SponsorsCountryOrRegionCode["Dm"]="DM";SponsorsCountryOrRegionCode["Do"]="DO";SponsorsCountryOrRegionCode["Dz"]="DZ";SponsorsCountryOrRegionCode["Ec"]="EC";SponsorsCountryOrRegionCode["Ee"]="EE";SponsorsCountryOrRegionCode["Eg"]="EG";SponsorsCountryOrRegionCode["Eh"]="EH";SponsorsCountryOrRegionCode["Er"]="ER";SponsorsCountryOrRegionCode["Es"]="ES";SponsorsCountryOrRegionCode["Et"]="ET";SponsorsCountryOrRegionCode["Fi"]="FI";SponsorsCountryOrRegionCode["Fj"]="FJ";SponsorsCountryOrRegionCode["Fk"]="FK";SponsorsCountryOrRegionCode["Fm"]="FM";SponsorsCountryOrRegionCode["Fo"]="FO";SponsorsCountryOrRegionCode["Fr"]="FR";SponsorsCountryOrRegionCode["Ga"]="GA";SponsorsCountryOrRegionCode["Gb"]="GB";SponsorsCountryOrRegionCode["Gd"]="GD";SponsorsCountryOrRegionCode["Ge"]="GE";SponsorsCountryOrRegionCode["Gf"]="GF";SponsorsCountryOrRegionCode["Gg"]="GG";SponsorsCountryOrRegionCode["Gh"]="GH";SponsorsCountryOrRegionCode["Gi"]="GI";SponsorsCountryOrRegionCode["Gl"]="GL";SponsorsCountryOrRegionCode["Gm"]="GM";SponsorsCountryOrRegionCode["Gn"]="GN";SponsorsCountryOrRegionCode["Gp"]="GP";SponsorsCountryOrRegionCode["Gq"]="GQ";SponsorsCountryOrRegionCode["Gr"]="GR";SponsorsCountryOrRegionCode["Gs"]="GS";SponsorsCountryOrRegionCode["Gt"]="GT";SponsorsCountryOrRegionCode["Gu"]="GU";SponsorsCountryOrRegionCode["Gw"]="GW";SponsorsCountryOrRegionCode["Gy"]="GY";SponsorsCountryOrRegionCode["Hk"]="HK";SponsorsCountryOrRegionCode["Hm"]="HM";SponsorsCountryOrRegionCode["Hn"]="HN";SponsorsCountryOrRegionCode["Hr"]="HR";SponsorsCountryOrRegionCode["Ht"]="HT";SponsorsCountryOrRegionCode["Hu"]="HU";SponsorsCountryOrRegionCode["Id"]="ID";SponsorsCountryOrRegionCode["Ie"]="IE";SponsorsCountryOrRegionCode["Il"]="IL";SponsorsCountryOrRegionCode["Im"]="IM";SponsorsCountryOrRegionCode["In"]="IN";SponsorsCountryOrRegionCode["Io"]="IO";SponsorsCountryOrRegionCode["Iq"]="IQ";SponsorsCountryOrRegionCode["Ir"]="IR";SponsorsCountryOrRegionCode["Is"]="IS";SponsorsCountryOrRegionCode["It"]="IT";SponsorsCountryOrRegionCode["Je"]="JE";SponsorsCountryOrRegionCode["Jm"]="JM";SponsorsCountryOrRegionCode["Jo"]="JO";SponsorsCountryOrRegionCode["Jp"]="JP";SponsorsCountryOrRegionCode["Ke"]="KE";SponsorsCountryOrRegionCode["Kg"]="KG";SponsorsCountryOrRegionCode["Kh"]="KH";SponsorsCountryOrRegionCode["Ki"]="KI";SponsorsCountryOrRegionCode["Km"]="KM";SponsorsCountryOrRegionCode["Kn"]="KN";SponsorsCountryOrRegionCode["Kr"]="KR";SponsorsCountryOrRegionCode["Kw"]="KW";SponsorsCountryOrRegionCode["Ky"]="KY";SponsorsCountryOrRegionCode["Kz"]="KZ";SponsorsCountryOrRegionCode["La"]="LA";SponsorsCountryOrRegionCode["Lb"]="LB";SponsorsCountryOrRegionCode["Lc"]="LC";SponsorsCountryOrRegionCode["Li"]="LI";SponsorsCountryOrRegionCode["Lk"]="LK";SponsorsCountryOrRegionCode["Lr"]="LR";SponsorsCountryOrRegionCode["Ls"]="LS";SponsorsCountryOrRegionCode["Lt"]="LT";SponsorsCountryOrRegionCode["Lu"]="LU";SponsorsCountryOrRegionCode["Lv"]="LV";SponsorsCountryOrRegionCode["Ly"]="LY";SponsorsCountryOrRegionCode["Ma"]="MA";SponsorsCountryOrRegionCode["Mc"]="MC";SponsorsCountryOrRegionCode["Md"]="MD";SponsorsCountryOrRegionCode["Me"]="ME";SponsorsCountryOrRegionCode["Mf"]="MF";SponsorsCountryOrRegionCode["Mg"]="MG";SponsorsCountryOrRegionCode["Mh"]="MH";SponsorsCountryOrRegionCode["Mk"]="MK";SponsorsCountryOrRegionCode["Ml"]="ML";SponsorsCountryOrRegionCode["Mm"]="MM";SponsorsCountryOrRegionCode["Mn"]="MN";SponsorsCountryOrRegionCode["Mo"]="MO";SponsorsCountryOrRegionCode["Mp"]="MP";SponsorsCountryOrRegionCode["Mq"]="MQ";SponsorsCountryOrRegionCode["Mr"]="MR";SponsorsCountryOrRegionCode["Ms"]="MS";SponsorsCountryOrRegionCode["Mt"]="MT";SponsorsCountryOrRegionCode["Mu"]="MU";SponsorsCountryOrRegionCode["Mv"]="MV";SponsorsCountryOrRegionCode["Mw"]="MW";SponsorsCountryOrRegionCode["Mx"]="MX";SponsorsCountryOrRegionCode["My"]="MY";SponsorsCountryOrRegionCode["Mz"]="MZ";SponsorsCountryOrRegionCode["Na"]="NA";SponsorsCountryOrRegionCode["Nc"]="NC";SponsorsCountryOrRegionCode["Ne"]="NE";SponsorsCountryOrRegionCode["Nf"]="NF";SponsorsCountryOrRegionCode["Ng"]="NG";SponsorsCountryOrRegionCode["Ni"]="NI";SponsorsCountryOrRegionCode["Nl"]="NL";SponsorsCountryOrRegionCode["No"]="NO";SponsorsCountryOrRegionCode["Np"]="NP";SponsorsCountryOrRegionCode["Nr"]="NR";SponsorsCountryOrRegionCode["Nu"]="NU";SponsorsCountryOrRegionCode["Nz"]="NZ";SponsorsCountryOrRegionCode["Om"]="OM";SponsorsCountryOrRegionCode["Pa"]="PA";SponsorsCountryOrRegionCode["Pe"]="PE";SponsorsCountryOrRegionCode["Pf"]="PF";SponsorsCountryOrRegionCode["Pg"]="PG";SponsorsCountryOrRegionCode["Ph"]="PH";SponsorsCountryOrRegionCode["Pk"]="PK";SponsorsCountryOrRegionCode["Pl"]="PL";SponsorsCountryOrRegionCode["Pm"]="PM";SponsorsCountryOrRegionCode["Pn"]="PN";SponsorsCountryOrRegionCode["Pr"]="PR";SponsorsCountryOrRegionCode["Ps"]="PS";SponsorsCountryOrRegionCode["Pt"]="PT";SponsorsCountryOrRegionCode["Pw"]="PW";SponsorsCountryOrRegionCode["Py"]="PY";SponsorsCountryOrRegionCode["Qa"]="QA";SponsorsCountryOrRegionCode["Re"]="RE";SponsorsCountryOrRegionCode["Ro"]="RO";SponsorsCountryOrRegionCode["Rs"]="RS";SponsorsCountryOrRegionCode["Ru"]="RU";SponsorsCountryOrRegionCode["Rw"]="RW";SponsorsCountryOrRegionCode["Sa"]="SA";SponsorsCountryOrRegionCode["Sb"]="SB";SponsorsCountryOrRegionCode["Sc"]="SC";SponsorsCountryOrRegionCode["Sd"]="SD";SponsorsCountryOrRegionCode["Se"]="SE";SponsorsCountryOrRegionCode["Sg"]="SG";SponsorsCountryOrRegionCode["Sh"]="SH";SponsorsCountryOrRegionCode["Si"]="SI";SponsorsCountryOrRegionCode["Sj"]="SJ";SponsorsCountryOrRegionCode["Sk"]="SK";SponsorsCountryOrRegionCode["Sl"]="SL";SponsorsCountryOrRegionCode["Sm"]="SM";SponsorsCountryOrRegionCode["Sn"]="SN";SponsorsCountryOrRegionCode["So"]="SO";SponsorsCountryOrRegionCode["Sr"]="SR";SponsorsCountryOrRegionCode["Ss"]="SS";SponsorsCountryOrRegionCode["St"]="ST";SponsorsCountryOrRegionCode["Sv"]="SV";SponsorsCountryOrRegionCode["Sx"]="SX";SponsorsCountryOrRegionCode["Sz"]="SZ";SponsorsCountryOrRegionCode["Tc"]="TC";SponsorsCountryOrRegionCode["Td"]="TD";SponsorsCountryOrRegionCode["Tf"]="TF";SponsorsCountryOrRegionCode["Tg"]="TG";SponsorsCountryOrRegionCode["Th"]="TH";SponsorsCountryOrRegionCode["Tj"]="TJ";SponsorsCountryOrRegionCode["Tk"]="TK";SponsorsCountryOrRegionCode["Tl"]="TL";SponsorsCountryOrRegionCode["Tm"]="TM";SponsorsCountryOrRegionCode["Tn"]="TN";SponsorsCountryOrRegionCode["To"]="TO";SponsorsCountryOrRegionCode["Tr"]="TR";SponsorsCountryOrRegionCode["Tt"]="TT";SponsorsCountryOrRegionCode["Tv"]="TV";SponsorsCountryOrRegionCode["Tw"]="TW";SponsorsCountryOrRegionCode["Tz"]="TZ";SponsorsCountryOrRegionCode["Ua"]="UA";SponsorsCountryOrRegionCode["Ug"]="UG";SponsorsCountryOrRegionCode["Um"]="UM";SponsorsCountryOrRegionCode["Us"]="US";SponsorsCountryOrRegionCode["Uy"]="UY";SponsorsCountryOrRegionCode["Uz"]="UZ";SponsorsCountryOrRegionCode["Va"]="VA";SponsorsCountryOrRegionCode["Vc"]="VC";SponsorsCountryOrRegionCode["Ve"]="VE";SponsorsCountryOrRegionCode["Vg"]="VG";SponsorsCountryOrRegionCode["Vi"]="VI";SponsorsCountryOrRegionCode["Vn"]="VN";SponsorsCountryOrRegionCode["Vu"]="VU";SponsorsCountryOrRegionCode["Wf"]="WF";SponsorsCountryOrRegionCode["Ws"]="WS";SponsorsCountryOrRegionCode["Ye"]="YE";SponsorsCountryOrRegionCode["Yt"]="YT";SponsorsCountryOrRegionCode["Za"]="ZA";SponsorsCountryOrRegionCode["Zm"]="ZM";SponsorsCountryOrRegionCode["Zw"]="ZW";})(SponsorsCountryOrRegionCode||(SponsorsCountryOrRegionCode={}));/** The different kinds of goals a GitHub Sponsors member can have. */let SponsorsGoalKind;/** A GitHub Sponsors listing. */(function(SponsorsGoalKind){SponsorsGoalKind["MonthlySponsorshipAmount"]="MONTHLY_SPONSORSHIP_AMOUNT";SponsorsGoalKind["TotalSponsorsCount"]="TOTAL_SPONSORS_COUNT";})(SponsorsGoalKind||(SponsorsGoalKind={}));/** The different kinds of records that can be featured on a GitHub Sponsors profile page. */let SponsorsListingFeaturedItemFeatureableType;/** A GitHub Sponsors tier associated with a GitHub Sponsors listing. */(function(SponsorsListingFeaturedItemFeatureableType){SponsorsListingFeaturedItemFeatureableType["Repository"]="REPOSITORY";SponsorsListingFeaturedItemFeatureableType["User"]="USER";})(SponsorsListingFeaturedItemFeatureableType||(SponsorsListingFeaturedItemFeatureableType={}));/** Properties by which Sponsors tiers connections can be ordered. */let SponsorsTierOrderField;/** A sponsorship relationship between a sponsor and a maintainer */(function(SponsorsTierOrderField){SponsorsTierOrderField["CreatedAt"]="CREATED_AT";SponsorsTierOrderField["MonthlyPriceInCents"]="MONTHLY_PRICE_IN_CENTS";})(SponsorsTierOrderField||(SponsorsTierOrderField={}));/** Properties by which sponsorship update connections can be ordered. */let SponsorshipNewsletterOrderField;/** Ordering options for sponsorship connections. */(function(SponsorshipNewsletterOrderField){SponsorshipNewsletterOrderField["CreatedAt"]="CREATED_AT";})(SponsorshipNewsletterOrderField||(SponsorshipNewsletterOrderField={}));/** Properties by which sponsorship connections can be ordered. */let SponsorshipOrderField;/** The privacy of a sponsorship */(function(SponsorshipOrderField){SponsorshipOrderField["CreatedAt"]="CREATED_AT";})(SponsorshipOrderField||(SponsorshipOrderField={}));let SponsorshipPrivacy;/** The possible default commit messages for squash merges. */(function(SponsorshipPrivacy){SponsorshipPrivacy["Private"]="PRIVATE";SponsorshipPrivacy["Public"]="PUBLIC";})(SponsorshipPrivacy||(SponsorshipPrivacy={}));let SquashMergeCommitMessage;/** The possible default commit titles for squash merges. */(function(SquashMergeCommitMessage){SquashMergeCommitMessage["Blank"]="BLANK";SquashMergeCommitMessage["CommitMessages"]="COMMIT_MESSAGES";SquashMergeCommitMessage["PrBody"]="PR_BODY";})(SquashMergeCommitMessage||(SquashMergeCommitMessage={}));let SquashMergeCommitTitle;/** Represents an SSH signature on a Commit or Tag. */(function(SquashMergeCommitTitle){SquashMergeCommitTitle["CommitOrPrTitle"]="COMMIT_OR_PR_TITLE";SquashMergeCommitTitle["PrTitle"]="PR_TITLE";})(SquashMergeCommitTitle||(SquashMergeCommitTitle={}));/** Properties by which star connections can be ordered. */let StarOrderField;/** The connection type for User. */(function(StarOrderField){StarOrderField["StarredAt"]="STARRED_AT";})(StarOrderField||(StarOrderField={}));/** The possible commit status states. */let StatusState;/** Autogenerated input type of SubmitPullRequestReview */(function(StatusState){StatusState["Error"]="ERROR";StatusState["Expected"]="EXPECTED";StatusState["Failure"]="FAILURE";StatusState["Pending"]="PENDING";StatusState["Success"]="SUCCESS";})(StatusState||(StatusState={}));/** The possible states of a subscription. */let SubscriptionState;/** A suggestion to review a pull request based on a user's commit history and review comments. */(function(SubscriptionState){SubscriptionState["Ignored"]="IGNORED";SubscriptionState["Subscribed"]="SUBSCRIBED";SubscriptionState["Unsubscribed"]="UNSUBSCRIBED";})(SubscriptionState||(SubscriptionState={}));/** Properties by which team discussion comment connections can be ordered. */let TeamDiscussionCommentOrderField;/** The connection type for TeamDiscussion. */(function(TeamDiscussionCommentOrderField){TeamDiscussionCommentOrderField["Number"]="NUMBER";})(TeamDiscussionCommentOrderField||(TeamDiscussionCommentOrderField={}));/** Properties by which team discussion connections can be ordered. */let TeamDiscussionOrderField;/** An edge in a connection. */(function(TeamDiscussionOrderField){TeamDiscussionOrderField["CreatedAt"]="CREATED_AT";})(TeamDiscussionOrderField||(TeamDiscussionOrderField={}));/** Properties by which team member connections can be ordered. */let TeamMemberOrderField;/** The possible team member roles; either 'maintainer' or 'member'. */(function(TeamMemberOrderField){TeamMemberOrderField["CreatedAt"]="CREATED_AT";TeamMemberOrderField["Login"]="LOGIN";})(TeamMemberOrderField||(TeamMemberOrderField={}));let TeamMemberRole;/** Defines which types of team members are included in the returned list. Can be one of IMMEDIATE, CHILD_TEAM or ALL. */(function(TeamMemberRole){TeamMemberRole["Maintainer"]="MAINTAINER";TeamMemberRole["Member"]="MEMBER";})(TeamMemberRole||(TeamMemberRole={}));let TeamMembershipType;/** Ways in which team connections can be ordered. */(function(TeamMembershipType){TeamMembershipType["All"]="ALL";TeamMembershipType["ChildTeam"]="CHILD_TEAM";TeamMembershipType["Immediate"]="IMMEDIATE";})(TeamMembershipType||(TeamMembershipType={}));/** Properties by which team connections can be ordered. */let TeamOrderField;/** The possible team privacy values. */(function(TeamOrderField){TeamOrderField["Name"]="NAME";})(TeamOrderField||(TeamOrderField={}));let TeamPrivacy;/** Audit log entry for a team.remove_member event. */(function(TeamPrivacy){TeamPrivacy["Secret"]="SECRET";TeamPrivacy["Visible"]="VISIBLE";})(TeamPrivacy||(TeamPrivacy={}));/** Properties by which team repository connections can be ordered. */let TeamRepositoryOrderField;/** The role of a user on a team. */(function(TeamRepositoryOrderField){TeamRepositoryOrderField["CreatedAt"]="CREATED_AT";TeamRepositoryOrderField["Name"]="NAME";TeamRepositoryOrderField["Permission"]="PERMISSION";TeamRepositoryOrderField["PushedAt"]="PUSHED_AT";TeamRepositoryOrderField["Stargazers"]="STARGAZERS";TeamRepositoryOrderField["UpdatedAt"]="UPDATED_AT";})(TeamRepositoryOrderField||(TeamRepositoryOrderField={}));let TeamRole;/** A text match within a search result. */(function(TeamRole){TeamRole["Admin"]="ADMIN";TeamRole["Member"]="MEMBER";})(TeamRole||(TeamRole={}));/** Reason that the suggested topic is declined. */let TopicSuggestionDeclineReason;/** The possible states of a tracked issue. */(function(TopicSuggestionDeclineReason){TopicSuggestionDeclineReason["NotRelevant"]="NOT_RELEVANT";TopicSuggestionDeclineReason["PersonalPreference"]="PERSONAL_PREFERENCE";TopicSuggestionDeclineReason["TooGeneral"]="TOO_GENERAL";TopicSuggestionDeclineReason["TooSpecific"]="TOO_SPECIFIC";})(TopicSuggestionDeclineReason||(TopicSuggestionDeclineReason={}));let TrackedIssueStates;/** Autogenerated input type of TransferEnterpriseOrganization */(function(TrackedIssueStates){TrackedIssueStates["Closed"]="CLOSED";TrackedIssueStates["Open"]="OPEN";})(TrackedIssueStates||(TrackedIssueStates={}));/** The possible durations that a user can be blocked for. */let UserBlockDuration;/** Represents a 'user_blocked' event on a given user. */(function(UserBlockDuration){UserBlockDuration["OneDay"]="ONE_DAY";UserBlockDuration["OneMonth"]="ONE_MONTH";UserBlockDuration["OneWeek"]="ONE_WEEK";UserBlockDuration["Permanent"]="PERMANENT";UserBlockDuration["ThreeDays"]="THREE_DAYS";})(UserBlockDuration||(UserBlockDuration={}));/** Properties by which user status connections can be ordered. */let UserStatusOrderField;/** A domain that can be verified or approved for an organization or an enterprise. */(function(UserStatusOrderField){UserStatusOrderField["UpdatedAt"]="UPDATED_AT";})(UserStatusOrderField||(UserStatusOrderField={}));/** Properties by which verifiable domain connections can be ordered. */let VerifiableDomainOrderField;/** Types that can own a verifiable domain. */(function(VerifiableDomainOrderField){VerifiableDomainOrderField["CreatedAt"]="CREATED_AT";VerifiableDomainOrderField["Domain"]="DOMAIN";})(VerifiableDomainOrderField||(VerifiableDomainOrderField={}));/** Properties by which workflow run connections can be ordered. */let WorkflowRunOrderField;(function(WorkflowRunOrderField){WorkflowRunOrderField["CreatedAt"]="CREATED_AT";})(WorkflowRunOrderField||(WorkflowRunOrderField={}));const EnableAutoMerge=lib`
    mutation EnableAutoMerge($pullRequestId: ID!, $mergeMethod: PullRequestMergeMethod!) {
  enablePullRequestAutoMerge(
    input: {pullRequestId: $pullRequestId, mergeMethod: $mergeMethod}
  ) {
    pullRequest {
      autoMergeRequest {
        enabledAt
        enabledBy {
          login
        }
      }
    }
  }
}
    `;
;// CONCATENATED MODULE: ./src/utils.ts





async function loggedExec(commandLine, args, options = {}) {
  let errors = '';
  const res = await (0,exec.exec)(commandLine, args, {
    env: {
      ...process.env
    },
    listeners: {
      stderr: data => {
        errors += data.toString();
      }
    },
    ...options
  });
  if (res > 0) throw new Error(`Failed to run operation ${errors}`);
}
async function npmAuth() {
  const privateRegistry = (0,core.getInput)('private-npm-registry');
  const privateRegistryToken = (0,core.getInput)('private-npm-token');
  const npmToken = process.env.NPM_TOKEN;
  if (npmToken || privateRegistryToken && privateRegistry) {
    if (privateRegistryToken && privateRegistry) {
      (0,core.setSecret)(privateRegistryToken);
      console.log('authenticating with registry', privateRegistry);
      await (0,exec.exec)(`/bin/bash -c "echo //${privateRegistry}/:_authToken=${privateRegistryToken} >> .npmrc"`);
    }
    if (npmToken && npmToken.length > 0) {
      await (0,exec.exec)(`/bin/bash -c "echo //registry.npmjs.org/:_authToken=${npmToken} >> .npmrc"`);
    }
    await (0,exec.exec)('cp', [`.npmrc`, `${process.env.HOME}/.npmrc`]);
  }
}
function getMergeMethod() {
  const mergeMethod = (0,core.getInput)('merge-method');
  const result = Object.values(MergeMethod).find(m => m.toLowerCase() === mergeMethod.toLowerCase());
  return result !== null && result !== void 0 ? result : MergeMethod.Rebase;
}
async function getPRByNumber() {
  var _process$env$GITHUB_T;
  const requestPayload = github.context.payload;
  const ok = github.getOctokit((_process$env$GITHUB_T = process.env.GITHUB_TOKEN) !== null && _process$env$GITHUB_T !== void 0 ? _process$env$GITHUB_T : process.env.GH_TOKEN);
  const res = await ok.rest.pulls.get({
    ...github.context.repo,
    pull_number: requestPayload.pull_request.number
  });
  return res.data;
}
async function getPrByCommitRef(commitId) {
  var _process$env$GITHUB_T2;
  const {
    repo,
    owner
  } = github.context.repo;
  const ok = github.getOctokit((_process$env$GITHUB_T2 = process.env.GITHUB_TOKEN) !== null && _process$env$GITHUB_T2 !== void 0 ? _process$env$GITHUB_T2 : process.env.GH_TOKEN);
  const response = await ok.rest.pulls.list({
    owner,
    repo,
    sort: 'updated',
    direction: 'desc',
    state: 'open'
  });
  return response.data.find(pr => pr.head.sha === commitId);
}
function getPr() {
  var _github$context$paylo;
  if ((_github$context$paylo = github.context.payload.pull_request) !== null && _github$context$paylo !== void 0 && _github$context$paylo.number) {
    return getPRByNumber();
  }
  return getPrByCommitRef(github.context.sha);
}
async function approvePR() {
  var _process$env$GITHUB_T3;
  const ok = github.getOctokit((_process$env$GITHUB_T3 = process.env.GITHUB_TOKEN) !== null && _process$env$GITHUB_T3 !== void 0 ? _process$env$GITHUB_T3 : process.env.GH_TOKEN);
  const pullRequest = await getPr();
  if (pullRequest) {
    await ok.rest.pulls.createReview({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: pullRequest.number,
      event: 'APPROVE'
    });
  } else {
    console.log(`no pull request found for ref ${github.context.sha}`);
  }
}
async function mergePR() {
  var _process$env$GITHUB_T4;
  const ok = github.getOctokit((_process$env$GITHUB_T4 = process.env.GITHUB_TOKEN) !== null && _process$env$GITHUB_T4 !== void 0 ? _process$env$GITHUB_T4 : process.env.GH_TOKEN);
  const query = EnableAutoMerge.loc.source.body;
  const pullRequest = await getPr();
  if (pullRequest) {
    const res = await ok.graphql({
      query,
      pullRequestId: pullRequest.node_id,
      mergeMethod: getMergeMethod()
    });
    console.log('automerge response', JSON.stringify(res));
  } else {
    console.log(`no pull request found for ref ${github.context.sha}`);
  }
}
function isDependabot() {
  const dependabot = github.context.actor === 'dependabot[bot]';
  if (dependabot) console.log('detected dependabot actor');
  return dependabot;
}
function isDependabotPRTarget() {
  const dependabot = github.context.eventName === 'pull_request_target' && isDependabot();
  if (dependabot) console.log('detected dependabot PR');
  return dependabot;
}
function isAutoMergeCandidate() {
  const autoMergeUser = (0,core.getInput)('auto-merge-bot');
  const shouldAutoMerge = github.context.actor === autoMergeUser;
  if (shouldAutoMerge) console.log('detected auto merge PR candidate');
  if (shouldAutoMerge) console.log(`actor: ${github.context.actor}, auto-merge-bot: ${autoMergeUser}`);
  return shouldAutoMerge;
}
;// CONCATENATED MODULE: ./src/approve-and-merge.ts

async function approveAndMerge() {
  if (isDependabotPRTarget() || isAutoMergeCandidate()) {
    console.log('auto approving and merging');
    try {
      await approvePR();
      await mergePR();
    } catch (err) {
      console.log('unable to auto approve/merge PR', err.message);
    }
  }
}
;// CONCATENATED MODULE: ./src/install.ts



async function install() {
  // for dependabot PRs, check out PR head before install
  if (isDependabotPRTarget()) {
    const requestPayload = github.context.payload;
    const {
      ref
    } = requestPayload.pull_request.head;
    console.log(`checking out ref: ${ref}`);
    await loggedExec('git', ['checkout', ref]);
  }

  // auth if needed
  await npmAuth();

  // install deps
  const installCommand = (0,core.getInput)('install-command');
  const installCommandComponents = installCommand.split(' ');
  const installBin = installCommandComponents.shift() || 'npm';
  await loggedExec(installBin, installCommandComponents);

  // for dependabot PRs, check out base for build/test
  if (isDependabotPRTarget()) {
    const requestPayload = github.context.payload;
    const {
      ref
    } = requestPayload.pull_request.base;
    console.log(`checking out ref: ${ref}`);
    await loggedExec('git', ['checkout', ref]);
  }

  // build (if needed)
  const buildCommand = (0,core.getInput)('build-command');
  if (buildCommand && buildCommand.length > 0) {
    const buildCommandComponents = buildCommand.split(' ');
    const buildBin = buildCommandComponents.shift();
    if (buildBin) await loggedExec(buildBin, buildCommandComponents);
  }
}
;// CONCATENATED MODULE: ./src/main.ts





async function main() {
  try {
    if (isDependabot() && !isDependabotPRTarget()) return;
    await install();
    await loggedExec('npm', ['test']);
    if (github.context.eventName === 'push') {
      const mainBranch = (0,core.getInput)('main-branch');
      const pushPayload = github.context.payload;
      if (pushPayload.ref.split('/').pop() === mainBranch) {
        const releaseCommand = (0,core.getInput)('release-command');
        const releaseCommandComponents = releaseCommand.split(' ');
        const releaseBin = releaseCommandComponents.shift() || 'npm';
        await loggedExec(releaseBin, releaseCommandComponents);
      }
    }
    await approveAndMerge();
  } catch (error) {
    console.error(error);
    (0,core.setFailed)(error.message);
  }
}
main();
})();

module.exports = __webpack_exports__;
/******/ })()
;