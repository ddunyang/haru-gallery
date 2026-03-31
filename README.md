## 주요 기능

- **프로필 카드** — 하루의 생일, 나이(년·월·일 및 생후 일수)를 실시간으로 표시합니다.
- **포토 갤러리** — Notion에 업로드된 사진을 빌드 시 자동으로 가져와 갤러리로 보여 줍니다.
- **진료 기록** — Notion에 기록된 병원 방문 이력(날짜 + 제목)을 최신순으로 나열합니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | [React 19](https://react.dev/) |
| 언어 | TypeScript |
| 빌드 도구 | [Vite](https://vite.dev/) |
| 데이터 소스 | [Notion API](https://developers.notion.com/) (`@notionhq/client`) |
| 배포 | GitHub Pages (`JamesIves/github-pages-deploy-action`) |

## 데이터 흐름

사진과 진료 기록은 **빌드 타임**에 Notion에서 가져옵니다.

```
Notion DB (사진)       ──┐
                          ├─▶ scripts/fetchNotionData.mjs ──▶ src/data/mediaData.ts ──▶ Vite 빌드
Notion DB (진료 기록)  ──┘                                     public/haru/photos/
```

1. `scripts/fetchNotionData.mjs` 가 Notion API를 호출해 두 개의 데이터베이스를 조회합니다.
   - **사진 DB** — 각 페이지의 이미지 블록을 다운로드해 `public/haru/photos/` 에 저장합니다.
   - **진료 기록 DB** — 날짜·제목 속성을 추출합니다.
2. 수집한 데이터를 `src/data/mediaData.ts` 로 내보냅니다.
3. Vite가 해당 파일을 포함해 정적 사이트를 빌드합니다.

## 자동 배포

GitHub Actions 워크플로우(`deploy.yml`)가 아래 조건에서 자동으로 빌드·배포를 실행합니다.

- `main` 브랜치 푸시
- **30분 간격** 정기 실행 (Notion의 최신 데이터 반영)
- 수동 트리거 (`workflow_dispatch`)

빌드 실패 또는 경고가 발생하면 리포지토리에 GitHub Issue가 자동으로 생성됩니다.

## 로컬 실행

```bash
# 의존성 설치
npm install

# Notion 토큰 설정 후 개발 서버 실행
NOTION_TOKEN=<your_token> npm run build   # 데이터 fetch + 빌드
npm run dev                               # 개발 서버 (http://localhost:5173)
```

> `NOTION_TOKEN` 환경 변수에 Notion Internal Integration Secret을 설정해야 합니다.
