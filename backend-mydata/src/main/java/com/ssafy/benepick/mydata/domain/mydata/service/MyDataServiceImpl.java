package com.ssafy.benepick.mydata.domain.mydata.service;


import com.ssafy.benepick.mydata.domain.card.dto.response.ApiCardResponseDto;
import com.ssafy.benepick.mydata.domain.card.dto.response.ApiCategory1ResponseDto;
import com.ssafy.benepick.mydata.domain.card.dto.response.ApiCategory2ResponseDto;
import com.ssafy.benepick.mydata.domain.card.entity.*;
import com.ssafy.benepick.mydata.domain.mydata.dto.request.ApiMyDataCardRequestDto;
import com.ssafy.benepick.mydata.domain.mydata.dto.response.ApiMyDataCardResponseDto;
import com.ssafy.benepick.mydata.domain.mydata.dto.response.ApiMyDataUserResponseDto;
import com.ssafy.benepick.mydata.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.mydata.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.mydata.domain.mydata.repository.MyDataCardRepository;
import com.ssafy.benepick.mydata.domain.mydata.repository.MyDataPaymentRepository;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyDataServiceImpl implements MyDataService {

    private final MyDataCardRepository myDataCardRepository;
    private final MyDataPaymentRepository myDataPaymentRepository;

    @Override
    public List<ApiMyDataCardResponseDto> getMyDataCard(Long cardCompanyId , String userId) {
        log.info("MyDataServiceImpl_getMyDataCard || 마이 데이터 정보 메인 서버로 보내기");
        List<MyDataCard> myDataCardList = myDataCardRepository.findByUserIdAndCompanyId(userId, cardCompanyId);
        List<ApiMyDataCardResponseDto> apiMyDataCardResponseDtoList = new ArrayList<>();

        myDataCardList.stream().forEach(myDataCard -> {
            ApiMyDataCardResponseDto apiMyDataCardResponseDto = myDataCard.toDto();

            apiMyDataCardResponseDto.setApiMyDataUserResponseDto(myDataCard.getMyDataUser().toDto());
            apiMyDataCardResponseDto.setApiMyDataPaymentResponseDtoList(
                myDataCard.getMyDataPaymentList()
                    .stream()
                    .map(myDataPayment -> myDataPayment.toDto())
                    .collect(Collectors.toList())
            );

            ApiCardResponseDto apiCardResponseDto = myDataCard.getCard().toDto();
            apiCardResponseDto.setApiCardCompanyResponseDto(myDataCard.getCard().getCardCompany().toApiCardCompanyResponseDto());

            myDataCard.getCard().getCategory1List().stream().forEach(category1 -> {
                ApiCategory1ResponseDto apiCategory1ResponseDto = category1.toDto();

                category1.getCategory2List().stream().forEach(category2 -> {
                    ApiCategory2ResponseDto apiCategory2ResponseDto = category2.toDto();
                    List<Category3> category3List = category2.getCategory3List();
                    category3List.stream().forEach(category3 -> apiCategory2ResponseDto.getCategory3List().add(category3.toDto()));
                    apiCategory1ResponseDto.getCategory2List().add(apiCategory2ResponseDto);
                });
                category1.getCardBenefitList().stream().forEach(cardBenefit -> apiCategory1ResponseDto.getCardBenefitList().add(cardBenefit.toDto()));
                apiCardResponseDto.getCategory1List().add(apiCategory1ResponseDto);
            });
            apiMyDataCardResponseDto.setApiCardResponseDto(apiCardResponseDto);
            apiMyDataCardResponseDtoList.add(apiMyDataCardResponseDto);
        });

        return apiMyDataCardResponseDtoList;
    }

    @Override
    public List<ApiMyDataCardResponseDto> getTransactionDataAfterLastRenewalTime(Long cardCompanyId, String userId,
        LocalDateTime lastRenewalTime) {
        log.info("MyDataServiceImpl_getTransactionDataAfterLastRenewalTime || 사용자 마이 데이터 갱신");
        List<MyDataCard> myDataCardList = myDataCardRepository.findByUserIdAndCompanyId(userId, cardCompanyId);
        List<ApiMyDataCardResponseDto> apiMyDataCardResponseDtoList = new ArrayList<>();

        myDataCardList.stream().forEach(myDataCard -> {
            ApiMyDataCardResponseDto apiMyDataCardResponseDto = myDataCard.toDto();

            apiMyDataCardResponseDto.setApiMyDataUserResponseDto(myDataCard.getMyDataUser().toDto());
            apiMyDataCardResponseDto.setApiMyDataPaymentResponseDtoList(
                myDataPaymentRepository.findByMyDataCardIdAndAfterDate(myDataCard.getMyDataCardId(), lastRenewalTime)
                    .stream()
                    .map(myDataPayment -> myDataPayment.toDto())
                    .collect(Collectors.toList())
            );
            ApiCardResponseDto apiCardResponseDto = myDataCard.getCard().toDto();
            apiMyDataCardResponseDto.setApiCardResponseDto(apiCardResponseDto);

            apiMyDataCardResponseDtoList.add(apiMyDataCardResponseDto);
        });

        return apiMyDataCardResponseDtoList;
    }
}
