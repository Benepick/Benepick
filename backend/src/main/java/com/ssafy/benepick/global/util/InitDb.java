package com.ssafy.benepick.global.util;

import java.util.ArrayList;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.benepick.domain.user.entity.User;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitDb {

	private final InitService initService;

	@PostConstruct
	public void init() {
//		initService.userInit();
		// initService.bankInit();
		// initService.test();
	}

	@Component
	@Transactional
	@RequiredArgsConstructor
	static class InitService {

		// @Qualifier("benepickEntityManager")
		private final EntityManager em;

		// @Autowired
		// @Qualifier("bankBenepickEntityManager")
		// private EntityManager bankBenepickEntityManager;

		// @Transactional(transactionManager = "benepickTransactionManager")
		public void userInit() {
			User user1 = User.builder()
				.userId("e9832babc29cacbd7aa73c70b778978d973f22dc4e0abeef6ad221b982643b58")
				.userName("박현철")
				.userPhoneNumber("01093532680")
				.userSocialNumber("980623")
				.userSimplePassword("123456")
				.userGenderAndGenerationCode("1")
				.isPushActive(false)
				.isAutoLoginActive(false)
				.userCardList(new ArrayList<>())
				.build();

			User user2 = User.builder()
				.userId("0023d0b76401c484c123e9dcc603493f687fe4df8e96521e8e51aa2efd3fda0e")
				.userName("최정수")
				.userPhoneNumber("01051982656")
				.userSocialNumber("650122")
				.userSimplePassword("123456")
				.userGenderAndGenerationCode("1")
				.isPushActive(false)
				.isAutoLoginActive(false)
				.userCardList(new ArrayList<>())
				.build();

			em.persist(user1);
			em.persist(user2);

		}

	}
}
