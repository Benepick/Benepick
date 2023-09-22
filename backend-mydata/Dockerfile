FROM gradle:jdk17 as builder
#working directory 경로
WORKDIR /usr/src/app
#ARG key=value , 여러번 사용되는 문자열이나 숫자 등을 변수로 만들어주는 속성
#ARG JAR_PATH=./build/libs/*.jar
#COPY (복사할 파일[컨테이너 외부]) (복사될 위치[컨테이너 내부])
COPY . /usr/src/app
#빌드 결과가 /usr/src/app/build/libs/project-name.version.jar 로 생김
RUN gradle build --no-daemon -x test

FROM openjdk:17-alpine
EXPOSE 8082
WORKDIR /usr/src/app
#--from=builder /usr/src/app/build/libs/*.jar 이전 임시 컨테이너에 생성된 파일
#결국 /usr/src/app 밑에 airlingo-0.0.1-SNAPSHOT.jar파일을 복사!
COPY --from=builder /usr/src/app/build/libs/*.jar ./
#환경에따라 빌드 해주는 명령어
CMD ["java","-jar","./benepick-0.0.1-SNAPSHOT.jar"]