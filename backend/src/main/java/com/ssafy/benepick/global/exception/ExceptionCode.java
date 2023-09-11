package com.ssafy.benepick.global.exception;

import lombok.Getter;

/**
 *  ErrorCode는 임의로 지정하였음
 */
@Getter
public enum ExceptionCode {

	NOT_EXIST_CARD_COMPANY_EXCEPTION(450,"입력받은 카드사ID와 일치하는 카드사가 존재하지 않습니다."),
	NOT_EXIST_LINK_CARD_COMPANY_EXCEPTION(451,"연동 해제하려는 카드사는 연동 되어있지 않습니다."),
	NOT_EXIST_USER_CI_EXCEPTION(460,"일치하는 CI를 가진 유저가 존재하지 않습니다."),
	NOT_EXIST_ACCESS_TOKEN_EXCEPTION(461,"Access Token 이 유효하지 않거나 존재하지 않습니다."),
	EXIST_USER_EXCEPTION(470,"이미 존재하는 사용자 입니다."),
	SERVER_EXCEPTION(500, "서버에서 예측하지 못한 에러가 발생했습니다.");

	private final int errorCode;
	private final String errorMessage;

	ExceptionCode(int errorCode, String errorMessage) {
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
}
