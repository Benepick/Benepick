package com.ssafy.benepick.domain.card.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.ssafy.benepick.global.api.dto.response.ApiCardCompanyResponseDto;
import com.ssafy.benepick.global.api.service.ApiService;
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
import com.ssafy.benepick.domain.user.service.UserCardCompanyService;
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
	private final UserCardCompanyService userCardCompanyService;
	private final ApiService apiService;

	@Override
	public List<CardCompanyResponseDto> getAllCardCompany(int isSignUp,HttpServletRequest request) {
		log.info("CardCompanyServiceImpl_getAllCardCompany | 모든 카드사 조회");


		if(isSignUp == 1){
			return apiService.getCardCompanyListFromMyDataServer()
					.stream()
					.map(apiCardCompanyResponseDto -> apiCardCompanyResponseDto.toCardCompanyResponseDtoForSignUp())
					.collect(Collectors.toList());

		}

		List<UserCardCompany> userCardCompanyList = userService.getUserFromRequest(request).getUserCardCompanyList();

		Set<Long> linkedCardCompanyIds = userCardCompanyList.stream()
			.map(UserCardCompany::getUserCardCompanyId)
			.collect(Collectors.toSet());

		return apiService.getCardCompanyListFromMyDataServer()
				.stream()
				.map(apiCardCompanyResponseDto -> apiCardCompanyResponseDto.toCardCompanyResponseDto(linkedCardCompanyIds.contains(apiCardCompanyResponseDto.getCardCompanyId())))
				.collect(Collectors.toList());
	}

	@Override
	public void linkAndRenewCardCompany(LinkAndRenewCardCompanyRequestDto linkAndRenewCardCompanyRequestDto, HttpServletRequest request) {
		log.info("CardCompanyServiceImpl_linkAndRenewCardCompany | 카드사 연동 및 연동 기간 갱신");
		User loginUser = userService.getUserFromRequest(request);
		List<UserCardCompany> userCardCompanyList = loginUser.getUserCardCompanyList();

		for (Long cardCompanyId : linkAndRenewCardCompanyRequestDto.getCardCompanyIdList()) {
			boolean isExist = false;

			for (UserCardCompany userCardCompany : userCardCompanyList){
				log.info("카드사 유효기간 갱신");
				if(userCardCompany.getUserCardCompanyId().equals(cardCompanyId)){
					userCardCompany.renewDate();
					isExist = true;
					break;
				}
			}

			// 카드사가 연동이 안된상태일경우 새로 연동
			if(!isExist) {
				log.info("새로운 카드사 연동");
				loginUser.linkCardCompany(apiService.getCardCompanyFromMyDataServer(cardCompanyId));
				myDataService.linkCard(cardCompanyId , loginUser.getUserId());
			}
		}
	}

	@Override
	public void cancelLinkCardCompany(Long cardCompanyId , HttpServletRequest request) {
		log.info("CardCompanyServiceImpl_cancelLinkCardCompany | 카드사 연동 해제");
		User loginUser = userService.getUserFromRequest(request);
		System.out.println("cardCompanyId = " + cardCompanyId);

		loginUser.getUserCardCompanyList().stream()
			.filter(userCardCompany -> userCardCompany.getUserCardCompanyId().equals(cardCompanyId))
			.findFirst()
			.ifPresentOrElse(
				userCardCompany -> userCardCompanyService.cancelLinkCardCompany(loginUser,userCardCompany),
				() -> { throw new NotExistLinkCardCompanyException(); }
			);
	}
}
