package com.ssafy.benepick.domain.user.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.ssafy.benepick.domain.mydata.dto.response.TransactionInfoResponseDto;

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
@Table(name = "user_payment" , schema = "benepick")
public class UserPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_payment_id")
	private Long userPaymentId;

	@Column(nullable = false , name = "user_payment_category1")
	private String userPaymentCategory1;

	@Column(nullable = false , name = "user_payment_category2")
	private String userPaymentCategory2;

	@Column(nullable = false , name = "user_payment_date_time")
	private LocalDateTime userPaymentDateTime;

	@Column(nullable = false , name = "user_payment_amount")
	private int userPaymentAmount;

	@Column(nullable = false , name = "user_payment_merchant_info")
	private String userPaymentMerchantInfo;

	@Column(nullable = false , name = "user_payment_received_benefit_amount")
	private int userPaymentReceivedBenefitAmount;

	@Column(nullable = false , name = "user_payment_card_code")
	private int userPaymentCardCode;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_card_id" , nullable = false)
	private UserCard userCard;


	public TransactionInfoResponseDto toTransactionInfoResponseDto(){
		return TransactionInfoResponseDto.builder()
			.category(userPaymentCategory1)
			.merchantName(userPaymentMerchantInfo)
			.payAmount(userPaymentAmount)
			.benefitAmount(userPaymentReceivedBenefitAmount)
			.transactionTime(userPaymentDateTime)
			.build();
	}

}
