package com.ssafy.benepick.global.response;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ListResponseResult<T> extends ResponseResult {

	private List<T> data;

	public ListResponseResult(List<T> data) {
		super(successResponse.statusCode, successResponse.messages, successResponse.developerMessage,
			successResponse.timestamp);
		this.data = data;
	}
}
