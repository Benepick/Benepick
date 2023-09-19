package com.ssafy.benepick.domain.card.repository;

import com.ssafy.benepick.domain.card.entity.CardBenefit;
import com.ssafy.benepick.domain.card.entity.Category1;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardBenefitRepository extends JpaRepository<CardBenefit, Long> {
    List<CardBenefit> findByCategory1(Category1 category1);
}
