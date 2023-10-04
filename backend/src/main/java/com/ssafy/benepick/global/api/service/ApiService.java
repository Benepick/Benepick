package com.ssafy.benepick.global.api.service;

import com.ssafy.benepick.global.api.dto.response.ApiCardCompanyResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiMerchantResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiMyDataCardResponseDto;
import com.ssafy.benepick.global.api.dto.response.ApiSearchCardBenefitResponseDto;
import com.ssafy.benepick.global.exception.BankServerClientException;
import com.ssafy.benepick.global.exception.BankServerException;
import com.ssafy.benepick.global.exception.BankServerTimeException;
import com.ssafy.benepick.global.response.ListResponseResult;
import com.ssafy.benepick.global.response.SingleResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Profile;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeoutException;

@RequiredArgsConstructor
@Service
@Slf4j
public class ApiService {

    @Value("${webclient.base-url}")
    private String baseUrl;

    private WebClient getDefaultWebClient() {
        return WebClient.builder().baseUrl(baseUrl).build();
    }

    @Cacheable(value = "cardCompanyList")
    public List<ApiCardCompanyResponseDto> getCardCompanyListFromMyDataServer(){
        log.info("BANK API : 뱅킹 서버에서 전체 카드사 정보 조회");
        return getDefaultWebClient().get()
                .uri("/mydata/card-company")
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, error -> Mono.error(new BankServerClientException()))
                .onStatus(HttpStatusCode::is5xxServerError, error -> Mono.error(new BankServerException()))
                .bodyToMono(new ParameterizedTypeReference<ListResponseResult<ApiCardCompanyResponseDto>>() {})
                .timeout(Duration.ofSeconds(10))
                .onErrorMap(TimeoutException.class, ex -> new BankServerTimeException())
                .block().getData();
    }

    @Cacheable(value = "cardCompany" , key = "#cardId")
    public ApiCardCompanyResponseDto getCardCompanyFromMyDataServer(Long cardId){
        log.info("BANK API : 뱅킹 서버에서 카드사 정보 조회");
        return getDefaultWebClient().get()
                .uri("/mydata/card-company/{cardId}",cardId)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, error -> Mono.error(new BankServerClientException()))
                .onStatus(HttpStatusCode::is5xxServerError, error -> Mono.error(new BankServerException()))
                .bodyToMono(new ParameterizedTypeReference<SingleResponseResult<ApiCardCompanyResponseDto>>() {})
                .timeout(Duration.ofSeconds(10))
                .onErrorMap(TimeoutException.class, ex -> new BankServerTimeException())
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
                .onStatus(HttpStatusCode::is4xxClientError, error -> Mono.error(new BankServerClientException()))
                .onStatus(HttpStatusCode::is5xxServerError, error -> Mono.error(new BankServerException()))
                .bodyToMono(new ParameterizedTypeReference<ListResponseResult<ApiMyDataCardResponseDto>>() {})
                .timeout(Duration.ofSeconds(10))
                .onErrorMap(TimeoutException.class, ex -> new BankServerTimeException())
                .block().getData();
    }

    public List<ApiMyDataCardResponseDto> getTransactionDataAfterLastRenewalTime(Long cardCompanyId,String userId,LocalDateTime lastRenewalTime){
        //log.info("BANK API : 뱅킹 서버에서 거래내역 갱신해주기");
        return getDefaultWebClient().get()
            .uri(uriBuilder -> uriBuilder
                .path("/mydata/renewal")
                .queryParam("cardCompanyId",cardCompanyId)
                .queryParam("userId",userId)
                .queryParam("lastRenewalTime",LocalDateTime.now())
                .build())
            .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, error -> Mono.error(new BankServerClientException()))
                .onStatus(HttpStatusCode::is5xxServerError, error -> Mono.error(new BankServerException()))
            .bodyToMono(new ParameterizedTypeReference<ListResponseResult<ApiMyDataCardResponseDto>>() {})
            .timeout(Duration.ofSeconds(10))
            .onErrorMap(TimeoutException.class, ex -> new BankServerTimeException())
            .block().getData();
    }

    //@Cacheable(value = "merchant", key = "#x + '_' + #y")
    public ApiMerchantResponseDto getNearestMerchant(double x, double y) {
        log.info("BANK API : 뱅킹 서버에서 가까운 상권 정보 가져오기");
        return getDefaultWebClient().get()
                .uri("/card/place?x={x}&y={y}", x, y)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, error -> Mono.error(new BankServerClientException()))
                .onStatus(HttpStatusCode::is5xxServerError, error -> Mono.error(new BankServerException()))
                .bodyToMono(ApiMerchantResponseDto.class)
                .timeout(Duration.ofSeconds(10))
                .onErrorMap(TimeoutException.class, ex -> new BankServerTimeException())
                .block();
    }

    @Cacheable(value = "cardBenefitList" , key = "#keyword")
    public List<ApiSearchCardBenefitResponseDto> searchCardBenefitByKeyword(String keyword) {
        log.info("BANK API : 뱅킹 서버에서 가맹점에 대한 전체 카드 혜택 정보 가져오기");
        return getDefaultWebClient().get()
            .uri("/card/benefit/{keyword}",keyword)
            .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, error -> Mono.error(new BankServerClientException()))
                .onStatus(HttpStatusCode::is5xxServerError, error -> Mono.error(new BankServerException()))
            .bodyToMono(new ParameterizedTypeReference<ListResponseResult<ApiSearchCardBenefitResponseDto>>() {})
            .timeout(Duration.ofSeconds(10))
            .onErrorMap(TimeoutException.class, ex -> new BankServerTimeException())
            .block().getData();
    }

    public boolean getUserCi(String userCi) {
        log.info("BANK API : 뱅킹 서버에서 유저 CI 유무 확인하기");
        return Boolean.TRUE.equals(getDefaultWebClient().get()
                .uri("/mydata/ci/" + userCi)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, error -> Mono.error(new BankServerClientException()))
                .onStatus(HttpStatusCode::is5xxServerError, error -> Mono.error(new BankServerException()))
                .bodyToMono(Boolean.class)
                .onErrorMap(TimeoutException.class, ex -> new BankServerTimeException())
                .block());
    }
}
