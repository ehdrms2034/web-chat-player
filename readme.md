# Playground

웹 비디오 플레이어와 소켓을 이용한 "라이브 댓글" 비디오 플레이어

![screenshot 1](https://user-images.githubusercontent.com/26613280/82647489-3d1fce00-9c51-11ea-9cea-b196af720c8f.png)
![screenshot 2](https://user-images.githubusercontent.com/26613280/82647515-45780900-9c51-11ea-8046-2ec94291ac0f.png)

## 플로우

by [장정윤](https://github.com/Lai-khan)

![flowchart](https://user-images.githubusercontent.com/26613280/82665048-ef658e80-9c6d-11ea-9706-3e440e88cfbb.png)

## 컴포넌트 

- Video upload/streaming server
- Video metadata API server
- Proxy Server
- React with react-player
- Socket server
- MongoDB server

## 기술 스택

- Spring Boot
- NodeJS/Express
- MongoDB
- React
- SocketIO
- Nginx

## 명세

### 백엔드 DB 댓글 서버

서버 host : 49.50.173.151 (곧 폐쇄 예정)

port : 3000

Node + mongoDB 로 구성

### 동영상 스트리밍 서버

서버 host : 49.50.162.195 (곧 폐쇄 예정)

port : 8080

Spring Boot로 구성, FFmpeg으로 변환

### API 명세

현재 프록시에 연결되어 있습니다.

> 프록시 주소 : 27.96.130.172/api/ (곧 폐쇄 예정)

api/ 뒤에 요청 url을 붙이시면 됩니다.

> 이 부분은 추후 RESTAPI 형식에 맞추기 위해 endpoint가 변경될 수 있음을 미리 공지합니다. (매 맞기전에🥺)

**POST : /user/createUser**

request body

```
{
  cookie : id,
  nickname : nickname
}
```

출력

- 200 - 성공시

```json
{
  "response": "success",
  "message": "유저 성공에 성공했습니다.",
  "data": "nickname"
}
```

- 200 - 실패시

```json
{
  "response": "error",
  "message": "유저 생성에 실패했습니다.",
  "data": "errorMessage"
}
```

**GET : /user/getNickname**

requestParam(Query)

```
cookie : id
```

Request Ex : /user/getNickname?cookie=id

출력

- 200 - 성공시

```json
{
  "response": "success",
  "message": "성공적으로 nickname을 조회했습니다.",
  "data": "nickname"
}
```

- 200- error 시

```json
{
  "response": "error",
  "message": "성공적으로 nickname을 조회했습니다.",
  "data": "nickname"
}
```

**POST: /comment/comment**

- RequestBody

```json
{
  "cookie": "uuid",
  "video": "videoId",
  "message": "댓글 내용 들어갈 자리입니다요오오",
  "timeline": 12.32
}
```

출력

- 200 - 성공시

```json
{
  "response": "success",
  "message": "성공적으로 댓글을 작성했습니다.",
  "data": null
}
```

- 200 - 실패시

```json
{
  "response": "error",
  "message": "댓글을 작성하는데 실패했습니다.",
  "data": "error Message"
}
```

**GET: /comment/comments **

requestParam(Query)

```
video : videoId,
timeline : 12.32
offset : 30
```

Request Ex : /comment/comments?video={videoId}&timeline={시간(sec.ms)}&offset={시간}

출력

- 200 - 성공시

```json
{
  "response" : "success",
  "message" : "성공적으로 메시지 리스트를 불러왔습니다.",
  "data" : [
    {
      "nickname" : "닉네임명",
      "timeline" : 12.23,
      "message" : "저장된 메시지이",
      "createdAt" : "yyyy-mm-dd"
    },
    ...
  ]
}
```

- 200 - 실패시

```json
{
  "response": "error",
  "message": "메시지 리스트를 불러오는데 실패했습니다",
  "data": "error Message"
}
```


**POST: /videos/upload**

- RequestBody(multipart/form-data)

```
  videoname: "비디오 이름",
  desc: "비디오 설명",
  poster: poster file,
  file: video file
```

출력

- 200 - 성공시

```json
{
    "errorCode": 10,
    "message": "업로드 성공"
}
```

- 200 - 실패시

```json
{
    "errorCode": 12,
    "message": "업로드 실패"
}
```
