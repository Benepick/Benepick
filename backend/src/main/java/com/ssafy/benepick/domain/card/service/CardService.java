package com.ssafy.benepick.domain.card.service;

import java.util.List;

import com.ssafy.benepick.domain.user.entity.UserCardCategory1;

public interface CardService {
	List<UserCardCategory1> findCategory1ListByCardCode(Long cardCode);
}
