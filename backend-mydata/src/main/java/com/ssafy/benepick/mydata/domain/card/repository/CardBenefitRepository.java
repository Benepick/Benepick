package com.ssafy.benepick.mydata.domain.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.ssafy.benepick.mydata.domain.card.entity.CardBenefit;
import com.ssafy.benepick.mydata.domain.card.entity.Category1;

public interface CardBenefitRepository extends JpaRepository<CardBenefit, Long> {
    List<CardBenefit> findByCategory1(Category1 category1);
}
