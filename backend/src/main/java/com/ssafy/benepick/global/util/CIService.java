package com.ssafy.benepick.global.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;

import com.ssafy.benepick.domain.user.dto.request.CreateUserAccountRequestDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CIService {

	public String generateUserCI(CreateUserAccountRequestDto createUserAccountRequestDto){
		log.info("CIService_generateUserCI | 유저 CI 생성");
		String rawCI = createUserAccountRequestDto.getUserName() + createUserAccountRequestDto.getUserSocialNumber()
			+ createUserAccountRequestDto.getUserGenderAndGenerationCode() + createUserAccountRequestDto.getUserPhoneNumber();

		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] encodedhash = digest.digest(rawCI.getBytes(StandardCharsets.UTF_8));
			String ci = bytesToHex(encodedhash);

			return ci;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return "error";
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
