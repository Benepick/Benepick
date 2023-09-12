package com.ssafy.benepick.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.benepick.domain.user.entity.UserPayment;

public interface UserPaymentRepository extends JpaRepository<UserPayment , Long> {
}
