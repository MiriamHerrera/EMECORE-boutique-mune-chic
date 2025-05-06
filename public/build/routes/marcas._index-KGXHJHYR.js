import {
  createHotContext
} from "/build/_shared/chunk-QE5TTJD7.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-7PHB3BFD.js";
import "/build/_shared/chunk-CJ4MY3PQ.js";
import "/build/_shared/chunk-JR22VO6P.js";
import {
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// app/routes/marcas._index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\marcas._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\marcas._index.tsx"
  );
  import.meta.hot.lastModified = "1746498391196.198";
}
var meta = () => {
  return [{
    title: "Nuestras Marcas - Mu\xF1e Chic"
  }, {
    description: "Descubre las marcas exclusivas que ofrecemos en Mu\xF1e Chic"
  }];
};
var brands = [{
  name: "Marca 1",
  logo: "/images/marca1.png",
  description: "Descripci\xF3n de la marca 1 y sus productos destacados."
}, {
  name: "Marca 2",
  logo: "/images/marca2.png",
  description: "Descripci\xF3n de la marca 2 y sus productos destacados."
}, {
  name: "Marca 3",
  logo: "/images/marca3.png",
  description: "Descripci\xF3n de la marca 3 y sus productos destacados."
}, {
  name: "Marca 4",
  logo: "/images/marca4.png",
  description: "Descripci\xF3n de la marca 4 y sus productos destacados."
}];
function Brands() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "py-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-main", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center mb-12", children: "Nuestras Marcas" }, void 0, false, {
      fileName: "app/routes/marcas._index.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid gap-12", children: brands.map((brand, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white p-8 rounded-lg shadow-lg", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: brand.logo, alt: brand.name, className: "h-16 object-contain mx-auto mb-6", loading: "lazy" }, void 0, false, {
          fileName: "app/routes/marcas._index.tsx",
          lineNumber: 53,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-semibold mb-4", children: brand.name }, void 0, false, {
          fileName: "app/routes/marcas._index.tsx",
          lineNumber: 54,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600", children: brand.description }, void 0, false, {
          fileName: "app/routes/marcas._index.tsx",
          lineNumber: 55,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/marcas._index.tsx",
        lineNumber: 52,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "aspect-video rounded-lg overflow-hidden bg-gray-100", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: `/images/brand-${index + 1}.jpg`, alt: `Productos ${brand.name}`, className: "w-full h-full object-cover", loading: "lazy" }, void 0, false, {
        fileName: "app/routes/marcas._index.tsx",
        lineNumber: 59,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/marcas._index.tsx",
        lineNumber: 58,
        columnNumber: 15
      }, this)
    ] }, brand.name, true, {
      fileName: "app/routes/marcas._index.tsx",
      lineNumber: 51,
      columnNumber: 41
    }, this)) }, void 0, false, {
      fileName: "app/routes/marcas._index.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-20 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-3xl font-semibold mb-6", children: "\xBFInteresado en nuestras marcas?" }, void 0, false, {
        fileName: "app/routes/marcas._index.tsx",
        lineNumber: 66,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg text-gray-600 mb-8 max-w-2xl mx-auto", children: "Cont\xE1ctanos por WhatsApp para conocer m\xE1s sobre nuestros productos y marcas disponibles." }, void 0, false, {
        fileName: "app/routes/marcas._index.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://wa.me/tunumero", target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: "Contactar ahora" }, void 0, false, {
        fileName: "app/routes/marcas._index.tsx",
        lineNumber: 72,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/marcas._index.tsx",
      lineNumber: 65,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/marcas._index.tsx",
    lineNumber: 47,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/marcas._index.tsx",
    lineNumber: 46,
    columnNumber: 10
  }, this);
}
_c = Brands;
var _c;
$RefreshReg$(_c, "Brands");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Brands as default,
  meta
};
//# sourceMappingURL=/build/routes/marcas._index-KGXHJHYR.js.map
