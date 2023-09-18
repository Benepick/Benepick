package com.ssafy.benepick.global.api.dto.response;

import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;
import com.ssafy.benepick.domain.card.entity.Card;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "카드사 정보 DTO")
public class ApiCardCompanyResponseDto {

    private Long cardCompanyId;
    private String cardCompanyImgUrl;
    private String cardCompanyName;
    private List<ApiCardResponseDto> cardList;

    public CardCompanyResponseDto toCardCompanyResponseDtoForSignUp(){
        return CardCompanyResponseDto.builder()
                .cardCompanyId(cardCompanyId)
                .cardCompanyImgUrl(cardCompanyImgUrl)
                .cardCompanyName(cardCompanyName)
                .isLinked(false)
                .isSelected(true)
                .build();
    }

    public CardCompanyResponseDto toCardCompanyResponseDto(boolean isLinked){
        return CardCompanyResponseDto.builder()
                .cardCompanyId(cardCompanyId)
                .cardCompanyImgUrl(cardCompanyImgUrl)
                .cardCompanyName(cardCompanyName)
                .isLinked(isLinked)
                .isSelected(isLinked ? true : false)
                .build();
    }
}
