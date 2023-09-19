package com.ssafy.benepick.domain.card.repository;

import com.ssafy.benepick.domain.card.entity.Category1;
import com.ssafy.benepick.domain.card.entity.Category2;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Category2Repository extends JpaRepository<Category2, Long> {
    List<Category2> findByCategory1(Category1 category1);
}
