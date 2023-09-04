package com.ssafy.benepick.domain.mydata.entity;

import java.time.LocalDate;

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
public class MyDataPayment {

	@Id
	private Long myDataPaymentId;

	@Column(nullable = false)
	private LocalDate myDataPaymentDate;

	@Column(nullable = false)
	private String myDataPaymentCategory;

	@Column(nullable = false)
	private int myDataPaymentAmount;

	@Column(nullable = false)
	private String myDataPaymentMerchantName;

	@Column(nullable = false)
	private double myDataPaymentMerchantX;

	@Column(nullable = false)
	private double myDataPaymentMerchantY;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "my_data_card_id" , nullable = false)
	private MyDataCard myDataCard;
}

