package com.ssafy.benepick.domain.user.service;

import com.ssafy.benepick.domain.user.dto.request.ChangePasswordRequestDto;
import com.ssafy.benepick.domain.user.dto.request.CreateUserAccountRequestDto;
import com.ssafy.benepick.domain.user.dto.request.LoginRequestDto;
import com.ssafy.benepick.domain.user.entity.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
	void createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto , HttpServletResponse response);
	void setToken(String userId ,HttpServletResponse response);
	boolean login(LoginRequestDto loginRequestDto , HttpServletRequest request);
	void changeSimplePassword(ChangePasswordRequestDto changePasswordRequestDto , HttpServletRequest request);
	User getUserFromRequest(HttpServletRequest request);
}
