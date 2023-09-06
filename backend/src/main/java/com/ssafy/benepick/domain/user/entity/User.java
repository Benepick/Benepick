package com.ssafy.benepick.domain.user.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.time.LocalDateTime;
import java.util.*;

import com.ssafy.benepick.domain.card.entity.CardCompany;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

	@Id
	private String userId;

	@Column(nullable = false)
	private String userName;

	@Column(nullable = false)
	private String userSocialNumber;

	@Column(nullable = false)
	private String userPhoneNumber;

	@Column(nullable = false)
	private String userGenderAndGenerationCode;

	@Column(nullable = false)
	private String userSimplePassword;

	@Column(nullable = false)
	private boolean isPushActive;

	@Column(nullable = false)
	private boolean isAutoLoginActive;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCard> userCardList;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCardCompany> userCardCompanyList;

	public void changeSimplePassword(String userSimplePassword){
		this.userSimplePassword = userSimplePassword;
	}

	public void linkCardCompany(CardCompany cardCompany){
		LocalDateTime now = LocalDateTime.now();

		this.userCardCompanyList.add(
			UserCardCompany.builder()
				.user(this)
				.userCardCompanyId(cardCompany.getCardCompanyId())
				.userCardCompanyRequestDate(now)
				.userCardCompanyExpirationDate(now.plusYears(1))
				.build());
	}
}
