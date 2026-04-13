---
title: "How to build an Application with modern Technology"
meta_title: ""
description: "this is meta description"
date: 2022-04-04T05:00:00Z
image: "/images/image-placeholder.png"
categories: ["Application", "Data"]
author: "John Doe"
tags: ["nextjs", "tailwind"]
draft: false
custom_scripts:
  - "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.js"
  - "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/openseadragon.min.js"
  - "/js/chipart-wasm.js"
---

Nemo vel ad consectetur namut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.

Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!

## Creative Design

Nam ut rutrum ex, venenatis sollicitudin urna. Aliquam erat volutpat. Integer eu ipsum sem. Ut bibendum lacus vestibulum maximus suscipit. Quisque vitae nibh iaculis neque blandit euismod.

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!

Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vel ad consectetur ut aperiam. Itaque eligendi natus aperiam? Excepturi repellendus consequatur quibusdam optio expedita praesentium est adipisci dolorem ut eius!

<p class="mb-8 custom-chipart-lead">
    This is some normal content. Scroll down to see the custom element stick to the top of the screen.
  </p>

<div id="chipartShell" class="p-0 rounded-lg shadow-xl grid grid-cols-4 overflow-hidden custom-chipart-shell custom-chipart-shell--sticky">
  <button id="chipartStickyToggle" type="button" class="custom-chipart-sticky-toggle" title="Unpin panel" aria-label="Unpin panel" aria-pressed="true">
    <i class="ti ti-pinned-off" aria-hidden="true"></i>
  </button>
  <div class="col-span-3 overflow-hidden relative custom-chipart-viewer-pane">
    <div id="viewer" class="w-full h-100">
    </div>
    <div class="w-full h-full backdrop-blur-md absolute top-0 left-0 p-4 hidden custom-chipart-output-overlay">
      <div class="flex">
        <div class="col text-left text-lg custom-chipart-output-title">
          Output from Python:
        </div>
        <div class="col text-right text-lg">
          <i id="python-out-close" class="ti ti-x cursor-pointer"></i>
        </div>
      </div>
      <div id="python-out" class="my-4 custom-chipart-output-body">
      <p class="whitespace-pre font-mono hidden">
      </p>
      </div>
    </div>
  </div>
  <div class="p-0 flex flex-col custom-chipart-sidebar">
    <div class="p-4">
      <input id="imageInput" type="file" accept="image/*" class="sr-only" />
      <label for="imageInput" class="btn btn-primary block w-full text-center">Load artwork</label>
    </div>
    <div class="flex-grow">
    </div>
    <div class="px-4">
      <span class="font-bold custom-chipart-layers-title">Layers:</span>
    </div>
    <div id="layerContainer" class="max-h-64 px-4 custom-chipart-layers-list" style="overflow: scroll;"></div>
  </div>
</div>

<p class="mt-8 custom-chipart-body">
  Here is a lot of text below the element. As you scroll this text up, 
  the custom element above will stay locked to the top of the screen 
  while this text slides smoothly underneath it.
</p>

```Python {data-executable="true" title="Monochrome" data-render="np.stack([mono] * 3 + [np.full_like(mono, 255)], 2)"}
# take the mean of all color channels to calculate monochrome version
mono = pixels[:, :, :3].mean(axis=2)
```

```Python {data-executable="true" title="Binary" data-render="np.stack([mono * np.uint8(255)] * 3 + [np.full_like(mono, 255, dtype=np.uint8)], 2)"}
# threshold the grayscale image
mono = mono < 250
```

```Python {data-executable="true" title="Blur" data-render="np.stack([gray] * 3 + [np.full_like(gray, 1, dtype=np.uint8)], 2) * 255"}
import scipy.ndimage
blur = 2 * scipy.ndimage.gaussian_filter(mono.astype(float), 2)
blur += 2 * scipy.ndimage.gaussian_filter(mono.astype(float), 5)
blur += scipy.ndimage.gaussian_filter(mono.astype(float), 15)
gray = np.ones_like(blur) - blur
```

```Python {data-executable="true" title="Random" data-render="np.stack([mono] * 3 + [np.full_like(mono, 1.0, dtype=float)], 2).astype(np.uint8) * 255"}
max_density = 0.6
background = np.random.rand(*gray.shape) < max_density * gray

merged = np.zeros_like(background)
merged[mono == 0] = background[mono == 0]
merged[mono != 0] = mono[mono != 0]

mono = merged
```

## Sanitizing

```Python {data-executable="true" title="Cut high density" data-render="np.stack([mono] * 3 + [np.full_like(mono, 1.0, dtype=float)], 2).astype(np.uint8) * 255"}
def cut(pixels):
    grid_vertical = np.ones_like(pixels)
    grid_vertical[:, np.arange(3, pixels.shape[1], 4)] = 0

    grid_horizontal = np.ones_like(pixels)
    grid_horizontal[np.arange(3, pixels.shape[0], 4), :] = 0

    # insert vertical cuts
    filter_max_horizontal = np.array([[1, 1, 1, 1, 1]])
    mask = scipy.signal.convolve2d(pixels, filter_max_horizontal, mode="same") == 5

    pixels_a = grid_vertical * mask
    pixels_b = pixels * np.invert(mask)

    pixels = pixels_a + pixels_b
    pixels[pixels == 0] = 0

    # insert horizontal cuts
    filter_max_vertical = np.array([[1, 1, 1, 1, 1]]).T
    mask = scipy.signal.convolve2d(pixels, filter_max_vertical, mode="same") == 5

    pixels_a = grid_horizontal * mask
    pixels_b = pixels * np.invert(mask)

    pixels = pixels_a + pixels_b
    pixels[pixels == 0] = 0

    return pixels

mono = cut(mono)
```

```Python {data-executable="true" title="Diagonals" data-render="np.stack([np.full_like(mask, 1.0, dtype=float)] + 2 * [np.zeros_like(mask, dtype=float)] + [mask], 2).astype(np.uint8) * 255"}
import scipy.signal

kernel = np.array([[-1, 1], [1, -1]], dtype=float)

mask = scipy.signal.convolve2d(mono * 2 - 1, kernel, mode="same") == kernel.size
```

```Python {data-executable="true" title="Remove diagonals" data-render="np.stack([mono] * 3 + [np.full_like(mono, 1.0, dtype=float)], 2).astype(np.uint8) * 255"}
def sanitize_diagonals(pixels, max_iterations=10):
    kernel_diag_down = np.array([[-1, 1], [1, -1]], dtype=float)
    kernel_diag_up = np.array([[1, -1], [-1, 1]], dtype=float)

    for i in range(max_iterations):
        mask_down = scipy.signal.convolve2d(pixels * 2 - 1, kernel_diag_down, mode="same") == kernel_diag_down.size
        mask_down = np.roll(mask_down, (-1, 0), (0, 1))
        pixels[mask_down] = 0

        mask_up = scipy.signal.convolve2d(pixels * 2 - 1, kernel_diag_up, mode="same") == kernel_diag_up.size
        pixels[mask_up] = 0

        if (mask_up.sum() + mask_down.sum()) == 0:
            break

    mask_down = scipy.signal.convolve2d(pixels * 2 - 1, kernel_diag_down, mode="same") == kernel_diag_down.size
    mask_up = scipy.signal.convolve2d(pixels * 2 - 1, kernel_diag_up, mode="same") == kernel_diag_up.size
    if (mask_up.sum() + mask_down.sum()) != 0:
        raise ValueError(f"Could not sanitize diagonals within {max_iterations} iterations.")

    return pixels

mono = sanitize_diagonals(mono)
```

```Python {data-executable="true" title="Fill" data-render="np.stack([mono] * 3 + [np.full_like(mono, 1.0, dtype=float)], 2).astype(np.uint8) * 255"}
def fill_empty_regions(pixels):
    filter_empty = np.ones((9, 9)) * -1
    mask = scipy.signal.convolve2d(pixels * 2 - 1, filter_empty, mode="same") == filter_empty.size
    labels, n_labels = scipy.ndimage.label(mask)

    print(f"Found {n_labels} contiguous regions without any metal.")

    for l in range(1, n_labels + 1):
        xs, ys = np.where(labels == l)
        cx = int(xs.mean())
        cy = int(ys.mean())

        pixels[cx, cy] = 1

    mask = scipy.signal.convolve2d(pixels * 2 - 1, filter_empty, mode="same") == filter_empty.size
    labels, n_labels = scipy.ndimage.label(mask)
    print(f"Found {n_labels} contiguous regions without any metal after cleanup.")

    return pixels

mono = fill_empty_regions(mono)
mono = sanitize_diagonals(mono)
```

```Python {data-executable="true" title="Calculate density"}
mean_density = mono.mean()
print(mean_density)
```

<div class="h-screen mt-10 rounded flex items-center justify-center custom-chipart-scroll-block custom-chipart-scroll-block-one">
  Keep scrolling...
</div>
<div class="h-screen mt-10 rounded flex items-center justify-center custom-chipart-scroll-block custom-chipart-scroll-block-two">
  Almost there...
</div>
