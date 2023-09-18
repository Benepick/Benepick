package com.ssafy.benepick.mydata.domain.card.entity;

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
@Table(name = "card_benefit" , schema = "benepick_bank")
public class CardBenefit {

	@Id
	@Column(name = "card_benefit_performance_level")
	private Long cardBenefitPerformanceLevel;

	@Column(nullable = false , name = "card_benefit_discount_percent")
	private int cardBenefitDiscountPercent;

	@Column(nullable = false , name = "card_benefit_performance_start")
	private int cardBenefitPerformanceStart;

	@Column(nullable = false , name = "card_benefit_performance_end")
	private int cardBenefitPerformanceEnd;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category1_id" , nullable = false)
	private Category1 category1;

}
