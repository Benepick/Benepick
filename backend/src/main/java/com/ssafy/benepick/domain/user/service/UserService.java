package com.ssafy.benepick.domain.user.service;

import com.ssafy.benepick.domain.user.dto.request.*;
import com.ssafy.benepick.domain.user.entity.UserCard;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

import com.ssafy.benepick.domain.user.entity.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface UserService {
	String createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto , HttpServletResponse response) throws NoSuchAlgorithmException;
	void setToken(String userId ,HttpServletResponse response);
	boolean login(LoginRequestDto loginRequestDto , HttpServletRequest request);
	void changeSimplePassword(ChangePasswordRequestDto changePasswordRequestDto , HttpServletRequest request);
	User getUserFromRequest(HttpServletRequest request);
	String sendMessage(PhoneNumberRequestDto phoneNumberRequestDto) throws CoolsmsException;
	void withDraw(HttpServletRequest request);
	String getUserName(HttpServletRequest request);

	boolean getUserCi(UserCiRequestDto userCiRequestDto) throws NoSuchAlgorithmException;
}
