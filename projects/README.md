# 프로젝트 작성 가이드

`public/projects/` 폴더에 마크다운 파일로 프로젝트를 작성하세요!

## 프로젝트 파일 추가하기

1. `public/projects/` 폴더에 새로운 `.md` 파일 생성
2. 파일 이름은 프로젝트 ID로 사용됩니다 (예: `my-project.md`)
3. `src/utils/projectLoader.js` 파일의 `projectFiles` 배열에 파일 이름 추가

## 마크다운 파일 형식

각 프로젝트 파일은 다음과 같은 구조를 가집니다:

````markdown
---
id: project-id
title: 프로젝트 제목
type: 실무 # 또는 "개인"
period: 2025.01.01 ~ 2025.01.31
description: 짧은 프로젝트 설명
stack:
  - React
  - Node.js
  - MongoDB
link: https://example.com # 선택사항
---

## 프로젝트 개요

여기에 프로젝트에 대한 상세 설명을 작성합니다.

## 주요 기능

- 기능 1
- 기능 2
- 기능 3

## 사용한 기술

**React**와 `Node.js`를 사용했습니다.

> 💡 이 프로젝트의 주요 인사이트나 배운 점을 여기에 작성하세요.

## 코드 예시

```javascript
function example() {
  console.log("Hello, World!");
}
```
````

---

구분선도 사용할 수 있습니다.

````

## 지원하는 마크다운 문법

- **헤딩**: `#`, `##`, `###`
- **굵게**: `**텍스트**`
- **기울임**: `*텍스트*`
- **인라인 코드**: `` `코드` ``
- **코드 블록**: ` ``` 언어 ``` `
- **리스트**: `- 항목` 또는 `1. 항목`
- **인용구**: `> 텍스트`
- **구분선**: `---`

## 프로젝트 추가/삭제 방법

### 프로젝트 추가
1. `public/projects/` 폴더에 새 `.md` 파일 생성
2. `src/utils/projectLoader.js`의 `projectFiles` 배열에 파일 이름 추가:
   ```javascript
   export const projectFiles = {
     실무: [
       "hyundai-glovis.md",
       "새-프로젝트.md",  // 여기에 추가
     ],
     개인: [
       "stock-analysis.md",
     ],
   };
````

### 프로젝트 삭제

1. `public/projects/` 폴더에서 `.md` 파일 삭제
2. `src/utils/projectLoader.js`의 `projectFiles` 배열에서 파일 이름 제거

이제 마크다운 파일만 작성하면 프로젝트가 자동으로 표시됩니다! 🎉
