type ParseOptions = {
    urlEncodeUri?: boolean;
    defaultLinkAsCaption?: boolean;
};
/**
 *
 * @param content
 * @param {object} options
 * @param {boolean} options.urlEncodeUri - encode links and image src
 * @param {boolean} options.defaultLinkAsCaption - when no caption is provided, use the link as the caption
 * @returns
 */
declare const parse: (content: string, options?: ParseOptions) => string;
export default parse;
//# sourceMappingURL=index.d.ts.map