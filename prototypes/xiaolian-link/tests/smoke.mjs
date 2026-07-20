import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(here, "../index.html"), "utf8");

assert.match(html, /<!doctype html>/i, "缺少 HTML doctype");
assert.match(html, /高保真交互原型 v0\.6/, "版本不是 v0.6");
assert.match(html, /<style>[\s\S]*<\/style>/, "缺少内联样式");

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.ok(scripts.length > 0, "缺少内联 JavaScript");
for (const [, source] of scripts) new Function(source);

for (const role of ["publisher", "viewer", "federation", "admin"]) {
  assert.ok(html.includes(`data-role="${role}"`), `缺少角色：${role}`);
}

for (const page of ["home", "list", "types", "form", "detail", "manage"]) {
  assert.ok(html.includes(`${page}:`), `缺少页面状态：${page}`);
}

for (const type of [
  "official_account_articles",
  "mini_program_link",
  "external_web",
  "basic_info",
]) {
  assert.ok(html.includes(`value: "${type}"`), `缺少发布方式：${type}`);
}

for (const sample of [
  "oa_collection",
  "oa_single",
  "mini_program_link",
  "external_web",
  "basic_info",
]) {
  assert.ok(html.includes(`displayId: "${sample}"`), `缺少展示样例：${sample}`);
}

const categoryMatch = html.match(/const categories = \[([\s\S]*?)\];/);
assert.ok(categoryMatch, "缺少分类字典");
const categoryCount = [...categoryMatch[1].matchAll(/"[^\"]+"/g)].length;
assert.equal(categoryCount, 20, "分类字典必须为20项");

const articleMatch = html.match(/const articleSamples = \[([\s\S]*?)\];/);
assert.ok(articleMatch, "缺少公众号文章 Mock");
const articleCount = [...articleMatch[1].matchAll(/title:/g)].length;
assert.equal(articleCount, 12, "公众号文章 Mock 必须为12篇");

for (const fn of [
  "startAuthorization",
  "scanAuthorization",
  "parseArticles",
  "validateMiniLink",
  "parseWeb",
  "voiceInput",
  "selectPromoImage",
  "addResultAttachment",
  "saveProject",
]) {
  assert.ok(html.includes(`function ${fn}(`), `缺少交互函数：${fn}`);
}

assert.ok(html.includes("未上架可编辑、上架、删除"), "缺少未上架状态规则");
assert.ok(html.includes("已上架只允许下架"), "缺少已上架状态规则");

console.log("✓ 小联帮你链 v0.6 基础检查通过");
