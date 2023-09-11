package com.ssafy.benepick.domain.mydata.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.benepick.domain.mydata.entity.MyDataCard;

public interface MyDataCardRepository extends JpaRepository<MyDataCard, String> {
	@Query("SELECT m FROM MyDataCard m WHERE m.myDataUser.myDataUserId = :userId AND m.card.cardCompany.cardCompanyId = :companyId")
	List<MyDataCard> findByUserIdAndCompanyId(@Param("userId") String userId, @Param("companyId") Long companyId);
}
