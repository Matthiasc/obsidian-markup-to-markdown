"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
const parse = (content, slugifyUri = false) => {
    /*
    replace links
    */
    let regex = /(?:\[\[)([^\]^\|]+)(?:\|([^\]]+))?(?:\]\])/g;
    let match;
    while ((match = regex.exec(content))) {
        console.log("!2", content);
        let link = match[1];
        const name = match[2] || link;
        if (slugifyUri)
            link = (0, slugify_1.default)(link);
        content = content.replace(match[0], `[${name.trim()}](${link.trim()})`);
    }
    /*
          replace images
       */
    regex = /(?:!\[\[)([^\]^\|]+)(?:\|([^\]]+))?(?:\]\])/g;
    while ((match = regex.exec(content))) {
        console.log("@@@@@@@");
        let link = match[1];
        const name = match[2] || link;
        // if (slugifyUri) link = slugify(link);
        console.log("link", link);
        content = content.replace(match[0], `![${name.trim()}](${link.trim()})`);
    }
    /*
          replace comments
      */
    regex = /(?:%%)([\s\S]+?)(?:%%)/g;
    while ((match = regex.exec(content))) {
        const inner = match[1];
        content = content.replace(match[0], `<!-- ${inner} -->`);
    }
    /*
          replace highlites
      */
    regex = /(?:==)([\s\S]+?)(?:==)/g;
    while ((match = regex.exec(content))) {
        const inner = match[1];
        content = content.replace(match[0], `<mark>${inner}</mark>`);
    }
    return content;
};
exports.default = parse;
