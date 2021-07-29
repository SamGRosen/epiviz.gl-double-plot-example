import Toolbar from "./toolbar";
import WebGLVis from "epiviz.gl";
import store, { getIfChanged } from "./store";

class App {
  /*
      The App class is meant to emulate an app that may use the webgl visualization as a component
  */
  constructor() {
    const container1 = document.querySelector(".plot-1");
    const container2 = document.querySelector(".plot-2");
    this.visualization1 = new WebGLVis(container1);
    this.visualization2 = new WebGLVis(container2);
    this.visualization1.addToDom();
    this.visualization2.addToDom();

    this.store = store;
    this.store.subscribe(this.subscription.bind(this));

    const toolbar = new Toolbar(this.store.dispatch);
    toolbar.init();

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  /**
   * The webgl visualization components are meant to leave application
   * state up to the developers, and this subscription is an example of
   * using redux to update the plot.
   */
  subscription() {
    const currState = this.store.getState();
    const schema = getIfChanged("schema");
    if (schema) {
      this.visualization1.setSchema(JSON.parse(schema));
      this.visualization2.setSchema(JSON.parse(schema));
    }

    this.visualization1.setViewOptions({ ...currState });
    this.visualization2.setViewOptions({ ...currState });
  }

  onWindowResize() {
    this.visualization1.setCanvasSize(
      this.visualization1.parent.clientWidth,
      this.visualization1.parent.clientHeight
    );
    this.visualization2.setCanvasSize(
      this.visualization2.parent.clientWidth,
      this.visualization2.parent.clientHeight
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new App(); // Add to window for testing purposes
});
