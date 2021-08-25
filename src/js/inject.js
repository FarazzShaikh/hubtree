import { render } from "tree-from-paths";
import "../css/inject.css";

function base64url_encode($s) {
  return Buffer.from($s).toString("base64").replace("/", "_").replace("+", "-");
}

//Get the name of the repository
const getName = () => {
  const url = window.location.href + "/";
  const [_, $, owner, repo] = url.match(/(?<=\/)(.*?)(?=\/)/g);

  console.log(url.match(/(?<=\/)(.*?)(?=\/)/g));

  const name = `${owner}/${repo}`;

  console.log(name);

  //TODO - There is probably a better way to validate being in a repository
  if (name && name.includes("/")) return name;
  throw new Error("Name does not exist");
};

const getTree = async (name, pregressBar) => {
  try {
    const endpoint = `repos/${name}/git/trees/master?recursive=1`;
    const url = `https://api.farazshaikh.com/ghproxy/${base64url_encode(endpoint)}`;
    const treeData = await fetch(url).then((res) => {
      pregressBar.style.width = "40%";
      if (res.ok)
        return res.json().then((r) => {
          pregressBar.style.width = "100%";
          return r;
        });
      throw new Error("Problem with request");
    });
    const paths = treeData.tree.map((item) => item.path);
    if (paths.length > 0) return { paths, name, tree: treeData.tree };
    throw new Error("No paths");
  } catch (error) {
    console.error(error);
  }
};

//Make a directory tree and inject it into HTML
const createTree = ({ paths, name, tree }) => {
  return render(paths, "", (parent, file, explicit) => {
    const type = tree.find((item) => {
      //Account for extra slash the package adds to file name
      if (file[file.length - 1] === "/") return item.path === parent + file.slice(0, file.length - 1);
      return item.path === parent + file;
    }).type;
    return `<a target="_blank" class="link" href=" https://github.com/${name}/${type}/master/${parent}${file}" > ${file}</a>  <br>`;
  });
};

(async () => {
  console.log("ABC");
  const ns = document.querySelector("ul.UnderlineNav-body");
  const html = `
  <li data-view-component="true" class="d-flex">
  <span id="tree-tab" style="cursor: "pointer";" data-tab-item="i7insights-tab" data-selected-links="repo_graphs repo_contributors dependency_graph dependabot_updates pulse people community /tobenxe/hubtree/pulse" data-ga-click="Repository, Navigation click, Insights tab" data-view-component="true" class="UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">
    
    
  <svg class="octicon octicon-gear UnderlineNav-octicon d-none d-sm-inline" display="none inline" aria-hidden="true" height="16" version="1.1" viewBox="0 0 12 16" width="12" style="margin-bottom: 5px; margin-right: 8px;">
  <path fill-rule="evenodd"  d="M4.75 3C3.7835 3 3 3.7835 3 4.75C3 5.7165 3.7835 6.5 4.75 6.5C5.7165 6.5 6.5 5.7165 6.5 4.75C6.5 3.7835 5.7165 3 4.75 3ZM1.5 4.75C1.5 2.95507 2.95507 1.5 4.75 1.5C6.54493 1.5 8 2.95507 8 4.75C8 6.54493 6.54493 8 4.75 8C2.95507 8 1.5 6.54493 1.5 4.75Z" />
  <path fill-rule="evenodd"  d="M15.25 9.5C14.2835 9.5 13.5 10.2835 13.5 11.25C13.5 12.2165 14.2835 13 15.25 13C16.2165 13 17 12.2165 17 11.25C17 10.2835 16.2165 9.5 15.25 9.5ZM12 11.25C12 9.4551 13.4551 8 15.25 8C17.0449 8 18.5 9.4551 18.5 11.25C18.5 13.0449 17.0449 14.5 15.25 14.5C13.4551 14.5 12 13.0449 12 11.25Z" />
  <path fill-rule="evenodd"  d="M4.75 7.25C5.16421 7.25 5.5 7.67416 5.5 8.19737V18.3026C5.5 18.8258 5.16421 19.25 4.75 19.25C4.33579 19.25 4 18.8258 4 18.3026V8.19737C4 7.67416 4.33579 7.25 4.75 7.25Z" />
  <path fill-rule="evenodd"  d="M13.5 11.75C13.5 12.1642 13.1642 12.5 12.75 12.5L4.75 12.5C4.3358 12.5 4 12.1642 4 11.75C4 11.3358 4.3358 11 4.75 11L12.75 11C13.1642 11 13.5 11.3358 13.5 11.75Z" />
  <path fill-rule="evenodd"  d="M13.5 18.75C13.5 19.1642 13.1642 19.5 12.75 19.5L4.75 19.5C4.3358 19.5 4 19.1642 4 18.75C4 18.3358 4.3358 18 4.75 18L12.75 18C13.1642 18 13.5 18.3358 13.5 18.75Z"/>
  <path fill-rule="evenodd"  d="M15.25 16.5C14.2835 16.5 13.5 17.2835 13.5 18.25C13.5 19.2165 14.2835 20 15.25 20C16.2165 20 17 19.2165 17 18.25C17 17.2835 16.2165 16.5 15.25 16.5ZM12 18.25C12 16.4551 13.4551 15 15.25 15C17.0449 15 18.5 16.4551 18.5 18.25C18.5 20.0449 17.0449 21.5 15.25 21.5C13.4551 21.5 12 20.0449 12 18.25Z" />
  </svg>

    <span data-content="Insights">Tree</span>
    <span title="Not available" data-view-component="true" class="Counter"></span>

    
</span></li>
  `;

  ns.insertAdjacentHTML("beforeend", html);

  const span = ns.querySelector("#tree-tab");

  const box = document.querySelector(".Box.mb-3");
  const boxPrev = box.innerHTML;

  const pregressContainer = document.querySelector(".Progress");
  const pregressBar = pregressContainer.querySelector(".Progress-item");

  let treeEnabled = false;
  span.addEventListener("click", async () => {
    if (treeEnabled) {
      if (boxPrev) {
        span.classList.remove("selected");
        box.style.opacity = 0;

        setTimeout(() => {
          box.innerHTML = boxPrev;
          treeEnabled = false;
          box.style.opacity = 1;
        }, 200);
      }
    } else {
      try {
        box.style.opacity = 0;
        pregressBar.style.width = "0%";
        pregressContainer.style.opacity = 1;

        const name = getName();
        const treeObj = await getTree(name, pregressBar);
        const tree = createTree(treeObj);

        span.classList.add("selected");

        const header = box.querySelector(".Box-header");

        setTimeout(() => {
          const boxReplacement = `
        <div class="hubtree-main">
            <h1 class="d-flex flex-wrap flex-items-center break-word f3 text-normal">
            🌴 ${name}
            </h1>
            ${tree}
        </div>
        `;

          box.innerHTML = boxReplacement;
          box.prepend(header);
          box.style.opacity = 1;
          pregressBar.style.width = "0%";
          pregressContainer.style.opacity = "0";

          treeEnabled = true;
        }, 200);
      } catch (error) {
        console.error(error);
      }
    }
  });
})();
