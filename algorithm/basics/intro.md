## 그래프란?

node와 edge들로 이루어진 집합

<p align="center"><img src="https://velog.velcdn.com/images/cso6042/post/be36e790-2d02-45dc-b14c-ba209ee9d0e3/image.png" height="400px" width="300px">
<img src="https://velog.velcdn.com/images/cso6042/post/c8fbe578-ceb1-4b8a-bc76-1909666d9992/image.png" height="400px" width="300px"></p>

node는 원과 데이터들을 시각화 한것. vertex라고도 함

edge는 node사이의 연결 선

graph는 `node와 edge들의 관계`를 나타낸 것으로,
도시가 node라면 edge는 도시를 잇는 도로 라고 볼 수 있음

## 그래프의 종류

그래프는 directed graph와 undirected graph로 나뉠 수 있음

<p align="center"><img alt="directed graph" src="https://velog.velcdn.com/images/cso6042/post/c8fbe578-ceb1-4b8a-bc76-1909666d9992/image.png" height="400px" width="300px">
<img src="https://velog.velcdn.com/images/cso6042/post/3f4cb64f-7a76-4a49-9528-969f0b2f1df2/image.png" height="400px" width="300px"></p>

undirected graph는 말 그대로 방향이 없는 그래프.

**c에서 d로도, d에서 c로도 갈 수 있다.**

하지만 directed graph는 방향이 존재하여,

**c에서 d로는 갈 수 있지만 d에서 c로는 갈 수 없다.**

## directed graph

<p align="center"><img alt="directed graph" src="https://velog.velcdn.com/images/cso6042/post/c8fbe578-ceb1-4b8a-bc76-1909666d9992/image.png" height="400px" width="300px"></p>

c노드를 기준으로 봤을 때, d와 e는 이웃 노드라고 할 수 있다.

이웃 노드는 기준 노드에서 edge로 접근할 수 있는 노드를 말한다.

이 그래프를 프로그램적으로 나타낸다면, map을 사용하여 인접 리스트(adjacency list)로 나타낼 수 있다.

<p align="center"><img alt="directed graph" src="https://velog.velcdn.com/images/cso6042/post/c1876193-8445-49de-844a-0a986a060df8/image.png" height="300px" width="600px"></p>

여기서 key는 노드의 data를 말하고, value는 a의 이웃 노드들을 가리킨다.

이웃 노드들이 없을 경우, 빈 배열로 나타낸다.
