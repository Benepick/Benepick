package com.ssafy.benepick.domain.user.dto.request;

import java.util.ArrayList;

import com.ssafy.benepick.domain.user.entity.User;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "회원가입 요청 DTO")
public class CreateUserAccountRequestDto {

	@NotBlank
	@Schema(description = "사용자 이름", example = "최정수")
	private String userName;

	@NotBlank
	@Schema(description = "사용자 주민번호 앞자리", example = "650122")
	private String userSocialNumber;

	@NotBlank
	@Schema(description = "사용자 핸드폰 번호", example = "01051982656")
	private String userPhoneNumber;

	@NotBlank
	@Schema(description = "사용자의 성별과 태어난 세대를 나타내는 숫자", example = "1")
	private String userGenderAndGenerationCode;

	@NotBlank
	@Schema(description = "사용자의 간편 비밀번호", example = "123456")
	private String userSimplePassword;

	public User toUserEntity(String userId){
		return User.builder()
			.userId(userId)
			.userName(userName)
			.userSocialNumber(userSocialNumber)
			.userPhoneNumber(userPhoneNumber)
			.userSimplePassword(userSimplePassword)
			.userGenderAndGenerationCode(userGenderAndGenerationCode)
			.isPushActive(false)
			.isAutoLoginActive(false)
			.userCardList(new ArrayList<>())
			.userCardCompanyList(new ArrayList<>())
			.build();
	}
}
