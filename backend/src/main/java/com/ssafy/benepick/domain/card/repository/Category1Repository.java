package com.ssafy.benepick.domain.card.repository;

import com.ssafy.benepick.domain.card.entity.Card;
import com.ssafy.benepick.domain.card.entity.Category1;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Category1Repository extends JpaRepository<Category1, Long> {
    List<Category1> findByCard(Card card);
}
