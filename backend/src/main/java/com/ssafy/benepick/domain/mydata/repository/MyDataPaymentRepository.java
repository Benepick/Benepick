package com.ssafy.benepick.domain.mydata.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;

public interface MyDataPaymentRepository extends JpaRepository<MyDataPayment, Long> {
}
