/**
 * 라우트별 HTML 생성 플러그인
 *
 * 파일 경로: scripts/routeHtmlPlugin.ts
 * 목적: GitHub Pages에는 모든 주소를 index.html로 돌리는 설정(rewrite)이 없다.
 *       빌드가 끝나면 주소마다 HTML 파일을 만들어 /projects 같은 딥링크가 404가 아니라 200으로 응답하게 하고,
 *       페이지별 제목·설명·OG 태그를 넣어 검색엔진과 링크 미리보기(카카오톡·슬랙)가 읽을 수 있게 한다.
 * 주요 기능:
 *   - index.html의 route-meta 표시 사이에 첫 화면 메타를 채운다 (개발 서버·빌드 공통)
 *   - 빌드 후 주소마다 `<경로>.html`을 만든다. GitHub Pages는 `/projects` 요청에 `projects.html`을 200으로 준다.
 *   - 없는 주소용 404.html(검색 제외)을 만든다. SPA가 이 파일로 떠서 NotFound 화면을 보여준다.
 *   - 검색엔진용 sitemap.xml(검색 제외·중복 주소 빼고)과 robots.txt를 만든다.
 * 주요 의존성: vite, src/content/projects.ts, src/content/postParser.ts, src/content/siteMeta.ts
 */

import fs from "node:fs";
import path from "node:path";

import type { Plugin } from "vite";

import { toPost } from "../src/content/postParser";
import { projects } from "../src/content/projects";
import {
  BLOG_DESCRIPTION,
  DEFAULT_DESCRIPTION,
  NOT_FOUND_NAME,
  OG_IMAGE,
  PROJECTS_DESCRIPTION,
  CONTESTS_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  pageTitle,
} from "../src/content/siteMeta";

interface RouteMeta {
  /** 주소 경로. 예: `/projects/graphrag-bi-agent` */
  path: string;
  title: string;
  description: string;
  /** 상세 페이지는 article, 나머지는 website */
  type: "website" | "article";
  /** 대표 주소가 다를 때만 지정한다. `/about`은 첫 화면(`/`)으로 합쳐졌다. */
  canonicalPath?: string;
  /** 검색 결과에서 뺄 페이지(404) */
  noindex?: boolean;
}

/** index.html에서 페이지별로 바꿔 끼우는 구간 */
const META_BLOCK = /<!-- route-meta:start -->[\s\S]*?<!-- route-meta:end -->/;

const HOME: RouteMeta = {
  path: "/",
  title: pageTitle(),
  description: DEFAULT_DESCRIPTION,
  type: "website",
};

/**
 * 사이트의 모든 주소와 메타를 만든다. 프로젝트는 projects.ts, 글은 마크다운 파일에서 읽는다.
 *
 * Args:
 *   root: 프로젝트 루트 경로
 * Returns:
 *   첫 화면을 포함한 전체 주소 목록
 */
function collectRoutes(root: string): RouteMeta[] {
  const postDir = path.join(root, "src/content/posts");
  const posts = fs
    .readdirSync(postDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => toPost(file, fs.readFileSync(path.join(postDir, file), "utf-8")));

  return [
    HOME,
    { ...HOME, path: "/about", canonicalPath: "/" },
    {
      path: "/projects",
      title: pageTitle("Projects"),
      description: PROJECTS_DESCRIPTION,
      type: "website",
    },
    {
      path: "/projects/contests",
      title: pageTitle("대회"),
      description: CONTESTS_DESCRIPTION,
      type: "website",
    },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      title: pageTitle(project.title),
      description: project.summary,
      type: "article" as const,
    })),
    {
      path: "/blog",
      title: pageTitle("Troubleshooting"),
      description: BLOG_DESCRIPTION,
      type: "website",
    },
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      title: pageTitle(post.title),
      description: post.summary,
      type: "article" as const,
    })),
  ];
}

/** meta 태그 속성값에 넣기 위해 특수문자를 바꾼다. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** route-meta 표시 사이에 들어갈 태그 묶음을 만든다. 표시는 남겨 다음 치환에서도 찾을 수 있게 한다. */
function renderMetaBlock(meta: RouteMeta): string {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const url = `${SITE_URL}${meta.canonicalPath ?? meta.path}`;

  const tags = [`<title>${title}</title>`, `<meta name="description" content="${description}" />`];
  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex" />`);
  } else {
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="${meta.type}" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:locale" content="ko_KR" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${OG_IMAGE.url}" />`,
      `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
      `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
      `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE.alt)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
    );
  }
  return ["<!-- route-meta:start -->", ...tags, "<!-- route-meta:end -->"].join("\n    ");
}

/** HTML의 route-meta 구간을 주어진 페이지 메타로 바꾼다. */
function withMeta(html: string, meta: RouteMeta): string {
  if (!META_BLOCK.test(html)) {
    throw new Error("index.html에 route-meta 표시가 없습니다");
  }
  return html.replace(META_BLOCK, renderMetaBlock(meta));
}

/** 검색엔진에 알릴 주소 목록. 다른 주소로 합쳐진 것(/about)과 검색 제외 페이지는 뺀다. */
function renderSitemap(routes: RouteMeta[]): string {
  const urls = routes
    .filter((route) => !route.noindex && !route.canonicalPath)
    .map((route) => `  <url><loc>${SITE_URL}${route.path}</loc></url>`);
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    "",
  ].join("\n");
}

function writeHtml(file: string, html: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

/**
 * Vite 플러그인을 만든다.
 *
 * Returns:
 *   개발 서버에서는 첫 화면 메타만 채우고, 빌드 때는 라우트별 HTML과 404.html까지 만드는 플러그인
 * Side Effects:
 *   빌드가 끝나면 outDir에 HTML 파일을 쓴다.
 */
export function routeHtmlPlugin(): Plugin {
  let root = process.cwd();
  let outDir = path.resolve(root, "dist");
  let isBuild = false;

  return {
    name: "route-html",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },
    transformIndexHtml(html) {
      return withMeta(html, HOME);
    },
    closeBundle() {
      if (!isBuild) return;

      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");
      const routes = collectRoutes(root);
      for (const route of routes) {
        if (route.path === "/") continue;
        writeHtml(path.join(outDir, `${route.path}.html`), withMeta(template, route));
      }

      writeHtml(
        path.join(outDir, "404.html"),
        withMeta(template, {
          path: "/404",
          title: pageTitle(NOT_FOUND_NAME),
          description: DEFAULT_DESCRIPTION,
          type: "website",
          noindex: true,
        }),
      );

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), renderSitemap(routes));
      fs.writeFileSync(
        path.join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      );
    },
  };
}
