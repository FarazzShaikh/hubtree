webpackHotUpdate("inject",{

/***/ "./src/js/inject.js":
/*!**************************!*\
  !*** ./src/js/inject.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony import */ var tree_from_paths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tree-from-paths */ \"./node_modules/tree-from-paths/src/index.js\");\n/* harmony import */ var tree_from_paths__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tree_from_paths__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_inject_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/inject.css */ \"./src/css/inject.css\");\n\n\n\nfunction base64url_encode($s) {\n  return Buffer.from($s).toString(\"base64\").replace(\"/\", \"_\").replace(\"+\", \"-\");\n}\n\n//Get the name of the repository\nconst getName = () => {\n  const url = window.location.href + \"/\";\n  const [_, $, owner, repo] = url.match(/(?<=\\/)(.*?)(?=\\/)/g);\n\n  console.log(url.match(/(?<=\\/)(.*?)(?=\\/)/g));\n\n  const name = `${owner}/${repo}`;\n\n  console.log(name);\n\n  //TODO - There is probably a better way to validate being in a repository\n  if (name && name.includes(\"/\")) return name;\n  throw new Error(\"Name does not exist\");\n};\n\nconst getTree = async (name, pregressBar) => {\n  try {\n    const endpoint = `repos/${name}/git/trees/master?recursive=1`;\n    const url = `https://api.farazshaikh.com/ghproxy/${base64url_encode(endpoint)}`;\n    const treeData = await fetch(url).then((res) => {\n      pregressBar.style.width = \"40%\";\n      if (res.ok)\n        return res.json().then((r) => {\n          pregressBar.style.width = \"100%\";\n          return r;\n        });\n      throw new Error(\"Problem with request\");\n    });\n    const paths = treeData.tree.map((item) => item.path);\n    if (paths.length > 0) return { paths, name, tree: treeData.tree };\n    throw new Error(\"No paths\");\n  } catch (error) {\n    console.error(error);\n  }\n};\n\n//Make a directory tree and inject it into HTML\nconst createTree = ({ paths, name, tree }) => {\n  return Object(tree_from_paths__WEBPACK_IMPORTED_MODULE_0__[\"render\"])(paths, \"\", (parent, file, explicit) => {\n    const type = tree.find((item) => {\n      //Account for extra slash the package adds to file name\n      if (file[file.length - 1] === \"/\") return item.path === parent + file.slice(0, file.length - 1);\n      return item.path === parent + file;\n    }).type;\n    return `<a target=\"_blank\" class=\"link\" href=\" https://github.com/${name}/${type}/master/${parent}${file}\" > ${file}</a>  <br>`;\n  });\n};\n\n(async () => {\n  console.log(\"ABC\");\n  const ns = document.querySelector(\"ul.UnderlineNav-body\");\n  const html = `\n  <li data-view-component=\"true\" class=\"d-flex\">\n  <span id=\"tree-tab\" style=\"cursor: \"pointer\";\" data-tab-item=\"i7insights-tab\" data-selected-links=\"repo_graphs repo_contributors dependency_graph dependabot_updates pulse people community /tobenxe/hubtree/pulse\" data-ga-click=\"Repository, Navigation click, Insights tab\" data-view-component=\"true\" class=\"UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item\">\n    \n    \n  <svg class=\"octicon octicon-gear UnderlineNav-octicon d-none d-sm-inline\" display=\"none inline\" aria-hidden=\"true\" height=\"16\" version=\"1.1\" viewBox=\"0 0 12 16\" width=\"12\" style=\"margin-bottom: 5px; margin-right: 8px;\">\n  <path fill-rule=\"evenodd\"  d=\"M4.75 3C3.7835 3 3 3.7835 3 4.75C3 5.7165 3.7835 6.5 4.75 6.5C5.7165 6.5 6.5 5.7165 6.5 4.75C6.5 3.7835 5.7165 3 4.75 3ZM1.5 4.75C1.5 2.95507 2.95507 1.5 4.75 1.5C6.54493 1.5 8 2.95507 8 4.75C8 6.54493 6.54493 8 4.75 8C2.95507 8 1.5 6.54493 1.5 4.75Z\" />\n  <path fill-rule=\"evenodd\"  d=\"M15.25 9.5C14.2835 9.5 13.5 10.2835 13.5 11.25C13.5 12.2165 14.2835 13 15.25 13C16.2165 13 17 12.2165 17 11.25C17 10.2835 16.2165 9.5 15.25 9.5ZM12 11.25C12 9.4551 13.4551 8 15.25 8C17.0449 8 18.5 9.4551 18.5 11.25C18.5 13.0449 17.0449 14.5 15.25 14.5C13.4551 14.5 12 13.0449 12 11.25Z\" />\n  <path fill-rule=\"evenodd\"  d=\"M4.75 7.25C5.16421 7.25 5.5 7.67416 5.5 8.19737V18.3026C5.5 18.8258 5.16421 19.25 4.75 19.25C4.33579 19.25 4 18.8258 4 18.3026V8.19737C4 7.67416 4.33579 7.25 4.75 7.25Z\" />\n  <path fill-rule=\"evenodd\"  d=\"M13.5 11.75C13.5 12.1642 13.1642 12.5 12.75 12.5L4.75 12.5C4.3358 12.5 4 12.1642 4 11.75C4 11.3358 4.3358 11 4.75 11L12.75 11C13.1642 11 13.5 11.3358 13.5 11.75Z\" />\n  <path fill-rule=\"evenodd\"  d=\"M13.5 18.75C13.5 19.1642 13.1642 19.5 12.75 19.5L4.75 19.5C4.3358 19.5 4 19.1642 4 18.75C4 18.3358 4.3358 18 4.75 18L12.75 18C13.1642 18 13.5 18.3358 13.5 18.75Z\"/>\n  <path fill-rule=\"evenodd\"  d=\"M15.25 16.5C14.2835 16.5 13.5 17.2835 13.5 18.25C13.5 19.2165 14.2835 20 15.25 20C16.2165 20 17 19.2165 17 18.25C17 17.2835 16.2165 16.5 15.25 16.5ZM12 18.25C12 16.4551 13.4551 15 15.25 15C17.0449 15 18.5 16.4551 18.5 18.25C18.5 20.0449 17.0449 21.5 15.25 21.5C13.4551 21.5 12 20.0449 12 18.25Z\" />\n  </svg>\n\n    <span data-content=\"Insights\">Tree</span>\n    <span title=\"Not available\" data-view-component=\"true\" class=\"Counter\"></span>\n\n    \n</span></li>\n  `;\n\n  ns.insertAdjacentHTML(\"beforeend\", html);\n\n  const span = ns.querySelector(\"#tree-tab\");\n\n  const box = document.querySelector(\".Box.mb-3\");\n  const boxPrev = box.innerHTML;\n\n  const pregressContainer = document.querySelector(\".Progress\");\n  const pregressBar = pregressContainer.querySelector(\".Progress-item\");\n\n  let treeEnabled = false;\n  span.addEventListener(\"click\", async () => {\n    if (treeEnabled) {\n      if (boxPrev) {\n        span.classList.remove(\"selected\");\n        box.style.opacity = 0;\n\n        setTimeout(() => {\n          box.innerHTML = boxPrev;\n          treeEnabled = false;\n          box.style.opacity = 1;\n        }, 200);\n      }\n    } else {\n      try {\n        box.style.opacity = 0;\n        pregressBar.style.width = \"0%\";\n        pregressContainer.style.opacity = 1;\n\n        const name = getName();\n        const treeObj = await getTree(name, pregressBar);\n        const tree = createTree(treeObj);\n\n        span.classList.add(\"selected\");\n\n        const header = box.querySelector(\".Box-header\");\n\n        setTimeout(() => {\n          const boxReplacement = `\n        <div class=\"hubtree-main\">\n            <h1 class=\"d-flex flex-wrap flex-items-center break-word f3 text-normal\">\n            🌴 ${name}\n            </h1>\n            ${tree}\n        </div>\n        `;\n\n          box.innerHTML = boxReplacement;\n          box.prepend(header);\n          box.style.opacity = 1;\n          pregressBar.style.width = \"0%\";\n          pregressContainer.style.opacity = \"0\";\n\n          treeEnabled = true;\n        }, 200);\n      } catch (error) {\n        console.error(error);\n      }\n    }\n  });\n})();\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/buffer/index.js */ \"./node_modules/buffer/index.js\").Buffer))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvaW5qZWN0LmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luamVjdC5qcz85YmNjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCJ0cmVlLWZyb20tcGF0aHNcIjtcbmltcG9ydCBcIi4uL2Nzcy9pbmplY3QuY3NzXCI7XG5cbmZ1bmN0aW9uIGJhc2U2NHVybF9lbmNvZGUoJHMpIHtcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKCRzKS50b1N0cmluZyhcImJhc2U2NFwiKS5yZXBsYWNlKFwiL1wiLCBcIl9cIikucmVwbGFjZShcIitcIiwgXCItXCIpO1xufVxuXG4vL0dldCB0aGUgbmFtZSBvZiB0aGUgcmVwb3NpdG9yeVxuY29uc3QgZ2V0TmFtZSA9ICgpID0+IHtcbiAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIi9cIjtcbiAgY29uc3QgW18sICQsIG93bmVyLCByZXBvXSA9IHVybC5tYXRjaCgvKD88PVxcLykoLio/KSg/PVxcLykvZyk7XG5cbiAgY29uc29sZS5sb2codXJsLm1hdGNoKC8oPzw9XFwvKSguKj8pKD89XFwvKS9nKSk7XG5cbiAgY29uc3QgbmFtZSA9IGAke293bmVyfS8ke3JlcG99YDtcblxuICBjb25zb2xlLmxvZyhuYW1lKTtcblxuICAvL1RPRE8gLSBUaGVyZSBpcyBwcm9iYWJseSBhIGJldHRlciB3YXkgdG8gdmFsaWRhdGUgYmVpbmcgaW4gYSByZXBvc2l0b3J5XG4gIGlmIChuYW1lICYmIG5hbWUuaW5jbHVkZXMoXCIvXCIpKSByZXR1cm4gbmFtZTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTmFtZSBkb2VzIG5vdCBleGlzdFwiKTtcbn07XG5cbmNvbnN0IGdldFRyZWUgPSBhc3luYyAobmFtZSwgcHJlZ3Jlc3NCYXIpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBlbmRwb2ludCA9IGByZXBvcy8ke25hbWV9L2dpdC90cmVlcy9tYXN0ZXI/cmVjdXJzaXZlPTFgO1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5mYXJhenNoYWlraC5jb20vZ2hwcm94eS8ke2Jhc2U2NHVybF9lbmNvZGUoZW5kcG9pbnQpfWA7XG4gICAgY29uc3QgdHJlZURhdGEgPSBhd2FpdCBmZXRjaCh1cmwpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgcHJlZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBcIjQwJVwiO1xuICAgICAgaWYgKHJlcy5vaylcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkudGhlbigocikgPT4ge1xuICAgICAgICAgIHByZWdyZXNzQmFyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHJvYmxlbSB3aXRoIHJlcXVlc3RcIik7XG4gICAgfSk7XG4gICAgY29uc3QgcGF0aHMgPSB0cmVlRGF0YS50cmVlLm1hcCgoaXRlbSkgPT4gaXRlbS5wYXRoKTtcbiAgICBpZiAocGF0aHMubGVuZ3RoID4gMCkgcmV0dXJuIHsgcGF0aHMsIG5hbWUsIHRyZWU6IHRyZWVEYXRhLnRyZWUgfTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBwYXRoc1wiKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgfVxufTtcblxuLy9NYWtlIGEgZGlyZWN0b3J5IHRyZWUgYW5kIGluamVjdCBpdCBpbnRvIEhUTUxcbmNvbnN0IGNyZWF0ZVRyZWUgPSAoeyBwYXRocywgbmFtZSwgdHJlZSB9KSA9PiB7XG4gIHJldHVybiByZW5kZXIocGF0aHMsIFwiXCIsIChwYXJlbnQsIGZpbGUsIGV4cGxpY2l0KSA9PiB7XG4gICAgY29uc3QgdHlwZSA9IHRyZWUuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgLy9BY2NvdW50IGZvciBleHRyYSBzbGFzaCB0aGUgcGFja2FnZSBhZGRzIHRvIGZpbGUgbmFtZVxuICAgICAgaWYgKGZpbGVbZmlsZS5sZW5ndGggLSAxXSA9PT0gXCIvXCIpIHJldHVybiBpdGVtLnBhdGggPT09IHBhcmVudCArIGZpbGUuc2xpY2UoMCwgZmlsZS5sZW5ndGggLSAxKTtcbiAgICAgIHJldHVybiBpdGVtLnBhdGggPT09IHBhcmVudCArIGZpbGU7XG4gICAgfSkudHlwZTtcbiAgICByZXR1cm4gYDxhIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwibGlua1wiIGhyZWY9XCIgaHR0cHM6Ly9naXRodWIuY29tLyR7bmFtZX0vJHt0eXBlfS9tYXN0ZXIvJHtwYXJlbnR9JHtmaWxlfVwiID4gJHtmaWxlfTwvYT4gIDxicj5gO1xuICB9KTtcbn07XG5cbihhc3luYyAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiQUJDXCIpO1xuICBjb25zdCBucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bC5VbmRlcmxpbmVOYXYtYm9keVwiKTtcbiAgY29uc3QgaHRtbCA9IGBcbiAgPGxpIGRhdGEtdmlldy1jb21wb25lbnQ9XCJ0cnVlXCIgY2xhc3M9XCJkLWZsZXhcIj5cbiAgPHNwYW4gaWQ9XCJ0cmVlLXRhYlwiIHN0eWxlPVwiY3Vyc29yOiBcInBvaW50ZXJcIjtcIiBkYXRhLXRhYi1pdGVtPVwiaTdpbnNpZ2h0cy10YWJcIiBkYXRhLXNlbGVjdGVkLWxpbmtzPVwicmVwb19ncmFwaHMgcmVwb19jb250cmlidXRvcnMgZGVwZW5kZW5jeV9ncmFwaCBkZXBlbmRhYm90X3VwZGF0ZXMgcHVsc2UgcGVvcGxlIGNvbW11bml0eSAvdG9iZW54ZS9odWJ0cmVlL3B1bHNlXCIgZGF0YS1nYS1jbGljaz1cIlJlcG9zaXRvcnksIE5hdmlnYXRpb24gY2xpY2ssIEluc2lnaHRzIHRhYlwiIGRhdGEtdmlldy1jb21wb25lbnQ9XCJ0cnVlXCIgY2xhc3M9XCJVbmRlcmxpbmVOYXYtaXRlbSBoeF91bmRlcmxpbmVuYXYtaXRlbSBuby13cmFwIGpzLXJlc3BvbnNpdmUtdW5kZXJsaW5lbmF2LWl0ZW0ganMtc2VsZWN0ZWQtbmF2aWdhdGlvbi1pdGVtXCI+XG4gICAgXG4gICAgXG4gIDxzdmcgY2xhc3M9XCJvY3RpY29uIG9jdGljb24tZ2VhciBVbmRlcmxpbmVOYXYtb2N0aWNvbiBkLW5vbmUgZC1zbS1pbmxpbmVcIiBkaXNwbGF5PVwibm9uZSBpbmxpbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBoZWlnaHQ9XCIxNlwiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDEyIDE2XCIgd2lkdGg9XCIxMlwiIHN0eWxlPVwibWFyZ2luLWJvdHRvbTogNXB4OyBtYXJnaW4tcmlnaHQ6IDhweDtcIj5cbiAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiICBkPVwiTTQuNzUgM0MzLjc4MzUgMyAzIDMuNzgzNSAzIDQuNzVDMyA1LjcxNjUgMy43ODM1IDYuNSA0Ljc1IDYuNUM1LjcxNjUgNi41IDYuNSA1LjcxNjUgNi41IDQuNzVDNi41IDMuNzgzNSA1LjcxNjUgMyA0Ljc1IDNaTTEuNSA0Ljc1QzEuNSAyLjk1NTA3IDIuOTU1MDcgMS41IDQuNzUgMS41QzYuNTQ0OTMgMS41IDggMi45NTUwNyA4IDQuNzVDOCA2LjU0NDkzIDYuNTQ0OTMgOCA0Ljc1IDhDMi45NTUwNyA4IDEuNSA2LjU0NDkzIDEuNSA0Ljc1WlwiIC8+XG4gIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiAgZD1cIk0xNS4yNSA5LjVDMTQuMjgzNSA5LjUgMTMuNSAxMC4yODM1IDEzLjUgMTEuMjVDMTMuNSAxMi4yMTY1IDE0LjI4MzUgMTMgMTUuMjUgMTNDMTYuMjE2NSAxMyAxNyAxMi4yMTY1IDE3IDExLjI1QzE3IDEwLjI4MzUgMTYuMjE2NSA5LjUgMTUuMjUgOS41Wk0xMiAxMS4yNUMxMiA5LjQ1NTEgMTMuNDU1MSA4IDE1LjI1IDhDMTcuMDQ0OSA4IDE4LjUgOS40NTUxIDE4LjUgMTEuMjVDMTguNSAxMy4wNDQ5IDE3LjA0NDkgMTQuNSAxNS4yNSAxNC41QzEzLjQ1NTEgMTQuNSAxMiAxMy4wNDQ5IDEyIDExLjI1WlwiIC8+XG4gIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiAgZD1cIk00Ljc1IDcuMjVDNS4xNjQyMSA3LjI1IDUuNSA3LjY3NDE2IDUuNSA4LjE5NzM3VjE4LjMwMjZDNS41IDE4LjgyNTggNS4xNjQyMSAxOS4yNSA0Ljc1IDE5LjI1QzQuMzM1NzkgMTkuMjUgNCAxOC44MjU4IDQgMTguMzAyNlY4LjE5NzM3QzQgNy42NzQxNiA0LjMzNTc5IDcuMjUgNC43NSA3LjI1WlwiIC8+XG4gIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiAgZD1cIk0xMy41IDExLjc1QzEzLjUgMTIuMTY0MiAxMy4xNjQyIDEyLjUgMTIuNzUgMTIuNUw0Ljc1IDEyLjVDNC4zMzU4IDEyLjUgNCAxMi4xNjQyIDQgMTEuNzVDNCAxMS4zMzU4IDQuMzM1OCAxMSA0Ljc1IDExTDEyLjc1IDExQzEzLjE2NDIgMTEgMTMuNSAxMS4zMzU4IDEzLjUgMTEuNzVaXCIgLz5cbiAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiICBkPVwiTTEzLjUgMTguNzVDMTMuNSAxOS4xNjQyIDEzLjE2NDIgMTkuNSAxMi43NSAxOS41TDQuNzUgMTkuNUM0LjMzNTggMTkuNSA0IDE5LjE2NDIgNCAxOC43NUM0IDE4LjMzNTggNC4zMzU4IDE4IDQuNzUgMThMMTIuNzUgMThDMTMuMTY0MiAxOCAxMy41IDE4LjMzNTggMTMuNSAxOC43NVpcIi8+XG4gIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiAgZD1cIk0xNS4yNSAxNi41QzE0LjI4MzUgMTYuNSAxMy41IDE3LjI4MzUgMTMuNSAxOC4yNUMxMy41IDE5LjIxNjUgMTQuMjgzNSAyMCAxNS4yNSAyMEMxNi4yMTY1IDIwIDE3IDE5LjIxNjUgMTcgMTguMjVDMTcgMTcuMjgzNSAxNi4yMTY1IDE2LjUgMTUuMjUgMTYuNVpNMTIgMTguMjVDMTIgMTYuNDU1MSAxMy40NTUxIDE1IDE1LjI1IDE1QzE3LjA0NDkgMTUgMTguNSAxNi40NTUxIDE4LjUgMTguMjVDMTguNSAyMC4wNDQ5IDE3LjA0NDkgMjEuNSAxNS4yNSAyMS41QzEzLjQ1NTEgMjEuNSAxMiAyMC4wNDQ5IDEyIDE4LjI1WlwiIC8+XG4gIDwvc3ZnPlxuXG4gICAgPHNwYW4gZGF0YS1jb250ZW50PVwiSW5zaWdodHNcIj5UcmVlPC9zcGFuPlxuICAgIDxzcGFuIHRpdGxlPVwiTm90IGF2YWlsYWJsZVwiIGRhdGEtdmlldy1jb21wb25lbnQ9XCJ0cnVlXCIgY2xhc3M9XCJDb3VudGVyXCI+PC9zcGFuPlxuXG4gICAgXG48L3NwYW4+PC9saT5cbiAgYDtcblxuICBucy5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbCk7XG5cbiAgY29uc3Qgc3BhbiA9IG5zLnF1ZXJ5U2VsZWN0b3IoXCIjdHJlZS10YWJcIik7XG5cbiAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Cb3gubWItM1wiKTtcbiAgY29uc3QgYm94UHJldiA9IGJveC5pbm5lckhUTUw7XG5cbiAgY29uc3QgcHJlZ3Jlc3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlByb2dyZXNzXCIpO1xuICBjb25zdCBwcmVncmVzc0JhciA9IHByZWdyZXNzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuUHJvZ3Jlc3MtaXRlbVwiKTtcblxuICBsZXQgdHJlZUVuYWJsZWQgPSBmYWxzZTtcbiAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGlmICh0cmVlRW5hYmxlZCkge1xuICAgICAgaWYgKGJveFByZXYpIHtcbiAgICAgICAgc3Bhbi5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIGJveC5zdHlsZS5vcGFjaXR5ID0gMDtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBib3guaW5uZXJIVE1MID0gYm94UHJldjtcbiAgICAgICAgICB0cmVlRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIGJveC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYm94LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICBwcmVncmVzc0Jhci5zdHlsZS53aWR0aCA9IFwiMCVcIjtcbiAgICAgICAgcHJlZ3Jlc3NDb250YWluZXIuc3R5bGUub3BhY2l0eSA9IDE7XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IGdldE5hbWUoKTtcbiAgICAgICAgY29uc3QgdHJlZU9iaiA9IGF3YWl0IGdldFRyZWUobmFtZSwgcHJlZ3Jlc3NCYXIpO1xuICAgICAgICBjb25zdCB0cmVlID0gY3JlYXRlVHJlZSh0cmVlT2JqKTtcblxuICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBjb25zdCBoZWFkZXIgPSBib3gucXVlcnlTZWxlY3RvcihcIi5Cb3gtaGVhZGVyXCIpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJveFJlcGxhY2VtZW50ID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiaHVidHJlZS1tYWluXCI+XG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJkLWZsZXggZmxleC13cmFwIGZsZXgtaXRlbXMtY2VudGVyIGJyZWFrLXdvcmQgZjMgdGV4dC1ub3JtYWxcIj5cbiAgICAgICAgICAgIPCfjLQgJHtuYW1lfVxuICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICR7dHJlZX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgICBib3guaW5uZXJIVE1MID0gYm94UmVwbGFjZW1lbnQ7XG4gICAgICAgICAgYm94LnByZXBlbmQoaGVhZGVyKTtcbiAgICAgICAgICBib3guc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgICAgcHJlZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBcIjAlXCI7XG4gICAgICAgICAgcHJlZ3Jlc3NDb250YWluZXIuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuXG4gICAgICAgICAgdHJlZUVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pKCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/inject.js\n");

/***/ })

})