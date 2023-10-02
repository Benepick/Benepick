package com.ssafy.benepick.domain.user.service;

import java.util.List;

import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserPayment;

public interface UserPaymentService {
	List<UserPayment> getUserPaymentListByUserCardAndDate(Long myDataCardId , int year , int month);
}
