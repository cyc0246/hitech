import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist", // 빌드 결과물을 dist 폴더에 저장
    emptyOutDir: true, // 기존 빌드 파일 삭제 후 새로 생성
  },
});