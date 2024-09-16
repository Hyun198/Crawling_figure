# FigureCity Web Scraper

이 프로젝트는 FigureCity 웹 사이트에서 상품 정보를 스크랩하는 웹 스크래퍼입니다.

크롤링 목표 사이트 목록

1. 피규어몰 http://www.figuremall.co.kr/
2. 피규어시티 http://www.figurecity.co.kr/
3. 포이즌애플 https://poisonapple.co.kr/
4. 글로리먼데이 https://www.glorymonday.com/

## 시스템 아키텍쳐

![시스템 아키텍쳐](./relative/피규어%20크롤링.png)

## 실행 환경

- 이 프로젝트는 Node.js와 npm을 필요로 합니다. 시스템에 설치되어 있는지 확인하세요.

## 실행 방법

1. 저장소를 클론합니다:

   ```bash
   git clone https://github.com/your-username/figurecity-web-scraper.git
   ```

2. 프로젝트 폴더로 이동합니다:

   ```bash
   cd figurecity-web-scraper
   ```

3. 필요한 패키지를 설치합니다:
   클라이언트와 서버 모두 설치해야 합니다.
   클라이언트 설치시 터미널창에 `cd client` 로 이동
   client폴더에서도 동일하게 명령어 입력해 패키지 설치

   ```bash
   npm install
   ```

4. 스크래퍼를 실행합니다. 아래 명령어를 사용하고 키워드를 지정해주세요:

   ```bash
       npm start (server)
       npm run start(client)
   ```

5. 결과를 확인합니다. 스크래퍼가 실행된 후 웹 페이지에 상품 정보가 출력됩니다.

## 주의사항

- Puppeteer를 사용하여 웹 스크래핑을 수행하므로 인터넷 연결이 필요합니다.
- 이 스크래퍼는 FigureCity 웹 사이트의 구조에 의존하므로 사이트가 변경되면 정보를 불러오는데 오류가 있을 수 있습니다.
