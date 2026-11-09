/**
 * 전달용 이력서에만 쓰는 개인정보
 *
 * 파일 경로: src/content/privateProfile.ts
 * 목적: 전화·주소·생년월일 같은 개인정보를 저장소 밖 파일(private/cv-private.json)에서 읽는다.
 * 주요 기능: 개발 서버에서 그 파일을 받아 오는 훅. 파일이 없으면 undefined를 준다
 * 주요 의존성: private/cv-private.json (git 제외, 본인 컴퓨터에만 있음)
 *
 * 저장소가 공개라 개인정보를 코드에 쓰면 누구나 볼 수 있다. 그래서 git에서 뺀 파일에 둔다.
 * import로 가져오면 빌드 결과(JS)에 값이 섞여 들어가므로, 개발 서버에서 fetch로만 읽는다.
 * 이력서 화면은 개발 서버 전용이라 배포 사이트에는 이 요청 자체가 없다.
 * 파일 형식은 private/cv-private.example.json을 참고한다.
 */

import { useEffect, useState } from "react";

import type { HistoryEntry } from "./profile";

export interface PrivateProfile {
  phone: string;
  /** 예: "1997.07.26" */
  birth: string;
  address: string;
  highSchool: HistoryEntry;
  /** 예: "3.39 / 4.5" */
  gpa: string;
}

/** 개발 서버가 프로젝트 루트의 파일을 그대로 내주는 주소 */
const PRIVATE_PROFILE_URL = "/private/cv-private.json";

/**
 * 개인정보 파일을 읽는다.
 *
 * Args:
 *   enabled: false면 요청하지 않는다(공개용 이력서).
 * Returns:
 *   파일 내용. 아직 읽는 중이거나 파일이 없으면 undefined.
 *   파일이 없으면 개발 서버가 index.html을 주므로, JSON 응답일 때만 쓴다.
 */
export function usePrivateProfile(enabled: boolean): PrivateProfile | undefined {
  const [data, setData] = useState<PrivateProfile>();

  useEffect(() => {
    if (!enabled) return;
    fetch(PRIVATE_PROFILE_URL).then(async (response) => {
      if (response.headers.get("content-type")?.includes("json")) {
        setData(await response.json());
      }
    });
  }, [enabled]);

  return data;
}
