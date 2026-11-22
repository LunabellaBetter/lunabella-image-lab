# LunaBella Image Lab — Corresponding Source

This is the **public corresponding-source repository** for the Image Lab background-removal feature displayed in LunaBella Public Interactive Portfolio. It deliberately contains **only Image Lab-related application source, styles, runtime resource mapping and license documentation**; it does not expose the private portfolio repository or any personal archives.

## Source version

- LunaBella integration baseline: **2026-11-22**, Image Lab as maintained in Public Portfolio release candidate `rc/public-portfolio-r1.4.10-rc1` after the MIT attribution fix.
- AI engine: [`@imgly/background-removal@1.7.0`](https://www.npmjs.com/package/@imgly/background-removal/v/1.7.0), **AGPL-3.0**.
- Runtime: `onnxruntime-web@1.21.0`, **MIT**.
- Model: `isnet_quint8` / upstream IS-Net, **MIT** according to IMG.LY's third-party license manifest.
- The Image Lab frontend and worker are unminified in `site/tools/image-lab.html` and `site/tools/image-lab-cutout-worker.js`.

## Source and dependency layout

| File | Role |
| --- | --- |
| `site/tools/image-lab.html` | Complete interactive page and unminified original integration JavaScript |
| `site/tools/image-lab-cutout-worker.js` | Worker bridge: `preload`, background removal, progress, cancellation |
| `site/tools/mini-tools-r5/styles.css` | CSS used by the Image Lab page |
| `site/scripts/tool-motion.js` | Optional motion enhancement |
| `site/tools/image-lab-assets/model-assets/resources.json` | Manifest of hashed runtime WASM/model resources in the deployed candidate |
| `licenses/IMG-LY-AGPL-3.0.md` | Full upstream AGPL-3.0 license text |
| `licenses/IMG-LY-ThirdPartyLicenses.json` | Upstream web package third-party licenses |
| `licenses/IMG-LY-Data-ThirdPartyLicenses.json` | Upstream model/runtime data third-party licenses |
| `scripts/prepare-upstream.sh` | Download exact published upstream packages to a local dependency directory |

## Reconstructing the development environment

Prerequisites: Node.js and npm, a local HTTP server, internet access to the npm registry for the first dependency installation.

```sh
bash scripts/prepare-upstream.sh
python3 -m http.server 8000 --directory site
```

The source can then be inspected in `site/tools/image-lab.html`. **Important:** `prepare-upstream.sh` downloads upstream package sources and official packaged data into `vendor/`; it is **not** an automatically verified byte-for-byte static bundle generator. The deployed portfolio additionally uses localized runtime ESM bundles and content-addressed model/WASM chunks. To recreate that exact static distribution, the downloaded upstream resources must be bundled and mapped into `site/tools/image-lab-assets/` using the manifest and the original library's packaging process. These generated binaries are not checked into this source-only repository.

Official source and build references:

- [IMG.LY background-removal upstream repository](https://github.com/imgly/background-removal-js)
- [IMG.LY upstream web source](https://github.com/imgly/background-removal-js/tree/main/packages/web/src)
- [IMG.LY upstream resource packing script](https://github.com/imgly/background-removal-js/blob/main/scripts/package-resources.mjs)
- [ONNX Runtime Web source](https://github.com/microsoft/onnxruntime/tree/main/js/web)
- [IS-Net original implementation](https://github.com/xuebinqin/DIS)

The upstream repository does not expose a stable `v1.7.0` Git tag in the checked Git tags list, so the **npm package version** is the dependency version of record. Do not assume `main` is an immutable snapshot of 1.7.0. Published npm tarballs include upstream source/licensing metadata.

## Privacy and scope

Image processing happens client-side in the browser in the current implementation. Only images you intentionally select are processed. The model must load through HTTP(S); opening the HTML through `file://` will not load the WASM runtime. No real user photos, business records, confidential assets or private archive content are included in this repository.

The deployed site's “return to portfolio” link is external to this source repository. Opening the page locally without the parent portfolio will make that optional link return 404.

## License and attribution

This project is shared under **AGPL-3.0-only** to support the distribution of the Image Lab integration with `@imgly/background-removal@1.7.0`. See [LICENSE](LICENSE) for the complete terms. Third-party components retain their own copyrights and licenses. This repository does not claim authorship of the IMG.LY engine, ONNX Runtime or IS-Net model.

**Verification status:** Source files and third-party attribution have been copied from the release-candidate baseline. Public-repo availability and production linking are verified separately. A full clean-room binary rebuild, production Safari/iOS and mainland-China network testing are not claimed here.
