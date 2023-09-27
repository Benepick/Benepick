package com.ssafy.benepick.mydata.domain.card.repository;

import com.ssafy.benepick.mydata.domain.card.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CardRepository extends JpaRepository<Card, Long> {
}
