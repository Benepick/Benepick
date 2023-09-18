package com.ssafy.benepick.domain.card.service;

import java.util.List;

import com.ssafy.benepick.domain.card.entity.Category1;

public interface CardService {
	List<Category1> findCategory1ListByCardCode(Long cardCode);
}
