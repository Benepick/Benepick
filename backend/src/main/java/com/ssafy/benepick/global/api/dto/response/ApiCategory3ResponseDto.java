package com.ssafy.benepick.global.api.dto.response;

import com.ssafy.benepick.domain.card.entity.Category2;
import com.ssafy.benepick.domain.user.entity.UserCardCategory3;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 카테고리3 정보 DTO")
public class ApiCategory3ResponseDto {
    private Long category3Id;
    private String category3Name;

    public UserCardCategory3 toUserCardCategory3(){
        return UserCardCategory3.builder()
                .userCardCategory3Id(category3Id)
                .userCardCategory3Name(category3Name)
                .build();
    }
}
