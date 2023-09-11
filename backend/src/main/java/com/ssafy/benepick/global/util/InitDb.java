package com.ssafy.benepick.global.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.benepick.domain.card.entity.Card;
import com.ssafy.benepick.domain.card.entity.CardCompany;
import com.ssafy.benepick.domain.card.repository.CardCompanyRepository;
import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;
import com.ssafy.benepick.domain.mydata.entity.MyDataUser;
import com.ssafy.benepick.domain.mydata.repository.MyDataUserRepository;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCardCompany;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitDb {

	private final InitService initService;

	@PostConstruct
	public void init() {
		initService.userInit();
		initService.bankInit();
		// initService.test();
	}

	@Component
	@RequiredArgsConstructor
	static class InitService {

		@Autowired
		@Qualifier("benepickEntityManager")
		private EntityManager benepickEntityManager;

		@Autowired
		@Qualifier("bankBenepickEntityManager")
		private EntityManager bankBenepickEntityManager;

		private final CardCompanyRepository cardCompanyRepository;
		private final MyDataUserRepository myDataUserRepository;

		@Transactional(transactionManager = "bankBenepickTransactionManager")
		public void bankInit(){
			CardCompany cardCompany1 = CardCompany.builder().cardCompanyId(1L).cardCompanyName("신한").cardCompanyImgUrl("신한이미지").build();
			CardCompany cardCompany2 = CardCompany.builder().cardCompanyId(2L).cardCompanyName("기업").cardCompanyImgUrl("기업이미지").build();
			CardCompany cardCompany3 = CardCompany.builder().cardCompanyId(3L).cardCompanyName("농협").cardCompanyImgUrl("농협이미지").build();
			CardCompany cardCompany4 = CardCompany.builder().cardCompanyId(4L).cardCompanyName("국민").cardCompanyImgUrl("국민이미지").build();

			bankBenepickEntityManager.persist(cardCompany1);
			bankBenepickEntityManager.persist(cardCompany2);
			bankBenepickEntityManager.persist(cardCompany3);
			bankBenepickEntityManager.persist(cardCompany4);

			Card card1 = Card.builder().cardCode(1L).cardCompany(cardCompany1).cardName("신한카드1").cardImgUrl("신한카드1이미지").build();
			Card card2 = Card.builder().cardCode(2L).cardCompany(cardCompany1).cardName("신한카드2").cardImgUrl("신한카드2이미지").build();
			Card card3 = Card.builder().cardCode(3L).cardCompany(cardCompany2).cardName("기업카드1").cardImgUrl("기업카드1이미지").build();
			Card card4 = Card.builder().cardCode(4L).cardCompany(cardCompany2).cardName("기업카드2").cardImgUrl("기업카드2이미지").build();
			Card card5 = Card.builder().cardCode(5L).cardCompany(cardCompany4).cardName("국민카드1").cardImgUrl("국민카드1이미지").build();

			bankBenepickEntityManager.persist(card1);
			bankBenepickEntityManager.persist(card2);
			bankBenepickEntityManager.persist(card3);
			bankBenepickEntityManager.persist(card4);
			bankBenepickEntityManager.persist(card5);

			MyDataUser myDataUser1 = MyDataUser.builder()
				.myDataUserId("f2a5b57c292a49374f1fa50262c76667fb4aacec3edd6c9f42abfbee58edf9f7").myDataUserName("박싸피")
				.myDataUserPhoneNumber("01011111111").myDataUserSocialNumber("000101").build();

			MyDataUser myDataUser2 = MyDataUser.builder()
				.myDataUserId("ex2").myDataUserName("김싸피")
				.myDataUserPhoneNumber("01022222222").myDataUserSocialNumber("000202").build();

			bankBenepickEntityManager.persist(myDataUser1);
			bankBenepickEntityManager.persist(myDataUser2);

			MyDataCard myDataCard1 = MyDataCard.builder()
				.myDataCardId("myDataCard1").myDataUser(myDataUser1)
				.card(card1).myDataCardExpirationDate(LocalDate.parse("2024-01-01")).build();

			MyDataCard myDataCard2 = MyDataCard.builder()
				.myDataCardId("myDataCard2").myDataUser(myDataUser1)
				.card(card2).myDataCardExpirationDate(LocalDate.parse("2024-02-02")).build();

			MyDataCard myDataCard3 = MyDataCard.builder()
				.myDataCardId("myDataCard3").myDataUser(myDataUser2)
				.card(card3).myDataCardExpirationDate(LocalDate.parse("2024-03-03")).build();

			MyDataCard myDataCard4 = MyDataCard.builder()
				.myDataCardId("myDataCard4").myDataUser(myDataUser2)
				.card(card4).myDataCardExpirationDate(LocalDate.parse("2024-04-04")).build();

			MyDataCard myDataCard5 = MyDataCard.builder()
				.myDataCardId("myDataCard5").myDataUser(myDataUser1)
				.card(card5).myDataCardExpirationDate(LocalDate.parse("2024-04-04")).build();

			bankBenepickEntityManager.persist(myDataCard1);
			bankBenepickEntityManager.persist(myDataCard2);
			bankBenepickEntityManager.persist(myDataCard3);
			bankBenepickEntityManager.persist(myDataCard4);
			bankBenepickEntityManager.persist(myDataCard5);

			MyDataPayment myDataPayment1 = MyDataPayment.builder().myDataPaymentId(1L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(10000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("바나프레소").myDataCard(myDataCard1).myDataPaymentBenefit(100)
				.build();

			MyDataPayment myDataPayment2 = MyDataPayment.builder().myDataPaymentId(2L)
				.myDataPaymentCategory("식당").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(20000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("맥도날드").myDataCard(myDataCard1).myDataPaymentBenefit(200)
				.build();

			MyDataPayment myDataPayment3 = MyDataPayment.builder().myDataPaymentId(3L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(30000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("스타벅스").myDataCard(myDataCard2).myDataPaymentBenefit(300)
				.build();

			MyDataPayment myDataPayment4 = MyDataPayment.builder().myDataPaymentId(4L)
				.myDataPaymentCategory("쇼핑").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(40000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("ABC마트").myDataCard(myDataCard2).myDataPaymentBenefit(400)
				.build();

			MyDataPayment myDataPayment5 = MyDataPayment.builder().myDataPaymentId(5L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(50000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("매머드").myDataCard(myDataCard3).myDataPaymentBenefit(500)
				.build();

			MyDataPayment myDataPayment6 = MyDataPayment.builder().myDataPaymentId(6L)
				.myDataPaymentCategory("식당").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(60000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("탕후루").myDataCard(myDataCard3).myDataPaymentBenefit(600)
				.build();

			MyDataPayment myDataPayment7 = MyDataPayment.builder().myDataPaymentId(7L)
				.myDataPaymentCategory("의료").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(70000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("역삼안과").myDataCard(myDataCard4).myDataPaymentBenefit(700)
				.build();

			MyDataPayment myDataPayment8 = MyDataPayment.builder().myDataPaymentId(8L)
				.myDataPaymentCategory("의료").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(80000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("설입성형외과").myDataCard(myDataCard4).myDataPaymentBenefit(800)
				.build();

			MyDataPayment myDataPayment10 = MyDataPayment.builder().myDataPaymentId(9L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(10000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("바나프레소").myDataCard(myDataCard1).myDataPaymentBenefit(200)
				.build();

			MyDataPayment myDataPayment11 = MyDataPayment.builder().myDataPaymentId(10L)
				.myDataPaymentCategory("식당").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(20000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("맥도날드").myDataCard(myDataCard1).myDataPaymentBenefit(500)
				.build();

			MyDataPayment myDataPayment12 = MyDataPayment.builder().myDataPaymentId(11L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(30000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("스타벅스").myDataCard(myDataCard5).myDataPaymentBenefit(800)
				.build();

			MyDataPayment myDataPayment13 = MyDataPayment.builder().myDataPaymentId(12L)
				.myDataPaymentCategory("쇼핑").myDataPaymentDate(LocalDateTime.now())
				.myDataPaymentAmount(40000).myDataPaymentCategory("카테1").myDataPaymentCategory2("카테2")
				.myDataPaymentMerchantName("ABC마트").myDataCard(myDataCard5).myDataPaymentBenefit(1000)
				.build();

			bankBenepickEntityManager.persist(myDataPayment1);
			bankBenepickEntityManager.persist(myDataPayment2);
			bankBenepickEntityManager.persist(myDataPayment3);
			bankBenepickEntityManager.persist(myDataPayment4);
			bankBenepickEntityManager.persist(myDataPayment5);
			bankBenepickEntityManager.persist(myDataPayment6);
			bankBenepickEntityManager.persist(myDataPayment7);
			bankBenepickEntityManager.persist(myDataPayment8);
			bankBenepickEntityManager.persist(myDataPayment10);
			bankBenepickEntityManager.persist(myDataPayment11);
			bankBenepickEntityManager.persist(myDataPayment12);
			bankBenepickEntityManager.persist(myDataPayment13);
		}

		@Transactional(transactionManager = "benepickTransactionManager")
		public void userInit() {
			User user1 = User.builder()
				.userId("f2a5b57c292a49374f1fa50262c76667fb4aacec3edd6c9f42abfbee58edf9f7")
				.userName("김싸피")
				.userPhoneNumber("01012345678")
				.userSocialNumber("990101")
				.userSimplePassword("123456")
				.userGenderAndGenerationCode("1")
				.isPushActive(false)
				.isAutoLoginActive(false)
				.userCardList(new ArrayList<>())
				.build();

			User user2 = User.builder()
				.userId("ex2")
				.userName("김싸피")
				.userPhoneNumber("01022222222")
				.userSocialNumber("000202")
				.userSimplePassword("654321")
				.userGenderAndGenerationCode("2")
				.isPushActive(false)
				.isAutoLoginActive(false)
				.userCardList(new ArrayList<>())
				.build();

			benepickEntityManager.persist(user1);
			benepickEntityManager.persist(user2);

			UserCardCompany userCardCompany1 = UserCardCompany.builder().user(user1)
				.userCardCompanyId(1L).userCardCompanyRequestDate(LocalDateTime.now())
				.userCardCompanyExpirationDate(LocalDateTime.now()).build();

			UserCardCompany userCardCompany2 = UserCardCompany.builder().user(user1)
				.userCardCompanyId(2L).userCardCompanyRequestDate(LocalDateTime.now())
				.userCardCompanyExpirationDate(LocalDateTime.now()).build();

			benepickEntityManager.persist(userCardCompany1);
			benepickEntityManager.persist(userCardCompany2);


		}

		// public void test(){
		// 	MyDataUser myDataUser = myDataUserRepository.findById("ex1").get();
		// 	System.out.println("myDataUser = " + myDataUser.getMyDataUserName());
		//
		// 	for (MyDataCard myDataCard : myDataUser.getMyDataCardList()) {
		// 		System.out.println("myDataCard = " + myDataCard.getMyDataCardName());
		// 		System.out.println("myDataCard = " + myDataCard.getCardCompany().getCardCompanyName());
		// 		for (MyDataPayment myDataPayment : myDataCard.getMyDataPaymentList()) {
		// 			System.out.println("myDataPayment = " + myDataPayment.getMyDataPaymentMerchantName());
		// 		}
		// 	}
		// }
	}
}
