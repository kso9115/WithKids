package com.child.project.jwtToken;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.child.project.domain.StaffDTO;
import com.child.project.entity.Member;
import com.child.project.entity.Staff;

// => dependency 추가 필요함
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenProvider {
	private static final String SECRET_KEY = "NMA8JPctFuna59f5";

	public String createToken(Map<String, Object> claimList) {

		Date expiryDate = Date.from(
				Instant.now() // 현재 시간
						.plus(1, ChronoUnit.DAYS));

		return Jwts.builder()

				.signWith(SignatureAlgorithm.HS512, SECRET_KEY)

				// => payload에 들어갈 내용
				.setClaims(claimList)
				// .setSubject(id) // sub: subject(유일해야함->userID 보관)
				.setIssuer("project app") // iss: Issuer, 발급 주체
				.setIssuedAt(new Date()) // iat: Issued At, 토큰 발급시간
				.setExpiration(expiryDate) // exp: Expiration, 토큰 만료시간
				.compact();
	} // createToken

	// 2. 검증
	// 2.2) Role 적용이후
	// => 토큰을 디코딩 및 파싱 하여 토크의 위조여부 확인 후
	// => Claims 를 return 함.
	public Map<String, Object> validateToken(String token) {

		return Jwts.parser()
				.setSigningKey(SECRET_KEY)
				.parseClaimsJws(token)
				.getBody();
	} // validateToken


	// 1. JWT Token 생성
	public String create(Member entity) {
		// 1.1) 유효기한 설정
		// - 현재시간 으로부터 1일로 설정
		// ( 현재시간 으로부터 차이가 +1일 되는 날 설정 )
		Date expiryDate = Date.from(
				Instant.now() // 현재 시간
						.plus(1, ChronoUnit.DAYS));
		// => 일(Day) 의 차이가 1 이되는 값을의미

		// 1.2) Jwts(JWT 관리 API) 클래스로 토큰 생성 보관
		// => JSON 생성, 서명, 인코딩, 디코딩, 파싱 등 토큰관리 기능 제공.
		return Jwts.builder()
				// => header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
				.signWith(SignatureAlgorithm.HS512, SECRET_KEY)

				// => payload에 들어갈 내용
				.setSubject(entity.getMemSerial()) // sub: subject(유일해야함->userID 보관)
				.setIssuer("project app") // iss: Issuer, 발급 주체
				.setIssuedAt(new Date()) // iat: Issued At, 토큰 발급시간
				.setExpiration(expiryDate) // exp: Expiration, 토큰 만료시간
				.compact();
	}

	// // 2. 검증
	// // => 토큰을 디코딩 및 파싱 하여 토크의 위조여부 확인 후
	// // => subject 에 보관한 userID 를 꺼내어 return
	// public String validateAndGetUserId(String token) {
	// // parseClaimsJws메서드가 Base 64로 디코딩 및 파싱.
	// // 즉, 헤더와 페이로드를 setSigningKey로 넘어온 시크릿을 이용해 서명 후, token의 서명 과 비교.
	// // 위조되지 않았다면 페이로드(Claims) 리턴
	// // 그 중 우리는 user의 id가 필요하므로 getBody를 부른다.
	// Claims claims = Jwts.parser()
	// .setSigningKey(SECRET_KEY)
	// .parseClaimsJws(token)
	// .getBody();

	// return claims.getSubject();
	// }
} // class
