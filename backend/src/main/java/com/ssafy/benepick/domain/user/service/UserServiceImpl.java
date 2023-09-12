package com.ssafy.benepick.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.benepick.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.repository.UserRepository;
import com.ssafy.benepick.global.exception.ExistUserException;
import com.ssafy.benepick.global.util.CIService;
import com.ssafy.benepick.global.util.JwtService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.security.NoSuchAlgorithmException;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final CIService ciService;

	@Override
	@Transactional
	public void createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto , HttpServletResponse response) throws NoSuchAlgorithmException {
		log.info("UserServiceImpl_createUserAccount | 유저 회원 가입");

		if(userRepository.existsByUserNameAndUserPhoneNumberAndUserSocialNumber(
			createUserAccountRequestDto.getUserName(), createUserAccountRequestDto.getUserPhoneNumber(),
			createUserAccountRequestDto.getUserSocialNumber()))
			throw new ExistUserException();

		String userId = ciService.generateUserCI(createUserAccountRequestDto);
		userRepository.save(createUserAccountRequestDto.toUserEntity(userId));
		setToken(userId , response);
	}

	@Override
	public void setToken(String userId, HttpServletResponse response) {
		log.info("UserServiceImpl_setToken | 사용자 인증 완료 , 토큰 부여");
		String accessToken = jwtService.createAccessToken("userId",userId); // key, value
		response.setHeader("Authorization", accessToken);
	}
}
