package com.ssafy.benepick.mydata.domain.card.service;

import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.benepick.mydata.domain.card.dto.response.ApiCardCompanyResponseDto;
import com.ssafy.benepick.mydata.domain.card.repository.CardCompanyRepository;
import com.ssafy.benepick.mydata.domain.mydata.service.MyDataService;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardCompanyServiceImpl implements CardCompanyService {

	private final CardCompanyRepository cardCompanyRepository;

	@Override
	public List<ApiCardCompanyResponseDto> getAllCardCompany() {
		log.info("CardCompanyServiceImpl_getAllCardCompany | 모든 카드사 조회");
		return cardCompanyRepository.findAll()
				.stream()
				.map(cardCompany -> cardCompany.toApiCardCompanyResponseDto())
				.collect(Collectors.toList());
	}


}
