package com.ssafy.benepick.mydata.domain.card.repository;

import com.ssafy.benepick.mydata.domain.card.entity.CardCompany;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CardCompanyRepository extends JpaRepository<CardCompany, Long> {
}
