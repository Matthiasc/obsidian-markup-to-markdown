const parse = (content) => {
    /*
          replace links
      */
    let regex = /(?:\[\[)([^\]^\|]+)(?:\|([^\]]+))?(?:\]\])/g;
    let match;
    while ((match = regex.exec(content))) {
        const link = match[1];
        const name = match[2] || link;
        content = content.replace(match[0], `[${name.trim()}](${link.trim()})`);
    }
    /*
          replace images
       */
    regex = /(?:!\[\[)([^\]^\|]+)(?:\|([^\]]+))?(?:\]\])/g;
    while ((match = regex.exec(content))) {
        const link = match[1];
        const name = match[2] || link;
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
export default parse;
