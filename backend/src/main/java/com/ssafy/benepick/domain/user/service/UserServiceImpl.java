package com.ssafy.benepick.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.benepick.domain.user.dto.request.ChangePasswordRequestDto;
import com.ssafy.benepick.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.benepick.domain.user.dto.request.LoginRequestDto;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.repository.UserRepository;
import com.ssafy.benepick.global.exception.ExistUserException;
import com.ssafy.benepick.global.exception.NotExistAccessTokenException;
import com.ssafy.benepick.global.exception.NotExistUserCiException;
import com.ssafy.benepick.global.util.CIService;
import com.ssafy.benepick.global.util.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final CIService ciService;

	@Override
	@Transactional
	public void createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto , HttpServletResponse response) {
		log.info("UserServiceImpl_createUserAccount | 유저 회원 가입");

		String userId = ciService.generateUserCI(createUserAccountRequestDto);
		if(!userRepository.existsByUserNameAndUserPhoneNumberAndUserSocialNumber(
			createUserAccountRequestDto.getUserName(), createUserAccountRequestDto.getUserPhoneNumber(),
			createUserAccountRequestDto.getUserSocialNumber()))
			userRepository.save(createUserAccountRequestDto.toUserEntity(userId));

		setToken(userId , response);
	}

	@Override
	public void setToken(String userId, HttpServletResponse response) {
		log.info("UserServiceImpl_setToken | 사용자 인증 완료 , 토큰 부여");
		String accessToken = jwtService.createAccessToken("userId",userId); // key, value
		response.setHeader("Authorization", accessToken);
	}

	@Override
	public boolean login(LoginRequestDto loginRequestDto, HttpServletRequest request) {
		log.info("UserServiceImpl_login | 유저 간편 비밀번호를 이용한 로그인");
		User loginUser = getUserFromRequest(request);

		if(loginUser.getUserSimplePassword().equals(loginRequestDto.getUserSimplePassword()))
			return true;
		return false;
	}

	@Override
	@Transactional
	public void changeSimplePassword(ChangePasswordRequestDto changePasswordRequestDto, HttpServletRequest request) {
		log.info("UserServiceImpl_changeSimplePassword | 사용자의 간편 비밀번호 변경 서비스");
		User loginUser = getUserFromRequest(request);
		loginUser.changeSimplePassword(changePasswordRequestDto.getUserSimplePassword());
	}

	@Override
	public User getUserFromRequest(HttpServletRequest request) {
		log.info("UserServiceImpl_getUserFromRequest | Request의 토큰 값을 바탕으로 유저를 찾아옴");
		String userCi = jwtService.extractUserIdFromAccessToken(request);
		return userRepository.findById(userCi).orElseThrow(NotExistUserCiException::new);
	}
}
