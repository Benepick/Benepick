package com.ssafy.benepick.domain.card.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;
import com.ssafy.benepick.domain.card.repository.CardCompanyRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardCompanyServiceImpl implements CardCompanyService {

	private final CardCompanyRepository cardCompanyRepository;

	@Override
	public List<CardCompanyResponseDto> getAllCardCompany() {
		log.info("CardCompanyServiceImpl_getAllCardCompany | 모든 카드사 조회");

		return cardCompanyRepository.findAll()
			.stream()
			.map(cardCompany -> cardCompany.toCardCompanyResponseDto())
			.collect(Collectors.toList());
	}
}
