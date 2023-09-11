package com.ssafy.benepick.domain.card.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.benepick.domain.card.dto.request.LinkAndRenewCardCompanyRequestDto;
import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;
import com.ssafy.benepick.domain.card.entity.CardCompany;
import com.ssafy.benepick.domain.card.repository.CardCompanyRepository;
import com.ssafy.benepick.domain.mydata.service.MyDataService;
import com.ssafy.benepick.domain.user.entity.User;
import com.ssafy.benepick.domain.user.entity.UserCardCompany;
import com.ssafy.benepick.domain.user.repository.UserRepository;
import com.ssafy.benepick.domain.user.service.UserService;
import com.ssafy.benepick.global.exception.NotExistCardCompanyException;
import com.ssafy.benepick.global.exception.NotExistLinkCardCompanyException;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CardCompanyServiceImpl implements CardCompanyService {

	private final CardCompanyRepository cardCompanyRepository;
	private final MyDataService myDataService;
	private final UserService userService;
	private final UserRepository userRepository;

	@Override
	public List<CardCompanyResponseDto> getAllCardCompany() {
		log.info("CardCompanyServiceImpl_getAllCardCompany | 모든 카드사 조회");

		return cardCompanyRepository.findAll()
			.stream()
			.map(cardCompany -> cardCompany.toCardCompanyResponseDto())
			.collect(Collectors.toList());
	}

	@Override
	@Transactional(transactionManager = "benepickTransactionManager")
	public void linkAndRenewCardCompany(LinkAndRenewCardCompanyRequestDto linkAndRenewCardCompanyRequestDto, HttpServletRequest request) {
		log.info("CardCompanyServiceImpl_linkAndRenewCardCompany | 카드사 연동 및 연동 기간 갱신");
		// User loginUser = userService.getUserFromRequest(request);
		User loginUser = userRepository.findById("f2a5b57c292a49374f1fa50262c76667fb4aacec3edd6c9f42abfbee58edf9f7").get();
		List<UserCardCompany> userCardCompanyList = loginUser.getUserCardCompanyList();

		for (Long cardCompanyId : linkAndRenewCardCompanyRequestDto.getCardCompanyIdList()) {
			boolean isExist = false;

			for (UserCardCompany userCardCompany : userCardCompanyList){
				// 카드사가 이미 연동 되어있다면 기간 갱신
				if(userCardCompany.getUserCardCompanyId().equals(cardCompanyId)){
					userCardCompany.renewDate();
					isExist = true;
					break;
				}
			}

			// 카드사가 연동이 안된상태일경우 새로 연동
			if(!isExist) {
				loginUser.linkCardCompany(cardCompanyRepository.findById(cardCompanyId).orElseThrow(NotExistCardCompanyException::new));
				myDataService.linkCard(cardCompanyId , loginUser.getUserId());
			}
		}
	}

	@Override
	@Transactional(transactionManager = "benepickTransactionManager")
	public void cancelLinkCardCompany(Long cardCompanyId , HttpServletRequest request) {
		log.info("CardCompanyServiceImpl_cancelLinkCardCompany | 카드사 연동 해제");
		User loginUser = userService.getUserFromRequest(request);
		// User loginUser = userRepository.findById("ex1").get();

		loginUser.getUserCardCompanyList().stream()
			.filter(userCardCompany -> userCardCompany.getUserCardCompanyId().equals(cardCompanyId))
			.findFirst()
			.ifPresentOrElse(
				userCardCompany -> loginUser.cancelLinkCardCompany(userCardCompany),
				() -> { throw new NotExistLinkCardCompanyException(); }
			);
	}
}
