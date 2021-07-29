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
})({"pmxUQ":[function(require,module,exports) {
var _schemaProcessor66236800Js = require('./schema-processor-66236800.js');
var _utilities52abb45cJs = require('./utilities-52abb45c.js');
function sortKD(ids, coords, nodeSize, left, right, depth) {
  if (right - left <= nodeSize) return;
  const m = left + right >> 1;
  select(ids, coords, m, left, right, depth % 2);
  sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
  sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}
function select(ids, coords, k, left, right, inc) {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      select(ids, coords, k, newLeft, newRight, inc);
    }
    const t = coords[2 * k + inc];
    let i = left;
    let j = right;
    swapItem(ids, coords, left, k);
    if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);
    while (i < j) {
      swapItem(ids, coords, i, j);
      i++;
      j--;
      while (coords[2 * i + inc] < t) i++;
      while (coords[2 * j + inc] > t) j--;
    }
    if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j); else {
      j++;
      swapItem(ids, coords, j, right);
    }
    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
}
function swapItem(ids, coords, i, j) {
  swap(ids, i, j);
  swap(coords, 2 * i, 2 * j);
  swap(coords, 2 * i + 1, 2 * j + 1);
}
function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
  const stack = [0, ids.length - 1, 0];
  const result = [];
  let x, y;
  while (stack.length) {
    const axis = stack.pop();
    const right = stack.pop();
    const left = stack.pop();
    if (right - left <= nodeSize) {
      for (let i = left; i <= right; i++) {
        x = coords[2 * i];
        y = coords[2 * i + 1];
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
      }
      continue;
    }
    const m = Math.floor((left + right) / 2);
    x = coords[2 * m];
    y = coords[2 * m + 1];
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
    const nextAxis = (axis + 1) % 2;
    if (axis === 0 ? minX <= x : minY <= y) {
      stack.push(left);
      stack.push(m - 1);
      stack.push(nextAxis);
    }
    if (axis === 0 ? maxX >= x : maxY >= y) {
      stack.push(m + 1);
      stack.push(right);
      stack.push(nextAxis);
    }
  }
  return result;
}
function within(ids, coords, qx, qy, r, nodeSize) {
  const stack = [0, ids.length - 1, 0];
  const result = [];
  const r2 = r * r;
  while (stack.length) {
    const axis = stack.pop();
    const right = stack.pop();
    const left = stack.pop();
    if (right - left <= nodeSize) {
      for (let i = left; i <= right; i++) {
        if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
      }
      continue;
    }
    const m = Math.floor((left + right) / 2);
    const x = coords[2 * m];
    const y = coords[2 * m + 1];
    if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
    const nextAxis = (axis + 1) % 2;
    if (axis === 0 ? qx - r <= x : qy - r <= y) {
      stack.push(left);
      stack.push(m - 1);
      stack.push(nextAxis);
    }
    if (axis === 0 ? qx + r >= x : qy + r >= y) {
      stack.push(m + 1);
      stack.push(right);
      stack.push(nextAxis);
    }
  }
  return result;
}
function sqDist(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}
const defaultGetX = p => p[0];
const defaultGetY = p => p[1];
class KDBush {
  constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
    this.nodeSize = nodeSize;
    this.points = points;
    const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;
    const ids = this.ids = new IndexArrayType(points.length);
    const coords = this.coords = new ArrayType(points.length * 2);
    for (let i = 0; i < points.length; i++) {
      ids[i] = i;
      coords[2 * i] = getX(points[i]);
      coords[2 * i + 1] = getY(points[i]);
    }
    sortKD(ids, coords, nodeSize, 0, ids.length - 1, 0);
  }
  range(minX, minY, maxX, maxY) {
    return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
  }
  within(x, y, r) {
    return within(this.ids, this.coords, x, y, r, this.nodeSize);
  }
}
const defaultOptions = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: false,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: false,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: props => props
};
const fround = Math.fround || (tmp => x => {
  tmp[0] = +x;
  return tmp[0];
})(new Float32Array(1));
class Supercluster {
  constructor(options) {
    this.options = extend(Object.create(defaultOptions), options);
    this.trees = new Array(this.options.maxZoom + 1);
  }
  load(points) {
    const {log, minZoom, maxZoom, nodeSize} = this.options;
    if (log) console.time('total time');
    const timerId = `prepare ${points.length} points`;
    if (log) console.time(timerId);
    this.points = points;
    // generate a cluster object for each point and index input points into a KD-tree
    let clusters = [];
    for (let i = 0; i < points.length; i++) {
      if (!points[i].geometry) continue;
      clusters.push(createPointCluster(points[i], i));
    }
    this.trees[maxZoom + 1] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);
    if (log) console.timeEnd(timerId);
    // cluster points on max zoom, then cluster the results on previous zoom, etc.;
    // results in a cluster hierarchy across zoom levels
    for (let z = maxZoom; z >= minZoom; z--) {
      const now = +Date.now();
      // create a new set of clusters for the zoom and index them with a KD-tree
      clusters = this._cluster(clusters, z);
      this.trees[z] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);
      if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
    }
    if (log) console.timeEnd('total time');
    return this;
  }
  getClusters(bbox, zoom) {
    let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
    const minLat = Math.max(-90, Math.min(90, bbox[1]));
    let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
    const maxLat = Math.max(-90, Math.min(90, bbox[3]));
    if (bbox[2] - bbox[0] >= 360) {
      minLng = -180;
      maxLng = 180;
    } else if (minLng > maxLng) {
      const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
      const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
      return easternHem.concat(westernHem);
    }
    const tree = this.trees[this._limitZoom(zoom)];
    const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
    const clusters = [];
    for (const id of ids) {
      const c = tree.points[id];
      clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
    }
    return clusters;
  }
  getChildren(clusterId) {
    const originId = this._getOriginId(clusterId);
    const originZoom = this._getOriginZoom(clusterId);
    const errorMsg = 'No cluster with the specified id.';
    const index = this.trees[originZoom];
    if (!index) throw new Error(errorMsg);
    const origin = index.points[originId];
    if (!origin) throw new Error(errorMsg);
    const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
    const ids = index.within(origin.x, origin.y, r);
    const children = [];
    for (const id of ids) {
      const c = index.points[id];
      if (c.parentId === clusterId) {
        children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
      }
    }
    if (children.length === 0) throw new Error(errorMsg);
    return children;
  }
  getLeaves(clusterId, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;
    const leaves = [];
    this._appendLeaves(leaves, clusterId, limit, offset, 0);
    return leaves;
  }
  getTile(z, x, y) {
    const tree = this.trees[this._limitZoom(z)];
    const z2 = Math.pow(2, z);
    const {extent, radius} = this.options;
    const p = radius / extent;
    const top = (y - p) / z2;
    const bottom = (y + 1 + p) / z2;
    const tile = {
      features: []
    };
    this._addTileFeatures(tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom), tree.points, x, y, z2, tile);
    if (x === 0) {
      this._addTileFeatures(tree.range(1 - p / z2, top, 1, bottom), tree.points, z2, y, z2, tile);
    }
    if (x === z2 - 1) {
      this._addTileFeatures(tree.range(0, top, p / z2, bottom), tree.points, -1, y, z2, tile);
    }
    return tile.features.length ? tile : null;
  }
  getClusterExpansionZoom(clusterId) {
    let expansionZoom = this._getOriginZoom(clusterId) - 1;
    while (expansionZoom <= this.options.maxZoom) {
      const children = this.getChildren(clusterId);
      expansionZoom++;
      if (children.length !== 1) break;
      clusterId = children[0].properties.cluster_id;
    }
    return expansionZoom;
  }
  _appendLeaves(result, clusterId, limit, offset, skipped) {
    const children = this.getChildren(clusterId);
    for (const child of children) {
      const props = child.properties;
      if (props && props.cluster) {
        if (skipped + props.point_count <= offset) {
          // skip the whole cluster
          skipped += props.point_count;
        } else {
          // enter the cluster
          skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
        }
      } else if (skipped < offset) {
        // skip a single point
        skipped++;
      } else {
        // add a single point
        result.push(child);
      }
      if (result.length === limit) break;
    }
    return skipped;
  }
  _addTileFeatures(ids, points, x, y, z2, tile) {
    for (const i of ids) {
      const c = points[i];
      const isCluster = c.numPoints;
      let tags, px, py;
      if (isCluster) {
        tags = getClusterProperties(c);
        px = c.x;
        py = c.y;
      } else {
        const p = this.points[c.index];
        tags = p.properties;
        px = lngX(p.geometry.coordinates[0]);
        py = latY(p.geometry.coordinates[1]);
      }
      const f = {
        type: 1,
        geometry: [[Math.round(this.options.extent * (px * z2 - x)), Math.round(this.options.extent * (py * z2 - y))]],
        tags
      };
      // assign id
      let id;
      if (isCluster) {
        id = c.id;
      } else if (this.options.generateId) {
        // optionally generate id
        id = c.index;
      } else if (this.points[c.index].id) {
        // keep id if already assigned
        id = this.points[c.index].id;
      }
      if (id !== undefined) f.id = id;
      tile.features.push(f);
    }
  }
  _limitZoom(z) {
    return Math.max(this.options.minZoom, Math.min(+z, this.options.maxZoom + 1));
  }
  _cluster(points, zoom) {
    const clusters = [];
    const {radius, extent, reduce, minPoints} = this.options;
    const r = radius / (extent * Math.pow(2, zoom));
    // loop through each point
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      // if we've already visited the point at this zoom level, skip it
      if (p.zoom <= zoom) continue;
      p.zoom = zoom;
      // find all nearby points
      const tree = this.trees[zoom + 1];
      const neighborIds = tree.within(p.x, p.y, r);
      const numPointsOrigin = p.numPoints || 1;
      let numPoints = numPointsOrigin;
      // count the number of points in a potential cluster
      for (const neighborId of neighborIds) {
        const b = tree.points[neighborId];
        // filter out neighbors that are already processed
        if (b.zoom > zoom) numPoints += b.numPoints || 1;
      }
      if (numPoints >= minPoints) {
        // enough points to form a cluster
        let wx = p.x * numPointsOrigin;
        let wy = p.y * numPointsOrigin;
        let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;
        // encode both zoom and point index on which the cluster originated -- offset by total length of features
        const id = (i << 5) + (zoom + 1) + this.points.length;
        for (const neighborId of neighborIds) {
          const b = tree.points[neighborId];
          if (b.zoom <= zoom) continue;
          b.zoom = zoom;
          // save the zoom (so it doesn't get processed twice)
          const numPoints2 = b.numPoints || 1;
          wx += b.x * numPoints2;
          // accumulate coordinates for calculating weighted center
          wy += b.y * numPoints2;
          b.parentId = id;
          if (reduce) {
            if (!clusterProperties) clusterProperties = this._map(p, true);
            reduce(clusterProperties, this._map(b));
          }
        }
        p.parentId = id;
        clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));
      } else {
        // left points as unclustered
        clusters.push(p);
        if (numPoints > 1) {
          for (const neighborId of neighborIds) {
            const b = tree.points[neighborId];
            if (b.zoom <= zoom) continue;
            b.zoom = zoom;
            clusters.push(b);
          }
        }
      }
    }
    return clusters;
  }
  /*get index of the point from which the cluster originated*/
  _getOriginId(clusterId) {
    return clusterId - this.points.length >> 5;
  }
  /*get zoom of the point from which the cluster originated*/
  _getOriginZoom(clusterId) {
    return (clusterId - this.points.length) % 32;
  }
  _map(point, clone) {
    if (point.numPoints) {
      return clone ? extend({}, point.properties) : point.properties;
    }
    const original = this.points[point.index].properties;
    const result = this.options.map(original);
    return clone && result === original ? extend({}, result) : result;
  }
}
function createCluster(x, y, id, numPoints, properties) {
  return {
    x: fround(x),
    // weighted cluster center; round for consistency with Float32Array index
    y: fround(y),
    zoom: Infinity,
    // the last zoom the cluster was processed at
    id,
    // encodes index of the first child of the cluster and its zoom level
    parentId: -1,
    // parent cluster id
    numPoints,
    properties
  };
}
function createPointCluster(p, id) {
  const [x, y] = p.geometry.coordinates;
  return {
    x: fround(lngX(x)),
    // projected point coordinates
    y: fround(latY(y)),
    zoom: Infinity,
    // the last zoom the point was processed at
    index: id,
    // index of the source feature in the original input array,
    parentId: -1
  };
}
function getClusterJSON(cluster) {
  return {
    type: 'Feature',
    id: cluster.id,
    properties: getClusterProperties(cluster),
    geometry: {
      type: 'Point',
      coordinates: [xLng(cluster.x), yLat(cluster.y)]
    }
  };
}
function getClusterProperties(cluster) {
  const count = cluster.numPoints;
  const abbrev = count >= 10000 ? `${Math.round(count / 1000)}k` : count >= 1000 ? `${Math.round(count / 100) / 10}k` : count;
  return extend(extend({}, cluster.properties), {
    cluster: true,
    cluster_id: cluster.id,
    point_count: count,
    point_count_abbreviated: abbrev
  });
}
// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
  return lng / 360 + 0.5;
}
function latY(lat) {
  const sin = Math.sin(lat * Math.PI / 180);
  const y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
  return y < 0 ? 0 : y > 1 ? 1 : y;
}
// spherical mercator to longitude/latitude
function xLng(x) {
  return (x - 0.5) * 360;
}
function yLat(y) {
  const y2 = (180 - y * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}
function extend(dest, src) {
  for (const id in src) dest[id] = src[id];
  return dest;
}
function getX(p) {
  return p.x;
}
function getY(p) {
  return p.y;
}
/**
* @module helpers
*/
/**
* Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
*
* @name feature
* @param {Geometry} geometry input geometry
* @param {Object} [properties={}] an Object of key-value pairs to add as properties
* @param {Object} [options={}] Optional Parameters
* @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
* @param {string|number} [options.id] Identifier associated with the Feature
* @returns {Feature} a GeoJSON Feature
* @example
* var geometry = {
*   "type": "Point",
*   "coordinates": [110, 50]
* };
*
* var feature = turf.feature(geometry);
*
* //=feature
*/
function feature(geom, properties, options) {
  if (options === void 0) {
    options = {};
  }
  var feat = {
    type: "Feature"
  };
  if (options.id === 0 || options.id) {
    feat.id = options.id;
  }
  if (options.bbox) {
    feat.bbox = options.bbox;
  }
  feat.properties = properties || ({});
  feat.geometry = geom;
  return feat;
}
/**
* Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
*
* @name polygon
* @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
* @param {Object} [properties={}] an Object of key-value pairs to add as properties
* @param {Object} [options={}] Optional Parameters
* @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
* @param {string|number} [options.id] Identifier associated with the Feature
* @returns {Feature<Polygon>} Polygon Feature
* @example
* var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
*
* //=polygon
*/
function polygon(coordinates, properties, options) {
  if (options === void 0) {
    options = {};
  }
  for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
    var ring = coordinates_1[_i];
    if (ring.length < 4) {
      throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
    }
    for (var j = 0; j < ring[ring.length - 1].length; j++) {
      // Check if first point of Polygon contains two numbers
      if (ring[ring.length - 1][j] !== ring[0][j]) {
        throw new Error("First and last Position are not equivalent.");
      }
    }
  }
  var geom = {
    type: "Polygon",
    coordinates: coordinates
  };
  return feature(geom, properties, options);
}
/**
* isObject
*
* @param {*} input variable to validate
* @returns {boolean} true/false
* @example
* turf.isObject({elevation: 10})
* //=true
* turf.isObject('foo')
* //=false
*/
function isObject(input) {
  return !!input && input.constructor === Object;
}
/**
* Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
*
* @name getCoord
* @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
* @returns {Array<number>} coordinates
* @example
* var pt = turf.point([10, 10]);
*
* var coord = turf.getCoord(pt);
* //= [10, 10]
*/
function getCoord(coord) {
  if (!coord) {
    throw new Error("coord is required");
  }
  if (!Array.isArray(coord)) {
    if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
      return coord.geometry.coordinates;
    }
    if (coord.type === "Point") {
      return coord.coordinates;
    }
  }
  if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
    return coord;
  }
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
/**
* Unwrap coordinates from a Feature, Geometry Object or an Array
*
* @name getCoords
* @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
* @returns {Array<any>} coordinates
* @example
* var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
*
* var coords = turf.getCoords(poly);
* //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
*/
function getCoords(coords) {
  if (Array.isArray(coords)) {
    return coords;
  }
  // Feature
  if (coords.type === "Feature") {
    if (coords.geometry !== null) {
      return coords.geometry.coordinates;
    }
  } else {
    // Geometry
    if (coords.coordinates) {
      return coords.coordinates;
    }
  }
  throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
/**
* Get Geometry from Feature or Geometry Object
*
* @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
* @returns {Geometry|null} GeoJSON Geometry Object
* @throws {Error} if geojson is not a Feature or Geometry Object
* @example
* var point = {
*   "type": "Feature",
*   "properties": {},
*   "geometry": {
*     "type": "Point",
*     "coordinates": [110, 40]
*   }
* }
* var geom = turf.getGeom(point)
* //={"type": "Point", "coordinates": [110, 40]}
*/
function getGeom(geojson) {
  if (geojson.type === "Feature") {
    return geojson.geometry;
  }
  return geojson;
}
/**
* Get GeoJSON object's type, Geometry type is prioritize.
*
* @param {GeoJSON} geojson GeoJSON object
* @param {string} [name="geojson"] name of the variable to display in error message (unused)
* @returns {string} GeoJSON type
* @example
* var point = {
*   "type": "Feature",
*   "properties": {},
*   "geometry": {
*     "type": "Point",
*     "coordinates": [110, 40]
*   }
* }
* var geom = turf.getType(point)
* //="Point"
*/
function getType(geojson, _name) {
  if (geojson.type === "FeatureCollection") {
    return "FeatureCollection";
  }
  if (geojson.type === "GeometryCollection") {
    return "GeometryCollection";
  }
  if (geojson.type === "Feature" && geojson.geometry !== null) {
    return geojson.geometry.type;
  }
  return geojson.type;
}
// http://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
// modified from: https://github.com/substack/point-in-polygon/blob/master/index.js
// which was modified from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
/**
* Takes a {@link Point} and a {@link Polygon} or {@link MultiPolygon} and determines if the point
* resides inside the polygon. The polygon can be convex or concave. The function accounts for holes.
*
* @name booleanPointInPolygon
* @param {Coord} point input point
* @param {Feature<Polygon|MultiPolygon>} polygon input polygon or multipolygon
* @param {Object} [options={}] Optional parameters
* @param {boolean} [options.ignoreBoundary=false] True if polygon boundary should be ignored when determining if
* the point is inside the polygon otherwise false.
* @returns {boolean} `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon
* @example
* var pt = turf.point([-77, 44]);
* var poly = turf.polygon([[
*   [-81, 41],
*   [-81, 47],
*   [-72, 47],
*   [-72, 41],
*   [-81, 41]
* ]]);
*
* turf.booleanPointInPolygon(pt, poly);
* //= true
*/
function booleanPointInPolygon(point, polygon, options) {
  if (options === void 0) {
    options = {};
  }
  // validation
  if (!point) {
    throw new Error("point is required");
  }
  if (!polygon) {
    throw new Error("polygon is required");
  }
  var pt = getCoord(point);
  var geom = getGeom(polygon);
  var type = geom.type;
  var bbox = polygon.bbox;
  var polys = geom.coordinates;
  // Quick elimination if point is not inside bbox
  if (bbox && inBBox(pt, bbox) === false) {
    return false;
  }
  // normalize to multipolygon
  if (type === "Polygon") {
    polys = [polys];
  }
  var insidePoly = false;
  for (var i = 0; i < polys.length && !insidePoly; i++) {
    // check if it is in the outer ring first
    if (inRing(pt, polys[i][0], options.ignoreBoundary)) {
      var inHole = false;
      var k = 1;
      // check for the point in any of the holes
      while (k < polys[i].length && !inHole) {
        if (inRing(pt, polys[i][k], !options.ignoreBoundary)) {
          inHole = true;
        }
        k++;
      }
      if (!inHole) {
        insidePoly = true;
      }
    }
  }
  return insidePoly;
}
/**
* inRing
*
* @private
* @param {Array<number>} pt [x,y]
* @param {Array<Array<number>>} ring [[x,y], [x,y],..]
* @param {boolean} ignoreBoundary ignoreBoundary
* @returns {boolean} inRing
*/
function inRing(pt, ring, ignoreBoundary) {
  var isInside = false;
  if (ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]) {
    ring = ring.slice(0, ring.length - 1);
  }
  for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    var xi = ring[i][0];
    var yi = ring[i][1];
    var xj = ring[j][0];
    var yj = ring[j][1];
    var onBoundary = pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) === 0 && (xi - pt[0]) * (xj - pt[0]) <= 0 && (yi - pt[1]) * (yj - pt[1]) <= 0;
    if (onBoundary) {
      return !ignoreBoundary;
    }
    var intersect = yi > pt[1] !== yj > pt[1] && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi;
    if (intersect) {
      isInside = !isInside;
    }
  }
  return isInside;
}
/**
* inBBox
*
* @private
* @param {Position} pt point [x,y]
* @param {BBox} bbox BBox [west, south, east, north]
* @returns {boolean} true/false if point is inside BBox
*/
function inBBox(pt, bbox) {
  return bbox[0] <= pt[0] && bbox[1] <= pt[1] && bbox[2] >= pt[0] && bbox[3] >= pt[1];
}
// To-Do => Improve Typescript GeoJSON handling
/**
* Removes redundant coordinates from any GeoJSON Geometry.
*
* @name cleanCoords
* @param {Geometry|Feature} geojson Feature or Geometry
* @param {Object} [options={}] Optional parameters
* @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated
* @returns {Geometry|Feature} the cleaned input Feature/Geometry
* @example
* var line = turf.lineString([[0, 0], [0, 2], [0, 5], [0, 8], [0, 8], [0, 10]]);
* var multiPoint = turf.multiPoint([[0, 0], [0, 0], [2, 2]]);
*
* turf.cleanCoords(line).geometry.coordinates;
* //= [[0, 0], [0, 10]]
*
* turf.cleanCoords(multiPoint).geometry.coordinates;
* //= [[0, 0], [2, 2]]
*/
function cleanCoords(geojson, options) {
  if (options === void 0) {
    options = {};
  }
  // Backwards compatible with v4.0
  var mutate = typeof options === "object" ? options.mutate : options;
  if (!geojson) throw new Error("geojson is required");
  var type = getType(geojson);
  // Store new "clean" points in this Array
  var newCoords = [];
  switch (type) {
    case "LineString":
      newCoords = cleanLine(geojson);
      break;
    case "MultiLineString":
    case "Polygon":
      getCoords(geojson).forEach(function (line) {
        newCoords.push(cleanLine(line));
      });
      break;
    case "MultiPolygon":
      getCoords(geojson).forEach(function (polygons) {
        var polyPoints = [];
        polygons.forEach(function (ring) {
          polyPoints.push(cleanLine(ring));
        });
        newCoords.push(polyPoints);
      });
      break;
    case "Point":
      return geojson;
    case "MultiPoint":
      var existing = {};
      getCoords(geojson).forEach(function (coord) {
        var key = coord.join("-");
        if (!existing.hasOwnProperty(key)) {
          newCoords.push(coord);
          existing[key] = true;
        }
      });
      break;
    default:
      throw new Error(type + " geometry not supported");
  }
  // Support input mutation
  if (geojson.coordinates) {
    if (mutate === true) {
      geojson.coordinates = newCoords;
      return geojson;
    }
    return {
      type: type,
      coordinates: newCoords
    };
  } else {
    if (mutate === true) {
      geojson.geometry.coordinates = newCoords;
      return geojson;
    }
    return feature({
      type: type,
      coordinates: newCoords
    }, geojson.properties, {
      bbox: geojson.bbox,
      id: geojson.id
    });
  }
}
/**
* Clean Coords
*
* @private
* @param {Array<number>|LineString} line Line
* @returns {Array<number>} Cleaned coordinates
*/
function cleanLine(line) {
  var points = getCoords(line);
  // handle "clean" segment
  if (points.length === 2 && !equals(points[0], points[1])) return points;
  var newPoints = [];
  var secondToLast = points.length - 1;
  var newPointsLength = newPoints.length;
  newPoints.push(points[0]);
  for (var i = 1; i < secondToLast; i++) {
    var prevAddedPoint = newPoints[newPoints.length - 1];
    if (points[i][0] === prevAddedPoint[0] && points[i][1] === prevAddedPoint[1]) continue; else {
      newPoints.push(points[i]);
      newPointsLength = newPoints.length;
      if (newPointsLength > 2) {
        if (isPointOnLineSegment(newPoints[newPointsLength - 3], newPoints[newPointsLength - 1], newPoints[newPointsLength - 2])) newPoints.splice(newPoints.length - 2, 1);
      }
    }
  }
  newPoints.push(points[points.length - 1]);
  newPointsLength = newPoints.length;
  if (equals(points[0], points[points.length - 1]) && newPointsLength < 4) throw new Error("invalid polygon");
  if (isPointOnLineSegment(newPoints[newPointsLength - 3], newPoints[newPointsLength - 1], newPoints[newPointsLength - 2])) newPoints.splice(newPoints.length - 2, 1);
  return newPoints;
}
/**
* Compares two points and returns if they are equals
*
* @private
* @param {Position} pt1 point
* @param {Position} pt2 point
* @returns {boolean} true if they are equals
*/
function equals(pt1, pt2) {
  return pt1[0] === pt2[0] && pt1[1] === pt2[1];
}
/**
* Returns if `point` is on the segment between `start` and `end`.
* Borrowed from `@turf/boolean-point-on-line` to speed up the evaluation (instead of using the module as dependency)
*
* @private
* @param {Position} start coord pair of start of line
* @param {Position} end coord pair of end of line
* @param {Position} point coord pair of point to check
* @returns {boolean} true/false
*/
function isPointOnLineSegment(start, end, point) {
  var x = point[0], y = point[1];
  var startX = start[0], startY = start[1];
  var endX = end[0], endY = end[1];
  var dxc = x - startX;
  var dyc = y - startY;
  var dxl = endX - startX;
  var dyl = endY - startY;
  var cross = dxc * dyl - dyc * dxl;
  if (cross !== 0) return false; else if (Math.abs(dxl) >= Math.abs(dyl)) return dxl > 0 ? startX <= x && x <= endX : endX <= x && x <= startX; else return dyl > 0 ? startY <= y && y <= endY : endY <= y && y <= startY;
}
/**
* Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
* ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
*
* @name clone
* @param {GeoJSON} geojson GeoJSON Object
* @returns {GeoJSON} cloned GeoJSON Object
* @example
* var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
*
* var lineCloned = turf.clone(line);
*/
function clone(geojson) {
  if (!geojson) {
    throw new Error("geojson is required");
  }
  switch (geojson.type) {
    case "Feature":
      return cloneFeature(geojson);
    case "FeatureCollection":
      return cloneFeatureCollection(geojson);
    case "Point":
    case "LineString":
    case "Polygon":
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
    case "GeometryCollection":
      return cloneGeometry(geojson);
    default:
      throw new Error("unknown GeoJSON type");
  }
}
/**
* Clone Feature
*
* @private
* @param {Feature<any>} geojson GeoJSON Feature
* @returns {Feature<any>} cloned Feature
*/
function cloneFeature(geojson) {
  var cloned = {
    type: "Feature"
  };
  // Preserve Foreign Members
  Object.keys(geojson).forEach(function (key) {
    switch (key) {
      case "type":
      case "properties":
      case "geometry":
        return;
      default:
        cloned[key] = geojson[key];
    }
  });
  // Add properties & geometry last
  cloned.properties = cloneProperties(geojson.properties);
  cloned.geometry = cloneGeometry(geojson.geometry);
  return cloned;
}
/**
* Clone Properties
*
* @private
* @param {Object} properties GeoJSON Properties
* @returns {Object} cloned Properties
*/
function cloneProperties(properties) {
  var cloned = {};
  if (!properties) {
    return cloned;
  }
  Object.keys(properties).forEach(function (key) {
    var value = properties[key];
    if (typeof value === "object") {
      if (value === null) {
        // handle null
        cloned[key] = null;
      } else if (Array.isArray(value)) {
        // handle Array
        cloned[key] = value.map(function (item) {
          return item;
        });
      } else {
        // handle generic Object
        cloned[key] = cloneProperties(value);
      }
    } else {
      cloned[key] = value;
    }
  });
  return cloned;
}
/**
* Clone Feature Collection
*
* @private
* @param {FeatureCollection<any>} geojson GeoJSON Feature Collection
* @returns {FeatureCollection<any>} cloned Feature Collection
*/
function cloneFeatureCollection(geojson) {
  var cloned = {
    type: "FeatureCollection"
  };
  // Preserve Foreign Members
  Object.keys(geojson).forEach(function (key) {
    switch (key) {
      case "type":
      case "features":
        return;
      default:
        cloned[key] = geojson[key];
    }
  });
  // Add features
  cloned.features = geojson.features.map(function (feature) {
    return cloneFeature(feature);
  });
  return cloned;
}
/**
* Clone Geometry
*
* @private
* @param {Geometry<any>} geometry GeoJSON Geometry
* @returns {Geometry<any>} cloned Geometry
*/
function cloneGeometry(geometry) {
  var geom = {
    type: geometry.type
  };
  if (geometry.bbox) {
    geom.bbox = geometry.bbox;
  }
  if (geometry.type === "GeometryCollection") {
    geom.geometries = geometry.geometries.map(function (g) {
      return cloneGeometry(g);
    });
    return geom;
  }
  geom.coordinates = deepSlice(geometry.coordinates);
  return geom;
}
/**
* Deep Slice coordinates
*
* @private
* @param {Coordinates} coords Coordinates
* @returns {Coordinates} all coordinates sliced
*/
function deepSlice(coords) {
  var cloned = coords;
  if (typeof cloned[0] !== "object") {
    return cloned.slice();
  }
  return cloned.map(function (coord) {
    return deepSlice(coord);
  });
}
/**
* Callback for geomEach
*
* @callback geomEachCallback
* @param {Geometry} currentGeometry The current Geometry being processed.
* @param {number} featureIndex The current index of the Feature being processed.
* @param {Object} featureProperties The current Feature Properties being processed.
* @param {Array<number>} featureBBox The current Feature BBox being processed.
* @param {number|string} featureId The current Feature Id being processed.
*/
/**
* Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
*
* @name geomEach
* @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
* @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
* @returns {void}
* @example
* var features = turf.featureCollection([
*     turf.point([26, 37], {foo: 'bar'}),
*     turf.point([36, 53], {hello: 'world'})
* ]);
*
* turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
*   //=currentGeometry
*   //=featureIndex
*   //=featureProperties
*   //=featureBBox
*   //=featureId
* });
*/
function geomEach(geojson, callback) {
  var i, j, g, geometry, stopG, geometryMaybeCollection, isGeometryCollection, featureProperties, featureBBox, featureId, featureIndex = 0, isFeatureCollection = geojson.type === "FeatureCollection", isFeature = geojson.type === "Feature", stop = isFeatureCollection ? geojson.features.length : 1;
  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  // 
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection ? geojson.features[i].geometry : isFeature ? geojson.geometry : geojson;
    featureProperties = isFeatureCollection ? geojson.features[i].properties : isFeature ? geojson.properties : {};
    featureBBox = isFeatureCollection ? geojson.features[i].bbox : isFeature ? geojson.bbox : undefined;
    featureId = isFeatureCollection ? geojson.features[i].id : isFeature ? geojson.id : undefined;
    isGeometryCollection = geometryMaybeCollection ? geometryMaybeCollection.type === "GeometryCollection" : false;
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection ? geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
      // Handle null Geometry
      if (geometry === null) {
        if (callback(null, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon":
          {
            if (callback(geometry, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
            break;
          }
        case "GeometryCollection":
          {
            for (j = 0; j < geometry.geometries.length; j++) {
              if (callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId) === false) return false;
            }
            break;
          }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}
/*
(c) 2013, Vladimir Agafonkin
Simplify.js, a high-performance JS polyline simplification library
mourner.github.io/simplify-js
*/
// to suit your point format, run search/replace for '.x' and '.y';
// for 3D version, see 3d branch (configurability would draw significant performance overhead)
// square distance between 2 points
function getSqDist(p1, p2) {
  var dx = p1.x - p2.x, dy = p1.y - p2.y;
  return dx * dx + dy * dy;
}
// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {
  var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y;
  if (dx !== 0 || dy !== 0) {
    var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = p2.x;
      y = p2.y;
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p.x - x;
  dy = p.y - y;
  return dx * dx + dy * dy;
}
// rest of the code doesn't care about point format
// basic distance-based simplification
function simplifyRadialDist(points, sqTolerance) {
  var prevPoint = points[0], newPoints = [prevPoint], point;
  for (var i = 1, len = points.length; i < len; i++) {
    point = points[i];
    if (getSqDist(point, prevPoint) > sqTolerance) {
      newPoints.push(point);
      prevPoint = point;
    }
  }
  if (prevPoint !== point) newPoints.push(point);
  return newPoints;
}
function simplifyDPStep(points, first, last, sqTolerance, simplified) {
  var maxSqDist = sqTolerance, index;
  for (var i = first + 1; i < last; i++) {
    var sqDist = getSqSegDist(points[i], points[first], points[last]);
    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }
  if (maxSqDist > sqTolerance) {
    if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
    simplified.push(points[index]);
    if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
  }
}
// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker(points, sqTolerance) {
  var last = points.length - 1;
  var simplified = [points[0]];
  simplifyDPStep(points, 0, last, sqTolerance, simplified);
  simplified.push(points[last]);
  return simplified;
}
// both algorithms combined for awesome performance
function simplify(points, tolerance, highestQuality) {
  if (points.length <= 2) return points;
  var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;
  points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
  points = simplifyDouglasPeucker(points, sqTolerance);
  return points;
}
/**
* Takes a {@link GeoJSON} object and returns a simplified version. Internally uses
* [simplify-js](http://mourner.github.io/simplify-js/) to perform simplification using the Ramer-Douglas-Peucker algorithm.
*
* @name simplify
* @param {GeoJSON} geojson object to be simplified
* @param {Object} [options={}] Optional parameters
* @param {number} [options.tolerance=1] simplification tolerance
* @param {boolean} [options.highQuality=false] whether or not to spend more time to create a higher-quality simplification with a different algorithm
* @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
* @returns {GeoJSON} a simplified GeoJSON
* @example
* var geojson = turf.polygon([[
*   [-70.603637, -33.399918],
*   [-70.614624, -33.395332],
*   [-70.639343, -33.392466],
*   [-70.659942, -33.394759],
*   [-70.683975, -33.404504],
*   [-70.697021, -33.419406],
*   [-70.701141, -33.434306],
*   [-70.700454, -33.446339],
*   [-70.694274, -33.458369],
*   [-70.682601, -33.465816],
*   [-70.668869, -33.472117],
*   [-70.646209, -33.473835],
*   [-70.624923, -33.472117],
*   [-70.609817, -33.468107],
*   [-70.595397, -33.458369],
*   [-70.587158, -33.442901],
*   [-70.587158, -33.426283],
*   [-70.590591, -33.414248],
*   [-70.594711, -33.406224],
*   [-70.603637, -33.399918]
* ]]);
* var options = {tolerance: 0.01, highQuality: false};
* var simplified = turf.simplify(geojson, options);
*
* //addToMap
* var addToMap = [geojson, simplified]
*/
function simplify$1(geojson, options) {
  // Optional parameters
  options = options || ({});
  if (!isObject(options)) throw new Error("options is invalid");
  var tolerance = options.tolerance !== undefined ? options.tolerance : 1;
  var highQuality = options.highQuality || false;
  var mutate = options.mutate || false;
  if (!geojson) throw new Error("geojson is required");
  if (tolerance && tolerance < 0) throw new Error("invalid tolerance");
  // Clone geojson to avoid side effects
  if (mutate !== true) geojson = clone(geojson);
  geomEach(geojson, function (geom) {
    simplifyGeom(geom, tolerance, highQuality);
  });
  return geojson;
}
/**
* Simplifies a feature's coordinates
*
* @private
* @param {Geometry} geometry to be simplified
* @param {number} [tolerance=1] simplification tolerance
* @param {boolean} [highQuality=false] whether or not to spend more time to create a higher-quality simplification with a different algorithm
* @returns {Geometry} output
*/
function simplifyGeom(geometry, tolerance, highQuality) {
  var type = geometry.type;
  // "unsimplyfiable" geometry types
  if (type === "Point" || type === "MultiPoint") return geometry;
  // Remove any extra coordinates
  cleanCoords(geometry, true);
  var coordinates = geometry.coordinates;
  switch (type) {
    case "LineString":
      geometry["coordinates"] = simplifyLine(coordinates, tolerance, highQuality);
      break;
    case "MultiLineString":
      geometry["coordinates"] = coordinates.map(function (lines) {
        return simplifyLine(lines, tolerance, highQuality);
      });
      break;
    case "Polygon":
      geometry["coordinates"] = simplifyPolygon(coordinates, tolerance, highQuality);
      break;
    case "MultiPolygon":
      geometry["coordinates"] = coordinates.map(function (rings) {
        return simplifyPolygon(rings, tolerance, highQuality);
      });
  }
  return geometry;
}
/**
* Simplifies the coordinates of a LineString with simplify-js
*
* @private
* @param {Array<number>} coordinates to be processed
* @param {number} tolerance simplification tolerance
* @param {boolean} highQuality whether or not to spend more time to create a higher-quality
* @returns {Array<Array<number>>} simplified coords
*/
function simplifyLine(coordinates, tolerance, highQuality) {
  return simplify(coordinates.map(function (coord) {
    return {
      x: coord[0],
      y: coord[1],
      z: coord[2]
    };
  }), tolerance, highQuality).map(function (coords) {
    return coords.z ? [coords.x, coords.y, coords.z] : [coords.x, coords.y];
  });
}
/**
* Simplifies the coordinates of a Polygon with simplify-js
*
* @private
* @param {Array<number>} coordinates to be processed
* @param {number} tolerance simplification tolerance
* @param {boolean} highQuality whether or not to spend more time to create a higher-quality
* @returns {Array<Array<Array<number>>>} simplified coords
*/
function simplifyPolygon(coordinates, tolerance, highQuality) {
  return coordinates.map(function (ring) {
    var pts = ring.map(function (coord) {
      return {
        x: coord[0],
        y: coord[1]
      };
    });
    if (pts.length < 4) {
      throw new Error("invalid polygon");
    }
    var simpleRing = simplify(pts, tolerance, highQuality).map(function (coords) {
      return [coords.x, coords.y];
    });
    // remove 1 percent of tolerance until enough points to make a triangle
    while (!checkValidity(simpleRing)) {
      tolerance -= tolerance * 0.01;
      simpleRing = simplify(pts, tolerance, highQuality).map(function (coords) {
        return [coords.x, coords.y];
      });
    }
    if (simpleRing[simpleRing.length - 1][0] !== simpleRing[0][0] || simpleRing[simpleRing.length - 1][1] !== simpleRing[0][1]) {
      simpleRing.push(simpleRing[0]);
    }
    return simpleRing;
  });
}
/**
* Returns true if ring has at least 3 coordinates and its first coordinate is the same as its last
*
* @private
* @param {Array<number>} ring coordinates to be checked
* @returns {boolean} true if valid
*/
function checkValidity(ring) {
  if (ring.length < 3) return false;
  // if the last point is the same as the first, it's not a triangle
  return !(ring.length === 3 && ring[2][0] === ring[0][0] && ring[2][1] === ring[0][1]);
}
class DataProcessor {
  /**
  * A class meant to handle processing of data used in the scatterplot.
  *
  * ** Can currently only handle data in a [-180,180] x [-90, 90] range due
  * to use of {@link Supercluster}. May need to switch to KDBush at some point.
  *
  * @param {Array} data the processor is meant to handle and index
  */
  constructor(schema) {
    this.schema = this.index = new Supercluster();
    console.log("Loading data...");
    new _schemaProcessor66236800Js.S(schema, this.indexData.bind(this));
  }
  /**
  * Callback function that occurs after the schema processor has loaded the appropriate data
  *
  * @param {SchemaProcessor} schemaHelper that is built in the constructor
  */
  indexData(schemaHelper) {
    this.points = [];
    let modifyGeometry;
    // If we are using genome scales, we need to map the coordinates correctly
    // We build mapping functions based on what needs to occur for each data
    // point in order to avoid lots of checks in the potentially very long
    // data loop.
    if (schemaHelper.xScale instanceof _utilities52abb45cJs.G) {
      modifyGeometry = point => {
        point.geometry.coordinates[0] = schemaHelper.xScale.toClipSpaceFromParts(point.geometry.coordinates[0][0], point.geometry.coordinates[0][1]);
      };
    }
    if (schemaHelper.yScale instanceof _utilities52abb45cJs.G) {
      // This is a way to check if x is also a genome scale, so we don't
      // include instanceof checks in the data loop
      if (modifyGeometry) ; else {
        modifyGeometry = point => {
          point.geometry.coordinates[1] = schemaHelper.yScale.toClipSpaceFromParts(point.geometry.coordinates[0][0], point.geometry.coordinates[0][1]);
        };
      }
    }
    console.log("Reading data...");
    // Process the global data in the schema processor
    if (schemaHelper.data) {
      for (let track of schemaHelper.tracks) {
        if (!track.hasOwnData) {
          let currentPoint = track.getNextDataPoint();
          while (currentPoint) {
            if (modifyGeometry) {
              // only call if we need to
              modifyGeometry(currentPoint);
            }
            this.points.push(currentPoint);
            currentPoint = track.getNextDataPoint();
          }
          break;
        }
      }
    }
    // Process the data that is local to each track
    schemaHelper.tracks.filter(track => track.hasOwnData).forEach(track => {
      let currentPoint = track.getNextDataPoint();
      while (currentPoint) {
        if (modifyGeometry) {
          modifyGeometry(currentPoint);
        }
        this.points.push(currentPoint);
        currentPoint = track.getNextDataPoint();
      }
    });
    console.log("Indexing data...");
    this.index.load(this.points);
    console.log("Data processing complete.");
  }
  /**
  * Find the closest point in the data to a given point. Only finds point if it is
  * sufficiently close.
  *
  * @param {Array} point of two floats to find closest point to
  * @param {Integer} zoom to pass to supercluster
  * @returns closest point or undefined
  */
  getClosestPoint(point, zoom = 16) {
    const candidatePoints = this.index.getClusters([point[0] - 0.01, point[1] - 0.01, point[0] + 0.01, point[1] + 0.01], zoom);
    let closestPoint;
    let distanceToClosestPoint;
    for (const candidate of candidatePoints) {
      const dist = (candidate.geometry.coordinates[0] - point[0]) ** 2 + (candidate.geometry.coordinates[1] - point[1]) ** 2;
      if (!closestPoint || dist < distanceToClosestPoint) {
        closestPoint = candidate;
        distanceToClosestPoint = dist;
      }
    }
    return closestPoint;
  }
  /**
  * Get points within a bounding box.
  *
  * @param {Array} points Bounding rectangle in the format of [x1, y1, x2, y2]
  * @param {Integer} zoom to pass to supercluster
  * @returns points in bounding box
  */
  selectBox(points, zoom = 16) {
    const smallerX = Math.min(points[0], points[2]);
    const smallerY = Math.min(points[1], points[3]);
    const largerX = Math.max(points[0], points[2]);
    const largerY = Math.max(points[1], points[3]);
    return this.index.getClusters([smallerX, smallerY, largerX, largerY], zoom);
  }
  /**
  * Select points inside a given polygon. Simplify polygon with {@link @turf/simplify}
  * which may cause precision issues with very complex polygons. Uses {@link turf}
  * to determine what points are in polygon.
  *
  * @param {Array} points of a polygon to select points format: [x1,y1,x2,y2,x3,y3,...]
  * @param {Integer} zoom to pass to supercluster
  * @returns points inside lasso
  */
  selectLasso(points, zoom = 16) {
    let smallestX = Number.POSITIVE_INFINITY;
    let largestX = Number.NEGATIVE_INFINITY;
    let smallestY = Number.POSITIVE_INFINITY;
    let largestY = Number.NEGATIVE_INFINITY;
    const polygonPoints = [];
    for (let i = 0; i < points.length; i += 2) {
      if (points[i] < smallestX) smallestX = points[i];
      if (points[i] > largestX) largestX = points[i];
      if (points[i + 1] < smallestY) smallestY = points[i + 1];
      if (points[i + 1] > largestY) largestY = points[i + 1];
      polygonPoints.push([points[i], points[i + 1]]);
    }
    polygonPoints.push([...polygonPoints[0]]);
    // First and last must be same position
    const candidatePoints = this.index.getClusters([smallestX, smallestY, largestX, largestY], zoom);
    const boundingPolygon = polygon([polygonPoints]);
    const simplifiedBoundingPolygon = simplify$1(boundingPolygon, {
      tolerance: 0.01,
      highQuality: false
    });
    return candidatePoints.filter(point => {
      return booleanPointInPolygon(point.geometry.coordinates, simplifiedBoundingPolygon);
    });
  }
}
/**
* The data processor worker is meant to be an interface between the main thread
* containing the {@link WebGLVis} a {@link DataProcessor}. It's main purpose
* is to receive messages from the WebGLVis, call the appropriate method of
* the DataProcessor, then post a message of the results of the method back to
* the WebGLVis.
*/
self.onmessage = message => {
  switch (message.data.type) {
    case "init":
      self.processor = new DataProcessor(message.data.schema);
      break;
    case "selectBox":
      postMessage({
        type: message.data.type,
        selection: self.processor.selectBox(message.data.points),
        bounds: message.data.points
      });
      break;
    case "selectLasso":
      postMessage({
        type: message.data.type,
        selection: self.processor.selectLasso(message.data.points),
        bounds: message.data.points
      });
      break;
    case "getClosestPoint":
      postMessage({
        type: message.data.type,
        point: self.processor.getClosestPoint(message.data.point)
      });
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
},{}]},["pmxUQ"], "pmxUQ", "parcelRequire2739")

//# sourceMappingURL=data-processor-worker-d88f706d.07aa6028.js.map
