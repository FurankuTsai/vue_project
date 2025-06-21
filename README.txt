1. 用 Docker 建 Vue 專案（本機不用安裝 npm）

如果還沒產生 Vue 專案，請先執行以下指令：
docker run -it --rm -v ${PWD}:/app -w /app node:18 npx @vue/cli create my-vue-app

然後切換進來目錄：
cd my-vue-app

接著啟動：
docker-compose up --build

瀏覽器打開 http://localhost:8080 即可看到 Vue 專案畫面。
