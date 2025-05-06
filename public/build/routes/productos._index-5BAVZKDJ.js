import {
  useLoaderData
} from "/build/_shared/chunk-7FKZVD7C.js";
import "/build/_shared/chunk-WEAPBHQG.js";
import {
  createHotContext
} from "/build/_shared/chunk-QE5TTJD7.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-7PHB3BFD.js";
import "/build/_shared/chunk-CJ4MY3PQ.js";
import "/build/_shared/chunk-JR22VO6P.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// empty-module:@remix-run/node
var require_node = __commonJS({
  "empty-module:@remix-run/node"(exports, module) {
    module.exports = {};
  }
});

// empty-module:~/services/products.server
var require_products = __commonJS({
  "empty-module:~/services/products.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/productos._index.tsx
var import_node = __toESM(require_node());
var import_products = __toESM(require_products());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\productos._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\productos._index.tsx"
  );
  import.meta.hot.lastModified = "1746499205516.6204";
}
function Products() {
  _s();
  const {
    products
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-12", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center mb-12", children: "Nuestros Productos" }, void 0, false, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-main", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "form-select", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Todas las categor\xEDas" }, void 0, false, {
          fileName: "app/routes/productos._index.tsx",
          lineNumber: 44,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "ropa", children: "Ropa" }, void 0, false, {
          fileName: "app/routes/productos._index.tsx",
          lineNumber: 45,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "zapatos", children: "Zapatos" }, void 0, false, {
          fileName: "app/routes/productos._index.tsx",
          lineNumber: 46,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "accesorios", children: "Accesorios" }, void 0, false, {
          fileName: "app/routes/productos._index.tsx",
          lineNumber: 47,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/productos._index.tsx",
        lineNumber: 43,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { className: "form-select", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Ordenar por" }, void 0, false, {
          fileName: "app/routes/productos._index.tsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "newest", children: "M\xE1s recientes" }, void 0, false, {
          fileName: "app/routes/productos._index.tsx",
          lineNumber: 52,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "price-asc", children: "Precio: Menor a Mayor" }, void 0, false, {
          fileName: "app/routes/productos._index.tsx",
          lineNumber: 53,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "price-desc", children: "Precio: Mayor a Menor" }, void 0, false, {
          fileName: "app/routes/productos._index.tsx",
          lineNumber: 54,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/productos._index.tsx",
        lineNumber: 50,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "search", placeholder: "Buscar productos...", className: "form-input" }, void 0, false, {
        fileName: "app/routes/productos._index.tsx",
        lineNumber: 57,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 42,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 41,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-main", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProductCard, { product }, product.id, false, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 65,
      columnNumber: 36
    }, this)) }, void 0, false, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 64,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/productos._index.tsx",
    lineNumber: 36,
    columnNumber: 10
  }, this);
}
_s(Products, "myEvnF20fcYyfWpqSQ3PXWXvEBg=", false, function() {
  return [useLoaderData];
});
_c = Products;
function ProductCard({
  product
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "group", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "aspect-square rounded-lg overflow-hidden bg-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: product.main_image || "/images/placeholder.jpg", alt: product.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform", loading: "lazy" }, void 0, false, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 79,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-lg font-medium text-gray-900", children: product.name }, void 0, false, {
        fileName: "app/routes/productos._index.tsx",
        lineNumber: 82,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-gray-500", children: product.category_name }, void 0, false, {
        fileName: "app/routes/productos._index.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-2 text-lg font-semibold text-gray-900", children: [
        "$",
        product.price.toFixed(2)
      ] }, void 0, true, {
        fileName: "app/routes/productos._index.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/productos._index.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/productos._index.tsx",
    lineNumber: 77,
    columnNumber: 10
  }, this);
}
_c2 = ProductCard;
var _c;
var _c2;
$RefreshReg$(_c, "Products");
$RefreshReg$(_c2, "ProductCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Products as default
};
//# sourceMappingURL=/build/routes/productos._index-5BAVZKDJ.js.map
