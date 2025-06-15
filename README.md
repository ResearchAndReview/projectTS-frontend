## Getting Started

### 1. Clone Repository & Install Dependencies

```bash
git clone
npm install
```

### 2. Set Environment

```
src/lib/utils/system.ts
```

### 3. Build Extension

```bash
npm run build
```

빌드 결과물은 `dist` 디렉토리에 생성되며, Chrome 확장 프로그램으로 로드할 수 있습니다.

## 프로젝트 구조

### background

- 크롬 확장 프로그램의 **백그라운드 스크립트**로, 전체 태스크 관리 및 백엔드 통신, 그리드 작업 분배 등을 담당합니다.

### content

- 웹 페이지에 삽입되어 **사용자 인터페이스와 상호작용**하며, 이미지 캡처 및 floating caption 표시 등 시각적 기능을 수행합니다.

### popup

- 확장 프로그램의 **팝업 UI**로, 태스크 상태 확인, 설정, 진행 중인 작업 모니터링 등을 제공합니다.
