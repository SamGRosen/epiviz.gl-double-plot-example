import { setSchema, setScroll, setTool } from "./reducers";

import areaChart from "../examples/area-chart";
import linePlot from "../examples/line-plot";
import tsne10 from "../examples/tsne-10th";
import arcTrack from "../examples/arc-track";
import boxTrack from "../examples/box-track";
import lineTrack from "../examples/line-track";

const exampleMap = new Map([
  ["area-chart", areaChart],
  ["line-plot", linePlot],
  ["tsne-10th", tsne10],

  ["arc-track", arcTrack],
  ["box-track", boxTrack],
  ["line-track", lineTrack],
]);

class Toolbar {
  /**
   * A class meant to handle changing options on the scatter plot
   * @param {Function} dispatch method from store to dispatch redux actions
   */
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.mouseAction = "pan";
    this.schema = "csv10";
  }

  /**
   * Initializes the tool bar by adding event listeners
   */
  init() {
    document.getElementById("lock-x").addEventListener("change", (event) => {
      this.dispatch(setScroll({ axis: "x", checked: event.target.checked }));
    });

    document.getElementById("lock-y").addEventListener("change", (event) => {
      this.dispatch(setScroll({ axis: "y", checked: event.target.checked }));
    });

    document.getElementById("schema-select").value = this.schema;
    this.dispatch(setSchema(exampleMap.get(this.schema)));

    document
      .getElementById("schema-select")
      .addEventListener("change", (event) => {
        this.schema = event.target.value;
        this.dispatch(setSchema(exampleMap.get(this.schema)));
      });

    this.prevIcon = null; // force only 1 icon to have selected class
    document.querySelectorAll(".controls img").forEach((icon) => {
      icon.addEventListener("click", () => {
        // useless hack to save lines of code
        if (this.prevIcon) {
          this.prevIcon.classList.remove("selected");
        }
        this.mouseAction = icon.alt.substring(0, icon.alt.indexOf(" "));
        this.dispatch(setTool(this.mouseAction));
        icon.classList.add("selected");
        this.prevIcon = icon;
      });
    });
  }

  /**
   * Sets the display for the current selection window in the toolbar
   *
   * @param {Array} currentXRange array of length 2 with current X range
   * @param {Array} currentYRange array of length 2 with current Y range
   */
  updateSelectionWindowDisplay(currentXRange, currentYRange) {
    // This may slow down the rendering since it needs to call the DOM before animating, may need to remove for true benchmark
    document.querySelector(
      ".selection-window"
    ).textContent = `[${currentXRange[0].toFixed(
      4
    )}, ${currentXRange[1].toFixed(4)}] x [${currentYRange[0].toFixed(
      4
    )}, ${currentYRange[1].toFixed(4)}]`;
  }
}

export default Toolbar;
