package com.ssafy.benepick.domain.user.entity;

import com.ssafy.benepick.global.api.dto.response.ApiCardCompanyResponseDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user" , schema = "benepick")
public class User implements Serializable {

	@Id
	@Column(name = "user_id")
	private String userId;

	@Column(nullable = false , name = "user_name")
	private String userName;

	@Column(nullable = false ,name = "user_social_number")
	private String userSocialNumber;

	@Column(nullable = false , name = "user_phone_number")
	private String userPhoneNumber;

	@Column(nullable = false , name = "user_gender_and_generation_code")
	private String userGenderAndGenerationCode;

	@Column(nullable = false , name = "user_simple_password")
	private String userSimplePassword;

	@Column(nullable = false , name = "is_push_active")
	private boolean isPushActive;

	@Column(nullable = false , name = "is_auto_login_active")
	private boolean isAutoLoginActive;

	@Column(name = "user_last_renewal_time")
	private LocalDateTime userLastRenewalTime;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCard> userCardList;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCardCompany> userCardCompanyList;

	public void changeSimplePassword(String userSimplePassword){
		this.userSimplePassword = userSimplePassword;
	}

	public void linkCardCompany(ApiCardCompanyResponseDto cardCompany){
		LocalDateTime now = LocalDateTime.now();

		this.userCardCompanyList.add(
			UserCardCompany.builder()
				.user(this)
				.cardCompanyId(cardCompany.getCardCompanyId())
				.userCardCompanyName(cardCompany.getCardCompanyName())
				.userCardCompanyImgUrl(cardCompany.getCardCompanyImgUrl())
				.userCardCompanyRequestDate(now)
				.userCardCompanyExpirationDate(now.plusYears(1))
				.build());
	}

	public void cancelLinkCardCompany(UserCardCompany userCardCompany){
		this.userCardCompanyList.remove(userCardCompany);
	}

	public void removeUserCardList(List<UserCard> userCardList){
		Iterator<UserCard> iter = this.userCardList.iterator();
		while (iter.hasNext()) {
			UserCard card = iter.next();
			if (userCardList.contains(card)) {
				iter.remove();
			}
		}
	}

	public void updateLastRenewalTime(){
		this.userLastRenewalTime = LocalDateTime.now();
	}
}
