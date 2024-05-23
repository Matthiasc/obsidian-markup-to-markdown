import parse from "./index";

it("parse link", () => {
  expect(parse("[[X]]")).toBe("[X](X)");
  expect(parse("[[ X ]]")).toBe("[X](X)");
});

it("parse link", () => {
  expect(parse("[[Obsidian file title]]")).toBe(
    "[Obsidian file title](Obsidian file title)"
  );
  expect(parse("[[ Obsidian file title  ]]")).toBe(
    "[Obsidian file title](Obsidian file title)"
  );
});

it("parse link with encoding", () => {
  expect(parse("[[Obsidian file title]]", true)).toBe(
    "[Obsidian file title](Obsidian%20file%20title)"
  );
  expect(parse("[[ Obsidian file title  ]]", true)).toBe(
    "[Obsidian file title](Obsidian%20file%20title)"
  );
});

it("parse link", () => {
  expect(parse("[[http://www.domain.com/folder]]")).toBe(
    "[http://www.domain.com/folder](http://www.domain.com/folder)"
  );
  expect(parse("[[ http://www.domain.com/folder ]]")).toBe(
    "[http://www.domain.com/folder](http://www.domain.com/folder)"
  );
});

it("parse link with alternative text", () => {
  expect(parse("[[https://www.domain.com | alternating title]]")).toBe(
    "[alternating title](https://www.domain.com)"
  );
  expect(parse("[[https://www.domain.com|alternating title]]")).toBe(
    "[alternating title](https://www.domain.com)"
  );
});

it("parse link with alternative text and encoding", () => {
  expect(parse("[[link to file|alternative text]]", true)).toBe(
    "[alternative text](link%20to%20file)"
  );
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

it("parse image with encoding", () => {
  expect(parse("![[file 02.png]]", true)).toBe("![file 02.png](file%2002.png)");
  expect(parse("![[my cat is cool.png ]]", true)).toBe(
    "![my cat is cool.png](my%20cat%20is%20cool.png)"
  );
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

it("parse highlite", () => {
  expect(parse("==hello==")).toBe("<mark>hello</mark>");
  expect(parse("== hello ==")).toBe("<mark> hello </mark>");
  expect(
    parse(`
  ==
  some text
  ==
  `)
  ).toBe(`
  <mark>
  some text
  </mark>
  `);
});
