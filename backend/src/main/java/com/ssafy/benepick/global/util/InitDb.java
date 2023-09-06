package com.ssafy.benepick.global.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

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
		initService.init();
		// initService.test();
	}

	@Component
	@Transactional
	@RequiredArgsConstructor
	static class InitService {

		private final EntityManager em;
		private final CardCompanyRepository cardCompanyRepository;
		private final MyDataUserRepository myDataUserRepository;

		public void init() {
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

			em.persist(user1);
			em.persist(user2);

			UserCardCompany userCardCompany1 = UserCardCompany.builder().user(user1)
				.userCardCompanyId(1L).userCardCompanyRequestDate(LocalDateTime.now())
				.userCardCompanyExpirationDate(LocalDateTime.now()).build();

			UserCardCompany userCardCompany2 = UserCardCompany.builder().user(user1)
				.userCardCompanyId(2L).userCardCompanyRequestDate(LocalDateTime.now())
				.userCardCompanyExpirationDate(LocalDateTime.now()).build();

			em.persist(userCardCompany1);
			em.persist(userCardCompany2);

			CardCompany cardCompany1 = CardCompany.builder().cardCompanyId(1L).cardCompanyName("신한").cardCompanyImgUrl("신한이미지").build();
			CardCompany cardCompany2 = CardCompany.builder().cardCompanyId(2L).cardCompanyName("기업").cardCompanyImgUrl("기업이미지").build();
			CardCompany cardCompany3 = CardCompany.builder().cardCompanyId(3L).cardCompanyName("농협").cardCompanyImgUrl("농협이미지").build();
			CardCompany cardCompany4 = CardCompany.builder().cardCompanyId(4L).cardCompanyName("국민").cardCompanyImgUrl("국민이미지").build();

			em.persist(cardCompany1);
			em.persist(cardCompany2);
			em.persist(cardCompany3);
			em.persist(cardCompany4);

			Card card1 = Card.builder().cardCode(1L).cardCompany(cardCompany1).cardName("신한카드1").cardImgUrl("신한카드1이미지").build();
			Card card2 = Card.builder().cardCode(2L).cardCompany(cardCompany1).cardName("신한카드2").cardImgUrl("신한카드2이미지").build();
			Card card3 = Card.builder().cardCode(3L).cardCompany(cardCompany2).cardName("기업카드1").cardImgUrl("기업카드1이미지").build();
			Card card4 = Card.builder().cardCode(4L).cardCompany(cardCompany2).cardName("기업카드2").cardImgUrl("기업카드2이미지").build();

			em.persist(card1);
			em.persist(card2);
			em.persist(card3);
			em.persist(card4);

			MyDataUser myDataUser1 = MyDataUser.builder()
				.myDataUserId("f2a5b57c292a49374f1fa50262c76667fb4aacec3edd6c9f42abfbee58edf9f7").myDataUserName("박싸피")
				.myDataUserPhoneNumber("01011111111").myDataUserSocialNumber("000101").build();

			MyDataUser myDataUser2 = MyDataUser.builder()
				.myDataUserId("ex2").myDataUserName("김싸피")
				.myDataUserPhoneNumber("01022222222").myDataUserSocialNumber("000202").build();

			em.persist(myDataUser1);
			em.persist(myDataUser2);

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

			em.persist(myDataCard1);
			em.persist(myDataCard2);
			em.persist(myDataCard3);
			em.persist(myDataCard4);

			MyDataPayment myDataPayment1 = MyDataPayment.builder().myDataPaymentId(1L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDate.parse("2023-09-01"))
				.myDataPaymentMerchantX(10).myDataPaymentMerchantY(10).myDataPaymentAmount(10000)
				.myDataPaymentMerchantName("바나프레소").myDataCard(myDataCard1).myDataPaymentBenefit(100)
				.build();

			MyDataPayment myDataPayment2 = MyDataPayment.builder().myDataPaymentId(2L)
				.myDataPaymentCategory("식당").myDataPaymentDate(LocalDate.parse("2023-09-02"))
				.myDataPaymentMerchantX(11).myDataPaymentMerchantY(11).myDataPaymentAmount(20000)
				.myDataPaymentMerchantName("맥도날드").myDataCard(myDataCard1).myDataPaymentBenefit(200)
				.build();

			MyDataPayment myDataPayment3 = MyDataPayment.builder().myDataPaymentId(3L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDate.parse("2023-09-03"))
				.myDataPaymentMerchantX(13).myDataPaymentMerchantY(13).myDataPaymentAmount(30000)
				.myDataPaymentMerchantName("스타벅스").myDataCard(myDataCard2).myDataPaymentBenefit(300)
				.build();

			MyDataPayment myDataPayment4 = MyDataPayment.builder().myDataPaymentId(4L)
				.myDataPaymentCategory("쇼핑").myDataPaymentDate(LocalDate.parse("2023-09-04"))
				.myDataPaymentMerchantX(14).myDataPaymentMerchantY(14).myDataPaymentAmount(40000)
				.myDataPaymentMerchantName("ABC마트").myDataCard(myDataCard2).myDataPaymentBenefit(400)
				.build();

			MyDataPayment myDataPayment5 = MyDataPayment.builder().myDataPaymentId(5L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDate.parse("2023-09-05"))
				.myDataPaymentMerchantX(15).myDataPaymentMerchantY(15).myDataPaymentAmount(50000)
				.myDataPaymentMerchantName("매머드").myDataCard(myDataCard3).myDataPaymentBenefit(500)
				.build();

			MyDataPayment myDataPayment6 = MyDataPayment.builder().myDataPaymentId(6L)
				.myDataPaymentCategory("식당").myDataPaymentDate(LocalDate.parse("2023-09-06"))
				.myDataPaymentMerchantX(16).myDataPaymentMerchantY(16).myDataPaymentAmount(60000)
				.myDataPaymentMerchantName("탕후루").myDataCard(myDataCard3).myDataPaymentBenefit(600)
				.build();

			MyDataPayment myDataPayment7 = MyDataPayment.builder().myDataPaymentId(7L)
				.myDataPaymentCategory("의료").myDataPaymentDate(LocalDate.parse("2023-09-07"))
				.myDataPaymentMerchantX(17).myDataPaymentMerchantY(17).myDataPaymentAmount(70000)
				.myDataPaymentMerchantName("역삼안과").myDataCard(myDataCard4).myDataPaymentBenefit(700)
				.build();

			MyDataPayment myDataPayment8 = MyDataPayment.builder().myDataPaymentId(8L)
				.myDataPaymentCategory("의료").myDataPaymentDate(LocalDate.parse("2023-09-08"))
				.myDataPaymentMerchantX(18).myDataPaymentMerchantY(18).myDataPaymentAmount(80000)
				.myDataPaymentMerchantName("설입성형외과").myDataCard(myDataCard4).myDataPaymentBenefit(800)
				.build();

			MyDataPayment myDataPayment10 = MyDataPayment.builder().myDataPaymentId(9L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDate.parse("2023-06-01"))
				.myDataPaymentMerchantX(10).myDataPaymentMerchantY(10).myDataPaymentAmount(10000)
				.myDataPaymentMerchantName("바나프레소").myDataCard(myDataCard1).myDataPaymentBenefit(200)
				.build();

			MyDataPayment myDataPayment11 = MyDataPayment.builder().myDataPaymentId(10L)
				.myDataPaymentCategory("식당").myDataPaymentDate(LocalDate.parse("2023-07-02"))
				.myDataPaymentMerchantX(11).myDataPaymentMerchantY(11).myDataPaymentAmount(20000)
				.myDataPaymentMerchantName("맥도날드").myDataCard(myDataCard1).myDataPaymentBenefit(500)
				.build();

			MyDataPayment myDataPayment12 = MyDataPayment.builder().myDataPaymentId(11L)
				.myDataPaymentCategory("카페").myDataPaymentDate(LocalDate.parse("2023-08-03"))
				.myDataPaymentMerchantX(13).myDataPaymentMerchantY(13).myDataPaymentAmount(30000)
				.myDataPaymentMerchantName("스타벅스").myDataCard(myDataCard2).myDataPaymentBenefit(800)
				.build();

			MyDataPayment myDataPayment13 = MyDataPayment.builder().myDataPaymentId(12L)
				.myDataPaymentCategory("쇼핑").myDataPaymentDate(LocalDate.parse("2023-08-04"))
				.myDataPaymentMerchantX(14).myDataPaymentMerchantY(14).myDataPaymentAmount(40000)
				.myDataPaymentMerchantName("ABC마트").myDataCard(myDataCard2).myDataPaymentBenefit(1000)
				.build();

			em.persist(myDataPayment1);
			em.persist(myDataPayment2);
			em.persist(myDataPayment3);
			em.persist(myDataPayment4);
			em.persist(myDataPayment5);
			em.persist(myDataPayment6);
			em.persist(myDataPayment7);
			em.persist(myDataPayment8);
			em.persist(myDataPayment10);
			em.persist(myDataPayment11);
			em.persist(myDataPayment12);
			em.persist(myDataPayment13);


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
