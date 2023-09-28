package com.ssafy.benepick.mydata.domain.card.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.benepick.mydata.domain.card.entity.Category3;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface Category3Repository extends JpaRepository<Category3,Long> {

	@Query("SELECT c " +
			"FROM Category3 c " +
			"WHERE LOWER(c.category3Name) LIKE LOWER(CONCAT('%', :category3Name, '%'))")
	List<Category3> findByCategory3Name(@Param(value = "category3Name") String category3Name);
}
