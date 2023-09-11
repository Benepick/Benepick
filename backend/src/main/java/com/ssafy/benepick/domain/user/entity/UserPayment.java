package com.ssafy.benepick.domain.user.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class UserPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userPaymentId;

	@Column(nullable = false)
	private String userPaymentCategory1;

	@Column(nullable = false)
	private int userPaymentCategory2;

	@Column(nullable = false)
	private LocalDateTime userPaymentDateTime;

	@Column(nullable = false)
	private int userPaymentAmount;

	@Column(nullable = false)
	private String userPaymentMerchantInfo;

	@Column(nullable = false)
	private int userPaymentReceivedBenefitAmount;

	@Column(nullable = false)
	private int userCardCode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_card_id" , nullable = false)
	private UserCard userCard;

}
