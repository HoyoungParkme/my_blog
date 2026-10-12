/**
 * 애플리케이션 루트
 *
 * 파일 경로: src/app/App.tsx
 * 목적: 라우팅과 공통 골격을 연결한다.
 * 주요 기능: 경로별 화면 매핑, 라우트 이동 시 스크롤 초기화
 * 주요 의존성: wouter
 */

import { Redirect, Route, Router as WouterRouter, Switch, useLocation } from "wouter";

import { PageShell } from "@/components/layout/PageShell";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import ProjectDetail from "@/pages/ProjectDetail";
import Projects from "@/pages/Projects";
import Resume from "@/pages/Resume";

function AppRoutes() {
  const [location] = useLocation();
  // GitHub Pages는 끝에 "/"가 붙은 주소(/projects/)를 404.html로 띄운다. 붙지 않은 주소로 바꿔 같은 화면을 보여준다
  if (location.length > 1 && location.endsWith("/")) {
    return <Redirect to={location.replace(/\/+$/, "")} replace />;
  }

  return (
    <Switch>
      <Route path="/" component={About} />
      {/* 예전 주소로 들어와도 첫 화면으로 보낸다 */}
      <Route path="/about">
        <Redirect to="/" replace />
      </Route>
      <Route path="/projects">
        <Projects group="work" />
      </Route>
      {/* 상세(:slug)보다 먼저 둬야 "contests"가 프로젝트 주소로 잡히지 않는다 */}
      <Route path="/projects/contests">
        <Projects group="contest" />
      </Route>
      <Route path="/projects/:slug" component={ProjectDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={PostDetail} />
      {/* 경력기술서 인쇄 원본. 개발 서버에서만 연다 — 배포 빌드에서는 이 줄과 화면 코드가 빠진다 */}
      {import.meta.env.DEV && <Route path="/resume" component={Resume} />}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter>
      <ScrollToTop />
      <PageShell>
        <AppRoutes />
      </PageShell>
    </WouterRouter>
  );
}
