/**
 * 애플리케이션 루트
 *
 * 파일 경로: src/app/App.tsx
 * 목적: 라우팅과 공통 골격을 연결한다.
 * 주요 기능: 경로별 화면 매핑, 라우트 이동 시 스크롤 초기화
 * 주요 의존성: wouter
 */

import { Route, Router as WouterRouter, Switch } from "wouter";

import { PageShell } from "@/components/layout/PageShell";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import PostDetail from "@/pages/PostDetail";
import ProjectDetail from "@/pages/ProjectDetail";
import Projects from "@/pages/Projects";
import TagPage from "@/pages/TagPage";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
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
    <WouterRouter>
      <ScrollToTop />
      <PageShell>
        <AppRoutes />
      </PageShell>
    </WouterRouter>
  );
}
