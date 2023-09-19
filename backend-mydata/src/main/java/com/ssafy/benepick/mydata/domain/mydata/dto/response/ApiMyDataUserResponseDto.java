package com.ssafy.benepick.mydata.domain.mydata.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
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
