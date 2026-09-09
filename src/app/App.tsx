/**
 * 애플리케이션 루트
 *
 * 파일 경로: src/app/App.tsx
 * 목적: 라우팅과 공통 골격을 연결한다.
 * 주요 기능: 경로별 화면 매핑, GitHub Pages base path 처리, 라우트 이동 시 스크롤 초기화
 * 주요 의존성: wouter
 */

import { Route, Router as WouterRouter, Switch } from "wouter";

import { PageShell } from "@/components/layout/PageShell";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import Blog from "@/pages/Blog";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import ProjectDetail from "@/pages/ProjectDetail";
import Projects from "@/pages/Projects";
import TagPage from "@/pages/TagPage";

/**
 * 라우터 base를 Vite의 BASE_URL에서 가져온다.
 * 커스텀 도메인을 쓰는 지금은 항상 `/`라 base가 없지만, 하위 경로 배포로
 * 되돌리더라도 vite.config.ts의 base만 바꾸면 라우팅이 따라오도록 남겨둔다.
 * wouter의 base는 끝 슬래시가 없어야 해서 잘라낸다.
 */
function getBasePath(): string | undefined {
  const base = import.meta.env.BASE_URL;
  return base === "/" ? undefined : base.replace(/\/$/, "");
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={PostDetail} />
      <Route path="/tags/:tag" component={TagPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={getBasePath()}>
      <ScrollToTop />
      <PageShell>
        <AppRoutes />
      </PageShell>
    </WouterRouter>
  );
}
