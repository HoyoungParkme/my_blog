// 프로젝트 마크다운 파일을 동적으로 로드하는 유틸리티
// 개발 환경에서는 동적 임포트를, 프로덕션에서는 정적 파일을 사용

// 프로젝트 목록을 정의 (마크다운 파일 이름들)
export const projectFiles = {
  실무: [
    "hyundai-glovis/index.md",
    "hyundai-glovis-tableau-ai/index.md",
    "samsung-fabric-chatbot/index.md",
    "hyundai-mobis-cobol-java/index.md",
  ],
  연구: [
    "rag-video-anomaly/index.md",
  ],
};

// 프로젝트 파일 로드
export async function loadProject(fileName) {
  try {
    const basePath = process.env.PUBLIC_URL || "";
    const url = `${basePath}/projects/${fileName}`;
    console.log(`Attempting to load: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(
        `Failed to load project ${fileName}: ${response.status} ${response.statusText}`
      );
      return null;
    }
    const content = await response.text();
    console.log(
      `✓ Successfully fetched: ${fileName} (${content.length} bytes)`
    );
    return content;
  } catch (error) {
    console.error(`Error loading project ${fileName}:`, error);
    return null;
  }
}

// 모든 프로젝트 로드
export async function loadAllProjects() {
  const allProjects = { 실무: [], 연구: [] };

  console.log("Loading projects from files:", projectFiles);

  // 실무 프로젝트 로드
  for (const file of projectFiles.실무) {
    console.log(`Loading 실무 project: ${file}`);
    const content = await loadProject(file);
    if (content) {
      console.log(`✓ Successfully loaded: ${file}`);
      allProjects.실무.push({ fileName: file, content });
    } else {
      console.warn(`✗ Failed to load: ${file}`);
    }
  }

  // 연구 프로젝트 로드
  for (const file of projectFiles.연구) {
    console.log(`Loading 연구 project: ${file}`);
    const content = await loadProject(file);
    if (content) {
      console.log(`✓ Successfully loaded: ${file}`);
      allProjects.연구.push({ fileName: file, content });
    } else {
      console.warn(`✗ Failed to load: ${file}`);
    }
  }

  console.log("Final loaded projects:", {
    실무: allProjects.실무.length,
    연구: allProjects.연구.length,
  });

  return allProjects;
}
