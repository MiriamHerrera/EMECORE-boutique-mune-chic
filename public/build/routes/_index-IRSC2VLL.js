import {
  Link
} from "/build/_shared/chunk-6V46NMSZ.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  createHotContext
} from "/build/_shared/chunk-HZER637F.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1746563982921.0186";
}
var meta = () => {
  return [{
    title: "Mu\xF1e Chic - Tu Boutique de Moda"
  }, {
    description: "Encuentra los mejores art\xEDculos de moda en Mu\xF1e Chic. Ropa, zapatos, accesorios y m\xE1s."
  }];
};
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-20", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "relative h-[80vh] min-h-[600px] flex items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 z-0", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/hero-bg.jpg", alt: "Mu\xF1e Chic Boutique", className: "w-full h-full object-cover", loading: "lazy" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 34,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-black/40" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 35,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-main relative z-10 text-white", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "mb-6", children: "Tu Estilo, Tu Elegancia" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 39,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xl md:text-2xl mb-8 max-w-2xl", children: "Descubre nuestra exclusiva colecci\xF3n de moda y accesorios para expresar tu estilo \xFAnico." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/productos", className: "btn-primary", children: "Ver Productos" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 46,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://wa.me/tunumero", target: "_blank", rel: "noopener noreferrer", className: "btn-secondary", children: "Contactar" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 49,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 45,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "container-main", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-center mb-12", children: "Categor\xEDas Destacadas" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CategoryCard, { title: "Ropa", image: "/images/ropa.jpg", href: "/productos?categoria=ropa" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CategoryCard, { title: "Zapatos", image: "/images/zapatos.jpg", href: "/productos?categoria=zapatos" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CategoryCard, { title: "Accesorios", image: "/images/accesorios.jpg", href: "/productos?categoria=accesorios" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "bg-gray-100 py-20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-main", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-center mb-12", children: "Marcas Destacadas" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/marca1.png", alt: "Marca 1", className: "h-12 object-contain", loading: "lazy" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 72,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/marca2.png", alt: "Marca 2", className: "h-12 object-contain", loading: "lazy" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 73,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/marca3.png", alt: "Marca 3", className: "h-12 object-contain", loading: "lazy" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/marca4.png", alt: "Marca 4", className: "h-12 object-contain", loading: "lazy" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 75,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "container-main", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mb-6", children: "Sobre Mu\xF1e Chic" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 84,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg mb-6", children: "En Mu\xF1e Chic, nos dedicamos a ofrecerte lo mejor en moda y estilo. Nuestra boutique cuenta con una cuidadosa selecci\xF3n de prendas y accesorios de las mejores marcas." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 85,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/nosotros", className: "btn-secondary inline-block", children: "Conoce m\xE1s" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 83,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/about.jpg", alt: "Nuestra Boutique", className: "rounded-lg shadow-xl", loading: "lazy" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 95,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 94,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "bg-primary py-20", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-main text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-dark mb-6", children: "\xBFListo para renovar tu estilo?" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-lg mb-8 max-w-2xl mx-auto", children: "Vis\xEDtanos o cont\xE1ctanos por WhatsApp para descubrir nuestra colecci\xF3n completa." }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://wa.me/tunumero", target: "_blank", rel: "noopener noreferrer", className: "btn-secondary", children: "Contactar ahora" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 102,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 30,
    columnNumber: 10
  }, this);
}
_c = Index;
function CategoryCard({
  title,
  image,
  href
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: href, className: "group relative overflow-hidden rounded-lg aspect-square", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: image, alt: title, className: "w-full h-full object-cover transition-transform group-hover:scale-105", loading: "lazy" }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 121,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-white text-2xl font-semibold", children: title }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 123,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 120,
    columnNumber: 10
  }, this);
}
_c2 = CategoryCard;
var _c;
var _c2;
$RefreshReg$(_c, "Index");
$RefreshReg$(_c2, "CategoryCard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-IRSC2VLL.js.map
