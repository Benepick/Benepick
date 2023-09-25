package com.ssafy.benepick.mydata.domain.card.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.benepick.mydata.domain.card.entity.Category3;

public interface Category3Repository extends JpaRepository<Category3,Long> {

	List<Category3> findByCategory3Name(String category3Name);
}
