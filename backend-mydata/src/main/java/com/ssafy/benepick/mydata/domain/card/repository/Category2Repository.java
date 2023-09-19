package com.ssafy.benepick.mydata.domain.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.ssafy.benepick.mydata.domain.card.entity.Category1;
import com.ssafy.benepick.mydata.domain.card.entity.Category2;

public interface Category2Repository extends JpaRepository<Category2, Long> {
    List<Category2> findByCategory1(Category1 category1);
}
