package com.ssafy.benepick.domain.user.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.benepick.domain.card.entity.Category1;
import com.ssafy.benepick.domain.card.service.CardService;
import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCard;
import com.ssafy.benepick.domain.user.entity.UserCardBenefit;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import com.ssafy.benepick.domain.user.entity.UserCardCategory2;
import com.ssafy.benepick.domain.user.entity.UserPayment;
import com.ssafy.benepick.domain.user.repository.UserCardCategory1Repository;
import com.ssafy.benepick.domain.user.repository.UserCardRepository;
import com.ssafy.benepick.domain.user.repository.UserPaymentRepository;
import com.ssafy.benepick.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserCardServiceImpl implements  UserCardService{

	private final UserCardRepository userCardRepository;
	private final UserRepository userRepository;
	private final UserPaymentRepository userPaymentRepository;
	private final UserCardCategory1Repository userCardCategory1Repository;
	private final CardService cardService;

	@Override
	@Transactional(transactionManager = "benepickTransactionManager")
	public void linkUserCardAndUserPaymentByMyDataCard(List<MyDataCard> myDataCardList) {
		log.info("UserCardServiceImpl_linkUserCardAndUserPaymentByMyDataCard || 마이데이터 유저 카드 데이터를 유저 카드데이터에 연동");

		User user = userRepository.findById(myDataCardList.get(0).getMyDataUser().getMyDataUserId()).get();
		myDataCardList.stream().forEach(myDataCard -> {
			UserCard userCard = myDataCardToUserCard(myDataCard, user);
			userCardRepository.save(userCard);

			// 결제 내역 연동
			List<UserPayment> userCardPaymentList = myDataCard.getMyDataPaymentList().stream()
				.map(myDataPayment -> myDataPaymentToUserPayment(myDataPayment,userCard))
				.collect(Collectors.toList());

			List<UserCardCategory1> userCardCategory1List = new ArrayList<>();

			// 카테고리1 연동
			myDataCard.getCard().getCategory1List().stream().forEach(category1 -> {
				UserCardCategory1 userCardCategory1 = category1.toUserCardCategory1(userCard);

				category1.getCardBenefitList().stream().forEach(cardBenefit -> {
					userCardCategory1.addUserCardBenefit(cardBenefit.toUserCardBenefit(userCardCategory1));
				});

				// 카테고리1 에대하여 카테고리2 연동
				category1.getCategory2List().stream().forEach(category2 -> {
					UserCardCategory2 userCardCategory2 = category2.toUserCardCategory2();

					//카테고리2 에대하여 카테고리3 연동
					category2.getCategory3List().stream().forEach(category3 -> {
						userCardCategory2.addUserCardCategory3(category3.toUserCardCategory3());
					});

					userCardCategory1.addUserCardCategory2(userCardCategory2);
				});
				userCardCategory1List.add(userCardCategory1);
			});

			userCardCategory1Repository.saveAll(userCardCategory1List);
			userPaymentRepository.saveAll(userCardPaymentList);
		});
	}

	// private List<UserCardCategory1> toUserCardCategory1(List<Category1> category1List , UserCard userCard){
	// 	List<UserCardCategory1> userCardCategory1List = new ArrayList<>();
	//
	// 	category1List.stream().forEach(category1 -> {
	// 		category1.to
	//
	// 		// 혜택 정보들
	// 		List<UserCardBenefit> userCardBenefitList = category1.getCardBenefitList()
	// 			.stream()
	// 			.map(cardBenefit -> cardBenefit.toUserCardBenefit(category1))
	// 			.toList();
	// 	});
	//
	//
	//
	// 	return userCardCategory1List;
	// }


	@Override
	public UserCard myDataCardToUserCard(MyDataCard myDataCard,User user) {
		return UserCard.builder()
			.user(user)
			.userCardCompanyName(myDataCard.getCard().getCardCompany().getCardCompanyName())
			.userCardSerialNumber(myDataCard.getMyDataCardId())
			.userCardCode(myDataCard.getCard().getCardCode())
			.userCardName(myDataCard.getCard().getCardName())
			.userCardExpirationDate(myDataCard.getMyDataCardExpirationDate())
			.userCardImgUrl(myDataCard.getCard().getCardImgUrl())
			.userCardCompanyImgUrl(myDataCard.getCard().getCardCompany().getCardCompanyImgUrl())
			.userCardCurrentPerformance(0)
			.userCardPrevPerformance(0)
			.build();
	}

	@Override
	public UserPayment myDataPaymentToUserPayment(MyDataPayment myDataPayment , UserCard userCard) {
		return UserPayment.builder()
			.userCard(userCard)
			.userPaymentCategory1(myDataPayment.getMyDataPaymentCategory1())
			.userPaymentCategory2(myDataPayment.getMyDataPaymentCategory2())
			.userPaymentDateTime(myDataPayment.getMyDataPaymentDate())
			.userPaymentAmount(myDataPayment.getMyDataPaymentAmount())
			.userPaymentMerchantInfo(myDataPayment.getMyDataPaymentMerchantName())
			.userPaymentReceivedBenefitAmount(myDataPayment.getMyDataPaymentReceivedBenefitAmount())
			.userPaymentCardCode(myDataPayment.getMyDataPaymentCardCode())
			.build();
	}
}
