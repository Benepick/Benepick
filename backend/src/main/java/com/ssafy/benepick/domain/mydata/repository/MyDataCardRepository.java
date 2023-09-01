package com.ssafy.benepick.domain.mydata.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.benepick.domain.mydata.entity.MyDataCard;

public interface MyDataCardRepository extends JpaRepository<MyDataCard, String> {
}
