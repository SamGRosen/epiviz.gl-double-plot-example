// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"6wDK3":[function(require,module,exports) {
var _schemaProcessor66236800Js = require('./schema-processor-66236800.js');
var _utilities52abb45cJs = require('./utilities-52abb45c.js');
class Drawer {
  /**
  * An interface for drawing on a canvas.
  *
  * @param {Object} drawingData object containing keys for {@link Drawer#receiveViewport}
  *  and canvas key used for drawing.
  */
  constructor(drawingData) {
    this.canvas = drawingData.canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.receiveViewport(drawingData);
  }
  /**
  * Method to set the viewport for the drawer.
  *
  * @param {Object} viewportData object containing minX,maxX,minY,maxY,xRange,yRange viewport data for drawer
  */
  receiveViewport(viewportData) {
    this.minX = viewportData.minX;
    this.maxX = viewportData.maxX;
    this.minY = viewportData.minY;
    this.maxY = viewportData.maxY;
    this.currentXRange = viewportData.xRange;
    this.currentYRange = viewportData.yRange;
    this.needsAnimation = true;
  }
  /**
  * Method to implement which signifies a frame has been processed. Used to
  * display FPS meter.
  */
  tick() {}
  /**
  * Method to implement animating a frame.
  */
  animate() {}
  /**
  * Method to implement preprocessing for rendering frames.
  */
  render() {
    if (this.lastFrame) {
      // Avoid overlapping animation requests
      cancelAnimationFrame(this.lastFrame);
    }
  }
}
const sizeOfGeneRangeForTriangles = 1000000;
class SemanticZoomer {
  /**
  * Gives guidance or takes control over canvas when semantic zooming
  * is necessary. Developers should extend this class to create semantic zooming
  * behavior.
  * @param {SchemaProcessor} schemaHelper
  */
  constructor(schemaHelper) {
    this.schemaHelper = schemaHelper;
  }
  getRecommendedDrawingMode(trackShader, currentXRange, currentYRange) {
    if (trackShader.drawMode !== "TRIANGLES") {
      return trackShader.drawMode;
    }
    if (!(this.schemaHelper.xScale instanceof _utilities52abb45cJs.G) && !(this.schemaHelper.yScale instanceof _utilities52abb45cJs.G)) {
      // Currently only used for genome tracks
      return "TRIANGLES";
    }
    if (this.schemaHelper.xScale instanceof _utilities52abb45cJs.G) {
      const numberOfGenes = this.schemaHelper.xScale.mapGenomeIndexToClipSpaceInverse(currentXRange[1]) - this.schemaHelper.xScale.mapGenomeIndexToClipSpaceInverse(currentXRange[0]);
      if (numberOfGenes < sizeOfGeneRangeForTriangles) {
        return "TRIANGLES";
      }
    }
    if (this.schemaHelper.yScale instanceof _utilities52abb45cJs.G) {
      const numberOfGenes = this.schemaHelper.yScale.mapGenomeIndexToClipSpaceInverse(currentYRange[1]) - this.schemaHelper.yScale.mapGenomeIndexToClipSpaceInverse(currentYRange[0]);
      if (numberOfGenes < sizeOfGeneRangeForTriangles) {
        return "TRIANGLES";
      }
    }
    return "LINES";
  }
}
/**
* A vertex shader meant to take in positions, colors, and contain uniforms for zooming and panning.
*/
const baseVertexShader = `#version 300 es
  precision highp float;

  in vec2 a_VertexPosition;

  uniform float pointSizeModifier;
  // [x1, y1,x2, y2] of viewing window
  uniform vec4 viewport;

  out vec4 vColor;
`;
/**
* Appended to end of vertex shader. Includes math for zooming and panning,
* ability to unpack colors and send to fragment shader.
*/
const vertexShaderSuffix = (opacityName, colorName, sizeName) => `
  vec3 unpackColor(float f) {
    vec3 colorVec;
    colorVec.r = floor(f / 65536.0);
    colorVec.g = floor((f - colorVec.r * 65536.0) / 256.0);
    colorVec.b = floor(f - colorVec.r * 65536.0 - colorVec.g * 256.0);
    return colorVec / 256.0;
  }

  void main(void) {
    // Subtract each vertex by midpoint of the viewport 
    // window to center points. Then scale by ratio of max window size to window size
    gl_Position = vec4(
       (a_VertexPosition.x - (viewport.z + viewport.x)/2.0) * 2.0/(viewport.z - viewport.x),
       (a_VertexPosition.y - (viewport.w + viewport.y)/2.0) * 2.0/(viewport.w - viewport.y),
        0,
        1
    );
    vec3 unpackedValues = unpackColor(${colorName});

    vColor = vec4(
      unpackedValues.rgb,
      ${opacityName}
    );
    gl_PointSize = ${sizeName} * pointSizeModifier;
  }
`;
/**
* A fragment shader which chooses color simply passed to by vertex shader.
*/
const varyingColorsFragmentShader = `#version 300 es
  precision highp float;

  in vec4 vColor;

  out vec4 outColor;
  void main(void) {
    outColor = vColor;
  }
`;
class VertexShader {
  static SUPPORTED_CHANNEL_ATTRIBUTES = Object.freeze(["color", "size", "opacity"]);
  /**
  * A class meant to contain all the relevant information for a shader program, such as uniforms
  * attributes, and ultimately the vertices. Do not use the constructor. Use VertexShader.fromSchema
  * or fromTrack instead.
  */
  constructor() {
    this.shader = baseVertexShader;
    this.uniforms = {};
    // Add position buffers here since x and y channels don't map nicely to shader code
    this.attributes = {
      a_VertexPosition: {
        numComponents: 2,
        data: []
      }
    };
  }
  /**
  * Add a mark to the buffers by calculating its vertices, then adding its
  * attributes such as size, color, or opacity to the buffers.
  *
  * @param {Object} mark passed in from SchemaHelper in webgl-drawer.js
  * @param {VertexCalculator} vertexCalculator used to calculate vertices for a track
  */
  addMarkToBuffers(mark, vertexCalculator) {
    const vertices = vertexCalculator.calculateForMark(mark);
    this.attributes.a_VertexPosition.data.push(...vertices);
    for (const channel of Object.keys(this.attributes)) {
      if (channel === "a_VertexPosition") {
        // handled above
        continue;
      }
      for (let i = 0; i < vertices.length / 2; i++) {
        this.attributes[channel].data.push(mark[channel.substring(2)]);
      }
    }
    this.lastMark = mark;
  }
  /**
  * Set the webgl draw mode to use
  * @param {String} drawMode
  */
  setDrawMode(drawMode) {
    this.drawMode = drawMode;
  }
  /**
  * Signify this channel varies from mark to mark, so build buffers to carry this info
  * for the program. Also add desclaration to shader code.
  *
  * @param {String} channel such as opacity, color, size
  * @param {Number} numComponents number of components of this attribute to pull in, usually 1
  * @returns this
  */
  addChannelBuffer(channel, numComponents = 1) {
    this.attributes[`a_${channel}`] = {
      numComponents,
      data: []
    };
    this.shader += `in float a_${channel};\n`;
    return this;
  }
  /**
  * Signify this channel is the same for every mark, so set a uniform to refer to.
  *
  * @param {String} channel such as opacity, color, size
  * @param {Number} uniform value to set uniform to, must be a float
  * @returns this
  */
  setChannelUniform(channel, uniform) {
    this.uniforms[`u_${channel}`] = uniform;
    this.shader += `uniform float u_${channel};\n`;
    return this;
  }
  /**
  * Build the shader code after uniforms and attributes have been finalized.
  *
  * @returns shader code to compile
  */
  buildShader() {
    // Assumes color, opacity, size channels have been used in
    // addChannelBuffer or addChannelUniform
    if (this.built) {
      return this.shader;
    }
    const colorName = ("a_color" in this.attributes) ? "a_color" : "u_color";
    const opacityName = ("a_opacity" in this.attributes) ? "a_opacity" : "u_opacity";
    const sizeName = ("a_size" in this.attributes) ? "a_size" : "u_size";
    this.shader += vertexShaderSuffix(opacityName, colorName, sizeName);
    this.built = true;
    return this.shader;
  }
  /**
  * Construct the vertex shaders for each track in the schema.
  *
  * @param {Object} schema of visualization
  * @returns an array of {@link VertexShaders}s
  */
  static fromSchema(schema) {
    // Returns one per track
    return schema.tracks.map(VertexShader.fromTrack);
  }
  /**
  * Construct the vertex shader a track including setting attributes, uniforms, drawMode.
  *
  * @param {Object} track from schema
  * @returns a {@link VertexShaders}
  */
  static fromTrack(track) {
    // Given a track produce attributes and uniforms that describe a webgl drawing
    const vsBuilder = new VertexShader();
    vsBuilder.setDrawMode(_schemaProcessor66236800Js.g(track));
    for (let channel of Object.keys(_schemaProcessor66236800Js.D)) {
      if (channel === "shape") {
        // Changes vertex positions and draw mode, does not change shader code
        continue;
      }
      if ((channel in track)) {
        // Schema specifies channel
        if (track[channel].value) {
          // Channel has default value
          if (channel === "color") {
            track[channel].value = _utilities52abb45cJs.c(track[channel].value);
          }
          vsBuilder.setChannelUniform(channel, track[channel].value);
        } else {
          // Set Channel as attribute, x and y will always reach here
          if (channel === "y" || channel === "x") {
            // Skip for x and y as handled in constructor
            continue;
          }
          // These are currently the only supported channels for shader usage
          if (VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) {
            vsBuilder.addChannelBuffer(channel, _schemaProcessor66236800Js.D[channel].numComponents);
          }
        }
      } else {
        // Channel not listed, set default
        if (VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.includes(channel)) {
          vsBuilder.setChannelUniform(channel, _schemaProcessor66236800Js.D[channel].value);
        }
      }
    }
    return vsBuilder;
  }
}
/*@license twgl.js 4.19.1 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/twgl.js for details*/
/*
* Copyright 2019 Gregg Tavares
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/
/*DataType*/
const BYTE = 0x1400;
const UNSIGNED_BYTE = 0x1401;
const SHORT = 0x1402;
const UNSIGNED_SHORT = 0x1403;
const INT = 0x1404;
const UNSIGNED_INT = 0x1405;
const FLOAT = 0x1406;
/**
* Get the GL type for a typedArray
* @param {ArrayBufferView} typedArray a typedArray
* @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
*   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
* @memberOf module:twgl/typedArray
*/
function getGLTypeForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array) {
    return BYTE;
  }
  // eslint-disable-line
  if (typedArray instanceof Uint8Array) {
    return UNSIGNED_BYTE;
  }
  // eslint-disable-line
  if (typedArray instanceof Uint8ClampedArray) {
    return UNSIGNED_BYTE;
  }
  // eslint-disable-line
  if (typedArray instanceof Int16Array) {
    return SHORT;
  }
  // eslint-disable-line
  if (typedArray instanceof Uint16Array) {
    return UNSIGNED_SHORT;
  }
  // eslint-disable-line
  if (typedArray instanceof Int32Array) {
    return INT;
  }
  // eslint-disable-line
  if (typedArray instanceof Uint32Array) {
    return UNSIGNED_INT;
  }
  // eslint-disable-line
  if (typedArray instanceof Float32Array) {
    return FLOAT;
  }
  // eslint-disable-line
  throw new Error('unsupported typed array type');
}
/**
* Get the GL type for a typedArray type
* @param {ArrayBufferView} typedArrayType a typedArray constructor
* @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
*   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
* @memberOf module:twgl/typedArray
*/
function getGLTypeForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array) {
    return BYTE;
  }
  // eslint-disable-line
  if (typedArrayType === Uint8Array) {
    return UNSIGNED_BYTE;
  }
  // eslint-disable-line
  if (typedArrayType === Uint8ClampedArray) {
    return UNSIGNED_BYTE;
  }
  // eslint-disable-line
  if (typedArrayType === Int16Array) {
    return SHORT;
  }
  // eslint-disable-line
  if (typedArrayType === Uint16Array) {
    return UNSIGNED_SHORT;
  }
  // eslint-disable-line
  if (typedArrayType === Int32Array) {
    return INT;
  }
  // eslint-disable-line
  if (typedArrayType === Uint32Array) {
    return UNSIGNED_INT;
  }
  // eslint-disable-line
  if (typedArrayType === Float32Array) {
    return FLOAT;
  }
  // eslint-disable-line
  throw new Error('unsupported typed array type');
}
const isArrayBuffer = typeof SharedArrayBuffer !== 'undefined' ? function isArrayBufferOrSharedArrayBuffer(a) {
  return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
} : function isArrayBuffer(a) {
  return a && a.buffer && a.buffer instanceof ArrayBuffer;
};
function error(...args) {
  console.error(...args);
}
function isBuffer(gl, t) {
  return typeof WebGLBuffer !== 'undefined' && t instanceof WebGLBuffer;
}
function isShader(gl, t) {
  return typeof WebGLShader !== 'undefined' && t instanceof WebGLShader;
}
function isTexture(gl, t) {
  return typeof WebGLTexture !== 'undefined' && t instanceof WebGLTexture;
}
/*
* Copyright 2019 Gregg Tavares
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/
const STATIC_DRAW = 0x88e4;
const ARRAY_BUFFER = 0x8892;
const ELEMENT_ARRAY_BUFFER = 0x8893;
const BUFFER_SIZE = 0x8764;
const BYTE$1 = 0x1400;
const UNSIGNED_BYTE$1 = 0x1401;
const SHORT$1 = 0x1402;
const UNSIGNED_SHORT$1 = 0x1403;
const INT$1 = 0x1404;
const UNSIGNED_INT$1 = 0x1405;
const FLOAT$1 = 0x1406;
const defaults = {
  attribPrefix: ""
};
function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, array, drawType || STATIC_DRAW);
}
/**
* Given typed array creates a WebGLBuffer and copies the typed array
* into it.
*
* @param {WebGLRenderingContext} gl A WebGLRenderingContext
* @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
* @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
* @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
* @return {WebGLBuffer} the created WebGLBuffer
* @memberOf module:twgl/attributes
*/
function createBufferFromTypedArray(gl, typedArray, type, drawType) {
  if (isBuffer(gl, typedArray)) {
    return typedArray;
  }
  type = type || ARRAY_BUFFER;
  const buffer = gl.createBuffer();
  setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
  return buffer;
}
function isIndices(name) {
  return name === "indices";
}
// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array) {
    return true;
  }
  // eslint-disable-line
  if (typedArray instanceof Uint8Array) {
    return true;
  }
  // eslint-disable-line
  return false;
}
// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array) {
    return true;
  }
  // eslint-disable-line
  if (typedArrayType === Uint8Array) {
    return true;
  }
  // eslint-disable-line
  return false;
}
function getArray(array) {
  return array.length ? array : array.data;
}
const texcoordRE = /coord|texture/i;
const colorRE = /color|colour/i;
function guessNumComponentsFromName(name, length) {
  let numComponents;
  if (texcoordRE.test(name)) {
    numComponents = 2;
  } else if (colorRE.test(name)) {
    numComponents = 4;
  } else {
    numComponents = 3;
  }
  if (length % numComponents > 0) {
    throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length} values is not evenly divisible by ${numComponents}. You should specify it.`);
  }
  return numComponents;
}
function getNumComponents(array, arrayName) {
  return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
}
function makeTypedArray(array, name) {
  if (isArrayBuffer(array)) {
    return array;
  }
  if (isArrayBuffer(array.data)) {
    return array.data;
  }
  if (Array.isArray(array)) {
    array = {
      data: array
    };
  }
  let Type = array.type;
  if (!Type) {
    if (isIndices(name)) {
      Type = Uint16Array;
    } else {
      Type = Float32Array;
    }
  }
  return new Type(array.data);
}
/**
* The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
* for the attribute.
*
* @typedef {Object} AttribInfo
* @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
*    disabled and set to this constant value and all other values will be ignored.
* @property {number} [numComponents] the number of components for this attribute.
* @property {number} [size] synonym for `numComponents`.
* @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
* @property {boolean} [normalize] whether or not to normalize the data. Default = false
* @property {number} [offset] offset into buffer in bytes. Default = 0
* @property {number} [stride] the stride in bytes per element. Default = 0
* @property {number} [divisor] the divisor in instances. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
*    where as anything else = do call it with this value
* @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
* @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
* @memberOf module:twgl
*/
/**
* Use this type of array spec when TWGL can't guess the type or number of components of an array
* @typedef {Object} FullArraySpec
* @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
*    disabled and set to this constant value and all other values will be ignored.
* @property {(number|number[]|ArrayBufferView)} data The data of the array. A number alone becomes the number of elements of type.
* @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
*    If `coord` is in the name assumes `numComponents = 2`.
*    If `color` is in the name assumes `numComponents = 4`.
*    otherwise assumes `numComponents = 3`
* @property {constructor} [type] type. This is only used if `data` is a JavaScript array. It is the constructor for the typedarray. (eg. `Uint8Array`).
* For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: Uint8Array, data: [255,0,255,255, ...], }`.
* @property {number} [size] synonym for `numComponents`.
* @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
* @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
* @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
* @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
*    where as anything else = do call it with this value
* @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
* @property {string} [name] synonym for `attrib`.
* @property {string} [attribName] synonym for `attrib`.
* @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
*    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
*    to provide this. Example:
*
*         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
*           position: [1, 2, 3, ... ],
*         });
*         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
*           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
*         });
*
* @memberOf module:twgl
*/
/**
* An individual array in {@link module:twgl.Arrays}
*
* When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
* the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
* be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
*
* @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
* @memberOf module:twgl
*/
/**
* This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
* attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
*
*     Bare JavaScript Arrays
*
*         var arrays = {
*            position: [-1, 1, 0],
*            normal: [0, 1, 0],
*            ...
*         }
*
*     Bare TypedArrays
*
*         var arrays = {
*            position: new Float32Array([-1, 1, 0]),
*            color: new Uint8Array([255, 128, 64, 255]),
*            ...
*         }
*
* *   Will guess at `numComponents` if not specified based on name.
*
*     If `coord` is in the name assumes `numComponents = 2`
*
*     If `color` is in the name assumes `numComponents = 4`
*
*     otherwise assumes `numComponents = 3`
*
* Objects with various fields. See {@link module:twgl.FullArraySpec}.
*
*     var arrays = {
*       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
*       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
*       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
*       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
*     };
*
* @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
* @memberOf module:twgl
*/
/**
* Creates a set of attribute data and WebGLBuffers from set of arrays
*
* Given
*
*      var arrays = {
*        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
*        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
*        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
*        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
*        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
*      };
*
* returns something like
*
*      var attribs = {
*        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
*        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
*        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
*        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
*      };
*
* notes:
*
* *   Arrays can take various forms
*
*     Bare JavaScript Arrays
*
*         var arrays = {
*            position: [-1, 1, 0],
*            normal: [0, 1, 0],
*            ...
*         }
*
*     Bare TypedArrays
*
*         var arrays = {
*            position: new Float32Array([-1, 1, 0]),
*            color: new Uint8Array([255, 128, 64, 255]),
*            ...
*         }
*
* *   Will guess at `numComponents` if not specified based on name.
*
*     If `coord` is in the name assumes `numComponents = 2`
*
*     If `color` is in the name assumes `numComponents = 4`
*
*     otherwise assumes `numComponents = 3`
*
* @param {WebGLRenderingContext} gl The webgl rendering context.
* @param {module:twgl.Arrays} arrays The arrays
* @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
*   This lets you share buffers. Any arrays you supply will override
*   the buffers from srcBufferInfo.
* @return {Object.<string, module:twgl.AttribInfo>} the attribs
* @memberOf module:twgl/attributes
*/
function createAttribsFromArrays(gl, arrays) {
  const attribs = {};
  Object.keys(arrays).forEach(function (arrayName) {
    if (!isIndices(arrayName)) {
      const array = arrays[arrayName];
      const attribName = array.attrib || array.name || array.attribName || defaults.attribPrefix + arrayName;
      if (array.value) {
        if (!Array.isArray(array.value) && !isArrayBuffer(array.value)) {
          throw new Error('array.value is not array or typedarray');
        }
        attribs[attribName] = {
          value: array.value
        };
      } else {
        let buffer;
        let type;
        let normalization;
        let numComponents;
        if (array.buffer && array.buffer instanceof WebGLBuffer) {
          buffer = array.buffer;
          numComponents = array.numComponents || array.size;
          type = array.type;
          normalization = array.normalize;
        } else if (typeof array === "number" || typeof array.data === "number") {
          const numValues = array.data || array;
          const arrayType = array.type || Float32Array;
          const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
          type = getGLTypeForTypedArrayType(arrayType);
          normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
          numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
          buffer = gl.createBuffer();
          gl.bindBuffer(ARRAY_BUFFER, buffer);
          gl.bufferData(ARRAY_BUFFER, numBytes, array.drawType || STATIC_DRAW);
        } else {
          const typedArray = makeTypedArray(array, arrayName);
          buffer = createBufferFromTypedArray(gl, typedArray, undefined, array.drawType);
          type = getGLTypeForTypedArray(typedArray);
          normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArray(typedArray);
          numComponents = getNumComponents(array, arrayName);
        }
        attribs[attribName] = {
          buffer: buffer,
          numComponents: numComponents,
          type: type,
          normalize: normalization,
          stride: array.stride || 0,
          offset: array.offset || 0,
          divisor: array.divisor === undefined ? undefined : array.divisor,
          drawType: array.drawType
        };
      }
    }
  });
  gl.bindBuffer(ARRAY_BUFFER, null);
  return attribs;
}
function getBytesPerValueForGLType(gl, type) {
  if (type === BYTE$1) return 1;
  // eslint-disable-line
  if (type === UNSIGNED_BYTE$1) return 1;
  // eslint-disable-line
  if (type === SHORT$1) return 2;
  // eslint-disable-line
  if (type === UNSIGNED_SHORT$1) return 2;
  // eslint-disable-line
  if (type === INT$1) return 4;
  // eslint-disable-line
  if (type === UNSIGNED_INT$1) return 4;
  // eslint-disable-line
  if (type === FLOAT$1) return 4;
  // eslint-disable-line
  return 0;
}
// Tries to get the number of elements from a set of arrays.
const positionKeys = ['position', 'positions', 'a_position'];
function getNumElementsFromAttributes(gl, attribs) {
  let key;
  let ii;
  for (ii = 0; ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if ((key in attribs)) {
      break;
    }
    key = defaults.attribPrefix + key;
    if ((key in attribs)) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(attribs)[0];
  }
  const attrib = attribs[key];
  gl.bindBuffer(ARRAY_BUFFER, attrib.buffer);
  const numBytes = gl.getBufferParameter(ARRAY_BUFFER, BUFFER_SIZE);
  gl.bindBuffer(ARRAY_BUFFER, null);
  const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
  const totalElements = numBytes / bytesPerValue;
  const numComponents = attrib.numComponents || attrib.size;
  // TODO: check stride
  const numElements = totalElements / numComponents;
  if (numElements % 1 !== 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
  }
  return numElements;
}
/**
* @typedef {Object} BufferInfo
* @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
* @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
* @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
* @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
* @memberOf module:twgl
*/
/**
* Creates a BufferInfo from an object of arrays.
*
* This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
* {@link module:twgl:drawBufferInfo}.
*
* Given an object like
*
*     var arrays = {
*       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
*       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
*       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
*       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
*     };
*
*  Creates an BufferInfo like this
*
*     bufferInfo = {
*       numElements: 4,        // or whatever the number of elements is
*       indices: WebGLBuffer,  // this property will not exist if there are no indices
*       attribs: {
*         position: { buffer: WebGLBuffer, numComponents: 3, },
*         normal:   { buffer: WebGLBuffer, numComponents: 3, },
*         texcoord: { buffer: WebGLBuffer, numComponents: 2, },
*       },
*     };
*
*  The properties of arrays can be JavaScript arrays in which case the number of components
*  will be guessed.
*
*     var arrays = {
*        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
*        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
*        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
*        indices:  [0, 1, 2, 1, 2, 3],
*     };
*
*  They can also be TypedArrays
*
*     var arrays = {
*        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
*        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
*        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
*        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
*     };
*
*  Or AugmentedTypedArrays
*
*     var positions = createAugmentedTypedArray(3, 4);
*     var texcoords = createAugmentedTypedArray(2, 4);
*     var normals   = createAugmentedTypedArray(3, 4);
*     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
*
*     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
*     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
*     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
*     indices.push([0, 1, 2, 1, 2, 3]);
*
*     var arrays = {
*        position: positions,
*        texcoord: texcoords,
*        normal:   normals,
*        indices:  indices,
*     };
*
* For the last example it is equivalent to
*
*     var bufferInfo = {
*       attribs: {
*         position: { numComponents: 3, buffer: gl.createBuffer(), },
*         texcoord: { numComponents: 2, buffer: gl.createBuffer(), },
*         normal: { numComponents: 3, buffer: gl.createBuffer(), },
*       },
*       indices: gl.createBuffer(),
*       numElements: 6,
*     };
*
*     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.position.buffer);
*     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
*     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.texcoord.buffer);
*     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
*     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.normal.buffer);
*     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
*     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
*     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
*
* @param {WebGLRenderingContext} gl A WebGLRenderingContext
* @param {module:twgl.Arrays} arrays Your data
* @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
*        buffer info to start from. WebGLBuffers etc specified
*        in the srcBufferInfo will be used in a new BufferInfo
*        with any arrays specified overriding the ones in
*        srcBufferInfo.
* @return {module:twgl.BufferInfo} A BufferInfo
* @memberOf module:twgl/attributes
*/
function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
  const newAttribs = createAttribsFromArrays(gl, arrays);
  const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
  bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
  const indices = arrays.indices;
  if (indices) {
    const newIndices = makeTypedArray(indices, "indices");
    bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER);
    bufferInfo.numElements = newIndices.length;
    bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
  } else if (!bufferInfo.numElements) {
    bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
  }
  return bufferInfo;
}
/*
* Copyright 2019 Gregg Tavares
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/
/**
* Gets the gl version as a number
* @param {WebGLRenderingContext} gl A WebGLRenderingContext
* @return {number} version of gl
* @private
*/
// function getVersionAsNumber(gl) {
// return parseFloat(gl.getParameter(gl.VERSION).substr(6));
// }
/**
* Check if context is WebGL 2.0
* @param {WebGLRenderingContext} gl A WebGLRenderingContext
* @return {bool} true if it's WebGL 2.0
* @memberOf module:twgl
*/
function isWebGL2(gl) {
  // This is the correct check but it's slow
  // return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
  // This might also be the correct check but I'm assuming it's slow-ish
  // return gl instanceof WebGL2RenderingContext;
  return !!gl.texStorage2D;
}
/**
* Gets a string for WebGL enum
*
* Note: Several enums are the same. Without more
* context (which function) it's impossible to always
* give the correct enum. As it is, for matching values
* it gives all enums. Checking the WebGL2RenderingContext
* that means
*
*      0     = ZERO | POINT | NONE | NO_ERROR
*      1     = ONE | LINES | SYNC_FLUSH_COMMANDS_BIT
*      32777 = BLEND_EQUATION_RGB | BLEND_EQUATION_RGB
*      36662 = COPY_READ_BUFFER | COPY_READ_BUFFER_BINDING
*      36663 = COPY_WRITE_BUFFER | COPY_WRITE_BUFFER_BINDING
*      36006 = FRAMEBUFFER_BINDING | DRAW_FRAMEBUFFER_BINDING
*
* It's also not useful for bits really unless you pass in individual bits.
* In other words
*
*     const bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
*     twgl.glEnumToString(gl, bits);  // not going to work
*
* Note that some enums only exist on extensions. If you
* want them to show up you need to pass the extension at least
* once. For example
*
*     const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
*     if (ext) {
*        twgl.glEnumToString(ext, 0);  // just prime the function
*
*        ..later..
*
*        const internalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
*        console.log(twgl.glEnumToString(gl, internalFormat));
*
* Notice I didn't have to pass the extension the second time. This means
* you can have place that generically gets an enum for texture formats for example.
* and as long as you primed the function with the extensions
*
* If you're using `twgl.addExtensionsToContext` to enable your extensions
* then twgl will automatically get the extension's enums.
*
* @param {WebGLRenderingContext} gl A WebGLRenderingContext or any extension object
* @param {number} value the value of the enum you want to look up.
* @return {string} enum string or hex value
* @memberOf module:twgl
* @function glEnumToString
*/
const glEnumToString = (function () {
  const haveEnumsForType = {};
  const enums = {};
  function addEnums(gl) {
    const type = gl.constructor.name;
    if (!haveEnumsForType[type]) {
      for (const key in gl) {
        if (typeof gl[key] === 'number') {
          const existing = enums[gl[key]];
          enums[gl[key]] = existing ? `${existing} | ${key}` : key;
        }
      }
      haveEnumsForType[type] = true;
    }
  }
  return function glEnumToString(gl, value) {
    addEnums(gl);
    return enums[value] || (typeof value === 'number' ? `0x${value.toString(16)}` : value);
  };
})();
/*
* Copyright 2019 Gregg Tavares
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/
/**
* Low level shader program related functions
*
* You should generally not need to use these functions. They are provided
* for those cases where you're doing something out of the ordinary
* and you need lower level access.
*
* For backward compatibility they are available at both `twgl.programs` and `twgl`
* itself
*
* See {@link module:twgl} for core functions
*
* @module twgl/programs
*/
const error$1 = error;
function getElementById(id) {
  return typeof document !== 'undefined' && document.getElementById ? document.getElementById(id) : null;
}
const TEXTURE0 = 0x84c0;
const ARRAY_BUFFER$1 = 0x8892;
const ELEMENT_ARRAY_BUFFER$1 = 0x8893;
const COMPILE_STATUS = 0x8b81;
const LINK_STATUS = 0x8b82;
const FRAGMENT_SHADER = 0x8b30;
const VERTEX_SHADER = 0x8b31;
const SEPARATE_ATTRIBS = 0x8c8d;
const ACTIVE_UNIFORMS = 0x8b86;
const ACTIVE_ATTRIBUTES = 0x8b89;
const TRANSFORM_FEEDBACK_VARYINGS = 0x8c83;
const ACTIVE_UNIFORM_BLOCKS = 0x8a36;
const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 0x8a44;
const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
const UNIFORM_BLOCK_DATA_SIZE = 0x8a40;
const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 0x8a43;
const FLOAT$3 = 0x1406;
const FLOAT_VEC2 = 0x8B50;
const FLOAT_VEC3 = 0x8B51;
const FLOAT_VEC4 = 0x8B52;
const INT$3 = 0x1404;
const INT_VEC2 = 0x8B53;
const INT_VEC3 = 0x8B54;
const INT_VEC4 = 0x8B55;
const BOOL = 0x8B56;
const BOOL_VEC2 = 0x8B57;
const BOOL_VEC3 = 0x8B58;
const BOOL_VEC4 = 0x8B59;
const FLOAT_MAT2 = 0x8B5A;
const FLOAT_MAT3 = 0x8B5B;
const FLOAT_MAT4 = 0x8B5C;
const SAMPLER_2D = 0x8B5E;
const SAMPLER_CUBE = 0x8B60;
const SAMPLER_3D = 0x8B5F;
const SAMPLER_2D_SHADOW = 0x8B62;
const FLOAT_MAT2x3 = 0x8B65;
const FLOAT_MAT2x4 = 0x8B66;
const FLOAT_MAT3x2 = 0x8B67;
const FLOAT_MAT3x4 = 0x8B68;
const FLOAT_MAT4x2 = 0x8B69;
const FLOAT_MAT4x3 = 0x8B6A;
const SAMPLER_2D_ARRAY = 0x8DC1;
const SAMPLER_2D_ARRAY_SHADOW = 0x8DC4;
const SAMPLER_CUBE_SHADOW = 0x8DC5;
const UNSIGNED_INT$3 = 0x1405;
const UNSIGNED_INT_VEC2 = 0x8DC6;
const UNSIGNED_INT_VEC3 = 0x8DC7;
const UNSIGNED_INT_VEC4 = 0x8DC8;
const INT_SAMPLER_2D = 0x8DCA;
const INT_SAMPLER_3D = 0x8DCB;
const INT_SAMPLER_CUBE = 0x8DCC;
const INT_SAMPLER_2D_ARRAY = 0x8DCF;
const UNSIGNED_INT_SAMPLER_2D = 0x8DD2;
const UNSIGNED_INT_SAMPLER_3D = 0x8DD3;
const UNSIGNED_INT_SAMPLER_CUBE = 0x8DD4;
const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;
const TEXTURE_2D$1 = 0x0DE1;
const TEXTURE_CUBE_MAP$1 = 0x8513;
const TEXTURE_3D$1 = 0x806F;
const TEXTURE_2D_ARRAY$1 = 0x8C1A;
const typeMap = {};
/**
* Returns the corresponding bind point for a given sampler type
*/
function getBindPointForSamplerType(gl, type) {
  return typeMap[type].bindPoint;
}
// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
// this code could be a lot smaller but that is sadly really slow (T_T)
function floatSetter(gl, location) {
  return function (v) {
    gl.uniform1f(location, v);
  };
}
function floatArraySetter(gl, location) {
  return function (v) {
    gl.uniform1fv(location, v);
  };
}
function floatVec2Setter(gl, location) {
  return function (v) {
    gl.uniform2fv(location, v);
  };
}
function floatVec3Setter(gl, location) {
  return function (v) {
    gl.uniform3fv(location, v);
  };
}
function floatVec4Setter(gl, location) {
  return function (v) {
    gl.uniform4fv(location, v);
  };
}
function intSetter(gl, location) {
  return function (v) {
    gl.uniform1i(location, v);
  };
}
function intArraySetter(gl, location) {
  return function (v) {
    gl.uniform1iv(location, v);
  };
}
function intVec2Setter(gl, location) {
  return function (v) {
    gl.uniform2iv(location, v);
  };
}
function intVec3Setter(gl, location) {
  return function (v) {
    gl.uniform3iv(location, v);
  };
}
function intVec4Setter(gl, location) {
  return function (v) {
    gl.uniform4iv(location, v);
  };
}
function uintSetter(gl, location) {
  return function (v) {
    gl.uniform1ui(location, v);
  };
}
function uintArraySetter(gl, location) {
  return function (v) {
    gl.uniform1uiv(location, v);
  };
}
function uintVec2Setter(gl, location) {
  return function (v) {
    gl.uniform2uiv(location, v);
  };
}
function uintVec3Setter(gl, location) {
  return function (v) {
    gl.uniform3uiv(location, v);
  };
}
function uintVec4Setter(gl, location) {
  return function (v) {
    gl.uniform4uiv(location, v);
  };
}
function floatMat2Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix2fv(location, false, v);
  };
}
function floatMat3Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix3fv(location, false, v);
  };
}
function floatMat4Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix4fv(location, false, v);
  };
}
function floatMat23Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix2x3fv(location, false, v);
  };
}
function floatMat32Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix3x2fv(location, false, v);
  };
}
function floatMat24Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix2x4fv(location, false, v);
  };
}
function floatMat42Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix4x2fv(location, false, v);
  };
}
function floatMat34Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix3x4fv(location, false, v);
  };
}
function floatMat43Setter(gl, location) {
  return function (v) {
    gl.uniformMatrix4x3fv(location, false, v);
  };
}
function samplerSetter(gl, type, unit, location) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  return isWebGL2(gl) ? function (textureOrPair) {
    let texture;
    let sampler;
    if (isTexture(gl, textureOrPair)) {
      texture = textureOrPair;
      sampler = null;
    } else {
      texture = textureOrPair.texture;
      sampler = textureOrPair.sampler;
    }
    gl.uniform1i(location, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
    gl.bindSampler(unit, sampler);
  } : function (texture) {
    gl.uniform1i(location, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
  };
}
function samplerArraySetter(gl, type, unit, location, size) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  const units = new Int32Array(size);
  for (let ii = 0; ii < size; ++ii) {
    units[ii] = unit + ii;
  }
  return isWebGL2(gl) ? function (textures) {
    gl.uniform1iv(location, units);
    textures.forEach(function (textureOrPair, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      let texture;
      let sampler;
      if (isTexture(gl, textureOrPair)) {
        texture = textureOrPair;
        sampler = null;
      } else {
        texture = textureOrPair.texture;
        sampler = textureOrPair.sampler;
      }
      gl.bindSampler(unit, sampler);
      gl.bindTexture(bindPoint, texture);
    });
  } : function (textures) {
    gl.uniform1iv(location, units);
    textures.forEach(function (texture, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      gl.bindTexture(bindPoint, texture);
    });
  };
}
typeMap[FLOAT$3] = {
  Type: Float32Array,
  size: 4,
  setter: floatSetter,
  arraySetter: floatArraySetter
};
typeMap[FLOAT_VEC2] = {
  Type: Float32Array,
  size: 8,
  setter: floatVec2Setter
};
typeMap[FLOAT_VEC3] = {
  Type: Float32Array,
  size: 12,
  setter: floatVec3Setter
};
typeMap[FLOAT_VEC4] = {
  Type: Float32Array,
  size: 16,
  setter: floatVec4Setter
};
typeMap[INT$3] = {
  Type: Int32Array,
  size: 4,
  setter: intSetter,
  arraySetter: intArraySetter
};
typeMap[INT_VEC2] = {
  Type: Int32Array,
  size: 8,
  setter: intVec2Setter
};
typeMap[INT_VEC3] = {
  Type: Int32Array,
  size: 12,
  setter: intVec3Setter
};
typeMap[INT_VEC4] = {
  Type: Int32Array,
  size: 16,
  setter: intVec4Setter
};
typeMap[UNSIGNED_INT$3] = {
  Type: Uint32Array,
  size: 4,
  setter: uintSetter,
  arraySetter: uintArraySetter
};
typeMap[UNSIGNED_INT_VEC2] = {
  Type: Uint32Array,
  size: 8,
  setter: uintVec2Setter
};
typeMap[UNSIGNED_INT_VEC3] = {
  Type: Uint32Array,
  size: 12,
  setter: uintVec3Setter
};
typeMap[UNSIGNED_INT_VEC4] = {
  Type: Uint32Array,
  size: 16,
  setter: uintVec4Setter
};
typeMap[BOOL] = {
  Type: Uint32Array,
  size: 4,
  setter: intSetter,
  arraySetter: intArraySetter
};
typeMap[BOOL_VEC2] = {
  Type: Uint32Array,
  size: 8,
  setter: intVec2Setter
};
typeMap[BOOL_VEC3] = {
  Type: Uint32Array,
  size: 12,
  setter: intVec3Setter
};
typeMap[BOOL_VEC4] = {
  Type: Uint32Array,
  size: 16,
  setter: intVec4Setter
};
typeMap[FLOAT_MAT2] = {
  Type: Float32Array,
  size: 16,
  setter: floatMat2Setter
};
typeMap[FLOAT_MAT3] = {
  Type: Float32Array,
  size: 36,
  setter: floatMat3Setter
};
typeMap[FLOAT_MAT4] = {
  Type: Float32Array,
  size: 64,
  setter: floatMat4Setter
};
typeMap[FLOAT_MAT2x3] = {
  Type: Float32Array,
  size: 24,
  setter: floatMat23Setter
};
typeMap[FLOAT_MAT2x4] = {
  Type: Float32Array,
  size: 32,
  setter: floatMat24Setter
};
typeMap[FLOAT_MAT3x2] = {
  Type: Float32Array,
  size: 24,
  setter: floatMat32Setter
};
typeMap[FLOAT_MAT3x4] = {
  Type: Float32Array,
  size: 48,
  setter: floatMat34Setter
};
typeMap[FLOAT_MAT4x2] = {
  Type: Float32Array,
  size: 32,
  setter: floatMat42Setter
};
typeMap[FLOAT_MAT4x3] = {
  Type: Float32Array,
  size: 48,
  setter: floatMat43Setter
};
typeMap[SAMPLER_2D] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_2D$1
};
typeMap[SAMPLER_CUBE] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[SAMPLER_3D] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_3D$1
};
typeMap[SAMPLER_2D_SHADOW] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_2D$1
};
typeMap[SAMPLER_2D_ARRAY] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[SAMPLER_2D_ARRAY_SHADOW] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[SAMPLER_CUBE_SHADOW] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[INT_SAMPLER_2D] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_2D$1
};
typeMap[INT_SAMPLER_3D] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_3D$1
};
typeMap[INT_SAMPLER_CUBE] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[INT_SAMPLER_2D_ARRAY] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_2D_ARRAY$1
};
typeMap[UNSIGNED_INT_SAMPLER_2D] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_2D$1
};
typeMap[UNSIGNED_INT_SAMPLER_3D] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_3D$1
};
typeMap[UNSIGNED_INT_SAMPLER_CUBE] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_CUBE_MAP$1
};
typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = {
  Type: null,
  size: 0,
  setter: samplerSetter,
  arraySetter: samplerArraySetter,
  bindPoint: TEXTURE_2D_ARRAY$1
};
function floatAttribSetter(gl, index) {
  return function (b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      switch (b.value.length) {
        case 4:
          gl.vertexAttrib4fv(index, b.value);
          break;
        case 3:
          gl.vertexAttrib3fv(index, b.value);
          break;
        case 2:
          gl.vertexAttrib2fv(index, b.value);
          break;
        case 1:
          gl.vertexAttrib1fv(index, b.value);
          break;
        default:
          throw new Error('the length of a float constant value must be between 1 and 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribPointer(index, b.numComponents || b.size, b.type || FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
      if (b.divisor !== undefined) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}
function intAttribSetter(gl, index) {
  return function (b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4iv(index, b.value);
      } else {
        throw new Error('The length of an integer constant value must be 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || INT$3, b.stride || 0, b.offset || 0);
      if (b.divisor !== undefined) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}
function uintAttribSetter(gl, index) {
  return function (b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4uiv(index, b.value);
      } else {
        throw new Error('The length of an unsigned integer constant value must be 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(index, b.numComponents || b.size, b.type || UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
      if (b.divisor !== undefined) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}
function matAttribSetter(gl, index, typeInfo) {
  const defaultSize = typeInfo.size;
  const count = typeInfo.count;
  return function (b) {
    gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
    const numComponents = b.size || b.numComponents || defaultSize;
    const size = numComponents / count;
    const type = b.type || FLOAT$3;
    const typeInfo = typeMap[type];
    const stride = typeInfo.size * numComponents;
    const normalize = b.normalize || false;
    const offset = b.offset || 0;
    const rowOffset = stride / count;
    for (let i = 0; i < count; ++i) {
      gl.enableVertexAttribArray(index + i);
      gl.vertexAttribPointer(index + i, size, type, normalize, stride, offset + rowOffset * i);
      if (b.divisor !== undefined) {
        gl.vertexAttribDivisor(index + i, b.divisor);
      }
    }
  };
}
const attrTypeMap = {};
attrTypeMap[FLOAT$3] = {
  size: 4,
  setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC2] = {
  size: 8,
  setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC3] = {
  size: 12,
  setter: floatAttribSetter
};
attrTypeMap[FLOAT_VEC4] = {
  size: 16,
  setter: floatAttribSetter
};
attrTypeMap[INT$3] = {
  size: 4,
  setter: intAttribSetter
};
attrTypeMap[INT_VEC2] = {
  size: 8,
  setter: intAttribSetter
};
attrTypeMap[INT_VEC3] = {
  size: 12,
  setter: intAttribSetter
};
attrTypeMap[INT_VEC4] = {
  size: 16,
  setter: intAttribSetter
};
attrTypeMap[UNSIGNED_INT$3] = {
  size: 4,
  setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC2] = {
  size: 8,
  setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC3] = {
  size: 12,
  setter: uintAttribSetter
};
attrTypeMap[UNSIGNED_INT_VEC4] = {
  size: 16,
  setter: uintAttribSetter
};
attrTypeMap[BOOL] = {
  size: 4,
  setter: intAttribSetter
};
attrTypeMap[BOOL_VEC2] = {
  size: 8,
  setter: intAttribSetter
};
attrTypeMap[BOOL_VEC3] = {
  size: 12,
  setter: intAttribSetter
};
attrTypeMap[BOOL_VEC4] = {
  size: 16,
  setter: intAttribSetter
};
attrTypeMap[FLOAT_MAT2] = {
  size: 4,
  setter: matAttribSetter,
  count: 2
};
attrTypeMap[FLOAT_MAT3] = {
  size: 9,
  setter: matAttribSetter,
  count: 3
};
attrTypeMap[FLOAT_MAT4] = {
  size: 16,
  setter: matAttribSetter,
  count: 4
};
const errorRE = /ERROR:\s*\d+:(\d+)/gi;
function addLineNumbersWithError(src, log = '', lineOffset = 0) {
  // Note: Error message formats are not defined by any spec so this may or may not work.
  const matches = [...log.matchAll(errorRE)];
  const lineNoToErrorMap = new Map(matches.map((m, ndx) => {
    const lineNo = parseInt(m[1]);
    const next = matches[ndx + 1];
    const end = next ? next.index : log.length;
    const msg = log.substring(m.index, end);
    return [lineNo - 1, msg];
  }));
  return src.split('\n').map((line, lineNo) => {
    const err = lineNoToErrorMap.get(lineNo);
    return `${lineNo + 1 + lineOffset}: ${line}${err ? `\n\n^^^ ${err}` : ''}`;
  }).join('\n');
}
/**
* Error Callback
* @callback ErrorCallback
* @param {string} msg error message.
* @param {number} [lineOffset] amount to add to line number
* @memberOf module:twgl
*/
const spaceRE = /^[ \t]*\n/;
/**
* Loads a shader.
* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
* @param {string} shaderSource The shader source.
* @param {number} shaderType The type of shader.
* @param {module:twgl.ErrorCallback} opt_errorCallback callback for errors.
* @return {WebGLShader} The created shader.
* @private
*/
function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
  const errFn = opt_errorCallback || error$1;
  // Create the shader object
  const shader = gl.createShader(shaderType);
  // Remove the first end of line because WebGL 2.0 requires
  // #version 300 es
  // as the first line. No whitespace allowed before that line
  // so
  // 
  // <script>
  // #version 300 es
  // </script>
  // 
  // Has one line before it which is invalid according to GLSL ES 3.00
  // 
  let lineOffset = 0;
  if (spaceRE.test(shaderSource)) {
    lineOffset = 1;
    shaderSource = shaderSource.replace(spaceRE, '');
  }
  // Load the shader source
  gl.shaderSource(shader, shaderSource);
  // Compile the shader
  gl.compileShader(shader);
  // Check the compile status
  const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    const lastError = gl.getShaderInfoLog(shader);
    errFn(`${addLineNumbersWithError(shaderSource, lastError, lineOffset)}\nError compiling ${glEnumToString(gl, shaderType)}: ${lastError}`);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
/**
* @typedef {Object} ProgramOptions
* @property {function(string)} [errorCallback] callback for errors
* @property {Object.<string,number>} [attribLocations] a attribute name to location map
* @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
*   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
*   you can pass an array of names.
* @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
* @memberOf module:twgl
*/
/**
* Gets the program options based on all these optional arguments
* @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
* @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
*        on error. If you want something else pass an callback. It's passed an error message.
* @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
* @private
*/
function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
  let transformFeedbackVaryings;
  let transformFeedbackMode;
  if (typeof opt_locations === 'function') {
    opt_errorCallback = opt_locations;
    opt_locations = undefined;
  }
  if (typeof opt_attribs === 'function') {
    opt_errorCallback = opt_attribs;
    opt_attribs = undefined;
  } else if (opt_attribs && !Array.isArray(opt_attribs)) {
    // If we have an errorCallback we can just return this object
    // Otherwise we need to construct one with default errorCallback
    if (opt_attribs.errorCallback) {
      return opt_attribs;
    }
    const opt = opt_attribs;
    opt_errorCallback = opt.errorCallback;
    opt_attribs = opt.attribLocations;
    transformFeedbackVaryings = opt.transformFeedbackVaryings;
    transformFeedbackMode = opt.transformFeedbackMode;
  }
  const options = {
    errorCallback: opt_errorCallback || error$1,
    transformFeedbackVaryings: transformFeedbackVaryings,
    transformFeedbackMode: transformFeedbackMode
  };
  if (opt_attribs) {
    let attribLocations = {};
    if (Array.isArray(opt_attribs)) {
      opt_attribs.forEach(function (attrib, ndx) {
        attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
      });
    } else {
      attribLocations = opt_attribs;
    }
    options.attribLocations = attribLocations;
  }
  return options;
}
const defaultShaderType = ["VERTEX_SHADER", "FRAGMENT_SHADER"];
function getShaderTypeFromScriptType(gl, scriptType) {
  if (scriptType.indexOf("frag") >= 0) {
    return FRAGMENT_SHADER;
  } else if (scriptType.indexOf("vert") >= 0) {
    return VERTEX_SHADER;
  }
  return undefined;
}
function deleteShaders(gl, shaders) {
  shaders.forEach(function (shader) {
    gl.deleteShader(shader);
  });
}
/**
* Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
* program and calls useProgram.
*
* NOTE: There are 4 signatures for this function
*
*     twgl.createProgram(gl, [vs, fs], options);
*     twgl.createProgram(gl, [vs, fs], opt_errFunc);
*     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
*     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
*
* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
* @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
* @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
* @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
*        on error. If you want something else pass an callback. It's passed an error message.
* @return {WebGLProgram?} the created program or null if error.
* @memberOf module:twgl/programs
*/
function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const realShaders = [];
  const newShaders = [];
  for (let ndx = 0; ndx < shaders.length; ++ndx) {
    let shader = shaders[ndx];
    if (typeof shader === 'string') {
      const elem = getElementById(shader);
      const src = elem ? elem.text : shader;
      let type = gl[defaultShaderType[ndx]];
      if (elem && elem.type) {
        type = getShaderTypeFromScriptType(gl, elem.type) || type;
      }
      shader = loadShader(gl, src, type, progOptions.errorCallback);
      newShaders.push(shader);
    }
    if (isShader(gl, shader)) {
      realShaders.push(shader);
    }
  }
  if (realShaders.length !== shaders.length) {
    progOptions.errorCallback("not enough shaders for program");
    deleteShaders(gl, newShaders);
    return null;
  }
  const program = gl.createProgram();
  realShaders.forEach(function (shader) {
    gl.attachShader(program, shader);
  });
  if (progOptions.attribLocations) {
    Object.keys(progOptions.attribLocations).forEach(function (attrib) {
      gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
    });
  }
  let varyings = progOptions.transformFeedbackVaryings;
  if (varyings) {
    if (varyings.attribs) {
      varyings = varyings.attribs;
    }
    if (!Array.isArray(varyings)) {
      varyings = Object.keys(varyings);
    }
    gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
  }
  gl.linkProgram(program);
  // Check the link status
  const linked = gl.getProgramParameter(program, LINK_STATUS);
  if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program);
    progOptions.errorCallback(`${realShaders.map(shader => {
      const src = addLineNumbersWithError(gl.getShaderSource(shader), '', 0);
      const type = gl.getShaderParameter(shader, gl.SHADER_TYPE);
      return `${glEnumToString(gl, type)}\n${src}}`;
    }).join('\n')}\nError in program linking: ${lastError}`);
    gl.deleteProgram(program);
    deleteShaders(gl, newShaders);
    return null;
  }
  return program;
}
/**
* Creates a program from 2 sources.
*
* NOTE: There are 4 signatures for this function
*
*     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
*     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
*     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
*     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
*
* @param {WebGLRenderingContext} gl The WebGLRenderingContext
*        to use.
* @param {string[]} shaderSources Array of sources for the
*        shaders. The first is assumed to be the vertex shader,
*        the second the fragment shader.
* @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
* @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
*        on error. If you want something else pass an callback. It's passed an error message.
* @return {WebGLProgram?} the created program or null if error.
* @memberOf module:twgl/programs
*/
function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const shaders = [];
  for (let ii = 0; ii < shaderSources.length; ++ii) {
    const shader = loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
    if (!shader) {
      return null;
    }
    shaders.push(shader);
  }
  return createProgram(gl, shaders, progOptions);
}
/**
* Returns true if attribute/uniform is a reserved/built in
*
* It makes no sense to me why GL returns these because it's
* illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
* with names that start with `gl_` (and `webgl_` in WebGL)
*
* I can only assume they are there because they might count
* when computing the number of uniforms/attributes used when you want to
* know if you are near the limit. That doesn't really make sense
* to me but the fact that these get returned are in the spec.
*
* @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
*    `gl.getActiveAttrib`.
* @return {bool} true if it's reserved
* @private
*/
function isBuiltIn(info) {
  const name = info.name;
  return name.startsWith("gl_") || name.startsWith("webgl_");
}
/**
* Creates setter functions for all uniforms of a shader
* program.
*
* @see {@link module:twgl.setUniforms}
*
* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
* @param {WebGLProgram} program the program to create setters for.
* @returns {Object.<string, function>} an object with a setter by name for each uniform
* @memberOf module:twgl/programs
*/
function createUniformSetters(gl, program) {
  let textureUnit = 0;
  /**
  * Creates a setter for a uniform of the given program with it's
  * location embedded in the setter.
  * @param {WebGLProgram} program
  * @param {WebGLUniformInfo} uniformInfo
  * @returns {function} the created setter.
  */
  function createUniformSetter(program, uniformInfo, location) {
    const isArray = uniformInfo.name.endsWith("[0]");
    const type = uniformInfo.type;
    const typeInfo = typeMap[type];
    if (!typeInfo) {
      throw new Error(`unknown type: 0x${type.toString(16)}`);
    }
    let setter;
    if (typeInfo.bindPoint) {
      // it's a sampler
      const unit = textureUnit;
      textureUnit += uniformInfo.size;
      if (isArray) {
        setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
      } else {
        setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
      }
    } else {
      if (typeInfo.arraySetter && isArray) {
        setter = typeInfo.arraySetter(gl, location);
      } else {
        setter = typeInfo.setter(gl, location);
      }
    }
    setter.location = location;
    return setter;
  }
  const uniformSetters = {};
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
  for (let ii = 0; ii < numUniforms; ++ii) {
    const uniformInfo = gl.getActiveUniform(program, ii);
    if (isBuiltIn(uniformInfo)) {
      continue;
    }
    let name = uniformInfo.name;
    // remove the array suffix.
    if (name.endsWith("[0]")) {
      name = name.substr(0, name.length - 3);
    }
    const location = gl.getUniformLocation(program, uniformInfo.name);
    // the uniform will have no location if it's in a uniform block
    if (location) {
      uniformSetters[name] = createUniformSetter(program, uniformInfo, location);
    }
  }
  return uniformSetters;
}
/**
* @typedef {Object} TransformFeedbackInfo
* @property {number} index index of transform feedback
* @property {number} type GL type
* @property {number} size 1 - 4
* @memberOf module:twgl
*/
/**
* Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
* @param {WebGLProgram} program an existing WebGLProgram.
* @return {Object<string, module:twgl.TransformFeedbackInfo>}
* @memberOf module:twgl
*/
function createTransformFeedbackInfo(gl, program) {
  const info = {};
  const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
  for (let ii = 0; ii < numVaryings; ++ii) {
    const varying = gl.getTransformFeedbackVarying(program, ii);
    info[varying.name] = {
      index: ii,
      type: varying.type,
      size: varying.size
    };
  }
  return info;
}
/**
* @typedef {Object} UniformData
* @property {number} type The WebGL type enum for this uniform
* @property {number} size The number of elements for this uniform
* @property {number} blockNdx The block index this uniform appears in
* @property {number} offset The byte offset in the block for this uniform's value
* @memberOf module:twgl
*/
/**
* The specification for one UniformBlockObject
*
* @typedef {Object} BlockSpec
* @property {number} index The index of the block.
* @property {number} size The size in bytes needed for the block
* @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
*    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
* @property {bool} usedByVertexShader Self explanatory
* @property {bool} usedByFragmentShader Self explanatory
* @property {bool} used Self explanatory
* @memberOf module:twgl
*/
/**
* A `UniformBlockSpec` represents the data needed to create and bind
* UniformBlockObjects for a given program
*
* @typedef {Object} UniformBlockSpec
* @property {Object.<string, module:twgl.BlockSpec> blockSpecs The BlockSpec for each block by block name
* @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
* @memberOf module:twgl
*/
/**
* Creates a UniformBlockSpec for the given program.
*
* A UniformBlockSpec represents the data needed to create and bind
* UniformBlockObjects
*
* @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
* @param {WebGLProgram} program A WebGLProgram for a successfully linked program
* @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
* @memberOf module:twgl/programs
*/
function createUniformBlockSpecFromProgram(gl, program) {
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
  const uniformData = [];
  const uniformIndices = [];
  for (let ii = 0; ii < numUniforms; ++ii) {
    uniformIndices.push(ii);
    uniformData.push({});
    const uniformInfo = gl.getActiveUniform(program, ii);
    if (isBuiltIn(uniformInfo)) {
      break;
    }
    uniformData[ii].name = uniformInfo.name;
  }
  [["UNIFORM_TYPE", "type"], ["UNIFORM_SIZE", "size"], // num elements
  ["UNIFORM_BLOCK_INDEX", "blockNdx"], ["UNIFORM_OFFSET", "offset"]].forEach(function (pair) {
    const pname = pair[0];
    const key = pair[1];
    gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function (value, ndx) {
      uniformData[ndx][key] = value;
    });
  });
  const blockSpecs = {};
  const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
  for (let ii = 0; ii < numUniformBlocks; ++ii) {
    const name = gl.getActiveUniformBlockName(program, ii);
    const blockSpec = {
      index: gl.getUniformBlockIndex(program, name),
      usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
      usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
      size: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_DATA_SIZE),
      uniformIndices: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES)
    };
    blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
    blockSpecs[name] = blockSpec;
  }
  return {
    blockSpecs: blockSpecs,
    uniformData: uniformData
  };
}
/**
* Set uniforms and binds related textures.
*
* example:
*
*     const programInfo = createProgramInfo(
*         gl, ["some-vs", "some-fs"]);
*
*     const tex1 = gl.createTexture();
*     const tex2 = gl.createTexture();
*
*     ... assume we setup the textures with data ...
*
*     const uniforms = {
*       u_someSampler: tex1,
*       u_someOtherSampler: tex2,
*       u_someColor: [1,0,0,1],
*       u_somePosition: [0,1,1],
*       u_someMatrix: [
*         1,0,0,0,
*         0,1,0,0,
*         0,0,1,0,
*         0,0,0,0,
*       ],
*     };
*
*     gl.useProgram(program);
*
* This will automatically bind the textures AND set the
* uniforms.
*
*     twgl.setUniforms(programInfo, uniforms);
*
* For the example above it is equivalent to
*
*     var texUnit = 0;
*     gl.activeTexture(gl.TEXTURE0 + texUnit);
*     gl.bindTexture(gl.TEXTURE_2D, tex1);
*     gl.uniform1i(u_someSamplerLocation, texUnit++);
*     gl.activeTexture(gl.TEXTURE0 + texUnit);
*     gl.bindTexture(gl.TEXTURE_2D, tex2);
*     gl.uniform1i(u_someSamplerLocation, texUnit++);
*     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
*     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
*     gl.uniformMatrix4fv(u_someMatrix, false, [
*         1,0,0,0,
*         0,1,0,0,
*         0,0,1,0,
*         0,0,0,0,
*       ]);
*
* Note it is perfectly reasonable to call `setUniforms` multiple times. For example
*
*     const uniforms = {
*       u_someSampler: tex1,
*       u_someOtherSampler: tex2,
*     };
*
*     const moreUniforms {
*       u_someColor: [1,0,0,1],
*       u_somePosition: [0,1,1],
*       u_someMatrix: [
*         1,0,0,0,
*         0,1,0,0,
*         0,0,1,0,
*         0,0,0,0,
*       ],
*     };
*
*     twgl.setUniforms(programInfo, uniforms);
*     twgl.setUniforms(programInfo, moreUniforms);
*
* You can also add WebGLSamplers to uniform samplers as in
*
*     const uniforms = {
*       u_someSampler: {
*         texture: someWebGLTexture,
*         sampler: someWebGLSampler,
*       },
*     };
*
* In which case both the sampler and texture will be bound to the
* same unit.
*
* @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
*        `createUniformSetters`.
* @param {Object.<string, ?>} values an object with values for the
*        uniforms.
*   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
*
*     const sharedUniforms = {
*       u_fogNear: 10,
*       u_projection: ...
*       ...
*     };
*
*     const localUniforms = {
*       u_world: ...
*       u_diffuseColor: ...
*     };
*
*     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
*
*     // is the same as
*
*     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
*
*     // is the same as
*
*     twgl.setUniforms(programInfo, sharedUniforms);
*     twgl.setUniforms(programInfo, localUniforms};
*
* @memberOf module:twgl/programs
*/
function setUniforms(setters, values) {
  // eslint-disable-line
  const actualSetters = setters.uniformSetters || setters;
  const numArgs = arguments.length;
  for (let aNdx = 1; aNdx < numArgs; ++aNdx) {
    const values = arguments[aNdx];
    if (Array.isArray(values)) {
      const numValues = values.length;
      for (let ii = 0; ii < numValues; ++ii) {
        setUniforms(actualSetters, values[ii]);
      }
    } else {
      for (const name in values) {
        const setter = actualSetters[name];
        if (setter) {
          setter(values[name]);
        }
      }
    }
  }
}
/**
* Creates setter functions for all attributes of a shader
* program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
*
* @see {@link module:twgl.setAttributes} for example
* @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
* @param {WebGLProgram} program the program to create setters for.
* @return {Object.<string, function>} an object with a setter for each attribute by name.
* @memberOf module:twgl/programs
*/
function createAttributeSetters(gl, program) {
  const attribSetters = {};
  const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
  for (let ii = 0; ii < numAttribs; ++ii) {
    const attribInfo = gl.getActiveAttrib(program, ii);
    if (isBuiltIn(attribInfo)) {
      continue;
    }
    const index = gl.getAttribLocation(program, attribInfo.name);
    const typeInfo = attrTypeMap[attribInfo.type];
    const setter = typeInfo.setter(gl, index, typeInfo);
    setter.location = index;
    attribSetters[attribInfo.name] = setter;
  }
  return attribSetters;
}
/**
* Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
*
* Example:
*
*     const program = createProgramFromScripts(
*         gl, ["some-vs", "some-fs");
*
*     const attribSetters = createAttributeSetters(program);
*
*     const positionBuffer = gl.createBuffer();
*     const texcoordBuffer = gl.createBuffer();
*
*     const attribs = {
*       a_position: {buffer: positionBuffer, numComponents: 3},
*       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
*     };
*
*     gl.useProgram(program);
*
* This will automatically bind the buffers AND set the
* attributes.
*
*     setAttributes(attribSetters, attribs);
*
* Properties of attribs. For each attrib you can add
* properties:
*
* *   type: the type of data in the buffer. Default = gl.FLOAT
* *   normalize: whether or not to normalize the data. Default = false
* *   stride: the stride. Default = 0
* *   offset: offset into the buffer. Default = 0
* *   divisor: the divisor for instances. Default = undefined
*
* For example if you had 3 value float positions, 2 value
* float texcoord and 4 value uint8 colors you'd setup your
* attribs like this
*
*     const attribs = {
*       a_position: {buffer: positionBuffer, numComponents: 3},
*       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
*       a_color: {
*         buffer: colorBuffer,
*         numComponents: 4,
*         type: gl.UNSIGNED_BYTE,
*         normalize: true,
*       },
*     };
*
* @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
* @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
* @memberOf module:twgl/programs
* @deprecated use {@link module:twgl.setBuffersAndAttributes}
*/
function setAttributes(setters, buffers) {
  for (const name in buffers) {
    const setter = setters[name];
    if (setter) {
      setter(buffers[name]);
    }
  }
}
/**
* Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
*
* Example:
*
*     const programInfo = createProgramInfo(
*         gl, ["some-vs", "some-fs");
*
*     const arrays = {
*       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
*       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
*     };
*
*     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
*
*     gl.useProgram(programInfo.program);
*
* This will automatically bind the buffers AND set the
* attributes.
*
*     setBuffersAndAttributes(gl, programInfo, bufferInfo);
*
* For the example above it is equivalent to
*
*     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
*     gl.enableVertexAttribArray(a_positionLocation);
*     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
*     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
*     gl.enableVertexAttribArray(a_texcoordLocation);
*     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
*
* @param {WebGLRenderingContext} gl A WebGLRenderingContext.
* @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
* @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
*   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
* @memberOf module:twgl/programs
*/
function setBuffersAndAttributes(gl, programInfo, buffers) {
  if (buffers.vertexArrayObject) {
    gl.bindVertexArray(buffers.vertexArrayObject);
  } else {
    setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
    if (buffers.indices) {
      gl.bindBuffer(ELEMENT_ARRAY_BUFFER$1, buffers.indices);
    }
  }
}
/**
* @typedef {Object} ProgramInfo
* @property {WebGLProgram} program A shader program
* @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
* @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
* @property {module:twgl.UniformBlockSpec} [uniformBlockSpace] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
* @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
* @memberOf module:twgl
*/
/**
* Creates a ProgramInfo from an existing program.
*
* A ProgramInfo contains
*
*     programInfo = {
*        program: WebGLProgram,
*        uniformSetters: object of setters as returned from createUniformSetters,
*        attribSetters: object of setters as returned from createAttribSetters,
*     }
*
* @param {WebGLRenderingContext} gl The WebGLRenderingContext
*        to use.
* @param {WebGLProgram} program an existing WebGLProgram.
* @return {module:twgl.ProgramInfo} The created ProgramInfo.
* @memberOf module:twgl/programs
*/
function createProgramInfoFromProgram(gl, program) {
  const uniformSetters = createUniformSetters(gl, program);
  const attribSetters = createAttributeSetters(gl, program);
  const programInfo = {
    program: program,
    uniformSetters: uniformSetters,
    attribSetters: attribSetters
  };
  if (isWebGL2(gl)) {
    programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
    programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
  }
  return programInfo;
}
/**
* Creates a ProgramInfo from 2 sources.
*
* A ProgramInfo contains
*
*     programInfo = {
*        program: WebGLProgram,
*        uniformSetters: object of setters as returned from createUniformSetters,
*        attribSetters: object of setters as returned from createAttribSetters,
*     }
*
* NOTE: There are 4 signatures for this function
*
*     twgl.createProgramInfo(gl, [vs, fs], options);
*     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
*     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
*     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
*
* @param {WebGLRenderingContext} gl The WebGLRenderingContext
*        to use.
* @param {string[]} shaderSources Array of sources for the
*        shaders or ids. The first is assumed to be the vertex shader,
*        the second the fragment shader.
* @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
* @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
* @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
*        on error. If you want something else pass an callback. It's passed an error message.
* @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
* @memberOf module:twgl/programs
*/
function createProgramInfo(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  let good = true;
  shaderSources = shaderSources.map(function (source) {
    // Lets assume if there is no \n it's an id
    if (source.indexOf("\n") < 0) {
      const script = getElementById(source);
      if (!script) {
        progOptions.errorCallback("no element with id: " + source);
        good = false;
      } else {
        source = script.text;
      }
    }
    return source;
  });
  if (!good) {
    return null;
  }
  const program = createProgramFromSources(gl, shaderSources, progOptions);
  if (!program) {
    return null;
  }
  return createProgramInfoFromProgram(gl, program);
}
/*
* Copyright 2019 Gregg Tavares
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*/
const TRIANGLES = 0x0004;
const UNSIGNED_SHORT$3 = 0x1403;
/**
* Drawing related functions
*
* For backward compatibility they are available at both `twgl.draw` and `twgl`
* itself
*
* See {@link module:twgl} for core functions
*
* @module twgl/draw
*/
/**
* Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
*
* normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
* but calling this means if you switch from indexed data to non-indexed
* data you don't have to remember to update your draw call.
*
* @param {WebGLRenderingContext} gl A WebGLRenderingContext
* @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} bufferInfo A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays} or
*   a VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
* @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
* @param {number} [count] An optional count. Defaults to bufferInfo.numElements
* @param {number} [offset] An optional offset. Defaults to 0.
* @param {number} [instanceCount] An optional instanceCount. if set then `drawArraysInstanced` or `drawElementsInstanced` will be called
* @memberOf module:twgl/draw
*/
function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
  type = type === undefined ? TRIANGLES : type;
  const indices = bufferInfo.indices;
  const elementType = bufferInfo.elementType;
  const numElements = count === undefined ? bufferInfo.numElements : count;
  offset = offset === undefined ? 0 : offset;
  if (elementType || indices) {
    if (instanceCount !== undefined) {
      gl.drawElementsInstanced(type, numElements, elementType === undefined ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset, instanceCount);
    } else {
      gl.drawElements(type, numElements, elementType === undefined ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset);
    }
  } else {
    if (instanceCount !== undefined) {
      gl.drawArraysInstanced(type, offset, numElements, instanceCount);
    } else {
      gl.drawArrays(type, offset, numElements);
    }
  }
}
/**
* @typedef {Object} VertexArrayInfo
* @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
* @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
* @property {WebGLVertexArrayObject} [vertexArrayObject] a vertex array object
* @memberOf module:twgl
*/
/**
* Creates a VertexArrayInfo from a BufferInfo and one or more ProgramInfos
*
* This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
* {@link module:twgl:drawBufferInfo}.
*
* > **IMPORTANT:** Vertex Array Objects are **not** a direct analog for a BufferInfo. Vertex Array Objects
*   assign buffers to specific attributes at creation time. That means they can only be used with programs
*   who's attributes use the same attribute locations for the same purposes.
*
* > Bind your attribute locations by passing an array of attribute names to {@link module:twgl.createProgramInfo}
*   or use WebGL 2's GLSL ES 3's `layout(location = <num>)` to make sure locations match.
*
* also
*
* > **IMPORTANT:** After calling twgl.setBuffersAndAttribute with a BufferInfo that uses a Vertex Array Object
*   that Vertex Array Object will be bound. That means **ANY MANIPULATION OF ELEMENT_ARRAY_BUFFER or ATTRIBUTES**
*   will affect the Vertex Array Object state.
*
* > Call `gl.bindVertexArray(null)` to get back manipulating the global attributes and ELEMENT_ARRAY_BUFFER.
*
* @param {WebGLRenderingContext} gl A WebGLRenderingContext
* @param {module:twgl.ProgramInfo|module:twgl.ProgramInfo[]} programInfo a programInfo or array of programInfos
* @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
*
*    You need to make sure every attribute that will be used is bound. So for example assume shader 1
*    uses attributes A, B, C and shader 2 uses attributes A, B, D. If you only pass in the programInfo
*    for shader 1 then only attributes A, B, and C will have their attributes set because TWGL doesn't
*    now attribute D's location.
*
*    So, you can pass in both shader 1 and shader 2's programInfo
*
* @return {module:twgl.VertexArrayInfo} The created VertexArrayInfo
*
* @memberOf module:twgl/vertexArrays
*/
function createVertexArrayInfo(gl, programInfos, bufferInfo) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  if (!programInfos.length) {
    programInfos = [programInfos];
  }
  programInfos.forEach(function (programInfo) {
    setBuffersAndAttributes(gl, programInfo, bufferInfo);
  });
  gl.bindVertexArray(null);
  return {
    numElements: bufferInfo.numElements,
    elementType: bufferInfo.elementType,
    vertexArrayObject: vao
  };
}
const ALL_POTENTIAL_ATTRIBUTES = VertexShader.SUPPORTED_CHANNEL_ATTRIBUTES.map(attr => `a_${attr}`).concat("a_VertexPosition");
class WebGLCanvasDrawer extends Drawer {
  constructor(viewportData) {
    super(viewportData);
    this.gl = this.canvas.getContext("webgl2", {
      // Setting these to false makes webgl handle more like opengl
      // Source: https://webglfundamentals.org/webgl/lessons/webgl-and-alpha.html
      alpha: false,
      premultipliedAlpha: false
    });
    if (!this.gl) {
      console.error("Unable to initialize WebGL!");
      return;
    }
  }
  /**
  * Calculates the viewport for this.gl.viewport to control zooming. Also calculates point size.
  * @returns Array of 5 elements, first 4 are viewport parameters, last is pointSizeMultiplier:
  *   [xOffset, yOffset, displayAsIfThisWide, displayAsIfThisHigh, pointSizeMultiplier]
  */
  getWebGLViewport() {
    // Calculate appropriate webgl viewport given current selection window
    // Transform current data coordinates to GPU cordinates
    const scaleXWindowSpace = _utilities52abb45cJs.s([this.minX, this.maxX], [-1, 1]);
    const scaleYWindowSpace = _utilities52abb45cJs.s([this.minY, this.maxY], [-1, 1]);
    // Multiply point size by the ratio of max dimension and current width
    const pointSize = Math.max(1, Math.min(1 / (scaleXWindowSpace(this.currentXRange[1]) - scaleXWindowSpace(this.currentXRange[0])), 1 / (scaleYWindowSpace(this.currentYRange[1]) - scaleYWindowSpace(this.currentYRange[0]))));
    // Return [x1, y1, x2, y2] and pointsize, camera corners coordinates in GPU space
    // Which becomes uniform in vertex shader
    return [scaleXWindowSpace(this.currentXRange[0]), scaleYWindowSpace(this.currentYRange[0]), scaleXWindowSpace(this.currentXRange[1]), scaleYWindowSpace(this.currentYRange[1]), pointSize];
  }
  /**
  * Sets the schema and begins the process of drawing it.
  *  1. Cancels any current animation
  *  2. Builds shaders for the tracks
  *  3. After data is loaded, calls populateBuffers.
  *
  * @param {Object} schema of visualization
  */
  setSchema(schema) {
    super.render();
    // Cancels current animation frame
    // Populate buffers needs a trackShader built to know what buffers to fill
    this.trackShaders = VertexShader.fromSchema(schema);
    new _schemaProcessor66236800Js.S(schema, this.populateBuffers.bind(this));
  }
  /**
  * Populate the buffers that are fed to webgl for drawing.
  *
  * @param {SchemaProcessor} schemaHelper created in the setSchema method
  */
  populateBuffers(schemaHelper) {
    let currentTrack = schemaHelper.getNextTrack();
    let currentTrackShaderIndex = 0;
    this.semanticZoomer = new SemanticZoomer(schemaHelper);
    while (currentTrack) {
      // Construct calculator in track loop as calculator keeps internal state for each track
      let vertexCalculator = new _schemaProcessor66236800Js.V(schemaHelper.xScale, schemaHelper.yScale, currentTrack.track);
      let currentMark = currentTrack.getNextMark();
      while (currentMark) {
        // A lot of the heavy lifting occurs in the track shaders, this class is mostly boilerplate for webgl
        this.trackShaders[currentTrackShaderIndex].addMarkToBuffers(currentMark, vertexCalculator);
        currentMark = currentTrack.getNextMark();
      }
      currentTrack = schemaHelper.getNextTrack();
      currentTrackShaderIndex++;
    }
    this.render();
  }
  /**
  * Animates the frames by setting viewport, uniforms, blending, clearing, and calling webgl draw.
  */
  animate() {
    if (!this.needsAnimation) {
      // Prevent pointless animation if canvas does not change
      this.lastFrame = requestAnimationFrame(this.animate.bind(this));
      this.tick();
      return;
    }
    const viewport = this.getWebGLViewport();
    this.globalUniforms.viewport = new Float32Array(viewport.slice(0, 4));
    this.globalUniforms.pointSizeModifier = viewport[4];
    // Clear the canvas before we start drawing on it.
    this.gl.clearColor(1, 1, 1, 1);
    // Set the blending function
    // Blend functions are weird, play with them:
    // https://mrdoob.github.io/webgl-blendfunctions/blendfunc.html
    // http://www.andersriggelsen.dk/glblendfunc.php
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    // For each track shader, use their shader program then draw it
    this.trackShaders.forEach((trackShader, index) => {
      this.gl.useProgram(this.programInfos[index].program);
      setUniforms(this.programInfos[index], {
        ...this.globalUniforms,
        ...trackShader.uniforms
      });
      setBuffersAndAttributes(this.gl, this.programInfos[index], this.vertexArrayInfos[index]);
      drawBufferInfo(this.gl, this.vertexArrayInfos[index], this.gl[this.semanticZoomer.getRecommendedDrawingMode(trackShader, this.currentXRange, this.currentYRange)], trackShader.attributes.a_VertexPosition.data.length / 2);
    });
    this.needsAnimation = false;
    this.lastFrame = requestAnimationFrame(this.animate.bind(this));
    this.tick();
  }
  /**
  * Prepares animation by compiling shaders, setting uniforms, constructing buffers,
  * and handling additional boilerplate.
  */
  render() {
    super.render();
    this.programInfos = this.trackShaders.map(trackShader => createProgramInfo(this.gl, [trackShader.buildShader(), varyingColorsFragmentShader], ALL_POTENTIAL_ATTRIBUTES));
    this.globalUniforms = {
      viewport: new Float32Array([-1, -1, 1, 1]),
      pointSizeModifier: 1
    };
    this.vertexArrayInfos = this.trackShaders.map(trackShader => createVertexArrayInfo(this.gl, this.programInfos, createBufferInfoFromArrays(this.gl, trackShader.attributes)));
    this.needsAnimation = true;
    this.animate();
  }
}
/**
* The offscreen webgl worker is meant to communicate from the {@link WebGLVis}
* by sending a schema data to the drawer for management of shader program and
* eventually drawing. Most messages passed are containing the new viewport
* information for the drawer to process.
*/
class OffscreenWebGLDrawer extends WebGLCanvasDrawer {
  tick() {
    postMessage({
      type: "tick"
    });
  }
}
self.onmessage = message => {
  switch (message.data.type) {
    case "init":
      self.drawer = new OffscreenWebGLDrawer(message.data);
      break;
    case "viewport":
      self.drawer.receiveViewport(message.data);
      break;
    case "render":
      self.drawer.receiveViewport(message.data);
      self.drawer.render();
      break;
    case "schema":
      self.drawer.setSchema(message.data.schema);
      break;
    case "clearBuffers":
      self.drawer.clearBuffers();
      break;
    case "resize":
      self.drawer.canvas.width = message.data.width;
      self.drawer.canvas.height = message.data.height;
      self.drawer.gl.viewport(0, 0, message.data.width, message.data.height);
      break;
    default:
      console.error(`Received unknown message type: ${message.type}`);
  }
};

},{"./schema-processor-66236800.js":"56s4o","./utilities-52abb45c.js":"5UUVh"}],"56s4o":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "D", function () {
  return DEFAULT_CHANNELS;
});
_parcelHelpers.export(exports, "S", function () {
  return SchemaProcessor;
});
_parcelHelpers.export(exports, "V", function () {
  return VertexCalculator;
});
_parcelHelpers.export(exports, "g", function () {
  return getDrawModeForTrack;
});
var _utilities52abb45cJs = require('./utilities-52abb45c.js');
const radians = Math.PI / 180;
const degrees = 180 / Math.PI;
var A = -0.14861, B = +1.78277, C = -0.29227, D = -0.90649, E = +1.97294, ED = E * D, EB = E * B, BC_DA = B * C - D * A;
function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _utilities52abb45cJs.R)) o = _utilities52abb45cJs.r(o);
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB), bl = b - l, k = (E * (g - l) - C * bl) / D, s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
  h = s ? Math.atan2(k, bl) * degrees - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}
function cubehelix$2(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}
function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
_utilities52abb45cJs.d(Cubehelix, cubehelix$2, _utilities52abb45cJs.e(_utilities52abb45cJs.C, {
  brighter: function (k) {
    k = k == null ? _utilities52abb45cJs.f : Math.pow(_utilities52abb45cJs.f, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? _utilities52abb45cJs.h : Math.pow(_utilities52abb45cJs.h, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians, l = +this.l, a = isNaN(this.s) ? 0 : this.s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
    return new _utilities52abb45cJs.R(255 * (l + a * (A * cosh + B * sinh)), 255 * (l + a * (C * cosh + D * sinh)), 255 * (l + a * (E * cosh)), this.opacity);
  }
}));
// Each size unit refers to 1/200 of the clip space
// e.g. if the canvas is 1000x1000 pixels, and the size value for a mark
// is 10, then that mark takes up 10/200 = 1/20 of the clip space which
// is equal to 50 pixels
const SIZE_UNITS = 1 / 100;
const NUMBER_OF_VERTICES_PER_ARC = 20;
const ARC_HEIGHT_MODIFIER = 10;
/**
* Get a curve representing the arc with given start and end points
*
* https://math.stackexchange.com/a/1484684
*
* @param {Array} P0 start of arc
* @param {Array} P2 end of arc
* @returns function mapping 0 to beginning of arc, and 1 to end of arc
*/
const getCurveForArc = (P0, P2) => {
  const midpoint = [P0[0] / 2 + P2[0] / 2, P0[1] / 2 + P2[1] / 2];
  const slope = (P2[1] - P0[1]) / (P2[0] - P0[0]);
  const distance = Math.sqrt((P2[1] - P0[1]) ** 2 + (P2[0] - P0[0]) ** 2);
  if (!isFinite(slope)) {
    // vertical slope
    return _utilities52abb45cJs.i(P0, [P0[0] - distance, midpoint[1]], P2);
  }
  const parameterized = t => [midpoint[0] + t / distance * (P0[1] - P2[1]), midpoint[1] + t / distance * (P2[0] - P0[0])];
  return _utilities52abb45cJs.i(P0, parameterized(distance * ARC_HEIGHT_MODIFIER), P2);
};
class VertexCalculator {
  /**
  * A class used to construct the vertices of marks that are given to the drawer to draw.
  *
  * @param {Function or GenomeScale} xScale maps the x values of the data to clip space [-1, 1]
  * @param {Function or GenomeScale} yScale maps the y values of the data to clip space [-1, 1]
  * @param {Object} track from schema
  */
  constructor(xScale, yScale, track) {
    if (xScale instanceof _utilities52abb45cJs.G) {
      this.xScale = xScale.toCallable();
    } else {
      this.xScale = xScale;
    }
    if (yScale instanceof _utilities52abb45cJs.G) {
      this.yScale = yScale.toCallable();
    } else {
      this.yScale = yScale;
    }
    this.track = track;
    this.drawMode = getDrawModeForTrack(track);
  }
  /**
  * Transform a mark with a range for coordinates into a simpler mark to draw.
  *
  * @param {Object} mark that contains ranges for x or y
  * @returns mark with fixed x and y but with appropriate width and height for drawing
  */
  transformGenomicRangeToStandard(mark) {
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
      let x1 = this.xScale([mark.x[0], mark.x[1]]);
      x = [mark.x[0], mark.x[1]];
      width = (this.xScale([mark.x[2], mark.x[3]]) - x1) / SIZE_UNITS;
    } else {
      x = mark.x;
      width = mark.width;
    }
    if (Array.isArray(mark.y)) {
      y = this.yScale([mark.y[0], mark.y[1]]);
      height = (this.yScale([mark.y[2], mark.y[3]]) - y) / SIZE_UNITS;
    } else {
      y = mark.y;
      height = mark.height;
    }
    return {
      x,
      y,
      width,
      height
    };
  }
  /**
  * Transform a mark with a range for coordinates and a range for width or height into a simpler mark to draw.
  *
  * @param {Object} mark that contains ranges for x and y, and potentially ranges for width and height
  * @returns mark with fixed x, y, width, and height for drawing
  */
  transformGenomicRangeArcToStandard(mark) {
    let x, y, width, height;
    if (Array.isArray(mark.x)) {
      x = this.xScale.getMidpoint(...mark.x);
      let x2 = this.xScale.getMidpoint(...mark.width);
      let x1ClipSpace = this.xScale(x);
      let x2ClipSpace = this.xScale(x2);
      x = x1ClipSpace < x2ClipSpace ? x : x2;
      width = Math.abs(this.xScale(x2) - x1ClipSpace) / SIZE_UNITS;
    } else {
      x = mark.x;
      width = mark.width;
    }
    if (Array.isArray(mark.y)) {
      y = this.yScale.getMidpoint(...mark.y);
      let y2 = this.yScale.getMidpoint(...mark.height);
      let y1ClipSpace = this.xScale(y);
      let y2ClipSpace = this.xScale(y2);
      y = y1ClipSpace < y2ClipSpace ? y : y2;
      height = Math.abs(this.yScale(y2) - y1ClipSpace) / SIZE_UNITS;
    } else {
      y = mark.y;
      height = mark.height;
    }
    return {
      x,
      y,
      width,
      height
    };
  }
  /**
  * Construct the vertices of a mark.
  *
  * @param {Object} mark to draw
  * @returns vertices of mark
  */
  calculateForMark(mark) {
    if (this.track.x.type === "genomicRange" || this.track.y.type === "genomicRange") {
      if (this.track.mark === "arc") {
        return this._calculateForMark(this.transformGenomicRangeArcToStandard(mark));
      }
      return this._calculateForMark(this.transformGenomicRangeToStandard(mark));
    }
    return this._calculateForMark(mark);
  }
  _calculateForMark(mark) {
    if (this.track.mark === "area") {
      const toReturn = this._getVerticesForAreaSection(mark);
      this.lastMark = mark;
      return toReturn;
    }
    if (this.track.mark === "tick") {
      return this._getVerticesForTick(mark);
    }
    if (this.track.mark === "line") {
      return this._getVertexForDot(mark);
    }
    if (this.track.mark === "rect") {
      return this._getVerticesForRect(mark);
    }
    if (this.track.mark === "arc") {
      return this._getVerticesForArc(mark);
    }
    switch (mark.shape) {
      case "dot":
        if (this.drawMode === "POINTS") {
          return this._getVertexForDot(mark);
        } else {
          return this._getVerticesForSquare(mark);
        }
      case "triangle":
        return this._getVerticesForTriangle(mark);
      case "diamond":
        return this._getVerticesForPolygon(mark, 4);
      case "pentagon":
        return this._getVerticesForPolygon(mark, 5);
      case "hexagon":
        return this._getVerticesForPolygon(mark, 6);
      case "circle":
        return this._getVerticesForPolygon(mark, 16);
      case "cross":
        return this._getVerticesForCross(mark);
    }
  }
  _mapToGPUSpace(vertices) {
    let isX = false;
    return vertices.map(coord => {
      isX = !isX;
      return isX ? this.xScale(coord) : this.yScale(coord);
    });
  }
  _getVerticesForArc(mark) {
    const startPoint = this._mapToGPUSpace([mark.x, mark.y]);
    const quadraticCurve = getCurveForArc(startPoint, [startPoint[0] + mark.width * SIZE_UNITS, startPoint[1] + mark.height * SIZE_UNITS]);
    const vertices = [...quadraticCurve(0), ...quadraticCurve(1 / NUMBER_OF_VERTICES_PER_ARC)];
    for (let i = 2; i < NUMBER_OF_VERTICES_PER_ARC + 1; i++) {
      const nextPoint = quadraticCurve(i / NUMBER_OF_VERTICES_PER_ARC);
      vertices.push(vertices[vertices.length - 2], vertices[vertices.length - 1], nextPoint[0], nextPoint[1]);
    }
    return vertices;
  }
  _getVerticesForAreaSection(mark) {
    if (!this.lastMark) {
      return [];
    }
    return this._mapToGPUSpace([mark.x, mark.y, this.lastMark.x, this.lastMark.y, mark.x, 0, // TODO: Replace 0 to let area charts center around some other number
    this.lastMark.x, this.lastMark.y, this.lastMark.x, 0, mark.x, 0]);
  }
  _getVerticesForPolygon(mark, sides) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    const vertices = [];
    for (let theta = 0; theta < 2 * Math.PI; theta += 2 * Math.PI / sides) {
      vertices.push(center[0], center[1], center[0] + mark.size / 2 * Math.cos(theta) * SIZE_UNITS, center[1] + mark.size / 2 * Math.sin(theta) * SIZE_UNITS, center[0] + mark.size / 2 * Math.cos(theta + 2 * Math.PI / sides) * SIZE_UNITS, center[1] + mark.size / 2 * Math.sin(theta + 2 * Math.PI / sides) * SIZE_UNITS);
    }
    return vertices;
  }
  _getVerticesForTriangle(mark) {
    // 1
    // / \
    // 2---3
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    return [center[0], center[1] + mark.size / 2 * SIZE_UNITS, center[0] - mark.size / 2 * SIZE_UNITS, center[1] - mark.size / 2 * SIZE_UNITS, center[0] + mark.size / 2 * SIZE_UNITS, center[1] - mark.size / 2 * SIZE_UNITS];
  }
  _getVertexForDot = mark => this._mapToGPUSpace([mark.x, mark.y]);
  _getVerticesForSquare(mark) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    return [center[0] + mark.size / 2 * SIZE_UNITS, // 2------1,4
    center[1] + mark.size / 2 * SIZE_UNITS, // |    /  |
    center[0] - mark.size / 2 * SIZE_UNITS, // |  /    |
    center[1] + mark.size / 2 * SIZE_UNITS, // 3,5------6
    center[0] - mark.size / 2 * SIZE_UNITS, center[1] - mark.size / 2 * SIZE_UNITS, center[0] + mark.size / 2 * SIZE_UNITS, center[1] + mark.size / 2 * SIZE_UNITS, center[0] - mark.size / 2 * SIZE_UNITS, center[1] - mark.size / 2 * SIZE_UNITS, center[0] + mark.size / 2 * SIZE_UNITS, center[1] - mark.size / 2 * SIZE_UNITS];
  }
  _getVerticesForRect(mark) {
    // 1-----------3,6
    // |       /    |
    // |     /      |
    // 2,5-----------4
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    return [center[0], center[1] + mark.height * SIZE_UNITS, center[0], center[1], center[0] + mark.width * SIZE_UNITS, center[1] + mark.height * SIZE_UNITS, center[0] + mark.width * SIZE_UNITS, center[1], center[0], center[1], center[0] + mark.width * SIZE_UNITS, center[1] + mark.height * SIZE_UNITS];
  }
  _getVerticesForTick(mark) {
    const center = this._mapToGPUSpace([mark.x, mark.y]);
    // 1----2
    if (this.track.width) {
      return [center[0] + mark.width / 2 * SIZE_UNITS, center[1], center[0] - mark.width / 2 * SIZE_UNITS, center[1]];
    }
    // 1
    // |
    // 2
    if (mark.height) {
      // default to mark value which has default if height never specified in track
      return [center[0], center[1] + mark.height / 2 * SIZE_UNITS, center[0], center[1] - mark.height / 2 * SIZE_UNITS];
    }
  }
}
function colors(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}
var category10 = colors("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
var Accent = colors("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
var Dark2 = colors("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
var Paired = colors("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
var Pastel1 = colors("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
var Pastel2 = colors("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
var Set1 = colors("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
var Set2 = colors("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
var Set3 = colors("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
var Tableau10 = colors("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis$1(values) {
  var n = values.length - 1;
  return function (t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}
var constant = x => () => x;
function linear(a, d) {
  return function (t) {
    return a + t * d;
  };
}
function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
}
function rgbSpline(spline) {
  return function (colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
    for (i = 0; i < n; ++i) {
      color = _utilities52abb45cJs.j(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function (t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}
var rgbBasis = rgbSpline(basis$1);
function cubehelix$1(hue) {
  return (function cubehelixGamma(y) {
    y = +y;
    function cubehelix(start, end) {
      var h = hue((start = cubehelix$2(start)).h, (end = cubehelix$2(end)).h), s = nogamma(start.s, end.s), l = nogamma(start.l, end.l), opacity = nogamma(start.opacity, end.opacity);
      return function (t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }
    cubehelix.gamma = cubehelixGamma;
    return cubehelix;
  })(1);
}
cubehelix$1(hue);
var cubehelixLong = cubehelix$1(nogamma);
var ramp$1 = scheme => rgbBasis(scheme[scheme.length - 1]);
var scheme$q = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(colors);
var BrBG = ramp$1(scheme$q);
var scheme$p = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(colors);
var PRGn = ramp$1(scheme$p);
var scheme$o = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(colors);
var PiYG = ramp$1(scheme$o);
var scheme$n = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(colors);
var PuOr = ramp$1(scheme$n);
var scheme$m = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(colors);
var RdBu = ramp$1(scheme$m);
var scheme$l = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(colors);
var RdGy = ramp$1(scheme$l);
var scheme$k = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(colors);
var RdYlBu = ramp$1(scheme$k);
var scheme$j = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(colors);
var RdYlGn = ramp$1(scheme$j);
var scheme$i = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(colors);
var Spectral = ramp$1(scheme$i);
var scheme$h = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(colors);
var BuGn = ramp$1(scheme$h);
var scheme$g = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(colors);
var BuPu = ramp$1(scheme$g);
var scheme$f = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(colors);
var GnBu = ramp$1(scheme$f);
var scheme$e = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(colors);
var OrRd = ramp$1(scheme$e);
var scheme$d = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(colors);
var PuBuGn = ramp$1(scheme$d);
var scheme$c = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(colors);
var PuBu = ramp$1(scheme$c);
var scheme$b = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(colors);
var PuRd = ramp$1(scheme$b);
var scheme$a = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(colors);
var RdPu = ramp$1(scheme$a);
var scheme$9 = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(colors);
var YlGnBu = ramp$1(scheme$9);
var scheme$8 = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(colors);
var YlGn = ramp$1(scheme$8);
var scheme$7 = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(colors);
var YlOrBr = ramp$1(scheme$7);
var scheme$6 = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(colors);
var YlOrRd = ramp$1(scheme$6);
var scheme$5 = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(colors);
var Blues = ramp$1(scheme$5);
var scheme$4 = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(colors);
var Greens = ramp$1(scheme$4);
var scheme$3 = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(colors);
var Greys = ramp$1(scheme$3);
var scheme$2 = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(colors);
var Purples = ramp$1(scheme$2);
var scheme$1 = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(colors);
var Reds = ramp$1(scheme$1);
var scheme = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(colors);
var Oranges = ramp$1(scheme);
function cividis(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - t * (35.34 - t * (2381.73 - t * (6402.7 - t * (7024.72 - t * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + t * (170.73 + t * (52.82 - t * (131.46 - t * (176.58 - t * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + t * (442.36 - t * (2482.43 - t * (6167.24 - t * (6614.94 - t * 2475.67))))))) + ")";
}
var cubehelix = cubehelixLong(cubehelix$2(300, 0.5, 0.0), cubehelix$2(-240, 0.5, 1.0));
var warm = cubehelixLong(cubehelix$2(-100, 0.75, 0.35), cubehelix$2(80, 1.50, 0.8));
var cool = cubehelixLong(cubehelix$2(260, 0.75, 0.35), cubehelix$2(80, 1.50, 0.8));
var c$1 = cubehelix$2();
function rainbow(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  c$1.h = 360 * t - 100;
  c$1.s = 1.5 - 1.5 * ts;
  c$1.l = 0.8 - 0.9 * ts;
  return c$1 + "";
}
var c = _utilities52abb45cJs.j(), pi_1_3 = Math.PI / 3, pi_2_3 = Math.PI * 2 / 3;
function sinebow(t) {
  var x;
  t = (0.5 - t) * Math.PI;
  c.r = 255 * (x = Math.sin(t)) * x;
  c.g = 255 * (x = Math.sin(t + pi_1_3)) * x;
  c.b = 255 * (x = Math.sin(t + pi_2_3)) * x;
  return c + "";
}
function turbo(t) {
  t = Math.max(0, Math.min(1, t));
  return "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + t * (1172.33 - t * (10793.56 - t * (33300.12 - t * (38394.49 - t * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + t * (557.33 + t * (1225.33 - t * (3574.96 - t * (1073.77 + t * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + t * (3211.1 - t * (15327.97 - t * (27814 - t * (22569.18 - t * 6838.66))))))) + ")";
}
function ramp(range) {
  var n = range.length;
  return function (t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}
var viridis = ramp(colors("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var magma = ramp(colors("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var inferno = ramp(colors("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var plasma = ramp(colors("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
var d3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  schemeCategory10: category10,
  schemeAccent: Accent,
  schemeDark2: Dark2,
  schemePaired: Paired,
  schemePastel1: Pastel1,
  schemePastel2: Pastel2,
  schemeSet1: Set1,
  schemeSet2: Set2,
  schemeSet3: Set3,
  schemeTableau10: Tableau10,
  interpolateBrBG: BrBG,
  schemeBrBG: scheme$q,
  interpolatePRGn: PRGn,
  schemePRGn: scheme$p,
  interpolatePiYG: PiYG,
  schemePiYG: scheme$o,
  interpolatePuOr: PuOr,
  schemePuOr: scheme$n,
  interpolateRdBu: RdBu,
  schemeRdBu: scheme$m,
  interpolateRdGy: RdGy,
  schemeRdGy: scheme$l,
  interpolateRdYlBu: RdYlBu,
  schemeRdYlBu: scheme$k,
  interpolateRdYlGn: RdYlGn,
  schemeRdYlGn: scheme$j,
  interpolateSpectral: Spectral,
  schemeSpectral: scheme$i,
  interpolateBuGn: BuGn,
  schemeBuGn: scheme$h,
  interpolateBuPu: BuPu,
  schemeBuPu: scheme$g,
  interpolateGnBu: GnBu,
  schemeGnBu: scheme$f,
  interpolateOrRd: OrRd,
  schemeOrRd: scheme$e,
  interpolatePuBuGn: PuBuGn,
  schemePuBuGn: scheme$d,
  interpolatePuBu: PuBu,
  schemePuBu: scheme$c,
  interpolatePuRd: PuRd,
  schemePuRd: scheme$b,
  interpolateRdPu: RdPu,
  schemeRdPu: scheme$a,
  interpolateYlGnBu: YlGnBu,
  schemeYlGnBu: scheme$9,
  interpolateYlGn: YlGn,
  schemeYlGn: scheme$8,
  interpolateYlOrBr: YlOrBr,
  schemeYlOrBr: scheme$7,
  interpolateYlOrRd: YlOrRd,
  schemeYlOrRd: scheme$6,
  interpolateBlues: Blues,
  schemeBlues: scheme$5,
  interpolateGreens: Greens,
  schemeGreens: scheme$4,
  interpolateGreys: Greys,
  schemeGreys: scheme$3,
  interpolatePurples: Purples,
  schemePurples: scheme$2,
  interpolateReds: Reds,
  schemeReds: scheme$1,
  interpolateOranges: Oranges,
  schemeOranges: scheme,
  interpolateCividis: cividis,
  interpolateCubehelixDefault: cubehelix,
  interpolateRainbow: rainbow,
  interpolateWarm: warm,
  interpolateCool: cool,
  interpolateSinebow: sinebow,
  interpolateTurbo: turbo,
  interpolateViridis: viridis,
  interpolateMagma: magma,
  interpolateInferno: inferno,
  interpolatePlasma: plasma
});
// Default channel values of schema which is passed to webgl drawer
const DEFAULT_CHANNELS = Object.freeze({
  size: {
    value: 1,
    numComponents: 1,
    type: "float"
  },
  color: {
    value: 255 ** 3,
    numComponents: 1,
    type: "float"
  },
  x: {
    value: 0,
    numComponents: null,
    // x and y are placed in an attribute vector in the shader that is already handled
    type: null
  },
  y: {
    value: 0,
    numComponents: null,
    type: null
  },
  opacity: {
    value: 1,
    numComponents: 1,
    type: "float"
  },
  shape: {
    value: "dot",
    numComponents: null,
    type: null
  },
  width: {
    value: 1,
    numComponents: 1,
    type: "float"
  },
  height: {
    value: 1,
    numComponents: 1,
    type: "float"
  }
});
const DEFAULT_MAX_SIZE = 100;
const DEFAULT_MIN_SIZE = 0;
const DEFAULT_MIN_OPACITY = 0;
const DEFAULT_MIN_WIDTH = 0;
const DEFAULT_MIN_HEIGHT = 0;
const DEFAULT_MAX_WIDTH = 1 / SIZE_UNITS;
const DEFAULT_MAX_HEIGHT = 1 / SIZE_UNITS;
const DEFAULT_COLOR_SCHEME = "interpolateBrBG";
// first value is undefined as categories are 1-indexed
const SHAPES = [undefined, "dot", "triangle", "circle", "diamond"];
/**
* Given a track, determine the WebGL draw mode for it
*
* @param {Object} track from schema
* @returns WebGLDrawMode as a string
*/
const getDrawModeForTrack = track => {
  switch (track.mark) {
    case "line":
      return "LINE_STRIP";
    case "tick":
    case "arc":
      return "LINES";
    case "point":
      if (track.shape && track.shape.value !== "dot") {
        return "TRIANGLES";
      } else {
        return "POINTS";
      }
    case "rect":
    case "area":
      return "TRIANGLES";
  }
};
class SchemaProcessor {
  /**
  * Process a schema by reading in the data, the channel information, and producing an
  * iterator like interface with getNextTrack to feed to a drawer.
  *
  * @param {Object} schema user defined schema
  * @param {Function} callback function to call after all the data has been loaded
  */
  constructor(schema, callback) {
    this.index = 0;
    this.schema = schema;
    if (typeof schema.defaultData === "string") {
      // data is a url to get
      this.dataPromise = fetch(schema.defaultData).then(response => response.text()).then(text => this.data = text.split("\n"));
    } else if (schema.defaultData) {
      // default data is defined, assumed to be an object
      this.data = schema.defaultData;
      this.isInlineData = true;
    }
    this.tracks = schema.tracks.map(track => new Track(this, track));
    const allPromises = this.tracks.map(track => track.dataPromise).filter(p => p);
    // Removes undefined
    if (this.dataPromise) {
      allPromises.push(this.dataPromise);
    }
    this.xScale = _utilities52abb45cJs.a("x", schema);
    this.yScale = _utilities52abb45cJs.a("y", schema);
    // When all tracks have acquired their data, call the callback
    // TODO: Allow tracks to be processed while waiting for others, need to keep in mind order
    Promise.all(allPromises).then(() => callback(this));
  }
  /**
  * Get the next track to process
  * @returns {@link Track}
  */
  getNextTrack() {
    if (this.index >= this.tracks.length) {
      return null;
    }
    return this.tracks[this.index++];
  }
}
class Track {
  /**
  * Process a track from a schema by loading data and producing an iterator
  * like interface with getNextDataPoint or getNextMark.
  *
  * @param {Object} schema user defined visualization
  * @param {Object} track user defined track
  */
  constructor(schema, track) {
    this.track = track;
    this.index = 1;
    // Start at 1 to skip headers
    if (typeof track.data === "string") {
      // Track has its own data to GET
      this.dataPromise = fetch(track.data).then(response => response.text()).then(text => {
        this.data = text.split(/[\n\r]+/);
        this.processHeadersAndMappers();
        this.hasOwnData = true;
      });
    } else if (track.data) {
      // Track has its own inline data
      this.data = track.data;
      this.isInlineData = true;
      this.processHeadersAndMappers();
      this.hasOwnData = true;
    } else if (schema.data) {
      // Track does not have its own data, but the schema has default data
      this.data = schema.data;
      this.isInlineData = schema.isInlineData;
      this.processHeadersAndMappers();
    } else if (schema.dataPromise) {
      // Track does not have its own data, but the schema is GETting default data
      schema.dataPromise.then(() => {
        this.data = schema.data;
        this.processHeadersAndMappers();
      });
    } else {
      console.error(`Could not find data (no defaultData in schema and no data specified for this track) for track ${track}.`);
    }
  }
  /**
  * Read the headers from the first row of data and then build functions to map a data row
  * to a channel value for drawing. Ultimately a method due to clunky constructor.
  */
  processHeadersAndMappers() {
    // Processing headers
    if (this.isInlineData) {
      this.headers = Object.keys(this.data);
      this.dataLength = this.data[this.headers[0]].length;
      this.index = 0;
    } else {
      this.headers = this.data[0].split(",");
      this.dataLength = this.data.length;
    }
    // Creating channel mappers
    this.channelMaps = new Map();
    Object.keys(DEFAULT_CHANNELS).forEach(channel => {
      this.channelMaps.set(channel, this.buildMapperForChannel(channel));
    });
  }
  /**
  * Get the next data point from the track. Returns null when all points have been returned.
  * @returns A data point with the x and y coordinates and other attributes from the header
  */
  getNextDataPoint() {
    if (this.index >= this.dataLength) {
      // TODO potentially erase this.data for garbage collection
      return null;
    }
    const toReturn = {
      geometry: {
        coordinates: []
      }
    };
    let splitted;
    if (this.isInlineData) {
      splitted = this.headers.map(header => this.data[header][this.index]);
      this.index++;
    } else {
      const currRow = this.data[this.index++];
      splitted = currRow.split(",");
    }
    this.headers.forEach((header, index) => {
      toReturn[header] = splitted[index];
    });
    const x = this.channelMaps.get("x")(splitted);
    const y = this.channelMaps.get("y")(splitted);
    toReturn.geometry.coordinates.push(x, y);
    return toReturn;
  }
  /**
  * Get the next mark from the track for the drawer to process. Returns null when all
  * marks have been returned.
  * @returns An object containing information used to draw a mark for a row of data.
  */
  getNextMark() {
    if (this.index >= this.dataLength) {
      return null;
    }
    const toReturn = {};
    let splitted;
    if (this.isInlineData) {
      splitted = this.headers.map(header => this.data[header][this.index]);
      this.index++;
    } else {
      const currRow = this.data[this.index++];
      splitted = currRow.split(",");
    }
    this.channelMaps.forEach((mapper, channel) => {
      toReturn[channel] = mapper(splitted);
    });
    return toReturn;
  }
  /**
  * Builds a function which maps an attribute value to a channel value for use by the drawer.
  * The function will return a default if not present in the track, or a constant if
  * value is defined.
  *
  * @param {String} channel one of the channels listed in default channels
  * @returns the function
  */
  buildMapperForChannel = channel => {
    if ((channel in this.track)) {
      const channelInfo = this.track[channel];
      if (("value" in channelInfo)) {
        if (channel === "color") {
          channelInfo.value = _utilities52abb45cJs.c(channelInfo.value);
        }
        return () => channelInfo.value;
      } else {
        const attributeIndex = this.headers.indexOf(channelInfo.attribute);
        let attrMapper;
        switch (channelInfo.type) {
          case "quantitative":
            attrMapper = buildMapperForQuantitiveChannel(channel, channelInfo);
            break;
          case "categorical":
            attrMapper = buildMapperForCategoricalChannel(channel, channelInfo);
            break;
          case "genomic":
            const chrAttributeIndex = this.headers.indexOf(channelInfo.chrAttribute);
            const geneAttributeIndex = this.headers.indexOf(channelInfo.geneAttribute);
            attrMapper = buildMapperForGenomicChannel(channel);
            return row => attrMapper(row[chrAttributeIndex], row[geneAttributeIndex]);
          case "genomicRange":
            const genomicAttributeIndices = [this.headers.indexOf(channelInfo.chrAttribute), this.headers.indexOf(channelInfo.startAttribute), this.headers.indexOf(channelInfo.endAttribute)];
            attrMapper = buildMapperForGenomicRangeChannel(channel);
            return row => attrMapper(...genomicAttributeIndices.map(index => row[index]));
        }
        return row => attrMapper(row[attributeIndex]);
      }
    } else {
      return () => DEFAULT_CHANNELS[channel].value;
    }
  };
}
/**
* Build a function which maps a numerical value for an attribute to a property of a mark
* @param {*} channel the name of the quantitative channel to map
* @param {*} channelInfo the object containing info for this channel from the schema
* @returns a function that maps a data attribute value to a channel value
*/
const buildMapperForQuantitiveChannel = (channel, channelInfo) => {
  switch (channel) {
    case "x":
    case "y":
      // Map x and y to itself, but we need a function to do it
      return coord => parseFloat(coord);
    case "opacity":
      return _utilities52abb45cJs.s(channelInfo.domain, [channelInfo.minOpacity || DEFAULT_MIN_OPACITY, 1]);
    case "size":
      return _utilities52abb45cJs.s(channelInfo.domain, [channelInfo.minSize || DEFAULT_MIN_SIZE, channelInfo.maxSize || DEFAULT_MAX_SIZE]);
    case "color":
      const d3colorScale = !channelInfo.colorScheme || !((channelInfo.colorScheme in d3)) ? d3[DEFAULT_COLOR_SCHEME] : d3[channelInfo.colorScheme];
      const zeroToOneScale = _utilities52abb45cJs.s(channelInfo.domain, [0, 1]);
      return attrValue => _utilities52abb45cJs.k(d3colorScale(zeroToOneScale(attrValue)));
    case "width":
      return _utilities52abb45cJs.s(channelInfo.domain, [channelInfo.minWidth || DEFAULT_MIN_WIDTH, channelInfo.maxWidth || DEFAULT_MAX_WIDTH]);
    case "height":
      return _utilities52abb45cJs.s(channelInfo.domain, [channelInfo.minHeight || DEFAULT_MIN_HEIGHT, channelInfo.maxHeight || DEFAULT_MAX_WIDTH]);
    default:
      console.error(`${channel} is not a supported channel for quantitative attributes!`);
  }
};
/**
* Build a function which maps a discrete (integers are possible) value for an attribute
* to a property of a mark
* @param {*} channel the name of the categorical channel to map
* @param {*} channelInfo the object containing info for this channel from the schema
* @returns a function that maps a data attribute value to a channel value
*/
const buildMapperForCategoricalChannel = (channel, channelInfo) => {
  const categoryTracker = new Map();
  let channelScale;
  switch (channel) {
    case "x":
    case "y":
      // +1 here to avoid setting x or y at a boundary that makes it not visible
      channelScale = _utilities52abb45cJs.s([1, channelInfo.cardinality + 1], [-1, 1]);
      break;
    case "opacity":
      channelScale = _utilities52abb45cJs.s([1, channelInfo.cardinality], [channelInfo.minOpacity || DEFAULT_MIN_OPACITY, 1]);
      break;
    case "size":
      channelScale = _utilities52abb45cJs.s([1, channelInfo.cardinality], [channelInfo.minSize || DEFAULT_MIN_SIZE, channelInfo.maxSize || DEFAULT_MAX_SIZE]);
      break;
    case "shape":
      channelScale = categoryId => SHAPES[categoryId % SHAPES.length];
      break;
    case "color":
      let d3colorScale = !channelInfo.colorScheme || !((channelInfo.colorScheme in d3)) ? d3[DEFAULT_COLOR_SCHEME] : d3[channelInfo.colorScheme];
      if (Array.isArray(d3colorScale)) {
        console.error("Currenty only interpolating color schemes are supported, using default");
        d3colorScale = d3[DEFAULT_COLOR_SCHEME];
      }
      const zeroToOneScale = _utilities52abb45cJs.s([1, channelInfo.cardinality], [0, 1]);
      channelScale = categoryId => _utilities52abb45cJs.k(d3colorScale(zeroToOneScale(categoryId)));
      break;
    case "width":
      channelScale = _utilities52abb45cJs.s([1, channelInfo.cardinality], [channelInfo.minWidth || DEFAULT_MIN_WIDTH, channelInfo.maxWidth || DEFAULT_MAX_WIDTH]);
      break;
    case "height":
      channelScale = _utilities52abb45cJs.s([1, channelInfo.cardinality], [channelInfo.minHeight || DEFAULT_MIN_HEIGHT, channelInfo.maxHeight || DEFAULT_MAX_HEIGHT]);
      break;
    default:
      console.error(`${channel} is not a supported channel for categorical attributes!`);
  }
  return attrValue => {
    if (!categoryTracker.has(attrValue)) {
      categoryTracker.set(attrValue, categoryTracker.size + 1);
    }
    return channelScale(categoryTracker.get(attrValue));
  };
};
/**
* Build a function which maps a genome chr, gene, to an object consumable by a GenomeScale
* @param {*} channel either x or y
* @param {*} channelInfo the object containing info for this channel from the schema
* @returns a function that maps (genomeChr, geneLoc) -> [chrId, geneLocation]
*  ex: ["X", 200]
*/
const buildMapperForGenomicChannel = (channel, channelInfo) => {
  switch (channel) {
    case "x":
    case "y":
      return (chr, gene) => {
        let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
        return [chrId, parseInt(gene)];
      };
    default:
      console.error(`${channel} is not a supported channel for genomic attributes!`);
  }
};
/**
* Build a function which maps a genome chr, start, and end to an object consumable by a scale
* @param {*} channel either x or y, width or height may be included if doing arc marks
* @param {*} channelInfo the object containing info for this channel from the schema
* @returns a function that maps (genomeChr, genomeStart, genomeEnd) -> an object containing mark metadata for position
*  format: [chrId, geneLocation, chrId2, geneLocation2]
*  ex: ["1", 1000, "X", 2000]
*/
const buildMapperForGenomicRangeChannel = (channel, channelInfo) => {
  switch (channel) {
    case "width":
    case "height":
    case "x":
    case "y":
      return (chr, genomeStart, genomeEnd) => {
        let chrId = chr.startsWith("chr") ? chr.substring(3) : chr.toString();
        return [chrId, parseInt(genomeStart), chrId, parseInt(genomeEnd)];
      };
    default:
      console.error(`${channel} is not a supported channel for genomic attributes!`);
  }
};

},{"./utilities-52abb45c.js":"5UUVh","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5UUVh":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "C", function () {
  return Color;
});
_parcelHelpers.export(exports, "G", function () {
  return GenomeScale;
});
_parcelHelpers.export(exports, "R", function () {
  return Rgb;
});
_parcelHelpers.export(exports, "a", function () {
  return getScaleForSchema;
});
_parcelHelpers.export(exports, "b", function () {
  return getViewportForSchema;
});
_parcelHelpers.export(exports, "c", function () {
  return colorSpecifierToHex;
});
_parcelHelpers.export(exports, "d", function () {
  return define;
});
_parcelHelpers.export(exports, "e", function () {
  return extend;
});
_parcelHelpers.export(exports, "f", function () {
  return brighter;
});
_parcelHelpers.export(exports, "g", function () {
  return getDimAndMarginStyleForSchema;
});
_parcelHelpers.export(exports, "h", function () {
  return darker;
});
_parcelHelpers.export(exports, "i", function () {
  return getQuadraticBezierCurveForPoints;
});
_parcelHelpers.export(exports, "j", function () {
  return rgb;
});
_parcelHelpers.export(exports, "k", function () {
  return rgbStringToHex;
});
_parcelHelpers.export(exports, "r", function () {
  return rgbConvert;
});
_parcelHelpers.export(exports, "s", function () {
  return scale;
});
function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
  // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);
  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient, +x.slice(i + 1)];
}
function exponent(x) {
  return (x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN);
}
function formatGroup(grouping, thousands) {
  return function (value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}
function formatNumerals(numerals) {
  return function (value) {
    return value.replace(/[0-9]/g, function (i) {
      return numerals[+i];
    });
  };
}
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
// instanceof
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function () {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}
var prefixExponent;
function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
}
function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}
var formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": x => Math.round(x).toString(2),
  "c": x => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": x => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": x => Math.round(x).toString(16).toUpperCase(),
  "x": x => Math.round(x).toString(16)
};
function identity(x) {
  return x;
}
var map = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function formatLocale(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? identity : formatNumerals(map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "−" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    // The "n" type is an alias for ",g".
    if (type === "n") (comma = true, type = "g"); else if (!formatTypes[type]) (precision === undefined && (precision = 12), trim = true, type = "g");
    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || fill === "0" && align === "=") (zero = true, fill = "0", align = "=");
    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && (/[boxX]/).test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : (/[%p]/).test(type) ? percent : "";
    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type], maybeSuffix = (/[defgprs%]/).test(type);
    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6 : (/[gprs]/).test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;
        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);
        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          (i = -1, n = value.length);
          while (++i < n) {
            if ((c = value.charCodeAt(i), 48 > c || c > 57)) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);
      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) (value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "");
      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format.toString = function () {
      return specifier + "";
    };
    return format;
  }
  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function (value) {
      return f(k * value) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}
var locale;
var format;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  return locale;
}
function precisionRound(step, max) {
  (step = Math.abs(step), max = Math.abs(max) - step);
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}
/**
* Create a function which maps a genome pair to a location in the entire genome
*
* @param {String} genomeId key from genomeSizes object
* @returns a function which maps a (chrId, pairNum) => to
*  a number between 1 and total number of genes in the genome
*/
const createPairMapperToGenome = genomeId => {
  let chrSizes = genomeSizes[genomeId];
  let chrStarts = new Map();
  let cumulativeTotal = 0;
  chrSizes.forEach((value, key) => {
    chrStarts.set(key, cumulativeTotal);
    cumulativeTotal += value;
  });
  return (chr, pairNum) => {
    return chrStarts.get(chr) + pairNum;
  };
};
class GenomeScale {
  /**
  * A scale used to map a genome pair to a location between -1 and 1 for data visualization.
  * Also contains inverse and utility functions for getting labels for axis.
  *
  * @param {String} genomeId key from genomeSizes object
  * @param {Array} domain array of length 2 containing the start and end of the genome
  *   for the scale. ex: ["chr2:1000", "chr3:2000"]
  */
  constructor(genomeId, domain) {
    if (genomeSizes[genomeId] === undefined) {
      console.error(`${genomeId} is not a recognized genome!`);
    }
    this.genomeId = genomeId;
    this.domain = domain;
    let [startChr, startPair] = domain[0].substring(3).split(":");
    // split chromesome and pair number
    startPair = parseInt(startPair);
    let [endChr, endPair] = domain[1].substring(3).split(":");
    endPair = parseInt(endPair);
    this.mapPairToGenomeIndex = createPairMapperToGenome(genomeId);
    const firstPairInDomain = this.mapPairToGenomeIndex(startChr, startPair);
    const lastPairInDomain = this.mapPairToGenomeIndex(endChr, endPair);
    this.mapGenomeIndexToClipSpace = scale([firstPairInDomain, lastPairInDomain], [-1, 1]);
    this.mapGenomeIndexToClipSpaceInverse = scale([-1, 1], [firstPairInDomain, lastPairInDomain]);
  }
  /**
  * Map a genome pair to [-1, 1] with the parts.
  *
  * @param {String} chr id of chromosome in genome
  * @param {Number} pair location in chromosome
  * @returns value in [-1, 1] corresponding to genome range location
  */
  toClipSpaceFromParts(chr, pair) {
    return this.mapGenomeIndexToClipSpace(this.mapPairToGenomeIndex(chr, pair));
  }
  /**
  * Utility method for calling this.toClipSpaceFromParts.
  *
  * @param {String} pairStr in form "chrID:geneNumber" ex: "chr1:1000"
  * @returns value in [-1, 1] corresponding to genome range location
  */
  toClipSpaceFromString(pairStr) {
    let [chr, pair] = pairStr.substring(3).split(":");
    pair = parseInt(pair);
    return this.toClipSpaceFromParts(chr, pair);
  }
  /**
  * Get the gene id from a value between [-1, 1]
  *
  * @param {Number} num number between [-1, 1]
  * @param {String} formatting used for formatting gene number with d3-format
  * @returns `chr${chrId}:${chrLoc}`
  */
  inverse(num, formatting = false) {
    let genomeSpot = Math.floor(this.mapGenomeIndexToClipSpaceInverse(num));
    let chrId;
    let chrLoc;
    let cumulativeTotal = 0;
    for (const [chrKey, pairCount] of genomeSizes[this.genomeId].entries()) {
      if (cumulativeTotal + pairCount >= genomeSpot) {
        chrLoc = genomeSpot - cumulativeTotal;
        chrId = chrKey;
        break;
      }
      cumulativeTotal += pairCount;
    }
    return formatting ? `chr${chrId}:${format(formatting)(chrLoc)}` : `chr${chrId}:${chrLoc}`;
  }
  getMidpoint(chr1, gene1, chr2, gene2) {
    const x1 = this.toClipSpaceFromParts(chr1, gene1);
    const x2 = this.toClipSpaceFromParts(chr2, gene2);
    const middleGene = this.inverse((x1 + x2) / 2);
    const [chrId, gene] = middleGene.substring(3).split(":");
    return [chrId, parseInt(gene)];
  }
  /**
  * Get a sequence of ticks for a range in the genome.
  *
  * @param {Number} start number between [-1, 1]
  * @param {Number} end number between [-1, 1] > start
  * @returns object with tickCoords and corresponding tickLabels property
  */
  getTickCoordsAndLabels(start, end) {
    let [startChr, startPair] = this.inverse(start).substring(3).split(":");
    let [endChr, endPair] = this.inverse(end).substring(3).split(":");
    const toReturn = [];
    let suggestedFormat;
    if (startChr === endChr) {
      let difference = endPair - startPair;
      let magnitude = Math.floor(Math.log10(difference));
      let startingValue = startPair - startPair % 10 ** magnitude;
      suggestedFormat = precisionRound(10 ** magnitude, startingValue);
      for (let currValue = startingValue; currValue < endPair; currValue += 10 ** magnitude) {
        toReturn.push(this.toClipSpaceFromParts(startChr, currValue));
      }
    } else {
      suggestedFormat = "1";
      for (const chrId of genomeSizes[this.genomeId].keys()) {
        toReturn.push(this.toClipSpaceFromParts(chrId, 1));
      }
    }
    return {
      tickCoords: toReturn,
      tickLabels: toReturn.map(coord => this.inverse(coord, format(`.${suggestedFormat}s`)))
    };
  }
  toCallable() {
    // TODO investigate if using this method in the vertex calculator leads to slow downs
    const func = args => {
      return this.toClipSpaceFromParts(args[0], args[1]);
    };
    func.getMidpoint = this.getMidpoint.bind(this);
    return func;
  }
  /**
  * Utility method for getting a GenomeScale across an entire genome.
  *
  * @param {String} genomeId from genomeSizes
  * @returns a GenomeScale across an entire genome
  */
  static completeScale(genomeId) {
    const chrSizes = genomeSizes[genomeId];
    const finalEntry = [...chrSizes.entries()][chrSizes.size - 1];
    return new GenomeScale(genomeId, ["chr1:1", `chr${finalEntry[0]}:${finalEntry[1]}`]);
  }
}
/**
* Available genomes to visualize. Each genome is a map from chromosome id to number of genes in chromosome.
* Order matters as maps remember insertion order.
*/
const genomeSizes = {
  hg38: new Map([["1", 248956422], // chr1
  ["2", 242193529], // chr2
  ["3", 198295559], // ...
  ["4", 190214555], ["5", 181538259], ["6", 170805979], ["7", 159345973], ["8", 145138636], ["9", 138394717], ["10", 135086622], ["11", 133797422], ["12", 133275309], ["13", 114364328], ["14", 107043718], ["15", 101991189], ["16", 90338345], ["17", 83257441], ["18", 80373285], ["19", 58617616], ["20", 64444167], // ...
  ["21", 46709983], // chr21
  ["22", 50818468], // chr22
  ["X", 156040895], // chrX
  ["Y", 57227415]]),
  hg19: new Map([["1", 249250621], // chr1
  ["2", 243199373], // chr2
  ["3", 198022430], // ...
  ["4", 191154276], ["5", 180915260], ["6", 171115067], ["7", 159138663], ["8", 146364022], ["9", 141213431], ["10", 135534747], ["11", 135006516], ["12", 133851895], ["13", 115169878], ["14", 107349540], ["15", 102531392], ["16", 90354753], ["17", 81195210], ["18", 78077248], ["19", 59128983], ["20", 63025520], // ...
  ["21", 48129895], // chr21
  ["22", 51304566], // chr22
  ["X", 155270560], // chrX
  ["Y", 59373566]]),
  mm9: new Map([["1", 197195432], ["2", 181748087], ["3", 159599783], ["4", 155630120], ["5", 152537259], ["6", 149517037], ["7", 152524553], ["8", 131738871], ["9", 124076172], ["10", 129993255], ["11", 121843856], ["12", 121257530], ["13", 120284312], ["14", 125194864], ["15", 103494974], ["16", 98319150], ["17", 95272651], ["18", 90772031], ["19", 61342430], ["X", 166650296], ["Y", 15902555]]),
  mm10: new Map([["1", 195471971], ["2", 182113224], ["3", 160039680], ["4", 156508116], ["5", 151834684], ["6", 149736546], ["7", 145441459], ["8", 129401213], ["9", 124595110], ["10", 130694993], ["11", 122082543], ["12", 120129022], ["13", 120421639], ["14", 124902244], ["15", 104043685], ["16", 98207768], ["17", 94987271], ["18", 90702639], ["19", 61431566], ["X", 171031299], ["Y", 91744698]]),
  mm39: new Map([["1", 195154279], // chr1
  ["2", 181755017], // chr2
  ["3", 159745316], // ...
  ["4", 156860686], ["5", 151758149], ["6", 149588044], ["7", 144995196], ["8", 130127694], ["9", 124359700], ["10", 130530862], ["11", 121973369], ["12", 120092757], ["13", 120883175], ["14", 125139656], ["15", 104073951], ["16", 98008968], ["17", 95294699], // ...
  ["18", 90720763], // chr18
  ["19", 61420004], // chr19
  ["X", 169476592], // chrX
  ["Y", 91455967]])
};
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function Color() {}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};
define(Color, color, {
  copy: function (channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function () {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define(Rgb, rgb, extend(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function () {
    return this;
  },
  displayable: function () {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN; else if (l <= 0 || l >= 1) h = s = NaN; else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6; else if (g === max) h = (b - r) / s + 2; else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter: function (k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function (k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function () {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
  },
  displayable: function () {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function () {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
/*From FvD 13.37, CSS Color Module Level 3*/
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
/**
* Returns a linear scale to map elements in domain to elements in range.
* @param {Array} domain array of length two containing minimum and maximum values
* @param {Array} range array of length two containing minimum and maximum values
* @returns linear scale mapping domain to range
*/
function scale(domain, range) {
  const domainLength = domain[1] - domain[0];
  const rangeLength = range[1] - range[0];
  const slope = rangeLength / domainLength;
  const intercept = range[1] - slope * domain[1];
  return x => slope * x + intercept;
}
/**
* Maps RGB values to integer for webgl buffer.
*
* @param {Integer} red value from 0 to 255
* @param {Integer} green value from 0 to 255
* @param {Integer} blue value from 0 to 255
* @returns RGB hex value as integer
*/
function rgbToHex(red, green, blue) {
  return red << 16 | green << 8 | blue << 0;
}
function rgbStringToHex(rgb) {
  const colorVals = rgb.substring(4, rgb.length - 1).split(",");
  return rgbToHex(...colorVals.map(asStr => parseInt(asStr)));
}
function colorSpecifierToHex(specifier) {
  if (!isNaN(specifier)) {
    // Specifier is already a hex value
    return Math.floor(specifier);
  }
  const asColor = color(specifier);
  return rgbToHex(asColor.r, asColor.g, asColor.b);
}
/**
* Get the VIEWPORT of the schema to be used by the mouseReader.
* If all types for a dimension across tracks are categorical or genomic,
* will default to [-1, 1] for that dimension for the mouseReader. If X or Y
* has a fixed value, it will consider the width or height channel domains.
*
* @param {Object} schema of visualization
* @returns [smallestX, largestX, smallestY, largestY] of viewport
*/
function getViewportForSchema(schema) {
  let smallestX = Number.POSITIVE_INFINITY;
  let largestX = Number.NEGATIVE_INFINITY;
  let smallestY = Number.POSITIVE_INFINITY;
  let largestY = Number.NEGATIVE_INFINITY;
  schema.tracks.forEach(track => {
    let xDomain = track.x.domain;
    if (!xDomain && track.x.value !== undefined && track.width.domain !== undefined) {
      xDomain = track.width.domain;
    }
    let yDomain = track.y.domain;
    if (!yDomain && track.y.value !== undefined && track.height && track.height.domain !== undefined) {
      yDomain = track.height.domain;
    }
    if (xDomain) {
      smallestX = xDomain[0] < smallestX ? xDomain[0] : smallestX;
      largestX = xDomain[1] > largestX ? xDomain[1] : largestX;
    }
    if (yDomain) {
      smallestY = yDomain[0] < smallestY ? yDomain[0] : smallestY;
      largestY = yDomain[1] > largestY ? yDomain[1] : largestY;
    }
  });
  smallestX = smallestX === Number.POSITIVE_INFINITY ? -1 : smallestX;
  largestX = largestX === Number.NEGATIVE_INFINITY ? 1 : largestX;
  smallestY = smallestY === Number.POSITIVE_INFINITY ? -1 : smallestY;
  largestY = largestY === Number.NEGATIVE_INFINITY ? 1 : largestY;
  return [smallestX, largestX, smallestY, largestY];
}
/**
* Given a schema, return a SCALE to be used for mapping data points to clip space
* for the drawer.
*
* @param {String} dimension either x or y
* @param {Object} schema for the visualization
* @returns function which can be used to map to an "x" or "y" value
*/
const getScaleForSchema = (dimension, schema) => {
  if (dimension !== "x" && dimension !== "y") {
    console.error(`${dimension} is not x or y!`);
  }
  let genomic = false;
  let genome;
  for (const track of schema.tracks) {
    if (track[dimension].type && track[dimension].type.includes("genomic")) {
      genome = track[dimension].genome;
      genomic = true;
      break;
    }
  }
  if (!genomic) {
    const viewport = getViewportForSchema(schema);
    if (dimension === "x") {
      return scale([viewport[0], viewport[1]], [-1, 1]);
    }
    return scale([viewport[2], viewport[3]], [-1, 1]);
  }
  const geneScale = GenomeScale.completeScale(genome);
  let smallestGene = undefined;
  let smallestGeneValue = Number.POSITIVE_INFINITY;
  let largestGene = undefined;
  let largestGeneValue = Number.NEGATIVE_INFINITY;
  for (const track of schema.tracks) {
    let xDomain = track[dimension].domain;
    if (xDomain) {
      if (geneScale.toClipSpaceFromString(xDomain[0]) < smallestGeneValue) {
        smallestGeneValue = geneScale.toClipSpaceFromString(xDomain[0]);
        smallestGene = xDomain[0];
      }
      if (geneScale.toClipSpaceFromString(xDomain[1]) > largestGeneValue) {
        largestGeneValue = geneScale.toClipSpaceFromString(xDomain[1]);
        largestGene = xDomain[1];
      }
    }
  }
  return new GenomeScale(genome, [smallestGene, largestGene]);
};
const DEFAULT_MARGIN = "2em";
const getDimAndMarginStyleForSchema = schema => {
  if (schema.margins === undefined) {
    return {
      width: `calc(100% - ${DEFAULT_MARGIN} - ${DEFAULT_MARGIN}`,
      height: `calc(100% - ${DEFAULT_MARGIN} - ${DEFAULT_MARGIN}`,
      margin: DEFAULT_MARGIN
    };
  }
  let toReturn = {};
  toReturn.width = `calc(100% - ${schema.margins.left || DEFAULT_MARGIN} - ${schema.margins.right || DEFAULT_MARGIN})`;
  toReturn.height = `calc(100% - ${schema.margins.top || DEFAULT_MARGIN} - ${schema.margins.bottom || DEFAULT_MARGIN})`;
  // Shorthand for top right bottom left
  toReturn.margin = `${schema.margins.top || DEFAULT_MARGIN}
                     ${schema.margins.right || DEFAULT_MARGIN}
                     ${schema.margins.bottom || DEFAULT_MARGIN}
                     ${schema.margins.left || DEFAULT_MARGIN}`;
  return toReturn;
};
/**
* We need to calculate points on the arc for that mark type, but it needs to be quick.
* In addition, it shouldn't be a perfect circle, and also should look somewhat arc like.
* This utility funciton returns function that takes a value between 0 and 1 where 0 maps
* to the first control point, and 1 maps to the third control point.
*
* https://math.stackexchange.com/a/1361717
*
* @param {Array} P0 first control point
* @param {Array} P1 second control point
* @param {Array} P2 third control point
* @returns a function [0, 1] -> point on curve
*/
const getQuadraticBezierCurveForPoints = (P0, P1, P2) => {
  const x = t => (1 - t) ** 2 * P0[0] + 2 * t * (1 - t) * P1[0] + t ** 2 * P2[0];
  const y = t => (1 - t) ** 2 * P0[1] + 2 * t * (1 - t) * P1[1] + t ** 2 * P2[1];
  return t => [x(t), y(t)];
};

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}]},["6wDK3"], "6wDK3", "parcelRequire2739")

//# sourceMappingURL=offscreen-webgl-worker-a1ab5662.2d936373.js.map
