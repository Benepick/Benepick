package com.ssafy.benepick.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.benepick.domain.user.entity.UserPayment;

public interface UserPaymentRepository extends JpaRepository<UserPayment , Long> {

	@Query(value = "SELECT * FROM user_payment " +
		"WHERE user_card_id = :myDataCardId " +
		"AND MONTH(user_payment_date_time) = :month " +
		"AND YEAR(user_payment_date_time) = :year ", nativeQuery = true)
	List<UserPayment> findByUserCardIdAndMonth(@Param("myDataCardId") Long myDataCardId,
		@Param("year") int year,
		@Param("month") int month);

}
