// Formal RC1 Module Worker: localized IMG.LY v1.7.0 + isnet_quint8 (zero external CDN dependency)
let modulePromise;
self.onmessage = async ({ data }) => {
  const { id, method, file, config } = data;
  try {
    modulePromise ??= import('./image-lab-assets/imgly-bg-removal.esm.js');
    const mod = await modulePromise;
    const options = {
      ...config,
      publicPath: config?.publicPath || new URL('./image-lab-assets/model-assets/', self.location.href).href,
      proxyToWorker: false,
      progress: (key, current, total) => self.postMessage({ id, type: 'progress', key, current, total }),
    };
    const result = method === 'preload' ? await mod.preload(options) : await mod.removeBackground(file, options);
    self.postMessage({ id, type: 'result', result });
  } catch (error) {
    self.postMessage({ id, type: 'error', message: error?.message || String(error) });
  }
};
