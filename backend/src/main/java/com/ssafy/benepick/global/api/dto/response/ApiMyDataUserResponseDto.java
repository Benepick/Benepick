package com.ssafy.benepick.global.api.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "마이 데이터 유저 DTO")
public class ApiMyDataUserResponseDto {

    private String myDataUserId;
    private String myDataUserName;
    private String myDataUserSocialNumber;
    private String myDataUserPhoneNumber;

}
