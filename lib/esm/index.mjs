const parse = (content, urlEncodeUri = false) => {
    /*
    replace links
    */
    let regex = /(?:\[\[)([^\]^\|]+)(?:\|([^\]]+))?(?:\]\])/g;
    let match;
    while ((match = regex.exec(content))) {
        let link = match[1];
        const name = match[2] || link;
        if (urlEncodeUri)
            link = encodeURIComponent(link.trim());
        content = content.replace(match[0], `[${name.trim()}](${link.trim()})`);
    }
    /*
          replace images
       */
    regex = /(?:!\[\[)([^\]^\|]+)(?:\|([^\]]+))?(?:\]\])/g;
    while ((match = regex.exec(content))) {
        let link = match[1];
        const name = match[2] || link;
        if (urlEncodeUri)
            link = encodeURIComponent(link.trim());
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
    /**
     * replace callouts
     * being rendered somewhat similar to html version on the obsidian website
     * https://help.obsidian.md/Editing+and+formatting/Callouts
     */
    regex =
        /(?:> \[!)(\w+)(?:\] ?)([^\n]*)(?:\n> )([\s\S]+?)(?=\n(?:> \[!|\n|$))/g;
    while ((match = regex.exec(content))) {
        const type = match[1].toLowerCase();
        const title = match[2] || "";
        const body = match[3].replace(/(?:> )/g, "").trim(); // Remove leading "> " from body lines
        const calloutHtml = `
<div class="callout" data-callout="${type}">
  <div class="callout-title">${title}</div>
  <div class="callout-content">${body}</div>
</div>`.trim();
        content = content.replace(match[0], calloutHtml);
    }
    return content;
};
export default parse;
