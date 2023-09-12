package com.ssafy.benepick.domain.mydata.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;

public interface MyDataPaymentRepository extends JpaRepository<MyDataPayment, Long> {
	@Query("SELECT p FROM MyDataPayment p " +
		"WHERE p.myDataCard.myDataCardId = :myDataCardId " +
		"AND MONTH(p.myDataPaymentDate) = :month " +
		"AND YEAR(p.myDataPaymentDate) = :year")
	List<MyDataPayment> findByMyDataCardAndMonth(@Param("myDataCardId") String myDataCardId, @Param("month") int month, @Param("year") int year);
}
