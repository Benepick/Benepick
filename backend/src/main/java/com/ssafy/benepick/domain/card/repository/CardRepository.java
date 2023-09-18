package com.ssafy.benepick.domain.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.benepick.domain.card.entity.Card;

public interface CardRepository extends JpaRepository<Card , Long> {
    Card findByCardCode(Long cardCode);
}
