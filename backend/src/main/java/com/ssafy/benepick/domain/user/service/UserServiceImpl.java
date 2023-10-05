package com.ssafy.benepick.domain.user.service;

import com.ssafy.benepick.domain.user.dto.request.*;
import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.global.api.service.ApiService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.nurigo.java_sdk.exceptions.CoolsmsException;

import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.repository.UserRepository;
import com.ssafy.benepick.global.exception.ExistUserException;
import com.ssafy.benepick.global.exception.NotExistAccessTokenException;
import com.ssafy.benepick.global.exception.NotExistUserCiException;
import com.ssafy.benepick.global.util.CIService;
import com.ssafy.benepick.global.util.JwtService;
import com.ssafy.benepick.global.util.SmsService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{

	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final CIService ciService;
	private final SmsService smsService;
	private final ApiService apiService;

	@Override
	public String createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto , HttpServletResponse response) throws NoSuchAlgorithmException {
		log.info("UserServiceImpl_createUserAccount | 유저 회원 가입");

		String userId = ciService.generateUserCI(createUserAccountRequestDto);
		if(!userRepository.existsByUserNameAndUserPhoneNumberAndUserSocialNumber(
			createUserAccountRequestDto.getUserName(), createUserAccountRequestDto.getUserPhoneNumber(),
			createUserAccountRequestDto.getUserSocialNumber()))
			userRepository.save(createUserAccountRequestDto.toUserEntity(userId));

		setToken(userId , response);
		return userRepository.findById(userId).get().getUserName();
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

	@Override
	public String sendMessage(PhoneNumberRequestDto phoneNumberRequestDto) throws CoolsmsException {
		log.info("UserServiceImpl_sendMessage | 메시지 발송");
		return smsService.sendAuthKey(phoneNumberRequestDto.getPhoneNumber());
	}

	@Override
	@Transactional
	public void withDraw(HttpServletRequest request) {
		log.info("UserServiceImpl_withDraw | 회원 탈퇴");
		userRepository.delete(getUserFromRequest(request));
	}

	@Override
	public String getUserName(HttpServletRequest request) {
		log.info("UserServiceImpl_getUserName | 사용자 이름 조회");
		return getUserFromRequest(request).getUserName();
	}

	@Override
	public boolean getUserCi(UserCiRequestDto userCiRequestDto) throws NoSuchAlgorithmException {
		String userCi = ciService.generateUserCI(userCiRequestDto);
		System.out.println(userCi);
		return apiService.getUserCi(userCi);
	}
}
