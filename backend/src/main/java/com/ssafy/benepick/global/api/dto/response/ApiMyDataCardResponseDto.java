package com.ssafy.benepick.global.api.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCard;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "마이 데이터 카드 DTO")
public class ApiMyDataCardResponseDto {
    private String myDataCardId;
    private LocalDate myDataCardExpirationDate;
    private int myDataCardPrevMonthAmount;
    private ApiCardResponseDto apiCardResponseDto;
    private ApiMyDataUserResponseDto apiMyDataUserResponseDto;
    private List<ApiMyDataPaymentResponseDto> apiMyDataPaymentResponseDtoList;

    public UserCard toUserCard(User user) {
        return UserCard.builder()
            .user(user)
            .userCardCompanyName(this.getApiCardResponseDto().getApiCardCompanyResponseDto().getCardCompanyName())
            .userCardSerialNumber(this.getMyDataCardId())
            .userCardCode(this.getApiCardResponseDto().getCardCode())
            .userCardName(this.getApiCardResponseDto().getCardName())
            .userCardExpirationDate(this.getMyDataCardExpirationDate())
            .userCardImgUrl(this.getApiCardResponseDto().getCardImgUrl())
            .userCardCompanyImgUrl(this.getApiCardResponseDto().getApiCardCompanyResponseDto().getCardCompanyImgUrl())
            .userCardCurrentPerformance(0)
            .userCardPrevPerformance(this.getMyDataCardPrevMonthAmount())
            .build();
    }
}
