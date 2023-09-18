package com.ssafy.benepick.domain.card.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.benepick.domain.card.entity.Card;
import com.ssafy.benepick.domain.card.entity.Category1;
import com.ssafy.benepick.domain.card.repository.CardRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardServiceImpl implements CardService{

	private final CardRepository cardRepository;

	@Override
	public List<Category1> findCategory1ListByCardCode(Long cardCode) {
		log.info("CardServiceImpl_findCategory1ByCardCode || 카드 코드 바탕 으로 혜택 정보 찾기");
		return cardRepository.findByCardCode(cardCode).getCategory1List();
	}
}
