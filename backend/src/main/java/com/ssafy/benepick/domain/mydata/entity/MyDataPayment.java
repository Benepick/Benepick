package com.ssafy.benepick.domain.mydata.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "mydata_payment" , schema = "benepick_bank")
public class MyDataPayment {

	@Id
	@Column(name = "mydata_payment_id")
	private String myDataPaymentId;

	@Column(nullable = false , name = "mydata_payment_date")
	private LocalDateTime myDataPaymentDate;

	@Column(nullable = false , name = "mydata_payment_category1")
	private String myDataPaymentCategory1;

	@Column(nullable = false , name = "mydata_payment_amount")
	private int myDataPaymentAmount;

	@Column(nullable = false , name = "mydata_payment_merchant_name")
	private String myDataPaymentMerchantName;

	@Column(nullable = false , name = "mydata_payment_category2")
	private String myDataPaymentCategory2;

	@Column(nullable = false , name = "mydata_payment_card_code")
	private int myDataPaymentCardCode;

	@Column(nullable = false , name = "mydata_payment_received_benefit_amount")
	private int myDataPaymentReceivedBenefitAmount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "mydata_card_id" , nullable = false)
	private MyDataCard myDataCard;
}

