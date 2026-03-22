import { reactive } from "vue";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && window.hljs && window.hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          window.hljs.highlight(str, { language: lang }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

const postsRaw = import.meta.glob("/src/contents/blog/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const state = reactive({
  allPosts: Object.keys(postsRaw).map((key) => {
    const rawString = postsRaw[key];
    const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
    const match = rawString.match(fmRegex);
    const id = key
      .replace("/src/contents/blog/", "")
      .replace(".md", "")
      .replace(/^\/+|\/+$/g, "")
      .trim();

    const pathParts = id.split("/").filter(Boolean);

    const fileName = pathParts[pathParts.length - 1] || "제목없음";
    const child = pathParts.length > 1 ? pathParts[pathParts.length - 2] : "";
    const parent =
      pathParts.length > 2
        ? pathParts[pathParts.length - 3]
        : pathParts[0] || "전체";

    let info = {
      id: id,
      title: fileName,
      date: "",
      description: "내용 요약이 없습니다...",
      thumbnail: "",
      parentCategory: parent,
      childCategory: child,
      content: rawString,
    };

    if (match) {
      info.content = rawString.replace(match[0], "").trim();
      match[1].split("\n").forEach((line) => {
        const [k, ...v] = line.split(":");
        if (!k || v.length === 0) return;
        const kn = k.trim();
        const val = v
          .join(":")
          .trim()
          .replace(/^["']|["']$/g, "");
        if (kn === "title") info.title = val;
        if (kn === "date") info.date = val;
        if (kn === "description") info.description = val;
        if (kn === "thumbnail") info.thumbnail = val;
      });
    }
    return info;
  }),
});

export function usePostManager() {
  const allPosts = state.allPosts;
  const renderMarkdown = (content) => md.render(content || "");
  return { allPosts, renderMarkdown };
}
