package com.ssafy.benepick.domain.user.service;

import com.ssafy.benepick.domain.user.dto.request.CreateUserAccountRequestDto;

import jakarta.servlet.http.HttpServletResponse;

import java.security.NoSuchAlgorithmException;

public interface UserService {
	void createUserAccount(CreateUserAccountRequestDto createUserAccountRequestDto , HttpServletResponse response) throws NoSuchAlgorithmException;
	void setToken(String userId ,HttpServletResponse response);
}
