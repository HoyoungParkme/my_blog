/**
 * PDF 만들기
 *
 * 파일 경로: scripts/makePdfs.mjs
 * 목적: 경력기술서와 프로젝트 상세 화면을 A4 PDF로 인쇄해 public/pdf/에 둔다. 배포하면 그대로 올라간다.
 * 주요 기능:
 *   - 개발 서버(vite)를 잠깐 띄운다. 경력기술서 화면(/resume)은 개발 서버에서만 열리기 때문이다
 *   - 시스템 Chrome 헤드리스의 --print-to-pdf로 /resume과 /projects/<slug>를 인쇄한다
 *   - 끝나면 서버를 내린다. 지운 프로젝트의 PDF가 남지 않게 projects 폴더는 매번 비우고 다시 만든다
 * 주요 의존성: 시스템 Chrome (CHROME_PATH 환경변수, 없으면 /usr/bin/google-chrome)
 *
 * 사용법: 콘텐츠(src/content/*)를 고친 뒤 `npm run pdf` → 바뀐 public/pdf/를 함께 커밋한다.
 */

import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 5180;
const BASE = `http://localhost:${PORT}`;
const CHROME = process.env.CHROME_PATH ?? "/usr/bin/google-chrome";
const OUT_DIR = path.join(ROOT, "public/pdf");

/** projects.ts에서 slug 목록을 읽는다. 블록마다 들여쓰기 4칸의 `slug: "…"` 한 줄이 있다. */
function readProjectSlugs() {
  const source = fs.readFileSync(path.join(ROOT, "src/content/projects.ts"), "utf-8");
  return [...source.matchAll(/^ {4}slug: "([^"]+)"/gm)].map((match) => match[1]);
}

/** 개발 서버가 응답할 때까지 기다린다. */
async function waitForServer(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // 아직 뜨는 중
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`개발 서버가 ${timeoutMs / 1000}초 안에 뜨지 않았습니다: ${url}`);
}

/** 화면 하나를 PDF로 인쇄한다. 화면 그리기·글꼴 불러오기를 기다리도록 가상 시간을 넉넉히 준다. */
function printPdf(url, outFile) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=15000",
      `--print-to-pdf=${outFile}`,
      url,
    ],
    { stdio: "ignore" },
  );
  console.log(`  ${path.relative(ROOT, outFile)}`);
}

const server = spawn(
  process.execPath,
  [path.join(ROOT, "node_modules/vite/bin/vite.js"), "--port", String(PORT), "--strictPort"],
  { cwd: ROOT, stdio: "ignore" },
);

try {
  await waitForServer(BASE, 30_000);
  console.log("PDF 인쇄:");
  printPdf(`${BASE}/resume`, path.join(OUT_DIR, "resume.pdf"));

  const projectDir = path.join(OUT_DIR, "projects");
  fs.rmSync(projectDir, { recursive: true, force: true });
  for (const slug of readProjectSlugs()) {
    printPdf(`${BASE}/projects/${slug}`, path.join(projectDir, `${slug}.pdf`));
  }
} finally {
  server.kill();
}
