// utils/convertContentToHTML.ts
import { convertFromRaw, RawDraftContentState } from "draft-js";
import { convertToHTML } from "draft-convert";

const convertContentToHTML = (rawContent: RawDraftContentState): string => {
  try {
    const contentState = convertFromRaw(rawContent);
    const html = convertToHTML({
      blockToHTML: (block) => {
        switch (block.type) {
          case "header-one":
            return { start: "<h1>", end: "</h1>" };
          case "header-two":
            return { start: "<h2>", end: "</h2>" };
          case "header-three":
            return { start: "<h3>", end: "</h3>" };
          case "header-four":
            return { start: "<h4>", end: "</h4>" };
          case "header-five":
            return { start: "<h5>", end: "</h5>" };
          case "header-six":
            return { start: "<h6>", end: "</h6>" };
          case "unstyled":
            return { start: "<p>", end: "</p>" };
          case "blockquote":
            return { start: "<blockquote>", end: "</blockquote>" };
          case "code-block":
            return { start: "<pre><code>", end: "</code></pre>" };
          case "unordered-list-item":
            return { start: "<li>", end: "</li>", nest: "<ul>" };
          case "ordered-list-item":
            return { start: "<li>", end: "</li>", nest: "<ol>" };
          case "atomic":
            return { start: "<div>", end: "</div>" };
          default:
            return { start: "<p>", end: "</p>" };
        }
      },
      styleToHTML: (style) => {
        switch (style) {
          case "BOLD":
            return { start: "<strong>", end: "</strong>" };
          case "ITALIC":
            return { start: "<em>", end: "</em>" };
          case "UNDERLINE":
            return { start: "<u>", end: "</u>" };
          case "STRIKETHROUGH":
            return { start: "<del>", end: "</del>" };
          case "SUPERSCRIPT":
            return { start: "<sup>", end: "</sup>" };
          case "SUBSCRIPT":
            return { start: "<sub>", end: "</sub>" };
          case "CODE":
            return { start: "<code>", end: "</code>" };
          case "HIGHLIGHT":
            return { start: "<mark>", end: "</mark>" };
          case "fontsize-96":
            return {
              start: '<span style="font-size:96px;">',
              end: "</span>",
            };
          case "fontsize-72":
            return {
              start: '<span style="font-size:72px;">',
              end: "</span>",
            };
          case "fontsize-48":
            return {
              start: '<span style="font-size:48px;">',
              end: "</span>",
            };
          case "fontsize-36":
            return {
              start: '<span style="font-size:36px;">',
              end: "</span>",
            };
          case "fontsize-30":
            return {
              start: '<span style="font-size:30px;">',
              end: "</span>",
            };
          case "fontsize-24":
            return {
              start: '<span style="font-size:24px;">',
              end: "</span>",
            };
          case "fontsize-20":
            return {
              start: '<span style="font-size:20px;">',
              end: "</span>",
            };
          case "fontsize-16":
            return {
              start: '<span style="font-size:16px;">',
              end: "</span>",
            };
          case "fontsize-14":
            return {
              start: '<span style="font-size:14px;">',
              end: "</span>",
            };
          case "fontsize-12":
            return {
              start: '<span style="font-size:12px;">',
              end: "</span>",
            };
          case "fontsize-8":
            return {
              start: '<span style="font-size:8px;">',
              end: "</span>",
            };
          case "fontfamily-Georgia":
            return {
              start: '<span style="font-family:Georgia;">',
              end: "</span>",
            };
          case "fontfamily-Impact":
            return {
              start: '<span style="font-family:Impact;">',
              end: "</span>",
            };
          case "fontfamily-Arial":
            return {
              start: '<span style="font-family:Arial;">',
              end: "</span>",
            };
          case "fontfamily-Times New Roman":
            return {
              start: '<span style="font-family:Times New Roman;">',
              end: "</span>",
            };
          case "fontfamily-Tahoma":
            return {
              start: '<span style="font-family:Tahoma;">',
              end: "</span>",
            };
          case "fontfamily-Courier New":
            return {
              start: '<span style="font-family:Courier New;">',
              end: "</span>",
            };
          case "fontcolor-red":
            return { start: '<span style="color:red;">', end: "</span>" };
          case "fontcolor-blue":
            return { start: '<span style="color:blue;">', end: "</span>" };
          case "fontcolor-green":
            return { start: '<span style="color:green;">', end: "</span>" };
          case "fontcolor-yellow":
            return {
              start: '<span style="color:yellow;">',
              end: "</span>",
            };
          case "fontcolor-black":
            return { start: '<span style="color:black;">', end: "</span>" };
          case "fontcolor-white":
            return { start: '<span style="color:white;">', end: "</span>" };
          case "textalign-left":
            return {
              start: '<div style="text-align:left;">',
              end: "</div>",
            };
          case "textalign-center":
            return {
              start: '<div style="text-align:center;">',
              end: "</div>",
            };
          case "textalign-right":
            return {
              start: '<div style="text-align:right;">',
              end: "</div>",
            };
          case "line-height-1":
            return {
              start: '<span style="line-height:1;">',
              end: "</span>",
            };
          case "line-height-1.5":
            return {
              start: '<span style="line-height:1.5;">',
              end: "</span>",
            };
          case "line-height-2":
            return {
              start: '<span style="line-height:2;">',
              end: "</span>",
            };
          default:
            return { start: "<span>", end: "</span>" };
        }
      },
      htmlToBlock: (nodeName, node) => {
        if (nodeName === "ul") {
          return {
            type: "unordered-list-item",
            depth: 0,
          };
        }
        if (nodeName === "ol") {
          return {
            type: "ordered-list-item",
            depth: 0,
          };
        }
        if (nodeName === "li") {
          return {
            type: "list-item",
            depth: 0,
          };
        }
      },
    })(contentState);

    return html;
  } catch (error) {
    console.error("Error converting raw content:", error);
    return "";
  }
};

export default convertContentToHTML;
