package com.ssafy.benepick.mydata.domain.mydata.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.benepick.mydata.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.mydata.domain.mydata.entity.MyDataPayment;

public interface MyDataPaymentRepository  extends JpaRepository<MyDataPayment, String> {
	@Query("SELECT p " +
		"FROM MyDataPayment p " +
		"WHERE p.myDataCard.myDataCardId = :myDataCardId " +
		"AND p.myDataPaymentDate > :lastRenewalTime")
	List<MyDataPayment> findByMyDataCardIdAndAfterDate(
		@Param("myDataCardId") String myDataCardId,
		@Param("lastRenewalTime") LocalDateTime lastRenewalTime);
}
