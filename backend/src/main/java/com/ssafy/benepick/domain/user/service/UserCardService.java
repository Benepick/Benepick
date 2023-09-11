package com.ssafy.benepick.domain.user.service;

import java.util.List;

import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserPayment;

public interface UserCardService {

	void linkUserCardAndUserPaymentByMyDataCard(List<MyDataCard>myDataCardList);
	UserCard myDataCardToUserCard(MyDataCard myDataCard, User user);
	UserPayment myDataPaymentToUserPayment(MyDataPayment myDataPayment , UserCard userCard);
}
