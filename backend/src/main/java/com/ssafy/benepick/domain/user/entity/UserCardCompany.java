package com.ssafy.benepick.domain.user.entity;

import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "user_card_company" , schema = "benepick")
public class UserCardCompany {

	@Id
	@Column(name = "user_card_company_id")
	private Long userCardCompanyId;

	@Column(nullable = false , name = "user_card_company_name")
	private String userCardCompanyName;

	@Column(nullable = false , name = "user_card_company_img_url")
	private String userCardCompanyImgUrl;

	@Column(nullable = false , name = "user_card_company_request_date")
	private LocalDateTime userCardCompanyRequestDate;

	@Column(nullable = false , name = "user_card_company_expiration_date")
	private LocalDateTime userCardCompanyExpirationDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id" , nullable = false)
	private User user;

	public void renewDate(){
		LocalDateTime now = LocalDateTime.now();
		this.userCardCompanyRequestDate = now;
		this.userCardCompanyExpirationDate = now.plusYears(1);
	}

	public CardCompanyResponseDto toCardCompanyResponseDto(){
		return CardCompanyResponseDto.builder()
			.cardCompanyId(userCardCompanyId)
			.cardCompanyImgUrl(userCardCompanyImgUrl)
			.cardCompanyName(userCardCompanyName)
			.build();
	}
}
