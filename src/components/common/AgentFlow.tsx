/**
 * 에이전트 실행 흐름
 *
 * 파일 경로: src/components/common/AgentFlow.tsx
 * 목적: 프로젝트 상세에서 에이전트가 질문 1건을 처리하는 단계를 순서대로 보여주고, 한 번 재생한다.
 * 주요 기능:
 *   - 단계 목록(번호 · 이름 · 설명 · 상태). 하위 단계는 상위 단계와 함께 진행된다
 *   - 섹션이 화면에 들어오면 한 번 재생(대기 → 진행 중 → 완료), "다시 재생" 버튼
 *   - 멈춰 있을 때는 모든 단계가 완료 상태. 움직임 줄이기 설정이면 재생하지 않는다
 * 주요 의존성: react, src/content/agentFlows.ts
 *
 * 재생 속도는 보여주기용이다. 실제 실행 시간을 뜻하지 않으므로 화면에 시간 값을 쓰지 않는다.
 */

import { useEffect, useRef, useState } from "react";

import type { AgentFlow as Flow, FlowStep } from "@/content/agentFlows";

/** 단계 하나가 "진행 중"으로 머무는 시간(ms). 보여주기용 */
const STEP_MS = 700;

type Status = "waiting" | "running" | "done";

const STATUS_LABEL: Record<Status, string> = {
  waiting: "대기",
  running: "진행 중",
  done: "완료",
};

/**
 * 실행 흐름 목록과 재생 컨트롤.
 *
 * Args:
 *   flow: 단계 목록과 설명 (src/content/agentFlows.ts)
 */
export function AgentFlow({ flow }: { flow: Flow }) {
  const reduceMotion = usePrefersReducedMotion();
  // 재생 중인 단계 번호. null이면 멈춘 상태(전부 완료)
  const [active, setActive] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const statusOf = (index: number): Status => {
    if (active === null || index < active) return "done";
    return index === active ? "running" : "waiting";
  };

  // 단계를 하나씩 넘기고, 마지막 단계가 끝나면 멈춘다
  useEffect(() => {
    if (active === null) return;
    const timer = window.setTimeout(
      () => setActive(active + 1 < flow.steps.length ? active + 1 : null),
      STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, flow.steps.length]);

  // 섹션이 화면에 절반 이상 들어오면 한 번 재생한다
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(0);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const running = active !== null ? flow.steps[active] : null;

  return (
    <div ref={rootRef} className="mb-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] leading-[1.6] text-ink-faint [text-wrap:pretty]">{flow.caption}</p>
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setActive(0)}
            disabled={active !== null}
            className="shrink-0 rounded border border-ink px-3 py-1.5 text-[13px] font-semibold leading-none text-ink hover:border-accent hover:text-accent disabled:border-rule disabled:text-ink-faint print:hidden"
          >
            {active !== null ? "재생 중" : "다시 재생"}
          </button>
        )}
      </div>

      {/* 화면 낭독기에 지금 진행 중인 단계를 알린다 */}
      <p className="sr-only" aria-live="polite">
        {running ? `${running.title} 진행 중` : ""}
      </p>

      <ol className="border-t border-ink">
        {flow.steps.map((step, index) => (
          <StepRow key={step.title} step={step} number={index + 1} status={statusOf(index)} />
        ))}
      </ol>
    </div>
  );
}

function StepRow({ step, number, status }: { step: FlowStep; number: number; status: Status }) {
  return (
    <li className="grid break-inside-avoid grid-cols-[28px_minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-rule py-3.5">
      <span className="text-sm tabular-nums text-ink-faint">{number}</span>
      <div className={status === "waiting" ? "opacity-40 transition-opacity duration-300" : "transition-opacity duration-300"}>
        <div className="font-semibold text-ink">{step.title}</div>
        <div className="text-ink-muted [text-wrap:pretty]">{step.detail}</div>
        {step.children && (
          <ul className="mt-2 flex flex-col gap-1.5 border-l-2 border-rule pl-4">
            {step.children.map((child) => (
              // 상태 점을 앞에 둬 좁은 화면에서도 글머리표처럼 줄 맨 앞에 붙는다
              <li key={child.title} className="flex items-baseline gap-2">
                <StatusMark status={status} />
                <span>
                  <span className="font-semibold text-ink">{child.title}</span>{" "}
                  <span className="text-ink-muted">{child.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <StatusMark status={status} withLabel />
    </li>
  );
}

/** 상태 표시: 점 모양(대기=빈 원, 진행 중=강조색 원, 완료=잉크 원) + 글자 */
function StatusMark({ status, withLabel = false }: { status: Status; withLabel?: boolean }) {
  const dot =
    status === "done"
      ? "border-ink bg-ink"
      : status === "running"
        ? "border-accent bg-accent motion-safe:animate-pulse"
        : "border-rule bg-transparent";
  const text = status === "running" ? "text-accent" : "text-ink-faint";
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] ${text}`}>
      <span aria-hidden className={`h-2 w-2 rounded-full border-2 transition-colors duration-300 ${dot}`} />
      {withLabel ? STATUS_LABEL[status] : <span className="sr-only">{STATUS_LABEL[status]}</span>}
    </span>
  );
}

/** 움직임 줄이기 설정 여부. 설정이 바뀌면 다시 계산한다. */
function usePrefersReducedMotion(): boolean {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduce, setReduce] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setReduce(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduce;
}
