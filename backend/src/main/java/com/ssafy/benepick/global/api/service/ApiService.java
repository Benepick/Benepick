package com.ssafy.benepick.global.api.service;

import com.ssafy.benepick.global.api.dto.response.ApiCardCompanyResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiMerchantResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataCardResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiSearchCardBenefitResponseDto;
import com.ssafy.benepick.global.response.ListResponseResult;
import com.ssafy.benepick.global.response.SingleResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class ApiService {

    private WebClient getDefaultWebClient() {
        return WebClient.builder().baseUrl("http://localhost:8082").build();
    }

    public List<ApiCardCompanyResponseDto> getCardCompanyListFromMyDataServer(){
        log.info("BANK API : 뱅킹 서버에서 전체 카드사 정보 조회");
        return getDefaultWebClient().get()
                .uri("/mydata/card-company")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ListResponseResult<ApiCardCompanyResponseDto>>() {})
                .timeout(Duration.ofSeconds(5))
                .block().getData();
    }

    public ApiCardCompanyResponseDto getCardCompanyFromMyDataServer(Long cardId){
        log.info("BANK API : 뱅킹 서버에서 카드사 정보 조회");
        return getDefaultWebClient().get()
                .uri("/mydata/card-company/{cardId}",cardId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<SingleResponseResult<ApiCardCompanyResponseDto>>() {})
                .timeout(Duration.ofSeconds(5))
                .block().getData();
    }

    public List<ApiMyDataCardResponseDto> getMyDataCardList(Long cardCompanyId,String userId){
        log.info("BANK API : 뱅킹 서버에서 마이데이터 가져와서 갱신해주기");
        return getDefaultWebClient().get()
                .uri(uriBuilder -> uriBuilder
                        .path("/mydata")
                        .queryParam("cardCompanyId",cardCompanyId)
                        .queryParam("userId",userId)
                        .build())
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ListResponseResult<ApiMyDataCardResponseDto>>() {})
                .timeout(Duration.ofSeconds(5))
                .block().getData();
    }

    public List<ApiMyDataCardResponseDto> getTransactionDataAfterLastRenewalTime(Long cardCompanyId,String userId,LocalDateTime lastRenewalTime){
        log.info("BANK API : 뱅킹 서버에서 거래내역 갱신해주기");
        return getDefaultWebClient().get()
            .uri(uriBuilder -> uriBuilder
                .path("/mydata/renewal")
                .queryParam("cardCompanyId",cardCompanyId)
                .queryParam("userId",userId)
                .queryParam("lastRenewalTime",LocalDateTime.now())
                .build())
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<ListResponseResult<ApiMyDataCardResponseDto>>() {})
            .timeout(Duration.ofSeconds(5))
            .block().getData();
    }

    public ApiMerchantResponseDto getNearestMerchant(double x, double y) {
        log.info("BANK API : 뱅킹 서버에서 가까운 상권 정보 가져오기");
        return getDefaultWebClient().get()
                .uri("/card/place?x={x}&y={y}", x, y)
                .retrieve()
                .bodyToMono(ApiMerchantResponseDto.class)
                .timeout(Duration.ofSeconds(5))
                .block();
    }

    public List<ApiSearchCardBenefitResponseDto> searchCardBenefitByKeyword(String keyword) {
        log.info("BANK API : 뱅킹 서버에서 가맹점에 대한 전체 카드 혜택 정보 가져오기");
        return getDefaultWebClient().get()
            .uri("/card/benefit/{keyword}",keyword)
            .retrieve()
            .bodyToMono(new ParameterizedTypeReference<ListResponseResult<ApiSearchCardBenefitResponseDto>>() {})
            .timeout(Duration.ofSeconds(5))
            .block().getData();
    }
}
