
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: './',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/crearCitas"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28035, hash: '11a023c1f41a6991a2ec695a6a97a1b173a5f74f0ed68a31e64addcddb7b79e7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17194, hash: 'd756a4afc19c4eadb11381dce9d6f417a4f3cb8da93e7c7eb1adabf89300eea4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 38403, hash: 'bd597ab25b43aa9d2819db488f4c9abf9731bdd5262a9ca888d8f4b45823c20b', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 38403, hash: 'bd597ab25b43aa9d2819db488f4c9abf9731bdd5262a9ca888d8f4b45823c20b', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'crearCitas/index.html': {size: 38403, hash: 'bd597ab25b43aa9d2819db488f4c9abf9731bdd5262a9ca888d8f4b45823c20b', text: () => import('./assets-chunks/crearCitas_index_html.mjs').then(m => m.default)},
    'styles-G332O2QJ.css': {size: 237851, hash: 'UOsqnCX64xI', text: () => import('./assets-chunks/styles-G332O2QJ_css.mjs').then(m => m.default)}
  },
};
