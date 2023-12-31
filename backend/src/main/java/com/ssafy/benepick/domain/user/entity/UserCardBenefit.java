package com.ssafy.benepick.domain.user.entity;

import com.ssafy.benepick.domain.card.dto.response.CardBenefitDiscountResponseDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "user_card_benefit" , schema = "benepick")
public class UserCardBenefit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_card_benefit_performance_level")
	private Long userCardBenefitPerformanceLevel;

	@Column(name = "card_benefit_performance_level")
	private Long cardBenefitPerformanceLevel;

	@Column(nullable = false , name = "user_card_benefit_discount_percent")
	private int userCardBenefitDiscountPercent;

	@Column(nullable = false , name = "user_card_benefit_performance_start")
	private int userCardBenefitPerformanceStart;

	@Column(nullable = false , name = "user_card_benefit_performance_end")
	private int userCardBenefitPerformanceEnd;

	@Column(nullable = false, name = "user_card_benefit_limit")
	private int userCardBenefitLimit;

	@Column(nullable = false, name = "user_card_benefit_received_amount")
	private int userCardBenefitReceivedAmount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_card_category1_id" , nullable = false)
	private UserCardCategory1 userCardCategory1;

	public void updateReceivedAmount(int userCardBenefitReceivedAmount){
		this.userCardBenefitReceivedAmount = userCardBenefitReceivedAmount;
	}

	public CardBenefitDiscountResponseDto toCardBenefitDiscountResponseDto(int performanceLevel){
		return CardBenefitDiscountResponseDto.builder()
			.performanceLevel(performanceLevel)
			.discountPercent(userCardBenefitDiscountPercent)
			.performanceStart(userCardBenefitPerformanceStart)
			.performanceEnd(userCardBenefitPerformanceEnd)
			.build();
	}
}
