package com.ssafy.benepick.global.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import com.ssafy.benepick.domain.user.dto.request.UserCiRequestDto;
import org.springframework.stereotype.Component;

import com.ssafy.benepick.domain.user.dto.request.CreateUserAccountRequestDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CIService {

	public  String getSHA256Hash(String data) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] encodedHash = digest.digest(data.getBytes(StandardCharsets.UTF_8));

			// 바이트 배열을 16진수 문자열로 변환
			StringBuilder hexStringBuilder = new StringBuilder(2 * encodedHash.length);
			for (byte b : encodedHash) {
				String hex = String.format("%02x", b);
				hexStringBuilder.append(hex);
			}

			return hexStringBuilder.toString();
		} catch (NoSuchAlgorithmException e){
			e.printStackTrace();
		}
		return "error";
	}

	public String generateUserCI(CreateUserAccountRequestDto createUserAccountRequestDto) throws NoSuchAlgorithmException {
		log.info("CIService_generateUserCI | 유저 CI 생성");
		String rawCI = createUserAccountRequestDto.getUserName() + createUserAccountRequestDto.getUserSocialNumber()
				+ createUserAccountRequestDto.getUserGenderAndGenerationCode() + createUserAccountRequestDto.getUserPhoneNumber();
		return getSHA256Hash(rawCI);

	}
	public String generateUserCI(UserCiRequestDto userCiRequestDto) throws NoSuchAlgorithmException {
		log.info("CIService_generateUserCI | 유저 CI 생성");
		String rawCI = userCiRequestDto.getUserName() + userCiRequestDto.getUserSocialNumber()
				+ userCiRequestDto.getUserGenderAndGenerationCode() + userCiRequestDto.getUserPhoneNumber();
		return getSHA256Hash(rawCI);

	}

	private static String bytesToHex(byte[] hash) {
		StringBuilder hexString = new StringBuilder(2 * hash.length);
		for (byte b : hash) {
			String hex = Integer.toHexString(0xff & b);
			if (hex.length() == 1) {
				hexString.append('0');
			}
			hexString.append(hex);
		}
		return hexString.toString();
	}

}
