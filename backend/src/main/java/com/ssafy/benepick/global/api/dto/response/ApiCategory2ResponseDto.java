package com.ssafy.benepick.global.api.dto.response;

import com.ssafy.benepick.domain.user.entity.UserCardCategory2;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드 카테고리2 정보 DTO")
public class ApiCategory2ResponseDto implements Serializable {
    private Long category2Id;
    private String category2Name;
    private List<ApiCategory3ResponseDto> category3List;

    public UserCardCategory2 toUserCardCategory2(){
        return UserCardCategory2.builder()
                .cardCategory2Id(category2Id)
                .userCardCategory2Name(category2Name)
                .userCardCategory3List(new ArrayList<>())
                .build();
    }
}
