package com.ssafy.benepick.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.benepick.domain.user.entity.UserPayment;

public interface UserPaymentRepository extends JpaRepository<UserPayment , Long> {

	@Query("SELECT p FROM UserPayment p " +
		"WHERE p.userCard.userCardId = :userCardId " +
		"AND MONTH(p.userPaymentDateTime) = :month " +
		"AND YEAR(p.userPaymentDateTime) = :year")
	List<UserPayment> findByUserCardIdAndMonth(@Param("userCardId") Long userCardId, @Param("year") int year, @Param("month") int month);
}
