// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  return {
    routes: {"class/index":{"path":"class","id":"class/index","parentId":"@@/global-layout","file":"class/index.js"},"class/$id":{"path":"class/:id","id":"class/$id","parentId":"@@/global-layout","file":"class/$id.js"},"index":{"path":"/","id":"index","parentId":"@@/global-layout","file":"index.js"},"demo":{"path":"demo","id":"demo","parentId":"@@/global-layout","file":"demo.js"},"docs":{"path":"docs","id":"docs","parentId":"@@/global-layout","file":"docs.js"},"@@/global-layout":{"id":"@@/global-layout","path":"/","file":"@/layouts/index.tsx","isLayout":true}},
    routeComponents: {
'class/index': React.lazy(() => import(/* webpackChunkName: "src__pages__class__index" */'../../../src/pages/class/index.js')),
'class/$id': React.lazy(() => import(/* webpackChunkName: "src__pages__class__$id" */'../../../src/pages/class/$id.js')),
'index': React.lazy(() => import(/* webpackChunkName: "src__pages__index" */'../../../src/pages/index.js')),
'demo': React.lazy(() => import(/* webpackChunkName: "src__pages__demo" */'../../../src/pages/demo.js')),
'docs': React.lazy(() => import(/* webpackChunkName: "src__pages__docs" */'../../../src/pages/docs.js')),
'@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'@/layouts/index.tsx')),
},
  };
}
