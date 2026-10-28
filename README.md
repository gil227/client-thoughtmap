# Thoughtmap Client

> 머릿속 생각을 노드와 연결선으로 시각화하는 사고 지도 도구

노션처럼 위→아래 계층 구조로 정보를 저장하는 방식 대신, 생각과 생각 사이의 **관계와 흐름**을 캔버스 위에 자유롭게 그릴 수 있습니다.

---

## 주요 기능

- 무한 캔버스 위에서 노드 생성 / 이동 / 연결
- 베지어 곡선 기반 엣지로 관계와 흐름 표현
- 드래그 셀렉션 + 멀티 선택 + 그룹 이동
- Undo / Redo (Command 패턴 기반)
- 자동 저장 (debounce 기반 서버 동기화)
- JWT 기반 로그인 / 회원가입 (httpOnly 쿠키 방식)

---

## 기술 스택

| 항목 | 기술 |
|------|------|
| 언어 | TypeScript |
| 번들러 | Vite |
| UI | React |
| 렌더링 | Canvas API (순수 구현) |
| 전역 상태 | Jotai |
| 서버 상태 | TanStack Query |
| 패키지 매니저 | PNPM |
| 배포 | Vercel |

---

## 아키텍처 결정


### httpOnly 쿠키 기반 인증
Access Token과 Refresh Token을 httpOnly 쿠키로 관리

모든 API 호출은 `WithCredentialFetch` 유틸을 통해 처리되며, Access Token 만료(401) 시 자동으로 Refresh Token으로 재발급 후 원래 요청을 재시도

### Jotai + TanStack Query 역할 분리
- **Jotai**: 노드 상태, 뷰포트 상태, UI 상태를 원자 단위로 분리 관리
- **TanStack Query**: 서버 데이터 캐싱, 자동 저장 동기화, 로딩/에러 처리

---


---

## 환경변수

```env
VITE_API_URL=http://localhost:3000
```

---

## 프로젝트 구조

```
src/
├── canvas/          # Canvas 렌더링 엔진
│   ├── renderer/    # 렌더 루프, 뷰포트 culling
│   ├── hitTest/     # 히트 테스트
│   └── edges/       # 베지어 곡선 엣지
├── commands/        # Command 패턴 (Undo/Redo)
├── store/           # Jotai 상태 슬라이스
├── hooks/           # TanStack Query 훅
├── components/      # React UI 컴포넌트
├── utils/           # 공통 유틸 (WithCredentialFetch 등)
└── types/           # 공유 타입 정의
```

---