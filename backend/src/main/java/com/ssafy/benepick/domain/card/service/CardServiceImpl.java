package com.ssafy.benepick.domain.card.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.domain.user.repository.UserCardRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardServiceImpl implements CardService{

	private final UserCardRepository userCardRepository;

	@Override
	public List<UserCardCategory1> findCategory1ListByCardCode(Long cardCode) {
		log.info("CardServiceImpl_findCategory1ByCardCode || 카드 코드 바탕 으로 혜택 정보 찾기");
		return userCardRepository.findByUserCardCode(cardCode).getUserCardCategory1List();
	}
}
