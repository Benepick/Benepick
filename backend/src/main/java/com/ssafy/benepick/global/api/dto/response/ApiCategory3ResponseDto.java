package com.ssafy.benepick.global.api.dto.response;

import com.ssafy.benepick.domain.user.entity.UserCardCategory3;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 카테고리3 정보 DTO")
public class ApiCategory3ResponseDto implements Serializable {
    private Long category3Id;
    private String category3Name;

    public UserCardCategory3 toUserCardCategory3(){
        return UserCardCategory3.builder()
                .cardCategory3Id(category3Id)
                .userCardCategory3Name(category3Name)
                .build();
    }
}
