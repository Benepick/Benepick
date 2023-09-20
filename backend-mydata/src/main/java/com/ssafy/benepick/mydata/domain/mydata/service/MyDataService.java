package com.ssafy.benepick.mydata.domain.mydata.service;


import com.ssafy.benepick.mydata.domain.mydata.dto.request.ApiMyDataCardRequestDto;
import com.ssafy.benepick.mydata.domain.mydata.dto.response.ApiMyDataCardResponseDto;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface MyDataService {
    List<ApiMyDataCardResponseDto> getMyDataCard(Long cardCompanyId , String userId);
    List<ApiMyDataCardResponseDto> getTransactionDataAfterLastRenewalTime(Long cardCompanyId , String userId, LocalDateTime lastRenewalTime);
}
