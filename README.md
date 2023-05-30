# 📄 커마디
### 커마디는 마크다운을 이용해 글을 작성할 수 있으며 작성한 글을 판매 가능한 사이트입니다.

마크다운을 이용해 쉽게 글을 작성하여 공유할 수 있는 블로그 기능을 보유하고 있습니다.<br/>
또한 무료 포스트와 작성한 글을 시리즈 단위로 묶어서 판매할 수 있는 유료 포스트로 나누어져 있어<br/>
사용자가 자신의 지식을 공유하고 판매에 대한 이익을 얻을 수 있으며 다양한 지식 정보에 쉽게 접근할 수 있는 블로깅 사이트입니다.

<br/>
<br/>

# 🛠 기술 스택
<p align="center">
<img alt= "icon" wide="65" height="65" src ="https://docs.nestjs.com/assets/logo-small.svg">
<img alt= "icon" wide="80" height="80" src ="https://techstack-generator.vercel.app/ts-icon.svg">
<img alt= "icon" wide="65" height="65" src ="https://techstack-generator.vercel.app/graphql-icon.svg">
<img alt= "icon" wide="65" height="65" src ="https://techstack-generator.vercel.app/mysql-icon.svg">
<img alt= "icon" wide="65" height="65" src ="https://techstack-generator.vercel.app/restapi-icon.svg">
<img alt= "icon" wide="65" height="65" src ="https://techstack-generator.vercel.app/docker-icon.svg">
<img alt= "icon" wide="65" height="65" src ="https://codelabs.developers.google.com/static/codelabs/cloud-compute-engine/img/5bcdca7120f6201a.png?hl=ko">
</p>

<br/>
<br/>

# 👩🏻‍💻 기능 구현
- ### 공통 구현
  - Database
    - 정규화를 기반으로 한 ERD 모델링
    - typeORM을 이용하여 스키마 구현
 
  - custom exception filter 구현

- ### 결제 & 결제 상세 내역 API
  - 결제 & 결제 상세 내역 CRUD 구현 
  - PortOne 관련 검증 로직 구현
  - 추상클래스를 이용한 transaction 구현

- ### 장바구니 API
  -  redis를 이용한 장바구니 로직 구현

- ### 시리즈 / 리뷰 / 좋아요 API
  - CRUD 구현
  - querybuilder를 이용한 API 구현


<br/>
<br/>

# 🔎 DB ERD
<img wide="100%"  src ="[https://storage.cloud.google.com/mcb2_bucket/mcb_ERD.png](https://storage.googleapis.com/mcb2_bucket/mcb_ERD.png)">

<br/>
<br/>

# 🔗 시스템 아키텍쳐
<img wide="100%"  src ="[https://storage.cloud.google.com/mcb2_bucket/mcb_ERD.png](https://storage.googleapis.com/mcb2_bucket/%E1%84%89%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%A6%E1%86%B7%20%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%B5%E1%84%90%E1%85%A6%E1%86%A8%E1%84%8E%E1%85%A7.001.jpeg)">

<br/>
<br/>

# 📝 API 명세서
<img wide="100%"  src="">
<img wide="100%" src="">
<img wide="100%" src="">


<br/>
<br/>


# ⚙️ .env 설정

```
DATABASE_TYPE
DATABASE_HOST
DATABASE_PORT
DATABASE_USERNAME
DATABASE_PASSWORD
DATABASE_DATABASE


JWT_ACCESS_KEY
JWT_REFRESH_KEY


PORTONE_KEY
PORTONE_SECRET

AWS_ACCESS_KEY
AWS_SECRET_KEY


# google oauth
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# kakao oauth
KAKAO_CLIENT_ID
KAKAO_CLIENT_SECRET

```



