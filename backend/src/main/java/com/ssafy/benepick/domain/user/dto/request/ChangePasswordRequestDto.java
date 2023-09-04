package com.ssafy.benepick.domain.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "간편 비밀번호 변경 요청 DTO")
public class ChangePasswordRequestDto {

	@NotBlank
	@Schema(description = "사용자의 간편 비밀번호", example = "135135")
	private String userSimplePassword;

}
