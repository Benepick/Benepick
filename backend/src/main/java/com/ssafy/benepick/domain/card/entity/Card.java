package com.ssafy.benepick.domain.card.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Card {

	@Id
	private Long cardCode;

	@Column(nullable = false)
	private String cardName;

	@Column(nullable = false)
	private String cardImgUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "card_company_id" , nullable = false)
	private CardCompany cardCompany;
}
