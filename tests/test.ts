import parse from "../src/index";

it("parse link", () => {
  expect(parse("[[X]]")).toBe("[X](X)");
  expect(parse("[[ X ]]")).toBe("[X](X)");
});

it("parse link", () => {
  expect(parse("[[Obsidian file title]]")).toBe("[Obsidian file title](Obsidian file title)");
  expect(parse("[[ Obsidian file title  ]]")).toBe("[Obsidian file title](Obsidian file title)");
});

it("parse link", () => {
  expect(parse("[[http://www.domain.com/folder]]")).toBe(
    "[http://www.domain.com/folder](http://www.domain.com/folder)"
  );
  expect(parse("[[ http://www.domain.com/folder ]]")).toBe(
    "[http://www.domain.com/folder](http://www.domain.com/folder)"
  );
});

it("parse link", () => {
  expect(parse("[[https://www.domain.com | alternating title]]")).toBe("[alternating title](https://www.domain.com)");
  expect(parse("[[https://www.domain.com|alternating title]]")).toBe("[alternating title](https://www.domain.com)");
});

it("parse link", () => {
  expect(
    parse(`
    [[link]]
    lorem
    [[link|alt title]]
    `)
  ).toBe(`
    [link](link)
    lorem
    [alt title](link)
    `);
});

it("parse image", () => {
  expect(parse("![[file.png]]")).toBe("![file.png](file.png)");
  expect(parse("![[file.png ]]")).toBe("![file.png](file.png)");
});

it("parse image", () => {
  expect(parse("![[file.png]]")).toBe("![file.png](file.png)");
  expect(parse("![[file.png ]]")).toBe("![file.png](file.png)");
});

it("parse comments", () => {
  expect(parse("%%hello%%")).toBe("<!-- hello -->");
  expect(parse("%% hello %%")).toBe("<!--  hello  -->");
  expect(parse("%% %hello% %%")).toBe("<!--  %hello%  -->");
  expect(
    parse(`
  %% 
  some text
  %%
  `)
  ).toBe(`
  <!--  
  some text
   -->
  `);
});
