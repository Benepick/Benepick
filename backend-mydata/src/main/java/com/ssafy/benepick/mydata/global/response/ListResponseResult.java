package com.ssafy.benepick.mydata.global.response;

import java.util.List;

import lombok.Getter;

@Getter
public class ListResponseResult<T> extends ResponseResult {

	private List<T> data;

	public ListResponseResult(List<T> data) {
		super(successResponse.statusCode, successResponse.messages, successResponse.developerMessage,
			successResponse.timestamp);
		this.data = data;
	}
}
