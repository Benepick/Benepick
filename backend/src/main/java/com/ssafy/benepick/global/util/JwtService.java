package com.ssafy.benepick.global.util;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ssafy.benepick.global.exception.NotExistAccessTokenException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtService {
	public static final Logger logger = LoggerFactory.getLogger(JwtService.class);

	private static final int KEY_SIZE_BITS = 256; // 키의 비트 수 (256비트 사용)

	private static final int ACCESS_TOKEN_EXPIRE_WEEKEND = 100; // weekend
	private static final long ACCESS_TOKEN_VALID_TIME = 1000L * 60 * 60 * 24 * 7 * ACCESS_TOKEN_EXPIRE_WEEKEND;

	private static final String SECRET_KEY = "SSAFY_A610_BENEPICK_BACKEND_SECRET_KEY";

	public <T> String createAccessToken(String key, T data) {
		return create("access-token", key, data, ACCESS_TOKEN_VALID_TIME); // ms
	}

	/**
	 * subject : sub의 value로 들어갈 토큰 제목
	 * key : claim의 키
	 * data : claim에 담을 value
	 * expire : 토큰 유효기간 설정을 위한 값(밀리초 단위)
	 * jwt 토큰의 구성 : header+payload+signature
	 */
	public <T> String create(String subject, String key, T data, long expire) {
		// Payload : 토큰 제목 (Subject), 생성일 (IssuedAt), 유효기간 (Expiration), 데이터 (Claim)
		Claims claims = Jwts.claims()
			// 토큰 제목 access-token/refresh-token
			.setSubject(subject)
			// 생성일
			.setIssuedAt(new Date())
			// 만료일 (유효기간)
			.setExpiration(new Date(System.currentTimeMillis() + expire));

		// 저장할 data의 key, value => loginId, loginUser.getUserLoginId()
		claims.put(key, data);

		String jwt = Jwts.builder()
			// Header : 해쉬 알고리즘, 토큰 타입
			.setHeaderParam("alg", "HS256")
			.setHeaderParam("typ", "JWT")
			// Payload
			.setClaims(claims)
			// Signature : secret key를 활용한 암호화
			.signWith(SignatureAlgorithm.HS256, this.generateKey())
			.compact(); // 직렬화 처리

		return "Bearer " + jwt;
	}

	// Signature에 사용될 secret key 생성
	private byte[] generateKey() {
		return Keys.hmacShaKeyFor(SECRET_KEY.getBytes()).getEncoded();
	}

	public String extractUserIdFromAccessToken(HttpServletRequest request) {
		log.info("JwtService_extractUserIdFromAccessToken | Access Token 에서 userCI 추출");
		String accessToken = request.getHeader("Authorization");

		if(accessToken == null)
			throw new NotExistAccessTokenException();

		try {
			// setSigningKey : JWS 서명 검증을 위한  secret key 세팅
			// parseClaimsJws : 파싱하여 원본 jws 만들기
			// Claims 는 Map의 구현체 형태
			Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(this.generateKey()).build().parseClaimsJws(accessToken.split(" ")[1]);
			return claims.getBody().get("userId", String.class);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return "error";
	}

	public boolean validateToken(String accessToken) {
		log.info("JwtService_validateToken | JWT토큰의 유효성 + 만료일자 확인");
		try {
			Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(this.generateKey()).build().parseClaimsJws(accessToken);
			if(claims.getBody().getExpiration().getTime() - claims.getBody().getIssuedAt().getTime() != ACCESS_TOKEN_VALID_TIME){
				log.info("토큰이 유효하지 않음");
				return false;
			}
			return !claims.getBody().getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
		}
	}
}
