package com.ssafy.benepick.mydata.domain.mydata.entity;

import java.util.Arrays;

import lombok.Getter;

@Getter
public enum PaymentCategory {

	FOOD("식당","foodUrl"),
	SHOPPING("쇼핑","shoppingUrl"),
	ENTERTAINMENT("카페","cafeUrl"),
	Medical("의료","medicalUrl");

	private String korName;
	private String imgUrl;

	PaymentCategory(String korName , String imgUrl) {
		this.korName = korName;
		this.imgUrl = imgUrl;
	}

	public static String getCategoryImgUrl(String korName){
		return Arrays.stream(PaymentCategory.values())
			.filter(value -> value.getKorName().equals(korName))
			.findFirst().get().getImgUrl();
	}
}
