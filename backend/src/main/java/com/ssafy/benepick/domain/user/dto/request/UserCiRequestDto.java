package com.ssafy.benepick.domain.user.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "유저 CI 조회 DTO")
public class UserCiRequestDto {
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
}
