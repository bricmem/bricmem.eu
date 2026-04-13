// setup WASM Python interpreter
let pyodide;

async function setupPyodide() {
  console.log("Loading Pyodide...");
  pyodide = await loadPyodide({
    stdout: (str) => {
      pythonOut = document.getElementById("python-out");
      message = document.createElement("p");
      message.className = "custom-chipart-output-line";
      message.append(str);
      pythonOut.append(message);
    },
    stderr: (str) => {
      pythonOut = document.getElementById("python-out");
      message = document.createElement("p");
      message.className =
        "custom-chipart-output-line custom-chipart-output-line--error";
      message.append(str);
      pythonOut.append(message);
    },
  });

  await pyodide.loadPackage(["numpy", "scipy", "micropip"]);

  console.log("Python environment is ready!");

  document.getElementById("python-out").innerHTML = "";
}

setupPyodide();

// define some global variable stubs
let layerMap = new Map();
let viewer = null;
let originalImage = null;
let ctx = null;

function clearLayers() {
  if (viewer) {
    viewer.world.removeAll();
  }

  layerMap.clear();

  const layerContainer = document.getElementById("layerContainer");
  if (layerContainer) {
    layerContainer.innerHTML = "";
  }
}

async function processImage(code, render = null) {
  if (!pyodide) {
    alert("Pyodide is still loading, please wait a moment.");
    return;
  }

  console.log("Running Python processing...");

  pyodide.runPython(`
def reformat_exception():
    import sys
    from traceback import format_exception

    return "".join(
        format_exception(sys.last_type, sys.last_value, sys.last_traceback)
    )`);

  try {
    pyodide.runPython(code);
  } catch (error) {
    error.message = pyodide.globals.get("reformat_exception")();

    pythonOut = document.getElementById("python-out");
    message = document.createElement("p");
    message.className =
      "custom-chipart-output-line custom-chipart-output-line--error";
    message.append(error.message);
    pythonOut.append(message);

    console.info(error.message);
  }

  if (render != null) {
    const pyResult = await pyodide.runPythonAsync(`
        output_image = np.copy(${render})

        # flatten the image and return a memoryview
        memoryview(output_image.flatten())
    `);

    // 3. Convert the Python result back into a JavaScript ImageData object
    const processedPixels = new Uint8ClampedArray(pyResult.toJs());
    pyResult.destroy(); // Free up Pyodide memory to prevent leaks

    console.log(document.getElementById("python-out").innerText);
    if (document.getElementById("python-out").innerText != "") {
      console.log("Showing output");
      document
        .getElementById("python-out")
        .parentElement.classList.remove("hidden");
    }

    const newImageData = new ImageData(
      processedPixels,
      imageData.width,
      imageData.height,
    );
    return newImageData;
  }
}

async function convertImageToImageData(image) {
  const imageData = await new Promise((res) => {
    image.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = image;
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      res(ctx.getImageData(0, 0, width, height));
    };
  });

  return imageData;
}

async function addLayerAsync(name, callback, ...args) {
  const layerId = crypto.randomUUID();

  layerContainer = document.getElementById("layerContainer");

  // create UI element
  layerDiv = document.createElement("div");
  layerDiv.setAttribute("id", layerId);
  layerDiv.className =
    "custom-chipart-layer-item custom-chipart-layer-item--loading";

  flexDiv = document.createElement("div");
  flexDiv.className = "flex";
  layerDiv.append(flexDiv);

  nameDiv = document.createElement("div");
  nameDiv.className = "text-left grow custom-chipart-layer-name";
  nameDiv.append(name);
  flexDiv.append(nameDiv);

  iconDiv = document.createElement("div");
  iconDiv.className = "text-right tracking-widest custom-chipart-layer-actions";
  flexDiv.append(iconDiv);

  eyeIcon = document.createElement("i");
  eyeIcon.className = "ti ti-eye custom-chipart-layer-action";
  eyeIcon.addEventListener("click", function (event) {
    console.log("eye");
    console.log(layerId);

    layer = layerMap.get(layerId);
    if (layer.getOpacity() == 1.0) {
      layer.setOpacity(0.0);
      event.target.classList.remove("ti-eye");
      event.target.classList.add("ti-eye-off");
    } else {
      layer.setOpacity(1.0);
      event.target.classList.remove("ti-eye-off");
      event.target.classList.add("ti-eye");
    }
  });
  iconDiv.append(eyeIcon);

  iconDiv.append(" ");

  closeIcon = document.createElement("i");
  closeIcon.className = "ti ti-x custom-chipart-layer-action";
  closeIcon.addEventListener("click", function (event) {
    console.log("close");
    console.log(layerId);

    // remove layer from viewer
    layer = layerMap.get(layerId);
    viewer.world.removeItem(layer);

    // remove layer from layer map
    layerMap.delete(layerId);

    // remove layer UI element
    document.getElementById(layerId).remove();
  });
  iconDiv.append(closeIcon);

  layerContainer.prepend(layerDiv);

  imageData = await callback(...args);

  // convert ImageData to canvas and then get content as data URL
  const processedCanvas = document.createElement("canvas");
  processedCanvas.width = imageData.width;
  processedCanvas.height = imageData.height;
  processedCanvas.getContext("2d").putImageData(imageData, 0, 0);

  const processedUrl = processedCanvas.toDataURL();
  viewer.addTiledImage({
    tileSource: {
      type: "image",
      url: processedUrl,
    },
    success: function (event) {
      const item = event.item;
      layerMap.set(layerId, item);
    },
  });

  layerDiv.classList.remove("animate-pulse");
  layerDiv.classList.remove("custom-chipart-layer-item--loading");
}

// handle document loading
document.addEventListener("DOMContentLoaded", function () {
  for (let codeBlock of document.getElementsByClassName("highlight")) {
    if (codeBlock.getAttribute("data-executable") == "true") {
      runButton = document.createElement("a");
      runButton.setAttribute("href", "");
      runButton.className = "btn btn-primary mx-2 my-2 custom-chipart-run-btn";
      runButton.append("Run");
      runButton.onclick = function (event) {
        renderString =
          event.target.parentElement.parentElement.parentElement.getAttribute(
            "data-render",
          );
        console.log(renderString);
        code = event.target.parentElement.previousElementSibling.innerText;
        title = event.target.parentElement.parentElement.parentElement.title;
        addLayerAsync(title, processImage, code, renderString);

        return false;
      };

      runButtonContainer = document.createElement("div");
      runButtonContainer.className =
        "absolute top-0 w-full text-right px-8 py-2";
      runButtonContainer.append(runButton);

      codeBlock.firstChild.classList.add("relative");
      codeBlock.firstChild.append(runButtonContainer);
    }
  }

  // setup image viewer
  const imageInput = document.getElementById("imageInput");

  viewer = OpenSeadragon({
    id: "viewer", // ID of your div
    prefixUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
    maxZoomPixelRatio: 10,
    imageSmoothingEnabled: false,
    animationTime: 0,
    showNavigationControl: false,
  });

  const chipartShell = document.getElementById("chipartShell");
  const chipartStickyToggle = document.getElementById("chipartStickyToggle");

  if (chipartShell && chipartStickyToggle) {
    const chipartStickyToggleIcon = chipartStickyToggle.querySelector("i");
    let pendingUnstick = false;

    const isShellCurrentlyStuck = function () {
      const shellRect = chipartShell.getBoundingClientRect();
      const stickyTop = parseFloat(getComputedStyle(chipartShell).top) || 0;
      return Math.abs(shellRect.top - stickyTop) < 1;
    };

    chipartShell.addEventListener("animationend", function () {
      chipartShell.classList.remove("custom-chipart-shell--unsticking");

      if (pendingUnstick) {
        pendingUnstick = false;
        chipartShell.classList.remove("custom-chipart-shell--sticky");
        syncStickyToggleUi(false);
      }
    });

    const syncStickyToggleUi = function (isSticky) {
      chipartStickyToggle.setAttribute("aria-pressed", String(isSticky));

      if (isSticky) {
        chipartStickyToggle.setAttribute("title", "Unpin panel");
        chipartStickyToggle.setAttribute("aria-label", "Unpin panel");
        if (chipartStickyToggleIcon) {
          chipartStickyToggleIcon.classList.remove("ti-pinned");
          chipartStickyToggleIcon.classList.add("ti-pinned-off");
        }
      } else {
        chipartStickyToggle.setAttribute("title", "Pin panel");
        chipartStickyToggle.setAttribute("aria-label", "Pin panel");
        if (chipartStickyToggleIcon) {
          chipartStickyToggleIcon.classList.remove("ti-pinned-off");
          chipartStickyToggleIcon.classList.add("ti-pinned");
        }
      }
    };

    chipartStickyToggle.addEventListener("click", function () {
      const wasSticky = chipartShell.classList.contains(
        "custom-chipart-shell--sticky",
      );

      if (wasSticky) {
        if (!isShellCurrentlyStuck()) {
          pendingUnstick = false;
          chipartShell.classList.remove("custom-chipart-shell--sticky");
          syncStickyToggleUi(false);
          return;
        }

        pendingUnstick = true;
        chipartShell.classList.remove("custom-chipart-shell--unsticking");
        void chipartShell.offsetWidth;
        chipartShell.classList.add("custom-chipart-shell--unsticking");
        return;
      }

      pendingUnstick = false;
      chipartShell.classList.add("custom-chipart-shell--sticky");
      syncStickyToggleUi(true);
    });

    syncStickyToggleUi(
      chipartShell.classList.contains("custom-chipart-shell--sticky"),
    );
  }

  imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    clearLayers();

    addLayerAsync("Original", async function () {
      const url = URL.createObjectURL(file);

      originalImage = new Image();
      originalImage.addEventListener("load", async function (event) {
        // load image into Python globals
        const width = originalImage.width;
        const height = originalImage.height;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        ctx = tempCanvas.getContext("2d");
        ctx.drawImage(originalImage, 0, 0);

        const imageData = ctx.getImageData(0, 0, width, height);

        pyodide.globals.set("original_pixel_data", imageData.data);
        pyodide.globals.set("width", imageData.width);
        pyodide.globals.set("height", imageData.height);

        await pyodide.runPythonAsync(`
          import numpy as np
          from scipy import ndimage

          raw_array = np.asarray(original_pixel_data.to_py(), dtype=np.uint8)
          original_pixels = raw_array.reshape((height, width, 4))
          pixels = np.copy(original_pixels)
        `);
      });
      originalImage.src = url;

      return await convertImageToImageData(originalImage);
    });
  });

  document
    .getElementById("python-out-close")
    .addEventListener("click", function (event) {
      event.target.parentElement.parentElement.nextElementSibling.innerHTML =
        "";
      event.target.parentElement.parentElement.parentElement.classList.add(
        "hidden",
      );
      return false;
    });
});
